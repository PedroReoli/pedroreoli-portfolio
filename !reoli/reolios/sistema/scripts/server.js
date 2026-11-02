const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');

const PORT = process.env.PORT || 3333;
const baseDir = path.resolve(__dirname, '../..');

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html; charset=utf-8';
    case '.js': return 'application/javascript; charset=utf-8';
    case '.css': return 'text/css; charset=utf-8';
    case '.json': return 'application/json; charset=utf-8';
    case '.png': return 'image/png';
    case '.jpg': case '.jpeg': return 'image/jpeg';
    case '.svg': return 'image/svg+xml';
    default: return 'text/plain; charset=utf-8';
  }
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
}

function getSkillsList() {
  const skillsDir = path.join(baseDir, '.claude', 'skills');
  const skills = [];

  function scan(dir, pillar = '') {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        const currentPillar = pillar ? pillar : item.name;
        scan(fullPath, currentPillar);
      } else if (item.name.toLowerCase() === 'skill.md') {
        const content = fs.readFileSync(fullPath, 'utf8');
        const relativePath = path.relative(skillsDir, fullPath);
        const folderName = path.basename(path.dirname(fullPath));

        let name = folderName;
        let description = 'Skill operacional ReoliOS';
        const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
        if (fmMatch) {
          const fmText = fmMatch[1];
          const nameMatch = fmText.match(/name:\s*(.+)/);
          const descMatch = fmText.match(/description:\s*(.+)/);
          if (nameMatch) name = nameMatch[1].trim();
          if (descMatch) description = descMatch[1].trim();
        }

        const titleMatch = content.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1].trim() : name;

        skills.push({
          id: `${pillar}-${name}`,
          name,
          title,
          pillar: pillar || 'geral',
          description,
          path: relativePath,
          content
        });
      }
    }
  }

  scan(skillsDir);
  return skills;
}

function findSkillContent(skillName) {
  const allSkills = getSkillsList();
  const found = allSkills.find(s => s.name === skillName);
  return found ? found.content : '';
}

function findMemoryContent(memoryFile) {
  if (!memoryFile) return '';
  const mainMem = path.join(baseDir, 'sistema', 'memoria', memoryFile);
  if (fs.existsSync(mainMem)) return fs.readFileSync(mainMem, 'utf8');

  const clientMem = path.join(baseDir, 'sistema', 'memoria', 'clientes', memoryFile);
  if (fs.existsSync(clientMem)) return fs.readFileSync(clientMem, 'utf8');

  return '';
}

function checkCliInstalled(cmd) {
  return new Promise((resolve) => {
    const isWin = process.platform === 'win32';
    const checkCmd = isWin ? `where.exe ${cmd}` : `which ${cmd}`;
    exec(checkCmd, (err) => {
      resolve(!err);
    });
  });
}

function runRealAiAgent(agent, fullPrompt) {
  return new Promise((resolve) => {
    let cmd = 'agy';
    let args = ['--prompt', '-'];
    const isWin = process.platform === 'win32';

    switch (agent) {
      case 'agy':
        cmd = isWin ? 'agy.exe' : 'agy';
        args = ['--prompt', '-'];
        break;
      case 'codex':
        cmd = isWin ? 'codex.exe' : 'codex';
        args = ['exec'];
        break;
      case 'claude':
        cmd = isWin ? 'claude.cmd' : 'claude';
        args = ['-p', '-'];
        break;
      case 'gemini':
        cmd = isWin ? 'gemini.cmd' : 'gemini';
        args = ['--prompt', '-'];
        break;
      default:
        cmd = isWin ? 'agy.exe' : 'agy';
        args = ['--prompt', '-'];
    }

    let child;
    try {
      child = spawn(cmd, args, { cwd: baseDir, shell: isWin });
    } catch (err) {
      resolve({ success: false, output: `[Erro ao iniciar ${agent}]: ${err.message}` });
      return;
    }

    let stdout = '';
    let stderr = '';

    if (child.stdout) child.stdout.on('data', data => { stdout += data.toString('utf8'); });
    if (child.stderr) child.stderr.on('data', data => { stderr += data.toString('utf8'); });

    child.on('error', err => {
      resolve({ success: false, output: `[Erro de Subprocesso ${agent}]: ${err.message}` });
    });

    child.on('close', code => {
      let output = (stdout + '\n' + stderr).trim();
      resolve({
        success: code === 0,
        output: output || `Agente ${agent} finalizou (código ${code}).`
      });
    });

    try {
      child.stdin.write(fullPrompt);
      child.stdin.end();
    } catch (e) {
      // Stream write error fallback
    }
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // --- API Endpoints ---

  if (pathname === '/api/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      name: 'ReoliOS',
      version: '1.2.0',
      status: 'online',
      workspace: baseDir,
      timestamp: new Date().toISOString()
    }));
    return;
  }

  if (pathname === '/api/ai/detect') {
    const [claude, gemini, agy, codex] = await Promise.all([
      checkCliInstalled('claude'),
      checkCliInstalled('gemini'),
      checkCliInstalled('agy'),
      checkCliInstalled('codex')
    ]);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      agents: [
        { id: 'claude', name: 'Claude Code', installed: claude, command: 'claude' },
        { id: 'gemini', name: 'Gemini CLI', installed: gemini, command: 'gemini' },
        { id: 'agy', name: 'Antigravity (AGY)', installed: agy, command: 'agy' },
        { id: 'codex', name: 'Codex CLI', installed: codex, command: 'codex' },
      ]
    }));
    return;
  }

  if (pathname === '/api/skills') {
    const skills = getSkillsList();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ total: skills.length, skills }));
    return;
  }

  if (pathname === '/api/posts' && req.method === 'GET') {
    const postsPath = path.join(baseDir, 'sistema', 'dados', 'posts.json');
    const data = fs.existsSync(postsPath) ? fs.readFileSync(postsPath, 'utf8') : '{"posts":[]}';
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data);
    return;
  }

  if (pathname === '/api/posts' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const postsPath = path.join(baseDir, 'sistema', 'dados', 'posts.json');
      let data = fs.existsSync(postsPath) ? JSON.parse(fs.readFileSync(postsPath, 'utf8')) : { posts: [] };
      body.id = `post-${Date.now()}`;
      body.data = new Date().toISOString().split('T')[0];
      data.posts.unshift(body);
      fs.writeFileSync(postsPath, JSON.stringify(data, null, 2), 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, post: body }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  if (pathname === '/api/copys' && req.method === 'GET') {
    const copysPath = path.join(baseDir, 'sistema', 'dados', 'copys.json');
    const data = fs.existsSync(copysPath) ? fs.readFileSync(copysPath, 'utf8') : '{"copys":[]}';
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data);
    return;
  }

  if (pathname === '/api/memoria' && req.method === 'GET') {
    const memoriaDir = path.join(baseDir, 'sistema', 'memoria');
    const files = {};
    if (fs.existsSync(memoriaDir)) {
      fs.readdirSync(memoriaDir).forEach(f => {
        const p = path.join(memoriaDir, f);
        if (fs.statSync(p).isFile() && f.endsWith('.md')) {
          files[f] = fs.readFileSync(p, 'utf8');
        }
      });
    }
    const clientesDir = path.join(memoriaDir, 'clientes');
    files.clientes = {};
    if (fs.existsSync(clientesDir)) {
      fs.readdirSync(clientesDir).forEach(f => {
        const p = path.join(clientesDir, f);
        if (fs.statSync(p).isFile() && f.endsWith('.md')) {
          files.clientes[f] = fs.readFileSync(p, 'utf8');
        }
      });
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(files));
    return;
  }

  if (pathname === '/api/memoria' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const { filename, content, isClient } = body;
      const targetDir = isClient 
        ? path.join(baseDir, 'sistema', 'memoria', 'clientes') 
        : path.join(baseDir, 'sistema', 'memoria');
      
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(path.join(targetDir, filename), content, 'utf8');
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, message: `Memória ${filename} salva com sucesso!` }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  if (pathname === '/api/ai/run' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const { agent, skillName, memoryFile, prompt } = body;

      const skillContent = findSkillContent(skillName);
      const memoryContent = findMemoryContent(memoryFile);

      let fullPrompt = '';
      if (skillContent) {
        fullPrompt += `[DIRETRIZES DA SKILL: /${skillName}]\n${skillContent}\n\n`;
      }
      if (memoryContent) {
        fullPrompt += `[CONTEXTO DE MEMÓRIA: ${memoryFile}]\n${memoryContent}\n\n`;
      }
      fullPrompt += `[SOLICITAÇÃO DO USUÁRIO]\n${prompt || 'Execute as diretrizes da skill e apresente o resultado.'}`;

      const aiResult = await runRealAiAgent(agent || 'agy', fullPrompt);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: aiResult.success,
        agent: agent || 'agy',
        output: aiResult.output
      }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // --- Serve Static UI ---
  let fileToServe = path.join(baseDir, 'public', pathname === '/' ? 'index.html' : pathname);
  if (!fs.existsSync(fileToServe)) {
    fileToServe = path.join(baseDir, 'public', 'index.html');
  }

  if (fs.existsSync(fileToServe)) {
    res.writeHead(200, { 'Content-Type': getContentType(fileToServe) });
    res.end(fs.readFileSync(fileToServe));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('UI não encontrada');
  }
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`\n🚀 ReoliOS v1.2.0 Self-Hosted Hub rodando em: ${url}`);
  console.log(`  ➜ Pressione Ctrl+C para encerrar o servidor.\n`);

  const startCmd = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
  exec(`${startCmd} ${url}`);
});

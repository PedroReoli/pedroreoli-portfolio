import assert from "node:assert/strict"
import { after, before, test } from "node:test"
import { fileURLToPath } from "node:url"
import { readFile } from "node:fs/promises"
import React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { StaticRouter } from "react-router-dom"
import { LazyMotion, domAnimation } from "framer-motion"
import { createServer } from "vite"

// Verifica estrutura e conteúdo. Não substitui testes de layout e scroll no navegador.
const root = fileURLToPath(new URL("../", import.meta.url))
let server
let LanguageContext
let resolveLanguage
let featuredProjects
const components = {}

before(async () => {
  server = await createServer({
    root,
    server: { middlewareMode: true, hmr: false },
    appType: "custom",
    logLevel: "error",
  })
  ;({ LanguageContext } = await server.ssrLoadModule("/src/i18n/language-context.ts"))
  ;({ resolveLanguage } = await server.ssrLoadModule("/src/i18n/language-preference.ts"))
  ;({ featuredProjects } = await server.ssrLoadModule("/src/content/homeContent.ts"))
  for (const [name, path] of Object.entries({
    Projects: "/src/pages/ProjectsPage.tsx",
    Notes: "/src/pages/MediaBlogPage.tsx",
    Intro: "/src/components/organisms/HomeIntro.tsx",
    Sections: "/src/components/organisms/HomeSections.tsx",
    Footer: "/src/components/organisms/SiteFooter.tsx",
    FeaturedProject: "/src/components/molecules/FeaturedProjectSlide.tsx",
    ContentStatus: "/src/components/molecules/ContentStatus.tsx",
  })) {
    components[name] = (await server.ssrLoadModule(path)).default
  }
})

after(async () => {
  await server?.close()
})

function render(children, language = "pt", location = "/") {
  return renderToStaticMarkup(
    React.createElement(
      LazyMotion,
      { features: domAnimation, strict: true },
      React.createElement(
        StaticRouter,
        { location },
        React.createElement(
          LanguageContext.Provider,
          {
            value: {
              language,
              setLanguage() {},
              toggleLanguage() {},
              isSwitching: false,
              switchingTo: null,
            },
          },
          children,
        ),
      ),
    ),
  )
}

test("Idioma: preferência explícita, ordem do navegador e fallback", () => {
  const cases = [
    ["pt", ["en-US"], "pt"],
    ["en", ["pt-BR"], "en"],
    [null, ["en-US", "pt-BR"], "en"],
    [null, ["pt-PT", "en-US"], "pt"],
    [null, ["fr-FR", "en-GB", "pt-BR"], "en"],
    [null, ["fr-FR", "pt-BR"], "pt"],
    ["invalid", ["pt-BR"], "pt"],
    ["invalid", ["en-US"], "en"],
    [null, [], "en"],
    [null, ["fr-FR", "es-ES"], "en"],
    [null, ["PT-br"], "pt"],
    [null, ["", "en"], "en"],
  ]
  for (const [saved, locales, expected] of cases) {
    assert.equal(resolveLanguage(saved, locales), expected, JSON.stringify({ saved, locales }))
  }
})

test("Alternativa sem JavaScript mantém contatos alinhados à configuração", async () => {
  const { siteConfig, getMailtoUrl } = await server.ssrLoadModule("/src/config/site.ts")
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8")
  const fallback = html.match(/<noscript>([\s\S]*?)<\/noscript>/)?.[1]
  assert.ok(fallback, "Fallback nativo presente no HTML inicial")
  assert.ok(fallback.includes('id="main-content"'))
  for (const href of [getMailtoUrl(), siteConfig.social.github, siteConfig.social.linkedin]) {
    assert.ok(fallback.includes(`href="${href}"`), href)
  }
  assert.ok(fallback.includes('href="/no-script.css"'))
})

for (const language of ["pt", "en"]) {
  test(`Estados ${language}: carregamento e erro com semântica de página e seção`, () => {
    for (const scope of ["page", "section"]) {
      for (const status of ["loading", "error"]) {
        const html = render(
          React.createElement(components.ContentStatus, { scope, status }),
          language,
        )
        assert.equal((html.match(/<main\b/g) || []).length, scope === "page" ? 1 : 0)
        assert.equal((html.match(/id="main-content"/g) || []).length, scope === "page" ? 1 : 0)
        assert.ok(html.includes(`aria-busy="${status === "loading"}"`))
        if (status === "loading") {
          assert.ok(html.includes('role="status"'))
          assert.ok(html.includes(language === "pt" ? "Carregando" : "Loading"))
        } else {
          assert.ok(html.includes('role="alert"'))
          assert.ok(html.includes(language === "pt" ? "Tentar novamente" : "Try again"))
          assert.ok(html.includes(scope === "page" ? "<h1 " : "<h2 "))
          assert.ok(html.includes(scope === "page" ? 'href="/"' : 'href="#contato"'))
        }
      }
    }
  })

  test(`Slides ${language}: conteúdo centralizado e destinos corretos`, () => {
    assert.equal(featuredProjects.length, 2, "Dois destaques antes do link Ver mais projetos")
    for (const project of featuredProjects) {
      const html = render(
        React.createElement(components.FeaturedProject, {
          project,
          isEn: language === "en",
          total: featuredProjects.length,
        }),
        language,
      )
      assert.ok(html.includes(project.title))
      assert.ok(html.includes(project.description[language]))
      assert.ok(html.includes(project.action[language]))
      assert.ok(html.includes(`href="${project.href}"`))
      assert.equal(html.split(project.year).length - 1, 1, "Ano sem repetição na imagem")
      assert.equal((html.match(/<li\b/g) || []).length, project.technologies.length)
      if (project.external) {
        assert.ok(html.includes('rel="noopener noreferrer"'))
        assert.ok(html.includes(language === "pt" ? "Abre em nova aba" : "Opens in a new tab"))
      } else {
        assert.ok(html.includes('loading="lazy"'))
        assert.ok(html.includes(project.imageAlt[language]))
        assert.ok(!html.includes('target="_blank"'))
      }
    }
  })

  test(`Home ${language}: sete seções, nome e destinos preservados`, () => {
    const html = render(
      React.createElement(
        React.Fragment,
        null,
        React.createElement(components.Intro),
        React.createElement(components.Sections),
        React.createElement(components.Footer),
      ),
      language,
    )
    for (const id of [
      "hero",
      "sobre",
      "projetos-selecionados",
      "stack",
      "proposito",
      "experiencia",
      "contato",
    ]) {
      assert.equal(html.split(`id="${id}"`).length - 1, 1, id)
    }
    assert.equal((html.match(/<h1\b/g) || []).length, 1)
    assert.ok(html.indexOf("PEDRO") < html.indexOf("REOLI"))
    assert.ok(html.includes("translateY(110%)"), "Entrada inicial dos nomes preservada")
    assert.ok(html.includes("min-h-screen"))
    assert.ok(html.includes('src="/brands/claude.svg"'), "Símbolo próprio do Claude")
    assert.ok(html.includes("Design System"))
    assert.ok(html.includes(language === "pt" ? "IA &amp; APIs" : "AI &amp; APIs"))
    assert.ok(html.includes('href="/projetos?tipo=corporativo"'))
    assert.ok(html.includes(language === "pt" ? "Quem eu sou" : "Who I am"))
    assert.ok(!html.includes("footer-stage-compact"))
    const chapterButtons = [
      ...html.matchAll(/<button\b[^>]*aria-controls="experience-detail"[^>]*>/g),
    ]
    assert.equal(chapterButtons.length, 5)
    for (const [button] of chapterButtons) {
      assert.match(
        button,
        /aria-label="[^"]+, [^"]+, [^"]+"/,
        "Nome completo do capítulo no seletor compacto",
      )
    }
  })

  for (const category of ["corporativo", "gerais"]) {
    test(`Projetos ${language}/${category}: filtro, título e rodapé compacto`, () => {
      const html = render(
        React.createElement(components.Projects),
        language,
        `/projetos?tipo=${category}`,
      )
      assert.equal((html.match(/<h1\b/g) || []).length, 1)
      assert.ok(html.includes('class="archive-title"'))
      assert.ok(html.includes(`id="${category}-projects"`))
      assert.equal((html.match(/aria-pressed="true"/g) || []).length, 1)
      assert.ok(html.includes(`aria-controls="${category}-projects"`))
      assert.ok(html.includes("footer-stage-compact"))
      assert.ok(!html.includes("17vw"))
      if (category === "corporativo") {
        assert.equal((html.match(/<img\b/g) || []).length, 4)
        assert.ok(html.includes("project-overview-image"))
      } else {
        for (const title of ["Achilles CDP Agent", "Organon", "GeoAmbiental VR"]) {
          assert.ok(html.includes(title))
        }
        assert.equal((html.match(/class="project-archive-description"/g) || []).length, 3)
        assert.ok(!html.includes('class="hidden sm:block"'), "Descrições disponíveis no mobile")
      }
    })
  }

  test(`Notas ${language}: hierarquia e descrições presentes`, () => {
    const html = render(React.createElement(components.Notes), language, "/midia-blog")
    assert.equal((html.match(/<h1\b/g) || []).length, 1)
    assert.ok(html.includes("FalaAtípica"))
    assert.ok(html.includes("footer-stage-compact"))
    assert.equal((html.match(/class="project-archive-description"/g) || []).length, 3)
    assert.ok(html.includes(language === "pt" ? "Por dentro do código" : "Inside the code"))
    assert.ok(html.includes(language === "pt" ? "Repositório no GitHub" : "GitHub repository"))
    assert.ok(html.includes(language === "pt" ? "Perfil no GitHub" : "GitHub profile"))
  })
}

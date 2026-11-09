## 2026-11-06T16:10:37Z

You are Worker 2 (Hero ATS & Content Enrichment). Read ORIGINAL_REQUEST.md at f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\ORIGINAL_REQUEST.md and PROJECT.md at f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\orchestrator\PROJECT.md before starting.
Your working directory is f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\worker_m2_ats_content\.

You exclusively own and may edit ONLY these files:
- src/components/home/HeroSection.tsx
- content/homeContent.json
- content/projectsContent.json
- content/interfaceContent.json
- src/test/rendering.test.tsx

Technical blueprint to follow:
- Read f:\Projetos\Pessoais\portfolios\pedroreoli-portfolio\.agents\teamwork\spec_miner_r2_2\handoff.md (Sections 5.1, 5.2, 5.3) for exact JSX, text copy catalogs in PT/EN, ATS button specifications, and title replacement.

Mission (R2, R4 content, R5 title):
1. R2: Implement the 3 functional ATS buttons inside .hero__actions-group in HeroSection.tsx:
   - Button 1: Download ATS Resume (FileDown icon from lucide-react, downloads /resume/Pedro_Lucas_Reis_Frontend.pdf in PT or /resume/Pedro_Lucas_Reis_Fullstack.pdf in EN, target="_blank").
   - Button 2: Copy Direct Contact (Copy/Check icon, copies "pedrosousa2160@gmail.com" to clipboard, with 2.5s feedback state "E-mail Copiado!" / "Email Copied!").
   - Button 3: ATS Profile (Sparkles icon, links/scrolls to #sobre with clear aria-label).
2. R4: Update project descriptions in content/homeContent.json (featuredProjects Autocom3, Achilles) and content/projectsContent.json (Organon, Domus) with the rich, quantifiable engineering narratives from Sobre Mim.md provided in spec_miner_r2_2/handoff.md § 5.2.
3. R5: Update the 5th section Purpose title in content/interfaceContent.json to the unaccented headline:
   - PT: title: "VOZ", titleAccent: "para todos."
   - EN: title: "VOICE", titleAccent: "for all."
   - In src/test/rendering.test.tsx, update assertions at lines 40-41 from 'Comunicação' / 'mais acessível.' to 'VOZ' / 'para todos.' so tests remain passing.
4. Verification: run `npx tsc --noEmit`, `npm run lint`, `npm test` and `npm run build`. All must pass with 0 errors.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Document your work in handoff.md in your working directory and notify the parent orchestrator via send_message when complete.

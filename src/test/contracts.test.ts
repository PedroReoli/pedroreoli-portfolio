import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import siteContentRaw from '../../content/siteContent.json';
import interfaceContentRaw from '../../content/interfaceContent.json';
import homeContentRaw from '../../content/homeContent.json';
import projectsContentRaw from '../../content/projectsContent.json';
import mediaContentRaw from '../../content/mediaContent.json';
import technologyContentRaw from '../../content/technologyContent.json';

import { hasIcon } from '../components/common/Icon';

describe('Content Contract & Asset Integrity Tests', () => {
  it('loads all JSON files correctly', () => {
    expect(siteContentRaw.name).toBe('Pedro Reoli');
    expect(interfaceContentRaw.hero.id).toBe('hero');
    expect(homeContentRaw.featuredProjects.length).toBeGreaterThan(0);
    expect(projectsContentRaw.corporateProjectImages.length).toBeGreaterThan(0);
    expect(mediaContentRaw.mediaNotes.length).toBeGreaterThan(0);
    expect(technologyContentRaw.groups.length).toBeGreaterThan(0);
  });

  it('contains valid icons for all technology tools', () => {
    technologyContentRaw.groups.forEach((group) => {
      group.tools.forEach((tool) => {
        const isValid = hasIcon(tool.icon);
        expect(isValid, `Tool icon "${tool.icon}" in group "${group.number}" should be registered`).toBe(true);
        expect(['simple-icons', 'brand-asset', 'concept']).toContain(tool.source);
        if (tool.icon === 'image') {
          expect('image' in tool && tool.image, `Tool "${tool.name}" using image icon must have image path`).toBeDefined();
        }
      });
    });
  });

  it('contains valid icons across interface content and home content', () => {
    // Interface content icons
    expect(hasIcon(interfaceContentRaw.hero.actionIcon)).toBe(true);
    expect(hasIcon(interfaceContentRaw.purpose.actionIcon)).toBe(true);
    expect(hasIcon(interfaceContentRaw.corporateProjects.galleryIcon)).toBe(true);
    expect(hasIcon(interfaceContentRaw.independentProjects.externalIcon)).toBe(true);
    expect(hasIcon(interfaceContentRaw.selectedProjects.icons.previous)).toBe(true);
    expect(hasIcon(interfaceContentRaw.selectedProjects.icons.next)).toBe(true);
    expect(hasIcon(interfaceContentRaw.selectedProjects.icons.scroll)).toBe(true);
    expect(hasIcon(interfaceContentRaw.featuredProject.actionIcon)).toBe(true);
    expect(hasIcon(interfaceContentRaw.mediaArchive.feature.actionIcon)).toBe(true);
    expect(hasIcon(interfaceContentRaw.mediaArchive.referenceIcon)).toBe(true);
    expect(hasIcon(interfaceContentRaw.experience.icons.scroll)).toBe(true);
    expect(hasIcon(interfaceContentRaw.experience.icons.chapter)).toBe(true);
    expect(hasIcon(interfaceContentRaw.languageNotice.icon)).toBe(true);
    expect(hasIcon(interfaceContentRaw.header.menuIcon)).toBe(true);
    expect(hasIcon(interfaceContentRaw.header.closeIcon)).toBe(true);
    expect(hasIcon(interfaceContentRaw.footer.backToTopIcon)).toBe(true);

    interfaceContentRaw.header.navigation.forEach((nav) => {
      expect(hasIcon(nav.icon), `Nav icon "${nav.icon}"`).toBe(true);
    });

    interfaceContentRaw.footer.contacts.forEach((contact) => {
      expect(hasIcon(contact.icon), `Contact icon "${contact.icon}"`).toBe(true);
    });

    // Home featured projects icons
    homeContentRaw.featuredProjects.forEach((proj) => {
      expect(hasIcon(proj.actionIcon), `Project actionIcon "${proj.actionIcon}"`).toBe(true);
    });

    // Projects content
    projectsContentRaw.independentProjects.forEach((proj) => {
      expect(hasIcon(proj.icon), `Independent project icon "${proj.icon}"`).toBe(true);
    });

    // Media content
    mediaContentRaw.mediaNotes.forEach((note) => {
      expect(hasIcon(note.icon), `Media note icon "${note.icon}"`).toBe(true);
    });
  });

  it('validates all referenced local assets exist in public/', () => {
    const publicDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../public');

    const checkFile = (relativeUrl: string) => {
      if (!relativeUrl || relativeUrl.startsWith('http') || relativeUrl.startsWith('mailto') || relativeUrl.startsWith('#')) return;
      // Strip query or hash
      const cleanPath = relativeUrl.split('?')[0].split('#')[0];
      const filePath = path.join(publicDir, cleanPath);
      expect(fs.existsSync(filePath), `Asset ${cleanPath} should exist in public directory`).toBe(true);
    };

    // Site content assets
    checkFile(siteContentRaw.defaultShareImage);
    checkFile(siteContentRaw.staticAssets.favicon);
    checkFile(siteContentRaw.flags.br.default);
    checkFile(siteContentRaw.flags.br.square);
    checkFile(siteContentRaw.flags.us.default);
    checkFile(siteContentRaw.flags.us.square);

    // Interface content assets
    checkFile(interfaceContentRaw.about.portrait.src);
    checkFile(interfaceContentRaw.purpose.media.src);

    // Check srcSet paths in purpose
    interfaceContentRaw.purpose.media.srcSet.split(',').forEach((entry) => {
      const src = entry.trim().split(' ')[0];
      checkFile(src);
    });

    // Technology tools images
    technologyContentRaw.groups.forEach((group) => {
      group.tools.forEach((tool) => {
        if ('image' in tool && tool.image) {
          checkFile(String(tool.image));
        }
      });
    });

    // Corporate projects images
    projectsContentRaw.corporateProjectImages.forEach((item) => {
      checkFile(item.src);
      if (item.srcSet) {
        item.srcSet.split(',').forEach((entry) => {
          const src = entry.trim().split(' ')[0];
          checkFile(src);
        });
      }
    });

    // Featured projects images
    homeContentRaw.featuredProjects.forEach((proj) => {
      if (proj.visual === 'image' && 'image' in proj && proj.image) {
        checkFile(String(proj.image));
        if ('imageSrcSet' in proj && proj.imageSrcSet) {
          proj.imageSrcSet.split(',').forEach((entry) => {
            const src = entry.trim().split(' ')[0];
            checkFile(src);
          });
        }
      }
    });
  });

  it('contains complete PT and EN texts for all localized fields', () => {
    // Check SEO
    ['home', 'projects', 'media', 'notFound'].forEach((page) => {
      const seoItem = interfaceContentRaw.seo[page as keyof typeof interfaceContentRaw.seo];
      expect(seoItem.pt.title).toBeTruthy();
      expect(seoItem.pt.description).toBeTruthy();
      expect(seoItem.en.title).toBeTruthy();
      expect(seoItem.en.description).toBeTruthy();
    });

    // Check Hero
    expect(interfaceContentRaw.hero.pt.role).toBeTruthy();
    expect(interfaceContentRaw.hero.en.role).toBeTruthy();

    // Check Experience
    homeContentRaw.experienceItems.forEach((exp) => {
      expect(exp.period.pt).toBeTruthy();
      expect(exp.period.en).toBeTruthy();
      expect(exp.role.pt).toBeTruthy();
      expect(exp.role.en).toBeTruthy();
      expect(exp.description.pt).toBeTruthy();
      expect(exp.description.en).toBeTruthy();
      expect(exp.highlights.pt.length).toBeGreaterThan(0);
      expect(exp.highlights.en.length).toBeGreaterThan(0);
    });
  });

  it('limits authored interface colors to neutrals and one solar amber accent', () => {
    const permittedColors = new Set(['#FBBF24', '#B45309', '#78350F', '#182033', '#111010']);

    technologyContentRaw.groups.forEach((group) => {
      group.tools.forEach((tool) => {
        const colorUpper = (tool.color || '').toUpperCase();
        expect(permittedColors.has(colorUpper) || permittedColors.has(tool.color), `${tool.name} must use the approved palette`).toBe(true);
      });
    });

    interfaceContentRaw.footer.contacts.forEach((contact) => {
      const colorUpper = (contact.color || '').toUpperCase();
      expect(permittedColors.has(colorUpper) || permittedColors.has(contact.color), `${contact.label} must use the approved palette`).toBe(true);
    });

    const stylesDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../styles');
    const styles = fs.readdirSync(stylesDir)
      .filter((file) => file.endsWith('.css'))
      .map((file) => fs.readFileSync(path.join(stylesDir, file), 'utf8'))
      .join('\n');

    expect(styles).not.toMatch(/rgba?\(49\s*,\s*94\s*,\s*251/i);
    expect(styles).not.toMatch(/rgba?\(98\s*,\s*217\s*,\s*255/i);
    expect(styles).toMatch(/--color-accent:\s*(#ffc900|#fbbf24)/);
    // --color-accent-ink é tinta (texto amarelo legível sobre papel): #7a5c00.
    // --color-on-accent é o preenchimento escuro usado SOBRE o amarelo.
    expect(styles).toMatch(/--color-accent-ink:\s*#7a5c00/);
    expect(styles).toMatch(/--color-on-accent:\s*#08090b/);
    expect(styles).toMatch(/--color-accent-emissive:\s*(#ffc900|#78350f)/);
    expect(styles).not.toMatch(/#2dd4bf|rgba?\(45\s*,\s*212\s*,\s*191/i);
    expect(styles).not.toMatch(/#8b5cf6|#6d28d9|rgba?\(139\s*,\s*92\s*,\s*246/i);
    expect(styles).not.toMatch(/#ff5a36|#c93618|rgba?\(255\s*,\s*90\s*,\s*54/i);
  });

  it('declares the cyan ocean #2596be as the canonical background color token', () => {
    const baseCss = fs.readFileSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../styles/base.css'), 'utf8');
    expect(baseCss).toMatch(/--color-bg:\s*#2596be;/);
    const indexHtml = fs.readFileSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../index.html'), 'utf8');
    expect(indexHtml).toMatch(/<meta name="theme-color" content="#2596be" \/>/);
  });
});


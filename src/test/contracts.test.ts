import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

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
        if (tool.icon === 'image') {
          expect(tool.image, `Tool "${tool.name}" using image icon must have image path`).toBeDefined();
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
    const publicDir = path.resolve(__dirname, '../../public');

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
        if (tool.image) {
          checkFile(tool.image);
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
});

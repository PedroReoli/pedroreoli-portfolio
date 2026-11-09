import { describe, it, expect, vi } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from '../App';
import { Header } from '../components/layout/Header';
import { HeroSection } from '../components/home/HeroSection';
import { ExperienceSection } from '../components/home/ExperienceSection';
import { LanguageProvider } from '../context/LanguageContext';
import { RouterProvider } from '../context/RouterContext';

class IntersectionObserverMock {
  root = null;
  rootMargin = '';
  thresholds = [];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn().mockReturnValue([]);
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

const contentDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../content');

describe('Challenger 2 — Adversarial A11y, Contracts & Localization Suite', () => {

  describe('1. Localization & Bilingual Parity Deep Audit', () => {
    const jsonFiles = [
      'siteContent.json',
      'interfaceContent.json',
      'homeContent.json',
      'projectsContent.json',
      'mediaContent.json',
      'technologyContent.json',
    ];

    it('validates that all content JSON files parse cleanly without syntax errors', () => {
      for (const fileName of jsonFiles) {
        const filePath = path.join(contentDir, fileName);
        expect(fs.existsSync(filePath), `File ${fileName} must exist`).toBe(true);
        const raw = fs.readFileSync(filePath, 'utf-8');
        let parsed: unknown;
        expect(() => {
          parsed = JSON.parse(raw);
        }, `File ${fileName} must be valid JSON`).not.toThrow();
        expect(parsed).toBeDefined();
      }
    });

    it('recursively checks PT and EN structural symmetry and non-emptiness across all objects', () => {
      const asymmetries: string[] = [];

      function auditBilingualParity(obj: unknown, pathTrail: string) {
        if (!obj || typeof obj !== 'object') return;

        if (Array.isArray(obj)) {
          obj.forEach((item, idx) => auditBilingualParity(item, `${pathTrail}[${idx}]`));
          return;
        }

        const record = obj as Record<string, unknown>;
        const keys = Object.keys(record);

        const hasPt = 'pt' in record;
        const hasEn = 'en' in record;

        if (hasPt && !hasEn) {
          asymmetries.push(`Missing 'en' partner at ${pathTrail} (found 'pt')`);
        } else if (hasEn && !hasPt) {
          asymmetries.push(`Missing 'pt' partner at ${pathTrail} (found 'en')`);
        } else if (hasPt && hasEn) {
          const ptVal = record.pt;
          const enVal = record.en;

          // Check if string is non-empty
          if (typeof ptVal === 'string') {
            if (!ptVal.trim()) asymmetries.push(`Empty 'pt' string at ${pathTrail}.pt`);
            if (typeof enVal !== 'string' || !enVal.trim()) asymmetries.push(`Empty or non-string 'en' at ${pathTrail}.en`);
          } else if (Array.isArray(ptVal)) {
            if (!Array.isArray(enVal)) {
              asymmetries.push(`Type mismatch at ${pathTrail}: pt is array, en is ${typeof enVal}`);
            } else {
              if (ptVal.length !== enVal.length) {
                asymmetries.push(`Array length mismatch at ${pathTrail}: pt has ${ptVal.length}, en has ${enVal.length}`);
              }
              ptVal.forEach((item, idx) => {
                if (typeof item === 'string' && !item.trim()) {
                  asymmetries.push(`Empty string in array at ${pathTrail}.pt[${idx}]`);
                }
              });
              enVal.forEach((item, idx) => {
                if (typeof item === 'string' && !item.trim()) {
                  asymmetries.push(`Empty string in array at ${pathTrail}.en[${idx}]`);
                }
              });
            }
          } else if (typeof ptVal === 'object' && ptVal !== null) {
            if (typeof enVal !== 'object' || enVal === null) {
              asymmetries.push(`Type mismatch at ${pathTrail}: pt is object, en is ${typeof enVal}`);
            } else {
              const ptKeys = Object.keys(ptVal as object).sort();
              const enKeys = Object.keys(enVal as object).sort();
              if (JSON.stringify(ptKeys) !== JSON.stringify(enKeys)) {
                asymmetries.push(`Subkey mismatch at ${pathTrail}: pt keys [${ptKeys}] vs en keys [${enKeys}]`);
              }
              auditBilingualParity(ptVal, `${pathTrail}.pt`);
              auditBilingualParity(enVal, `${pathTrail}.en`);
            }
          }
        }

        // Recurse down remaining keys
        for (const k of keys) {
          if (k !== 'pt' && k !== 'en') {
            auditBilingualParity(record[k], `${pathTrail}.${k}`);
          }
        }
      }

      for (const fileName of jsonFiles) {
        const filePath = path.join(contentDir, fileName);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        auditBilingualParity(data, fileName);
      }

      expect(asymmetries, `Found ${asymmetries.length} bilingual asymmetries:\n${asymmetries.join('\n')}`).toEqual([]);
    });
  });

  describe('2. Accessibility: Skip Link & Landmark Integrity', () => {
    it('verifies SkipLink existence, target validity, and styling attributes', () => {
      const { container } = render(
        <LanguageProvider>
          <RouterProvider>
            <App />
          </RouterProvider>
        </LanguageProvider>
      );

      const skipLink = screen.getByText('Pular para o conteúdo');
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveAttribute('href', '#main-content');

      const mainEl = container.querySelector('#main-content');
      expect(mainEl).not.toBeNull();
      expect(mainEl).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('3. Accessibility: disclosure navigation', () => {
    it('opens navigation and Escape closes it and returns focus', () => {
      render(<LanguageProvider><RouterProvider><Header /></RouterProvider></LanguageProvider>);
      const trigger = screen.getByRole('button', { name: /abrir menu/i });
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(document.getElementById('mobile-menu')).not.toHaveAttribute('hidden');
      fireEvent.keyDown(window, { key: 'Escape' });
      expect(document.getElementById('mobile-menu')).toHaveAttribute('hidden');
      expect(trigger).toHaveFocus();
    });
    it('does not lock body or make main inert for non-modal navigation', () => {
      const { container } = render(<LanguageProvider><RouterProvider><main>Reading</main><Header /></RouterProvider></LanguageProvider>);
      fireEvent.click(screen.getByRole('button', { name: /abrir menu/i }));
      expect(document.body.dataset.menuOpen).toBeUndefined();
      expect(container.querySelector('main')).not.toHaveAttribute('inert');
    });
  });

  describe('4. Accessibility: Hero Section Action Buttons & ARIA Audit', () => {
    it('validates action button roles, attributes, labels, and interaction contracts', () => {
      render(
        <LanguageProvider>
          <HeroSection />
        </LanguageProvider>
      );

      // Button 1: Download resume (without ATS)
      const downloadLink = screen.getByRole('link', { name: /baixar currículo \(pdf\)/i });
      expect(downloadLink).toBeInTheDocument();
      expect(downloadLink).toHaveAttribute('download', 'Pedro_Lucas_Reis_Curriculo.pdf');
      expect(downloadLink).toHaveAttribute('target', '_blank');
      expect(downloadLink).toHaveAttribute('rel', 'noopener noreferrer');
      expect(downloadLink).toHaveTextContent('Currículo');
      expect(downloadLink).not.toHaveTextContent(/ats/i);

      // Button 2: Projects link
      const projectsLink = screen.getByRole('link', { name: /ver projetos/i });
      expect(projectsLink).toBeInTheDocument();
      expect(projectsLink).toHaveAttribute('href', '#projetos-selecionados');
    });
  });

  describe('5. Accessibility: semantic complete timeline', () => {
    it('uses native ordered list items with heading hierarchy', () => {
      const { container } = render(<LanguageProvider><ExperienceSection /></LanguageProvider>);
      const list = container.querySelector('ol');
      expect(list).not.toBeNull();
      expect(list!.children.length).toBeGreaterThan(0);
      [...list!.children].forEach(item => {
        expect(item.tagName).toBe('LI');
        expect(item.querySelector('h3')).not.toBeNull();
        expect(item.querySelector('h4')).not.toBeNull();
        expect(item.querySelector('.timeline-card__desc')).not.toBeNull();
      });
    });
  });

  describe('6. Brand Link Singularity & Navigation Consistency', () => {
    it('guarantees exactly one active brand link per state avoiding duplicates', () => {
      render(
        <LanguageProvider>
          <RouterProvider>
            <Header />
          </RouterProvider>
        </LanguageProvider>
      );

      // On Hero state, exactly 1 brand link
      const brandLinks = screen.getAllByRole('link', { name: /ir para o início/i });
      expect(brandLinks).toHaveLength(1);
    });
  });
});

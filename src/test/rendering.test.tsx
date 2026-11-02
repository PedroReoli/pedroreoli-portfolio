import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from '../App';

describe('Application Rendering & Integration Tests', () => {
  beforeEach(() => {
    window.history.pushState(null, '', '/');
    localStorage.clear();
  });

  it('renders home page with all essential editorial sections', () => {
    render(<App />);

    // Skip Link
    expect(screen.getByText('Pular para o conteúdo')).toBeInTheDocument();

    // Brand in Header
    expect(screen.getByRole('link', { name: 'Ir para o início' })).toHaveTextContent('Pedro Reoli');

    // Hero Section
    expect(screen.getAllByText('Engenheiro de Software Full Stack')[0]).toBeInTheDocument();
    expect(screen.getByText('PEDRO')).toBeInTheDocument();

    // About Section
    expect(screen.getByText('Quem eu sou')).toBeInTheDocument();
    expect(screen.getAllByText('04')[0]).toBeInTheDocument();
    expect(screen.getByText('anos de experiência')).toBeInTheDocument();

    // Selected Projects Section
    expect(screen.getByText('Autocom3')).toBeInTheDocument();
    expect(screen.getByText('Achilles')).toBeInTheDocument();

    // Stack Section
    expect(screen.getByText('MINHA')).toBeInTheDocument();
    expect(screen.getByText('STACK.')).toBeInTheDocument();
    expect(screen.getAllByText('React')[0]).toBeInTheDocument();
    expect(screen.getAllByText('TypeScript')[0]).toBeInTheDocument();

    // Purpose Section
    expect(screen.getByText('Comunicação')).toBeInTheDocument();
    expect(screen.getByText('mais acessível.')).toBeInTheDocument();

    // Experience Section
    expect(screen.getByText('TRAJETÓRIA.')).toBeInTheDocument();
    expect(screen.getByText('Autocom3 Tecnologia')).toBeInTheDocument();

    // Footer
    expect(screen.getByText('VAMOS')).toBeInTheDocument();
    expect(screen.getByText('CONVERSAR.')).toBeInTheDocument();
  });

  it('toggles language between PT and EN smoothly', () => {
    render(<App />);

    // Initially in Portuguese
    expect(screen.getAllByText('Engenheiro de Software Full Stack')[0]).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('pt-BR');

    // Click language switch button (desktop or mobile)
    const langButtons = screen.getAllByRole('button', { name: /mudar idioma para inglês/i });
    fireEvent.click(langButtons[0]);

    // Now in English
    expect(screen.getAllByText('Full Stack Software Engineer')[0]).toBeInTheDocument();
    expect(screen.getByText('Who I am')).toBeInTheDocument();
    expect(screen.getByText('years of experience')).toBeInTheDocument();
    expect(screen.getByText('JOURNEY.')).toBeInTheDocument();
    expect(screen.getByText("LET'S")).toBeInTheDocument();
    expect(screen.getByText('TALK.')).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('en');
  });

  it('navigates to projects page and filters between corporate and independent', () => {
    window.history.pushState(null, '', '/projetos');
    render(<App />);

    expect(screen.getByText('PROJETOS')).toBeInTheDocument();
    expect(screen.getByText('AUTOCOM3')).toBeInTheDocument();

    // Click on Independent projects tab
    const indepTab = screen.getByRole('tab', { name: /independentes/i });
    fireEvent.click(indepTab);

    expect(screen.getByText('Ferramentas independentes')).toBeInTheDocument();
    expect(screen.getByText('Achilles CDP Agent')).toBeInTheDocument();
    expect(screen.getByText('Organon')).toBeInTheDocument();
  });

  it('navigates to notes & media page', () => {
    window.history.pushState(null, '', '/midia-blog');
    render(<App />);

    expect(screen.getByText('NOTAS')).toBeInTheDocument();
    expect(screen.getByText('FalaAtípica em destaque no UniFOA.')).toBeInTheDocument();
    expect(screen.getByText('Por dentro do código')).toBeInTheDocument();
  });

  it('renders 404 page for unmatched routes', () => {
    window.history.pushState(null, '', '/caminho-inexistente');
    render(<App />);

    expect(screen.getByText('FORA')).toBeInTheDocument();
    expect(screen.getByText('DE ROTA.')).toBeInTheDocument();
    expect(screen.getByText('Voltar ao início')).toBeInTheDocument();
  });

  it('resolves route aliases correctly', () => {
    window.history.pushState(null, '', '/midia-e-blog');
    render(<App />);

    expect(screen.getByText('NOTAS')).toBeInTheDocument();
    expect(window.location.pathname).toBe('/midia-blog');
  });
});

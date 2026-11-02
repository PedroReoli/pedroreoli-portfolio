# Versionamento

## Politica de versoes

### Formato
MAJOR.MINOR.PATCH

- MAJOR: Mudanca incompativel
- MINOR: Nova funcionalidade compativel
- PATCH: Correcao de bugs

### Exemplos
- 1.0.0 - Lancamento inicial
- 1.1.0 - Nova skill adicionada
- 1.1.1 - Bug corrigido
- 2.0.0 - Breaking changes

### Tags
```bash
git tag v1.0.0
git push origin v1.0.0
```

### Changelog
Atualize CHANGELOG.md a cada release.
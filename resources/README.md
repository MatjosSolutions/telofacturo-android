# Placeholders de assets (solo texto)

Este repositorio **no incluye archivos binarios**.

Archivos placeholder incluidos:

- `icon.placeholder.txt`
- `splash.placeholder.txt`

Antes de publicar, agrega localmente tus binarios reales:

- `resources/icon.png` (recomendado 1024x1024)
- `resources/splash.png` (por ejemplo 2732x2732)

Luego genera los recursos de Android con:

```bash
npx @capacitor/assets generate --android
```

# Telofacturo Android (Capacitor)

Proyecto Android con Capacitor que envuelve `https://telofacturo.com` en una WebView.

## Configuración aplicada

- `appId`: `com.telofacturo.app`
- `appName`: `Telofacturo`
- Plataforma: **solo Android**
- URL de carga: `https://telofacturo.com`
- Tráfico en texto plano desactivado (`cleartext=false` y policy Android)
- Botón físico atrás: navega en el historial del WebView antes de cerrar la app

## 1) Instalar dependencias

```bash
npm install
```

> Si actualizas plugins o assets:

```bash
npx cap sync android
```

## 2) Abrir Android Studio

```bash
npx cap open android
```

También puedes abrir directamente la carpeta `android/` desde Android Studio.

## 3) Correr en emulador

1. Abre el **Device Manager** de Android Studio y crea/inicia un emulador.
2. En Android Studio, selecciona el dispositivo virtual.
3. Ejecuta la app con **Run 'app'**.

Opcional por CLI (desde `android/`):

```bash
./gradlew assembleDebug
```

## 4) Generar AAB firmado para Play Store

1. En Android Studio: **Build > Generate Signed Bundle / APK...**
2. Elige **Android App Bundle**.
3. Crea o selecciona tu keystore de release.
4. Selecciona variante `release`.
5. Compila el bundle.
6. El archivo final quedará en:

```text
android/app/release/app-release.aab
```

Alternativa CLI:

```bash
cd android
./gradlew bundleRelease
```

> Asegúrate de configurar firma release (keystore + credenciales) en Android Studio/Gradle antes de subir a Play Store.

## Placeholders de icon y splash

Se incluyeron placeholders en:

- `resources/icon.placeholder.txt`
- `resources/splash.placeholder.txt`

Reemplázalos por tus imágenes finales y luego genera assets Android con:

```bash
npx @capacitor/assets generate --android
npx cap sync android
```

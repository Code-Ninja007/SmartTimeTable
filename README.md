# ClassSync

ClassSync keeps your weekly class schedule, subject syllabi, notes, and study suggestions in one place. It is available as a responsive web app and an Android app, with no sign-in required.

[**Download the latest Android APK**](https://github.com/Code-Ninja007/SmartTimeTable/releases/latest/download/ClassSync.apk) · [All APK releases](https://github.com/Code-Ninja007/SmartTimeTable/releases)

## Features

- Weekly timetable with a live countdown for the current class.
- Subject syllabi and notes, saved locally on your device.
- Android notifications five minutes before class and when the current period ends.
- Optional study suggestions, powered by the Gemini API.
- KIT ERP logo link and a built-in link to download the latest Android app.

Notes are stored in your browser on web and on your device on Android; they are not uploaded or synced. Android notifications require notification permission.

## Install the Android app

Download the [latest ClassSync APK](https://github.com/Code-Ninja007/SmartTimeTable/releases/latest/download/ClassSync.apk) on your Android device, open the downloaded file, and confirm installation. Android may ask you to allow installs from your browser or file manager.

## Local development

Install the web dependencies from the repository root and the API dependencies from `api/`:

```sh
npm install
npm install --prefix api
npm install --prefix mobile
```

For local AI suggestions, create `api/.env` based on `api/.env.example` and set `GEMINI_API_KEY` to a key from [Google AI Studio](https://aistudio.google.com/app/apikey). The API reads the key; it is never bundled in the web or Android app.

Start the API and web app in separate terminals:

```sh
npm run api:dev
npm run dev
```

Open [http://localhost:9002](http://localhost:9002). Set `CLASSYNC_API_URL=http://localhost:4000` in the root `.env.local` for the web app to call the local API.

### Android development / Expo Go

Copy `mobile/.env.example` to `mobile/.env` and set `EXPO_PUBLIC_API_URL` to the API address. For a physical phone, use your computer's LAN IP (for example, `http://192.168.1.25:4000`), not `localhost`. Start the API so the phone can reach it, then run:

```sh
npm run mobile
```

Scan the QR code with Expo Go. Android notes are stored locally on that device. Reminders are local notifications and require notification permission.

## Deployment

### Web on Vercel

Import the repository into Vercel with the repository root as the project root. Set `CLASSYNC_API_URL` to the public Railway API URL (without a trailing slash), then deploy. The web app remains a Next.js app.

### Gemini API on Railway

Create a Railway service from this repository and set its **Root Directory** to `/api`. Railway uses `api/railway.toml`; set `GEMINI_API_KEY` in the Railway service variables. Optionally set `GEMINI_MODEL` (defaults to `googleai/gemini-3.8-flash`) and `ALLOWED_ORIGINS` to comma-separated browser origins. Railway supplies `PORT`; `/health` is the health-check endpoint. Do not put the Gemini key in Vercel's public variables or Expo's `EXPO_PUBLIC_*` variables.

### Android APK with EAS

In the Expo dashboard, create `EXPO_PUBLIC_API_URL` for the **preview** EAS environment and set it to the public Railway API URL. Then install and authenticate with EAS CLI and configure the EAS project:

```sh
npm install --global eas-cli
cd mobile
eas login
eas build:configure
eas build --platform android --profile preview
```

The `preview` profile creates an installable APK. Expo Go is for development previews; an EAS build is needed for a standalone APK. Builds and deployments require the relevant Vercel, Railway, or Expo account access.

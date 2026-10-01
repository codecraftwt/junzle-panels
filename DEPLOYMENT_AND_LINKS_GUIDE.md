# Junzle CRM — Deployment & Demo Links Guide

This guide provides step-by-step instructions to build, host, and generate separate access links for all three Junzle surfaces: **Super Admin Panel**, **Member Portal**, and the **Mobile App (iOS TestFlight)**.

---

## 📱 1. Mobile App — iOS TestFlight Deployment

The `mobile-app` is built with React Native & Expo. An [`eas.json`](./mobile-app/eas.json) configuration has already been set up for EAS Cloud Builds.

### Steps to Build & Submit to TestFlight:

1. **Navigate to the mobile app directory**:
   ```bash
   cd mobile-app
   ```

2. **Log in to your Expo account**:
   ```bash
   npx eas login
   ```
   *(If you don't have an Expo account, create one at [expo.dev](https://expo.dev)).*

3. **Initialize the EAS Project**:
   ```bash
   npx eas project:init
   ```

4. **Build for iOS & Auto-Submit to TestFlight**:
   ```bash
   npx eas build --platform ios --profile production --auto-submit
   ```
   > **Note:**
   > - During the first run, EAS will ask for your **Apple Developer Account** credentials (the account with TestFlight access).
   > - EAS automatically generates the required Apple Distribution Certificates, Provisioning Profiles, compiles the `.ipa`, and submits it directly to App Store Connect / TestFlight.

5. **Generate the Public TestFlight Link**:
   - Go to [App Store Connect](https://appstoreconnect.apple.com).
   - Go to **My Apps** ➔ **Junzle**.
   - Click on the **TestFlight** tab at the top.
   - Under **External Groups**, click **Add Group** (e.g., `Client Beta Testers`).
   - Add your build and click **Enable Public Link**.
   - Copy the public invite link: `https://testflight.apple.com/join/XXXXXXX`

---

## 🌐 2. Web Portals — Vercel Deployment (Free & Permanent)

Both web portals are Vite + React apps and can be deployed to Vercel in 2 minutes.

### A. Super Admin Panel
1. Open [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New Project**.
2. Select your repository.
3. Set the **Root Directory** to `super-admin`.
4. Build Settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.
6. **Live URL**: `https://junzle-super-admin.vercel.app`

### B. Member Portal
1. On Vercel, click **Add New Project** again.
2. Select the same repository.
3. Set the **Root Directory** to `member-portal`.
4. Build Settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.
6. **Live URL**: `https://junzle-member-portal.vercel.app`

---

## ⚡ 3. Instant Live Share via Localtunnel (No Deployment Needed)

If you want to share working URLs immediately from your running local machine:

1. **Start all servers locally** (from root):
   ```bash
   npm run dev:all
   ```

2. **Open separate terminal tabs and generate public URLs**:
   ```bash
   # Super Admin (Port 5173)
   npx localtunnel --port 5173

   # Member Portal (Port 5174)
   npx localtunnel --port 5174

   # Mobile App Web View (Port 8081)
   npx localtunnel --port 8081
   ```

---

## 📋 4. Client Handover Template

You can copy and send this formatted message to your client/stakeholders:

```text
Hi Team,

Here are the separate demo links for all three Junzle surfaces:

1. 👑 Super Admin Panel:
   URL: https://junzle-super-admin.vercel.app
   Demo Login: Code Craft (Codecraftwt@gmail.com)

2. 🌐 Member Web Portal:
   URL: https://junzle-member-portal.vercel.app
   Features: Full web onboarding flow, Sign Up/Login, OTP verification, and Team creation.

3. 📱 Mobile App (iOS TestFlight):
   URL: https://testflight.apple.com/join/XXXXXXX
   Features: Native iOS app with smooth 60fps transitions, full authentication, and role flows.

Please let us know if you need any adjustments!
```

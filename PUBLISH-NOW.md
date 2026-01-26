# Quick Publish Guide

## ✅ Current Status
Your repository is ready and connected to GitHub!

- **Repository**: https://github.com/SayedAkbar-AI-Voice-Hub/bahderyart.git
- **Local commits**: Ready to push
- **Branch**: main

---

## 🚨 CRITICAL: Complete These Actions FIRST

### 1. Replace Placeholder Video (REQUIRED)
**File**: `constants.tsx` (line 36)

**Current**:
```tsx
videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
```

**Action**:
1. Upload your actual behind-the-scenes video to YouTube
2. Get the embed URL (share → embed → copy URL)
3. Replace the URL in constants.tsx
4. Commit: `git add constants.tsx && git commit -m "Update making-of video URL"`

### 2. Verify Email Address
- Confirm `contact@bahaderyart.com` is active and monitored
- Set up auto-responder if needed

### 3. Upload Your Artwork Images
1. When you open the website locally (after installing Node.js)
2. Press **`Control + Option + A`** (Mac) or **`Ctrl + Alt + A`** (Windows) to open the admin panel
3. Upload all 21 artwork images
4. Upload portrait photo for About page
5. Upload feature image for Contact page

---

## 📤 How to Push to GitHub

Once the above actions are complete, run:

```bash
cd /Users/r3spect/Desktop/bahadery-art-portfolio
git push -u origin main
```

**Note**: You may be asked to authenticate with GitHub. Use your GitHub username and personal access token (not password).

---

## 🌐 Enable GitHub Pages (Optional but Recommended)

After pushing to GitHub:

1. Go to: https://github.com/SayedAkbar-AI-Voice-Hub/bahderyart/settings/pages
2. Under "Source", select: **Deploy from a branch**
3. Select branch: **main**
4. Click **Save**

Your site will be live at:
```
https://sayedakbar-ai-voice-hub.github.io/bahderyart/
```

---

## 💻 Testing Locally (Requires Node.js)

To test before publishing:

```bash
# Install Node.js first (download from nodejs.org)

# Then install dependencies
npm install

# Run development server
npm run dev
```

Open the URL shown (usually http://localhost:5173)

---

## 📋 Optional: Set Git Author Info

For proper commit attribution:

```bash
git config user.name "Nangialai Bahadery"
git config user.email "contact@bahaderyart.com"
```

---

## 🆘 If You Need Help

- Can't push to GitHub? Make sure you have push access to the repository
- Need a Personal Access Token? Go to GitHub Settings → Developer Settings → Personal Access Tokens
- Website not working? Check the browser console (F12) for errors

---

**Ready to publish?** Complete the 3 actions above, then run `git push -u origin main`!

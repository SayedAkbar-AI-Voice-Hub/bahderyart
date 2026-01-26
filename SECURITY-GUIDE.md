# 🔒 Portfolio Manager Security Guide

## Overview
The Portfolio Manager is now **password-protected** and **hidden from public visitors**. Only you can access it using a secret keyboard combination and password.

---

## 🔑 How to Access Admin Panel

### Step 1: Open the Secret Admin Panel
Regular visitors **cannot see** the "Website Setup" button anymore. To access it:

**Press:** `Ctrl + Shift + A` (Windows/Linux) or `Cmd + Shift + A` (Mac)

This will open the admin login screen.

### Step 2: Enter Your Password
**Default Password:** `bahadery2026`

Enter the password and click "Access Manager" to get into the Portfolio Manager.

---

## 🔐 Security Features

### ✅ What's Protected:
1. **Hidden Access** - No visible button for regular visitors
2. **Password Authentication** - Required to access manager
3. **Session Management** - Stays logged in until browser closes
4. **Logout Button** - Securely end your admin session

### 🔒 How It Works:
- **Keyboard Shortcut**: `Ctrl/Cmd + Shift + A` opens the login
- **Password Hashing**: Your password is hashed for basic security
- **Session Storage**: Authentication expires when browser closes
- **No Database Needed**: Works entirely client-side

---

## 🛡️ Change Your Password (IMPORTANT!)

**⚠️ You MUST change the default password after your first login!**

### How to Change Password:

1. Open `components/ImageManager.tsx` in your code editor
2. Find line **17** (the ADMIN_PASSWORD_HASH line)
3. Replace `"bahadery2026"` with your new password:

**Before:**
```typescript
const ADMIN_PASSWORD_HASH = hashPassword("bahadery2026");
```

**After (example):**
```typescript
const ADMIN_PASSWORD_HASH = hashPassword("MySecurePassword2026!");
```

4. Save the file
5. Commit and push to GitHub:
```bash
git add components/ImageManager.tsx
git commit -m "Update admin password"
git push origin main
```

---

## 📱 Quick Access Reference

| Action | Keyboard Shortcut |
|--------|------------------|
| Open Admin Panel | `Ctrl + Shift + A` (Windows/Linux)<br>`Cmd + Shift + A` (Mac) |
| Login | Enter password + press "Access Manager" |
| Logout | Click "🔒 Logout" button in manager |
| Save & Close | Click "Save & Exit" button |

---

## 🚨 Security Notes

### ⚠️ Client-Side Limitations:
- This is **client-side security** (runs in the browser)
- The password is visible in the source code (but hashed)
- **NOT suitable** for highly sensitive data
- **Good enough** for portfolio management and preventing casual access

### ✅ Best Practices:
1. **Change the default password immediately**
2. **Use a strong password** (mix of letters, numbers, symbols)
3. **Don't share your password**
4. **Always logout** when done (especially on public computers)
5. **Keep your GitHub repository private** for extra security (optional)

---

## 🔓 Forgot Your Password?

If you forget your password:

1. Open `components/ImageManager.tsx`
2. Find line 17
3. Change the password to a new one (see instructions above)
4. Commit and push the changes
5. Use your new password to login

---

## 🎯 Manager Features (After Login)

### Manage Artworks Tab:
- ➕ Add new artwork
- ✏️ Edit titles, categories, years
- 💰 Set prices and availability
- 🗑️ Delete artworks
- 📸 Upload artwork images
- 🏪 Mark items for store

### Site Content Tab:
- 📷 Upload portrait for About page
- 🖼️ Upload feature image for Contact page

### Data Management:
- 💾 All data auto-saves to browser storage
- 🔄 Click "Save & Exit" to apply changes
- ⚠️ "Reset All" button to clear everything (use carefully!)

---

## 🆘 Troubleshooting

### Problem: Can't access admin panel
**Solution**: Make sure you're pressing the correct key combination:
- Windows/Linux: `Ctrl + Shift + A`
- Mac: `Cmd + Shift + A` (⌘ + ⇧ + A)

### Problem: Password not working
**Solutions**:
1. Check if you changed the password in code
2. Make sure you're using the correct password
3. Try clearing browser cache and reloading
4. Check for typos in the password field

### Problem: Changes not saving
**Solution**: 
1. Make sure to click "Save & Exit" before closing
2. Check browser console (F12) for errors
3. Try refreshing the page and logging in again

### Problem: Visitors can see the button
**Solution**: This shouldn't happen - the button is completely hidden. If visitors report seeing it, check that you've pushed the latest code to GitHub.

---

## 📊 Default Settings

| Setting | Value |
|---------|-------|
| Default Password | `bahadery2026` |
| Keyboard Shortcut | `Ctrl/Cmd + Shift + A` |
| Session Duration | Until browser closes |
| Authentication Method | Password hash comparison |
| Storage Location | sessionStorage (browser) |

---

## ✅ Security Checklist

Before publishing your site, make sure:

- [ ] Changed default password to something secure
- [ ] Tested login with new password
- [ ] Confirmed visitors cannot see admin access
- [ ] Tested keyboard shortcut on your device
- [ ] Practiced logging in and out
- [ ] Know how to change password if needed
- [ ] Committed password change to GitHub

---

## 💡 Pro Tips

1. **Remember the Shortcut**: Write down `Ctrl/Cmd + Shift + A` somewhere safe
2. **Use Strong Passwords**: Combine uppercase, lowercase, numbers, and symbols
3. **Test Before Publishing**: Always test the login before pushing to production
4. **Keep Code Backup**: Save a copy of your password in a secure password manager
5. **Logout When Done**: Always click "Logout" to end your session securely

---

**Created**: January 26, 2026  
**Last Updated**: January 26, 2026  
**Version**: 2.0.0 (Password Protected)

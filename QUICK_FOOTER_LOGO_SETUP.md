# Quick Start: Footer Logo Setup

## 🚀 5-Minute Setup Guide

### Step 1: Prepare Your Logo

**You Need:**
- 2 versions of your logo (or just 1)

**Option A: Two Logos (Recommended)**
```
1. Regular Logo:  logo.png      (any color)
2. White Logo:    logo-white.png (for dark footer)
```

**Option B: One Logo Only**
```
Just upload one logo - it will work automatically!
```

**Recommended Dimensions:**
- Width: 180-240px
- Height: 60-80px
- Ratio: 3:1 (landscape)
- Format: PNG (transparent background best)

---

### Step 2: Upload Logo

1. **Login to Admin Panel**
   ```
   URL: http://localhost:3000/admin
   or: https://yourdomain.com/admin
   ```

2. **Go to Settings**
   ```
   Admin Panel → Settings → General Tab
   ```

3. **Find Logo Settings**
   ```
   Look for:
   • Site Logo
   • Site Logo Dark
   ```

4. **Upload Files**
   ```
   Site Logo:      Click "Choose File" → Select logo.png
   Site Logo Dark: Click "Choose File" → Select logo-white.png
   ```

5. **Save**
   ```
   Click "Save Settings" button at bottom
   ```

---

### Step 3: Verify

1. **Refresh Website**
   ```
   Go to homepage
   Press Ctrl+F5 (hard refresh)
   ```

2. **Scroll to Footer**
   ```
   Look at top-left of footer
   Your logo should appear!
   ```

3. **Check Mobile**
   ```
   Press F12 → Toggle device toolbar
   View on different screen sizes
   ```

---

## 🎨 Logo Examples

### Good Logo Sizes
```
✅ 180 x 60px   (Perfect - 3:1 ratio)
✅ 200 x 66px   (Good)
✅ 240 x 80px   (Also good)
✅ 300 x 100px  (Max recommended)
```

### Bad Logo Sizes
```
❌ 500 x 500px  (Too square - will look huge)
❌ 100 x 100px  (Square - wrong ratio)
❌ 1000 x 200px (Too wide - will overflow)
❌ 50 x 50px    (Too small - will pixelate)
```

---

## 🔧 If Logo Doesn't Show

### Problem 1: Logo Not Appearing

**Check:**
1. Did you upload to correct field?
   - Use "Site Logo Dark" for footer (preferred)
   - Or "Site Logo" as fallback

2. Did you save settings?
   - Click "Save Settings" button

3. Is file path correct?
   ```
   Should be: /uploads/general/your-logo.png
   Not: C:\Users\...\logo.png
   ```

4. Hard refresh browser
   ```
   Windows: Ctrl + F5
   Mac: Cmd + Shift + R
   ```

---

### Problem 2: Logo Wrong Color

**Issue:** Dark logo on dark footer (invisible!)

**Fix:**
```
Option 1: Upload white version to "Site Logo Dark"
Option 2: The footer auto-applies white filter (brightness-0 invert)
```

**Test:**
- If logo is dark: Use "Site Logo Dark" with white version
- If logo is light: Regular logo works fine

---

### Problem 3: Logo Too Big/Small

**Adjust in code:**

```tsx
// In Footer.tsx, find:
<Image
  width={180}      // Change this
  height={60}      // And this
  className="h-12" // Or adjust display height
/>
```

**Quick size adjustments:**
```tsx
Small:   className="h-10"  (40px)
Medium:  className="h-12"  (48px) ← Current
Large:   className="h-14"  (56px)
XLarge:  className="h-16"  (64px)
```

---

### Problem 4: Logo Blurry

**Cause:** Image too small, scaled up

**Fix:**
1. Use higher resolution image
2. Minimum: 180x60px
3. Recommended: 240x80px or larger
4. Use PNG or SVG format

---

## 📱 Mobile Considerations

### Logo on Mobile Footer

**Current behavior:**
- Logo scales down automatically
- Height: `h-12` (48px) on mobile
- Height: `h-14` (56px) on desktop

**To change mobile size only:**
```tsx
className="h-10 sm:h-12"
           ↑       ↑
         mobile  desktop
```

---

## 🎨 Logo Styling Options

### Make Logo Brighter
```tsx
// Remove white filter:
className="h-12" // Remove: brightness-0 invert

// Result: Shows original logo colors
```

### Add Logo Background
```tsx
<div className="bg-white p-2 rounded-lg inline-block">
  <Image src={...} className="h-12" />
</div>

// Result: Logo on white background
```

### Add Logo Shadow
```tsx
<Image
  className="h-12 drop-shadow-lg"
  //              ↑ Adds shadow
/>
```

---

## ✅ Final Checklist

Before going live:

- [ ] Logo uploaded to Admin Panel
- [ ] Logo displays in footer
- [ ] Logo is readable (white on dark background)
- [ ] Logo size looks good (not too big/small)
- [ ] Logo not pixelated or blurry
- [ ] Logo works on mobile
- [ ] Logo works on tablet
- [ ] Logo works on desktop
- [ ] Hard refresh tested (Ctrl+F5)
- [ ] All browsers tested (Chrome, Firefox, Safari)

---

## 🆘 Still Not Working?

### Check Browser Console

1. Press F12
2. Go to "Console" tab
3. Look for errors like:
   ```
   Failed to load resource: 404 (Not Found)
   /uploads/logo.png
   ```

4. If 404 error:
   - Logo file doesn't exist at that path
   - Re-upload logo in admin panel

### Check Network Tab

1. Press F12
2. Go to "Network" tab
3. Refresh page (F5)
4. Search for your logo filename
5. Click on it to see details:
   - Status: Should be 200 (OK)
   - If 404: File not found
   - If 403: Permission denied

---

## 📞 Need Help?

**Common Issues:**

| Issue | Solution |
|-------|----------|
| Logo not showing | Upload to "Site Logo Dark" field |
| Logo too dark | Upload white version |
| Logo too big | Change `h-12` to `h-10` |
| Logo blurry | Use higher resolution (min 180x60) |
| Logo wrong shape | Use 3:1 ratio (landscape) |
| 404 error | Re-upload logo in admin |

---

## 🎉 Success!

Your footer now has:
- ✅ Professional logo
- ✅ Dynamic from settings
- ✅ Automatic white filter
- ✅ Responsive sizing
- ✅ Fallback to company name

**Looks amazing!** 🚀

---

**Next Steps:**
1. Upload logo ✅
2. Add social media links (Settings → Social Media)
3. Customize services list (if needed)
4. Enjoy your professional footer!

---

*Documentation by Zwicky Technology*

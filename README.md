# 🎉 Happy Birthday Pratikhya Sahoo — Website Guide

## 📁 Folder Structure

```
Birthday websitw/
├── index.html          ← Main website file (open this in browser)
├── style.css           ← All styles & animations
├── script.js           ← All interactive JavaScript
├── photos/             ← PUT YOUR PHOTOS HERE (see below)
│   └── photo1.jpg      ← Named photo1.jpg through photo30.jpg
├── videos/             ← PUT YOUR VIDEOS HERE (optional)
│   └── video1.mp4
└── README.md           ← This guide
```

---

## 📸 How to Add Your Photos

1. Create a folder named `photos` inside this folder (if not already created).
2. Add your photos named **`photo1.jpg`** through **`photo30.jpg`**.
3. That's it! The gallery will automatically show them with beautiful hover effects.

> **Tip:** If a photo file is missing, it shows a styled placeholder with a 📸 icon automatically.

To change photo labels/categories, edit the `GALLERY_PHOTOS` array in `script.js`.

---

## 🎬 How to Add Your Videos

1. Create a folder named `videos` inside this folder.
2. Add your videos named `video1.mp4` through `video5.mp4`.
3. Open `index.html` and find each video card section.
4. Uncomment the `<video>` tag and update the `src` attribute:
   ```html
   <video controls poster="thumbnails/v1.jpg">
     <source src="videos/video1.mp4" type="video/mp4" />
   </video>
   ```

---

## 🎵 How to Add Background Music

1. Add your Hindi friendship/birthday song (MP3 format) to the project folder.
2. Open `index.html` and find the `<audio>` tag.
3. Replace `src` with your song file path:
   ```html
   <source src="your-song.mp3" type="audio/mpeg" />
   ```

> **Recommended songs:** Yaarana, Dost, Teri Yaari, Happy Birthday Aayega — any friendship Hindi song works beautifully!

---

## 🌐 How to Open the Website

Simply **double-click `index.html`** to open it in your browser.

For the best experience, use **Google Chrome** or **Microsoft Edge**.

---

## ✨ Features Summary

| Feature | Status |
|---------|--------|
| Animated hero welcome text | ✅ Ready |
| Floating balloons & emojis | ✅ Ready |
| Confetti on page load | ✅ Ready |
| Photo gallery with lightbox | ✅ Ready (add photos) |
| Gallery filter tabs | ✅ Ready |
| Video gallery | ✅ Ready (add videos) |
| Heartfelt message section | ✅ Ready |
| Friendship timeline | ✅ Ready |
| Surprise button with confetti | ✅ Ready |
| Background music player | ✅ Ready (add song) |
| Scroll animations | ✅ Ready |
| Mobile responsive | ✅ Ready |
| Navbar with smooth scroll | ✅ Ready |

---

Made with 💛 | Happy Birthday Pratikhya Sahoo — 10th May 🎉
"# NiniBD" 

 
diff --git a/script.js b/script.js
index 97e35981d80d93a0a34beda377d11e22704031a7..1d414e00c6a4ddd100de4ed76f639f1657760846 100644
--- a/script.js
+++ b/script.js
@@ -1,35 +1,76 @@
-const text = "Hi, I'm Mansi Jain";
-let index = 0;
-
-function typeEffect() {
-if (index < text.length) {
-document.querySelector(".typing").innerHTML += text.charAt(index);
-index++;
-setTimeout(typeEffect, 80);
-}
-}
-typeEffect();
-
-window.addEventListener("scroll", () => {
-document.querySelectorAll(".reveal").forEach(el => {
-const windowHeight = window.innerHeight;
-const revealTop = el.getBoundingClientRect().top;
-if (revealTop < windowHeight - 100) {
-el.classList.add("active");
+const menuToggle = document.querySelector('.menu-toggle');
+const navLinks = document.querySelector('.nav-links');
+const navItems = document.querySelectorAll('.nav-link');
+const sections = document.querySelectorAll('main section[id]');
+const revealElements = document.querySelectorAll('.reveal');
+const cursorGlow = document.querySelector('.cursor-glow');
+const heroBg = document.querySelector('.hero-bg');
+
+if (menuToggle && navLinks) {
+  menuToggle.addEventListener('click', () => {
+    const isOpen = navLinks.classList.toggle('open');
+    menuToggle.setAttribute('aria-expanded', String(isOpen));
+  });
+
+  navItems.forEach((link) => {
+    link.addEventListener('click', () => {
+      navLinks.classList.remove('open');
+      menuToggle.setAttribute('aria-expanded', 'false');
+    });
+  });
 }
-});
-});
-window.addEventListener("load", () => {
-    document.body.style.overflow = "hidden";
 
-    setTimeout(() => {
-        document.getElementById("intro").style.opacity = "0";
-        document.getElementById("intro").style.transition = "1s ease";
+const sectionObserver = new IntersectionObserver(
+  (entries) => {
+    entries.forEach((entry) => {
+      if (entry.isIntersecting) {
+        entry.target.classList.add('in-view');
+      }
+    });
+  },
+  {
+    threshold: 0.2,
+  }
+);
 
-        setTimeout(() => {
-            document.getElementById("intro").style.display = "none";
-            document.body.style.overflow = "auto";
-        }, 1000);
+revealElements.forEach((el) => sectionObserver.observe(el));
 
-    }, 3500); // duration of intro
+const updateActiveLink = () => {
+  let current = 'home';
+
+  sections.forEach((section) => {
+    const rect = section.getBoundingClientRect();
+    if (rect.top <= 160 && rect.bottom >= 160) {
+      current = section.id;
+    }
+  });
+
+  navItems.forEach((link) => {
+    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
+  });
+};
+
+window.addEventListener('scroll', updateActiveLink, { passive: true });
+updateActiveLink();
+
+window.addEventListener('pointermove', (event) => {
+  if (!cursorGlow) return;
+  const x = event.clientX;
+  const y = event.clientY;
+  cursorGlow.animate(
+    {
+      left: `${x}px`,
+      top: `${y}px`,
+    },
+    {
+      duration: 240,
+      fill: 'forwards',
+    }
+  );
 });
+
+window.addEventListener('scroll', () => {
+  if (!heroBg) return;
+  const offset = window.scrollY * 0.08;
+  heroBg.style.transform = `translateY(${offset}px)`;
+}, { passive: true });
diff --git a/style.css b/style.css
index 4ab9f7b734e7bfa98775e5c1b5b0655631f64763..86f41eafae26ad285dec7f923931b92fbb4942a4 100644
--- a/style.css
+++ b/style.css
@@ -1,253 +1,561 @@

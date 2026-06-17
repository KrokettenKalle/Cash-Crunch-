document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. WARENKORB-BADGE LOGIK
    // ==========================================
    let cartCounter = 0;
    const cartBtn = document.getElementById('cart-btn');
    const cartBadge = document.getElementById('cart-badge');

    if (cartBtn && cartBadge) {
        cartBtn.addEventListener('click', () => {
            // Zähler um 1 erhöhen
            cartCounter++; 
            cartBadge.textContent = cartCounter; 

            // Beim ersten Klick das Icon überhaupt erst einblenden
            if (cartCounter === 1) {
                cartBadge.style.display = 'block';
            }
            
            // Kleiner "Pop"-Effekt fürs Auge bei jedem Klick
            cartBadge.style.transform = "scale(1.3)";
            setTimeout(() => {
                cartBadge.style.transform = "scale(1)";
            }, 150);
            
            alert('Produkt wurde in deinen virtuellen Warenkorb gelegt!');
        });
    }


    // ==========================================
    // 2. KARUSSELL-STEUERUNG
    // ==========================================
    const slides = document.querySelectorAll('.detail-image-box .carousel-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    const totalSlides = slides.length;

    if (totalSlides > 0) {
        function updateCarousel(index) {
            if (index >= totalSlides) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = totalSlides - 1;
            } else {
                currentIndex = index;
            }

            // Bilder umschalten
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === currentIndex);
            });

            // Dots umschalten
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => updateCarousel(currentIndex + 1));
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => updateCarousel(currentIndex - 1));
        }

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => updateCarousel(i));
        });

       // ==========================================
        // 2.1 SWIPE-FUNKTION FÜR DAS KARUSSELL (MOBIL & MAUS-TEST)
        // ==========================================
        const imageBox = document.querySelector(".detail-image-box");
        
        if (imageBox) {
            let touchStartX = 0;
            let touchEndX = 0;
            const swipeThreshold = 50; 

            // --- 1. Echte Touch-Events für Smartphones ---
            imageBox.addEventListener("touchstart", (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            imageBox.addEventListener("touchend", (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });

            // --- 2. Maus-Events für den Test am Mac/Desktop ---
            imageBox.addEventListener("mousedown", (e) => {
                touchStartX = e.screenX;
            });

            imageBox.addEventListener("mouseup", (e) => {
                touchEndX = e.screenX;
                handleSwipe();
            });

            // Wischrichtung auswerten (gilt für Maus und Touch)
            function handleSwipe() {
                const swipeDistance = touchEndX - touchStartX;

                if (Math.abs(swipeDistance) > swipeThreshold) {
                    if (swipeDistance < 0) {
                        // Nach links gewischt/gezogen -> Nächstes Bild
                        updateCarousel(currentIndex + 1);
                    } else {
                        // Nach rechts gewischt/gezogen -> Vorheriges Bild
                        updateCarousel(currentIndex - 1);
                    }
                }
            }
        }
    }

    // ==========================================
    // 3. VIDEO PLAY/PAUSE STEUERUNG
    // ==========================================
    const video = document.getElementById('hero-video');
    const videoBtn = document.getElementById('video-toggle-btn');

    if (video && videoBtn) {
        videoBtn.addEventListener('click', () => {
            const icon = videoBtn.querySelector('i');
            
            if (video.paused) {
                video.play();
                // Icon wieder zu "Pause" wechseln
                icon.className = 'fa-solid fa-pause';
                videoBtn.setAttribute('aria-label', 'Video pausieren');
            } else {
                video.pause();
                // Icon zu "Play" wechseln
                icon.className = 'fa-solid fa-play';
                videoBtn.setAttribute('aria-label', 'Video abspielen');
            }
        });
    }

    // ==========================================
    // 4. MOBILE BURGER-MENÜ STEUERUNG
    // ==========================================
    const burgerBtn = document.getElementById("burgerMenuBtn");
    const mobileOverlay = document.getElementById("mobileMenuOverlay");

    if (burgerBtn && mobileOverlay) {
        burgerBtn.addEventListener("click", () => {
            // Toggelt das Sichtbar-Sliden des Menüs (CSS: .is-active)
            mobileOverlay.classList.toggle("is-active");
            // Toggelt die Hamburger-Striche zum "X"
            burgerBtn.classList.toggle("is-active");
            
            // Verhindert das Scrollen der Website im Hintergrund bei offenem Menü
            if (mobileOverlay.classList.contains("is-active")) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
        });

        // Schließt das Menü automatisch, wenn ein Navigationslink im Menü geklickt wird
        const mobileLinks = mobileOverlay.querySelectorAll(".mobile-nav-links a");
        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileOverlay.classList.remove("is-active");
                burgerBtn.classList.remove("is-active");
                document.body.style.overflow = "";
            });
        });
    }
});
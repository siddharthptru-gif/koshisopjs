/* ═══════════════════════════════════════════════════════════════
   O P JINDAL SCHOOL — V2 Premium Interactive Experience
   ═══════════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    // ─── Preloader ───
    var preloader = document.getElementById('preloader');
    window.addEventListener('load', function () {
        document.body.classList.remove('loading');
        setTimeout(function () {
            if (preloader) preloader.classList.add('hidden');
        }, 2200);
    });
    document.body.classList.add('loading');

    // ─── Scroll Progress Bar ───
    var scrollProgress = document.getElementById('scrollProgress');
    function updateScrollProgress() {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0 && scrollProgress) {
            var progress = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = progress + '%';
        }
    }

    // ─── Announcement Bar ───
    var announcementBar = document.getElementById('announcementBar');
    var annClose = document.getElementById('annClose');
    if (announcementBar) {
        if (localStorage.getItem('opj_ann_dismissed') === 'true') {
            announcementBar.style.display = 'none';
        } else {
            announcementBar.style.display = '';
        }
    }
    if (annClose) {
        annClose.addEventListener('click', function () {
            announcementBar.classList.add('dismissed');
            localStorage.setItem('opj_ann_dismissed', 'true');
            setTimeout(function () {
                announcementBar.style.display = 'none';
            }, 400);
        });
    }

    // ─── Cookie Consent ───
    var cookieConsent = document.getElementById('cookieConsent');
    var cookieAccept = document.getElementById('cookieAccept');
    var cookieDecline = document.getElementById('cookieDecline');

    if (cookieConsent) {
        if (localStorage.getItem('opj_cookie_consent')) {
            cookieConsent.style.display = 'none';
        } else {
            setTimeout(function () {
                cookieConsent.classList.add('visible');
            }, 3000);
        }
    }
    if (cookieAccept) {
        cookieAccept.addEventListener('click', function () {
            localStorage.setItem('opj_cookie_consent', 'accepted');
            cookieConsent.classList.remove('visible');
            setTimeout(function () { cookieConsent.style.display = 'none'; }, 500);
        });
    }
    if (cookieDecline) {
        cookieDecline.addEventListener('click', function () {
            localStorage.setItem('opj_cookie_consent', 'declined');
            cookieConsent.classList.remove('visible');
            setTimeout(function () { cookieConsent.style.display = 'none'; }, 500);
        });
    }

    // ─── Custom Cursor ───
    var cursorDot = document.getElementById('cursorDot');
    var cursorRing = document.getElementById('cursorRing');

    if (window.matchMedia('(pointer: fine)').matches && cursorDot && cursorRing) {
        var mouseX = 0, mouseY = 0;
        var ringX = 0, ringY = 0;

        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animateRing() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        var interactiveEls = document.querySelectorAll('a, button, input, textarea, select, .campus-tab, .gallery-item, .faq-question, .download-card, .club-card');
        interactiveEls.forEach(function (el) {
            el.addEventListener('mouseenter', function () { cursorRing.classList.add('hover'); });
            el.addEventListener('mouseleave', function () { cursorRing.classList.remove('hover'); });
        });
    }

    // ─── Header Scroll Effect ───
    var header = document.getElementById('mainHeader');
    var backToTop = document.getElementById('backToTop');

    function handleScroll() {
        var scrollY = window.scrollY;

        if (header) {
            if (scrollY > 80) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        if (backToTop) {
            if (scrollY > 600) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }

        updateScrollProgress();
    }

    window.addEventListener('scroll', handleScroll);

    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ─── Active Nav Link Tracking ───
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        var scrollPos = window.scrollY + 200;
        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ─── Smooth Scroll for Anchor Links ───
    var mobileMenu = document.getElementById('mobileMenu');
    var mobileToggle = document.getElementById('mobileToggle');

    function closeMobileMenu() {
        if (mobileToggle) mobileToggle.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var headerOffset = 80;
                var elementPosition = target.getBoundingClientRect().top;
                var offsetPosition = elementPosition + window.scrollY - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
            }
        });
    });

    // ─── Mobile Menu ───
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            if (mobileMenu) {
                mobileMenu.classList.toggle('active');
                document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            }
        });
    }

    document.querySelectorAll('.mobile-nav-link').forEach(function (link) {
        link.addEventListener('click', closeMobileMenu);
    });

    // ─── Reveal on Scroll (Intersection Observer) ───
    var revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

    // ─── Counter Animation ───
    function animateCounter(element) {
        var target = parseInt(element.getAttribute('data-count'), 10);
        if (isNaN(target)) return;
        var duration = 2000;
        var startTime = null;

        function easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
        }

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var elapsed = timestamp - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var current = Math.floor(easeOutQuart(progress) * target);
            element.textContent = current.toLocaleString();
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = target.toLocaleString();
            }
        }

        requestAnimationFrame(step);
    }

    var counterElements = document.querySelectorAll('[data-count]');
    var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(function (el) {
        counterObserver.observe(el);
    });

    // ─── Hero Particles ───
    var particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        for (var i = 0; i < 40; i++) {
            var particle = document.createElement('div');
            particle.classList.add('hero-particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (5 + Math.random() * 8) + 's';
            var size = 2 + Math.random() * 4;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.opacity = (0.15 + Math.random() * 0.45).toString();
            particlesContainer.appendChild(particle);
        }
    }

    // ─── Typewriter Effect ───
    var typewriterEl = document.getElementById('typewriterText');
    if (typewriterEl) {
        var typewriterWords = ['Leaders', 'Innovators', 'Achievers', 'Champions', 'Visionaries'];
        var twIndex = 0;
        var twCharIndex = 0;
        var twIsDeleting = false;
        var twDelay = 100;

        function typewrite() {
            var currentWord = typewriterWords[twIndex];

            if (twIsDeleting) {
                twCharIndex--;
                typewriterEl.textContent = currentWord.substring(0, twCharIndex);
                twDelay = 50;
            } else {
                twCharIndex++;
                typewriterEl.textContent = currentWord.substring(0, twCharIndex);
                twDelay = 120;
            }

            if (!twIsDeleting && twCharIndex === currentWord.length) {
                twDelay = 2000;
                twIsDeleting = true;
            } else if (twIsDeleting && twCharIndex === 0) {
                twIsDeleting = false;
                twIndex = (twIndex + 1) % typewriterWords.length;
                twDelay = 400;
            }

            setTimeout(typewrite, twDelay);
        }

        setTimeout(typewrite, 1500);
    }

    // ─── Search Overlay ───
    var searchToggle = document.getElementById('searchToggle');
    var searchOverlay = document.getElementById('searchOverlay');
    var searchClose = document.getElementById('searchClose');
    var searchInput = document.getElementById('searchInput');

    function openSearch() {
        if (searchOverlay) {
            searchOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            setTimeout(function () {
                if (searchInput) searchInput.focus();
            }, 400);
        }
    }

    function closeSearch() {
        if (searchOverlay) {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
            if (searchInput) searchInput.value = '';
        }
    }

    if (searchToggle) searchToggle.addEventListener('click', openSearch);
    if (searchClose) searchClose.addEventListener('click', closeSearch);
    if (searchOverlay) {
        searchOverlay.addEventListener('click', function (e) {
            if (e.target === searchOverlay) closeSearch();
        });
    }

    // Search quick links close the overlay
    if (searchOverlay) {
        searchOverlay.querySelectorAll('.search-quick-links a').forEach(function (link) {
            link.addEventListener('click', closeSearch);
        });
    }

    // ─── Video Modal ───
    var videoTourBtn = document.getElementById('videoTourBtn');
    var videoModal = document.getElementById('videoModal');
    var videoModalClose = document.getElementById('videoModalClose');
    var videoModalCloseBtn = document.getElementById('videoModalCloseBtn');

    function openVideoModal() {
        if (videoModal) {
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeVideoModal() {
        if (videoModal) {
            videoModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (videoTourBtn) videoTourBtn.addEventListener('click', openVideoModal);
    if (videoModalClose) videoModalClose.addEventListener('click', closeVideoModal);
    if (videoModalCloseBtn) videoModalCloseBtn.addEventListener('click', closeVideoModal);

    // ─── Campus Tabs ───
    var campusTabs = document.querySelectorAll('.campus-tab');
    var campusPanels = document.querySelectorAll('.campus-panel');

    campusTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var targetTab = this.getAttribute('data-tab');

            campusTabs.forEach(function (t) { t.classList.remove('active'); });
            campusPanels.forEach(function (p) {
                p.classList.remove('active');
                p.style.opacity = '0';
            });

            this.classList.add('active');
            var targetPanel = document.getElementById('panel-' + targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
                setTimeout(function () {
                    targetPanel.style.opacity = '1';
                }, 50);
            }
        });
    });

    // Initialize first panel opacity
    var firstPanel = document.querySelector('.campus-panel.active');
    if (firstPanel) firstPanel.style.opacity = '1';

    // ─── FAQ Accordion ───
    var faqList = document.getElementById('faqList');
    if (faqList) {
        var faqItems = faqList.querySelectorAll('.faq-item');
        faqItems.forEach(function (item) {
            var question = item.querySelector('.faq-question');
            var answer = item.querySelector('.faq-answer');

            if (question && answer) {
                question.addEventListener('click', function () {
                    var isOpen = item.classList.contains('active');

                    // Close all others
                    faqItems.forEach(function (other) {
                        if (other !== item) {
                            other.classList.remove('active');
                            var otherAnswer = other.querySelector('.faq-answer');
                            if (otherAnswer) otherAnswer.style.maxHeight = '0';
                        }
                    });

                    if (isOpen) {
                        item.classList.remove('active');
                        answer.style.maxHeight = '0';
                    } else {
                        item.classList.add('active');
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    }
                });
            }
        });
    }

    // ─── Gallery Filters ───
    var galleryFilters = document.querySelectorAll('.gallery-filter');
    var galleryItems = document.querySelectorAll('.gallery-item');

    galleryFilters.forEach(function (filter) {
        filter.addEventListener('click', function () {
            var category = this.getAttribute('data-filter');

            galleryFilters.forEach(function (f) { f.classList.remove('active'); });
            this.classList.add('active');

            galleryItems.forEach(function (item) {
                var itemCategory = item.getAttribute('data-category');
                if (category === 'all' || itemCategory === category) {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    item.style.display = '';
                    setTimeout(function () {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(function () {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ─── Gallery Lightbox ───
    var lightbox = document.getElementById('lightbox');
    var lightboxClose = document.getElementById('lightboxClose');
    var lightboxPrev = document.getElementById('lightboxPrev');
    var lightboxNext = document.getElementById('lightboxNext');
    var lightboxImage = document.getElementById('lightboxImage');
    var lightboxCaption = document.getElementById('lightboxCaption');
    var lightboxCounter = document.getElementById('lightboxCounter');
    var lightboxCurrentIndex = 0;
    var lightboxVisibleItems = [];

    function getVisibleGalleryItems() {
        var items = [];
        galleryItems.forEach(function (item) {
            if (item.style.display !== 'none') {
                items.push(item);
            }
        });
        return items;
    }

    function openLightbox(index) {
        lightboxVisibleItems = getVisibleGalleryItems();
        if (index < 0 || index >= lightboxVisibleItems.length) return;
        lightboxCurrentIndex = index;
        updateLightboxContent();
        if (lightbox) {
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function updateLightboxContent() {
        var item = lightboxVisibleItems[lightboxCurrentIndex];
        if (!item) return;
        var bg = item.getAttribute('style') || '';
        var title = item.getAttribute('data-title') || '';

        if (lightboxImage) {
            lightboxImage.style.cssText = bg;
        }
        if (lightboxCaption) {
            lightboxCaption.textContent = title;
        }
        if (lightboxCounter) {
            lightboxCounter.textContent = (lightboxCurrentIndex + 1) + ' / ' + lightboxVisibleItems.length;
        }
    }

    function lightboxPrevFn() {
        lightboxCurrentIndex = (lightboxCurrentIndex - 1 + lightboxVisibleItems.length) % lightboxVisibleItems.length;
        updateLightboxContent();
    }

    function lightboxNextFn() {
        lightboxCurrentIndex = (lightboxCurrentIndex + 1) % lightboxVisibleItems.length;
        updateLightboxContent();
    }

    galleryItems.forEach(function (item, idx) {
        item.addEventListener('click', function () {
            var visibleItems = getVisibleGalleryItems();
            var visibleIndex = visibleItems.indexOf(item);
            if (visibleIndex !== -1) {
                openLightbox(visibleIndex);
            }
        });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', lightboxPrevFn);
    if (lightboxNext) lightboxNext.addEventListener('click', lightboxNextFn);

    if (lightbox) {
        lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
    }

    // ─── Testimonials Slider ───
    var testimonialsTrack = document.getElementById('testimonialsTrack');
    var testPrev = document.getElementById('testPrev');
    var testNext = document.getElementById('testNext');
    var testDots = document.querySelectorAll('.test-dot');
    var currentTestimonial = 0;
    var totalTestimonials = document.querySelectorAll('.testimonial-card').length;
    var autoPlayTimer;

    function goToTestimonial(index) {
        if (index < 0) index = totalTestimonials - 1;
        if (index >= totalTestimonials) index = 0;
        currentTestimonial = index;

        if (testimonialsTrack) {
            testimonialsTrack.style.transform = 'translateX(-' + (currentTestimonial * 100) + '%)';
        }

        testDots.forEach(function (dot, i) {
            dot.classList.toggle('active', i === currentTestimonial);
        });
    }

    function startAutoPlay() {
        autoPlayTimer = setInterval(function () {
            goToTestimonial(currentTestimonial + 1);
        }, 5000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        startAutoPlay();
    }

    if (testPrev) {
        testPrev.addEventListener('click', function () {
            goToTestimonial(currentTestimonial - 1);
            resetAutoPlay();
        });
    }

    if (testNext) {
        testNext.addEventListener('click', function () {
            goToTestimonial(currentTestimonial + 1);
            resetAutoPlay();
        });
    }

    testDots.forEach(function (dot, index) {
        dot.addEventListener('click', function () {
            goToTestimonial(index);
            resetAutoPlay();
        });
    });

    if (totalTestimonials > 0) startAutoPlay();

    // Touch/Swipe Support for Testimonials
    var touchStartX = 0;
    var touchEndX = 0;

    if (testimonialsTrack) {
        testimonialsTrack.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        testimonialsTrack.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            var diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    goToTestimonial(currentTestimonial + 1);
                } else {
                    goToTestimonial(currentTestimonial - 1);
                }
                resetAutoPlay();
            }
        }, { passive: true });
    }

    // ─── Floating Action Button (Speed Dial) ───
    var fabToggle = document.getElementById('fabToggle');
    var fabQuick = document.getElementById('fabQuick');
    var fabOptions = document.getElementById('fabOptions');

    if (fabToggle && fabQuick) {
        fabToggle.addEventListener('click', function () {
            fabQuick.classList.toggle('open');
        });

        document.addEventListener('click', function (e) {
            if (fabQuick.classList.contains('open') && !fabQuick.contains(e.target)) {
                fabQuick.classList.remove('open');
            }
        });
    }

    // ─── Contact Form ───
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var submitBtn = this.querySelector('.btn-submit');
            if (!submitBtn) return;
            var originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            setTimeout(function () {
                submitBtn.innerHTML = '<span>Message Sent!</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
                submitBtn.style.background = '#2a7a4a';

                setTimeout(function () {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 1500);
        });
    }

    // ─── Newsletter Form ───
    var newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var submitBtn = this.querySelector('button');
            var emailInput = this.querySelector('input');
            if (!submitBtn) return;

            var originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;

            setTimeout(function () {
                submitBtn.textContent = 'Subscribed!';
                submitBtn.style.background = '#2a7a4a';

                setTimeout(function () {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    if (emailInput) emailInput.value = '';
                }, 3000);
            }, 1200);
        });
    }

    // ─── Parallax Effect for Hero ───
    var hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function () {
            var scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                var heroContent = document.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.style.transform = 'translateY(' + (scrollY * 0.3) + 'px)';
                    heroContent.style.opacity = 1 - (scrollY / window.innerHeight) * 0.8;
                }
            }
        });
    }

    // ─── Gallery Hover Tilt Effect ───
    galleryItems.forEach(function (item) {
        item.addEventListener('mousemove', function (e) {
            var rect = this.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var rotateX = (y - centerY) / centerY * -4;
            var rotateY = (x - centerX) / centerX * 4;
            this.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.02)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

    // ─── Magnetic Buttons Effect ───
    var magneticBtns = document.querySelectorAll('.btn-primary, .btn-apply, .btn-admission, .btn-alumni');
    magneticBtns.forEach(function (btn) {
        btn.addEventListener('mousemove', function (e) {
            var rect = this.getBoundingClientRect();
            var x = e.clientX - rect.left - rect.width / 2;
            var y = e.clientY - rect.top - rect.height / 2;
            this.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px)';
        });

        btn.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

    // ─── Keyboard Navigation ───
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
            if (searchOverlay && searchOverlay.classList.contains('active')) {
                closeSearch();
            }
            if (videoModal && videoModal.classList.contains('active')) {
                closeVideoModal();
            }
            if (lightbox && lightbox.classList.contains('active')) {
                closeLightbox();
            }
            if (fabQuick && fabQuick.classList.contains('open')) {
                fabQuick.classList.remove('open');
            }
        }

        // Lightbox arrow key navigation
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                lightboxPrevFn();
            } else if (e.key === 'ArrowRight') {
                lightboxNextFn();
            }
        }
    });

    // ─── Staggered Card Animations ───
    var academicCards = document.querySelectorAll('.academic-card');
    academicCards.forEach(function (card) {
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    });

    // ─── Reduced Motion Preference ───
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        document.querySelectorAll('.hero-particle').forEach(function (p) {
            p.style.animation = 'none';
        });
        document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(function (el) {
            el.classList.add('revealed');
        });
    }

    // ─── Lazy Section Loading ───
    var lazyLoadObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-loaded');
                lazyLoadObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '200px' });

    document.querySelectorAll('.section').forEach(function (section) {
        lazyLoadObserver.observe(section);
    });

    // ─── Scroll-based perf throttle ───
    var ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(function () {
                ticking = false;
            });
            ticking = true;
        }
    });

})();

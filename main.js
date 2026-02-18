


// Modern Navbar JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.modern-navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect with transparency levels
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // Base scrolled class
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // More transparent when scrolling further
        if (scrollY > 200) {
            navbar.classList.add('scrolled-more');
        } else {
            navbar.classList.remove('scrolled-more');
        }
        
        // Update active link
        updateActiveLink();
    });
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu if open
            if (window.innerWidth <= 900) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Update active link based on scroll
    function updateActiveLink() {
        const scrollPosition = window.scrollY + navbar.offsetHeight + 50;
        
        navLinks.forEach(link => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const sectionTop = targetSection.offsetTop;
                    const sectionBottom = sectionTop + targetSection.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        navLinks.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                    }
                }
            }
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 900) {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
});
    // New Collection Slider

document.addEventListener('DOMContentLoaded', function() {
        const sliderTrack = document.querySelector('.slider-track');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        
        if (sliderTrack && prevBtn && nextBtn) {
            let currentIndex = 0;
            const slides = document.querySelectorAll('.collection-slide');
            const totalSlides = slides.length;
            let slidesPerView = 4;
            
            function updateSlidesPerView() {
                if (window.innerWidth <= 600) {
                    slidesPerView = 1;
                } else if (window.innerWidth <= 900) {
                    slidesPerView = 2;
                } else if (window.innerWidth <= 1200) {
                    slidesPerView = 3;
                } else {
                    slidesPerView = 4;
                }
                return slidesPerView;
            }
            
            function updateSlider() {
                slidesPerView = updateSlidesPerView();
                const maxIndex = Math.max(0, totalSlides - slidesPerView);
                if (currentIndex > maxIndex) currentIndex = maxIndex;
                const offset = currentIndex * (100 / slidesPerView);
                sliderTrack.style.transform = `translateX(-${offset}%)`;
            }
            
            prevBtn.addEventListener('click', () => {
                slidesPerView = updateSlidesPerView();
                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    currentIndex = totalSlides - slidesPerView;
                }
                updateSlider();
            });
            
            nextBtn.addEventListener('click', () => {
                slidesPerView = updateSlidesPerView();
                const maxIndex = totalSlides - slidesPerView;
                if (currentIndex < maxIndex) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateSlider();
            });
            
            window.addEventListener('resize', updateSlider);
            updateSlider();
        }
    });


    // Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            successMessage.classList.add('active');
            
            // Reset form after 3 seconds
            setTimeout(() => {
                successMessage.classList.remove('active');
                contactForm.reset();
            }, 3000);
        });
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with: ${email}`);
            this.reset();
        });
    }
});
    
    

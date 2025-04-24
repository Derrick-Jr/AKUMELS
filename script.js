/**
 * AKUMELS Website JavaScript
 * Association of Kenyatta University Medical Laboratory Science Students
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');
    const sliderCards = document.querySelectorAll('.slider-card');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const contactForm = document.getElementById('akumels-contact-form');
    
    // Current index for slider
    let currentSlide = 0;
    
    // Initialize Particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#0066cc'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                },
                opacity: {
                    value: 0.3,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#0066cc',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 3,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // Typing animation
    const typedTextElement = document.getElementById('typed-text');
    if (typedTextElement) {
        const text = "Focused on Proper Diagnostics";
        let index = 0;
        
        function typeText() {
            if (index < text.length) {
                typedTextElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, 100);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeText, 1000);
    }
    
    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            if (navMenu.classList.contains('active')) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Close menu when link is clicked
    document.querySelectorAll('.nav-menu a').forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Sticky header and back to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTop.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('active');
        }
        
        // Update active menu item based on scroll position
        let scrollPosition = window.scrollY;
        document.querySelectorAll('section').forEach(function(section) {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-menu a').forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // About section slider functionality
    function showSlide(index) {
        // Hide all slides
        sliderCards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Update indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Show selected slide and update indicator
        sliderCards[index].classList.add('active');
        indicators[index].classList.add('active');
        
        // Update current slide index
        currentSlide = index;
    }
    
    // Initialize slider to first slide
    showSlide(0);
    
    // Previous button functionality
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            let prevSlide = currentSlide - 1;
            if (prevSlide < 0) {
                prevSlide = sliderCards.length - 1;
            }
            showSlide(prevSlide);
        });
    }
    
    // Next button functionality
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            let nextSlide = currentSlide + 1;
            if (nextSlide >= sliderCards.length) {
                nextSlide = 0;
            }
            showSlide(nextSlide);
        });
    }
    
    // Indicator button functionality
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Auto slide functionality
    let slideInterval = setInterval(function() {
        let nextSlide = currentSlide + 1;
        if (nextSlide >= sliderCards.length) {
            nextSlide = 0;
        }
        showSlide(nextSlide);
    }, 5000); // Change slide every 5 seconds
    
    // Pause auto slide on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', function() {
            slideInterval = setInterval(function() {
                let nextSlide = currentSlide + 1;
                if (nextSlide >= sliderCards.length) {
                    nextSlide = 0;
                }
                showSlide(nextSlide);
            }, 5000);
        });
    }
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you, ${name}. We'll get back to you soon.</p>
            `;
            
            // Simple form validation
            if (name && email && subject && message) {
                // In a real application, you would send the form data to a server
                console.log('Form submitted:', { name, email, subject, message });
                
                // Clear form
                contactForm.reset();
                
                // Show success message
                contactForm.style.display = 'none';
                contactForm.parentNode.appendChild(successMessage);
                
                // Reset form after 5 seconds
                setTimeout(function() {
                    contactForm.style.display = 'block';
                    if (successMessage.parentNode) {
                        successMessage.parentNode.removeChild(successMessage);
                    }
                }, 5000);
            }
        });
    }
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section-header, .hero-content, .hero-image, .slider-card, .blog-card, .contact-info, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run animation on page load
    animateOnScroll();
});

document.addEventListener('DOMContentLoaded', function() {
    // Gallery Variables
    const categoryButtons = document.querySelectorAll('.category-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const prevButton = document.querySelector('.gallery-prev');
    const nextButton = document.querySelector('.gallery-next');
    const indicatorsContainer = document.querySelector('.gallery-indicators');
    const fullscreenButton = document.querySelector('.gallery-fullscreen');
    const modal = document.querySelector('.gallery-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalDate = document.getElementById('modal-date');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    
    let currentCategory = 'all';
    let currentIndex = 0;
    let filteredItems = [...galleryItems];
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Initialize gallery
    function initGallery() {
        // Create indicators based on gallery items
        filteredItems.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('indicator-dot');
            if (index === 0) dot.classList.add('active');
            dot.dataset.index = index;
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            indicatorsContainer.appendChild(dot);
        });
        
        // Show first item
        if (filteredItems.length > 0) {
            filteredItems[0].classList.add('active');
        }
        
        // Touch events for swiping
        const carousel = document.querySelector('.gallery-carousel');
        
        carousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carousel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    // Handle swipe gestures
    function handleSwipe() {
        const threshold = 100; // Minimum distance to be considered a swipe
        if (touchEndX < touchStartX - threshold) {
            // Swipe left
            nextSlide();
        } else if (touchEndX > touchStartX + threshold) {
            // Swipe right
            prevSlide();
        }
    }
    
    // Filter gallery items by category
    function filterGallery(category) {
        currentCategory = category;
        
        // Clear indicators
        indicatorsContainer.innerHTML = '';
        
        // Filter items
        filteredItems = [...galleryItems].filter(item => {
            if (category === 'all') return true;
            return item.dataset.category === category;
        });
        
        // Hide all items
        galleryItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Reset current index
        currentIndex = 0;
        
        // Create new indicators
        filteredItems.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('indicator-dot');
            if (index === 0) dot.classList.add('active');
            dot.dataset.index = index;
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            indicatorsContainer.appendChild(dot);
        });
        
        // Show first item in filtered set
        if (filteredItems.length > 0) {
            filteredItems[0].classList.add('active');
        }
        
        // Update controls visibility
        updateControlsVisibility();
    }
    
    // Go to specific slide
    function goToSlide(index) {
        if (index < 0) index = filteredItems.length - 1;
        if (index >= filteredItems.length) index = 0;
        
        filteredItems.forEach(item => item.classList.remove('active'));
        filteredItems[index].classList.add('active');
        
        const indicators = document.querySelectorAll('.indicator-dot');
        indicators.forEach(ind => ind.classList.remove('active'));
        indicators[index].classList.add('active');
        
        currentIndex = index;
    }
    
    // Go to next slide
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    // Go to previous slide
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    // Update controls visibility based on filtered items
    function updateControlsVisibility() {
        if (filteredItems.length <= 1) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
            indicatorsContainer.style.display = 'none';
        } else {
            prevButton.style.display = 'flex';
            nextButton.style.display = 'flex';
            indicatorsContainer.style.display = 'flex';
        }
    }
    
    // Open fullscreen modal
    function openModal(index) {
        const item = filteredItems[index];
        const img = item.querySelector('img');
        const title = item.querySelector('h3');
        const desc = item.querySelector('p');
        const date = item.querySelector('.gallery-date');
        
        modalImage.src = img.src;
        modalTitle.textContent = title.textContent;
        modalDescription.textContent = desc.textContent;
        modalDate.textContent = date.textContent;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    // Close fullscreen modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Navigate modal images
    function prevModalImage() {
        goToSlide(currentIndex - 1);
        openModal(currentIndex);
    }
    
    function nextModalImage() {
        goToSlide(currentIndex + 1);
        openModal(currentIndex);
    }
    
    // Event Listeners
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterGallery(this.dataset.category);
        });
    });
    
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
    
    fullscreenButton.addEventListener('click', () => {
        openModal(currentIndex);
    });
    
    modalClose.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', prevModalImage);
    modalNext.addEventListener('click', nextModalImage);
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') prevModalImage();
        if (e.key === 'ArrowRight') nextModalImage();
    });
    
    // Initialize gallery on load
    initGallery();
    
    // Add click event to gallery items for modal
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const filterIndex = filteredItems.indexOf(this);
            if (filterIndex !== -1) {
                openModal(filterIndex);
            }
        });
    });
});
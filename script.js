// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
    // Make sure all elements are visible first
    makeAllElementsVisible();
    
    // Initialize AOS with simpler settings
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        disable: window.innerWidth < 768 // Disable on mobile for better performance
    });

    // Initialize GSAP animations
    initAnimations();
    
    // Initialize main title animation
    animateMainTitle();
    
    // Initialize typing animation
    setTimeout(() => {
        initTypingAnimation();
    }, 1000); // Start after main title animation
    
    // Initialize letter animations for secondary text
    animateLetters();
    
    // Make sure images are loaded
    ensureImagesLoaded();
    
    // Initialize testimonial carousel
    initTestimonialCarousel();
    
    // Initialize 3D book interaction
    init3DBookInteraction();
});

// Make all elements visible immediately
function makeAllElementsVisible() {
    // Make all AOS elements visible by default
    document.querySelectorAll('[data-aos]').forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'none';
    });
    
    // Make all book items visible
    document.querySelectorAll('.book-item, .book-image, .book-details, .featured-book, .featured-content, .featured-image').forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'none';
    });
    
    // Make all images visible
    document.querySelectorAll('img').forEach(img => {
        img.style.opacity = '1';
        img.style.display = 'block';
    });
    
    // Make all text elements visible
    document.querySelectorAll('.hero-title, .hero-subtitle, .secondary-text, .showcase-header, .book-hover').forEach(element => {
        element.style.opacity = '1';
    });
}

// GSAP Animations - Simplified
function initAnimations() {
    // Register plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    
    // Navbar animation - simplified
    gsap.from('.navbar', {
        y: -50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
        onComplete: () => {
            document.querySelector('.navbar').style.opacity = '1';
        }
    });
    
    // Simple animations for showcase elements
    gsap.from('.showcase-header', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
            document.querySelector('.showcase-header').style.opacity = '1';
        }
    });
    
    // Subtle hover animation for navigation links - keep this for interactivity
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                y: -3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Animate main title letter by letter - simplified
function animateMainTitle() {
    const mainTitle = document.getElementById('main-title');
    if (!mainTitle) return;
    
    const titleText = "Anavrin";
    mainTitle.textContent = titleText; // Set text content directly
    mainTitle.style.opacity = '1'; // Make visible immediately
    
    // Only create letter spans if browser can handle it
    if (window.innerWidth > 768) {
        mainTitle.textContent = '';
        // Add each letter with a span
        for (let i = 0; i < titleText.length; i++) {
            const letterSpan = document.createElement('span');
            letterSpan.className = 'title-letter';
            letterSpan.textContent = titleText[i];
            letterSpan.style.opacity = '1'; // Make visible immediately
            letterSpan.style.transform = 'translateY(0)';
            letterSpan.style.display = 'inline-block';
            mainTitle.appendChild(letterSpan);
        }
    }
}

// Typing animation for subtitle - simplified
function initTypingAnimation() {
    const typedTextElement = document.getElementById('typed-text');
    if (!typedTextElement) return;
    
    const textToType = "A literary journey through time";
    
    // Set text directly for immediate visibility
    typedTextElement.textContent = textToType;
    typedTextElement.style.opacity = '1';
    
    // Skip animation on mobile
    if (window.innerWidth <= 768) {
        return;
    }
    
    // Only animate on desktop
    typedTextElement.textContent = '';
    let charIndex = 0;
    
    // Create cursor element
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    typedTextElement.appendChild(cursor);
    
    // Start typing animation
    const typingInterval = setInterval(() => {
        if (charIndex < textToType.length) {
            // Create a new span for each character
            const charSpan = document.createElement('span');
            charSpan.textContent = textToType[charIndex];
            
            // Insert the character before the cursor
            typedTextElement.insertBefore(charSpan, cursor);
            
            // Increment character index
            charIndex++;
        } else {
            clearInterval(typingInterval);
            
            // Start secondary text animation after typing completes
            setTimeout(() => {
                animateSecondaryText();
            }, 500);
        }
    }, 50);
}

// Animate letters in secondary text - simplified
function animateLetters() {
    const secondaryText = document.querySelector('.secondary-text span');
    if (!secondaryText) return;
    
    // Make sure text is visible immediately
    secondaryText.style.opacity = '1';
    secondaryText.style.transform = 'translateY(0)';
    
    // Skip animation on mobile
    if (window.innerWidth <= 768) {
        return;
    }
    
    const text = secondaryText.textContent;
    
    // Clear the text and create spans for each letter
    secondaryText.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
        const letterSpan = document.createElement('span');
        letterSpan.className = 'letter';
        letterSpan.textContent = text[i] === ' ' ? '\u00A0' : text[i]; // Use non-breaking space for spaces
        letterSpan.style.opacity = '1'; // Make visible immediately
        letterSpan.style.transform = 'translateY(0)';
        secondaryText.appendChild(letterSpan);
    }
}

// Animate secondary text letters sequentially - simplified
function animateSecondaryText() {
    const letters = document.querySelectorAll('.letter');
    
    // Make all letters visible immediately
    letters.forEach(letter => {
        letter.classList.add('visible');
    });
}

// Make sure images are loaded and visible
function ensureImagesLoaded() {
    // Force all images to be visible
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        // Set default styling to ensure visibility
        img.style.display = 'block';
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        img.style.opacity = '1';
        
        // Add error handling
        img.onerror = function() {
            console.error('Failed to load image:', img.src);
            // Replace with a placeholder if image fails to load
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgZmlsbD0iIzFhM2EyZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmaWxsPSIjZDRlNmI1Ij5JbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==';
        };
    });
    
    // Add basic click handlers for interactive elements
    document.querySelectorAll('.read-more, .featured-button, .notify-button, .view-all-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            alert('This feature will be available soon!');
        });
    });
    
    // Make sure book items are visible
    document.querySelectorAll('.book-item').forEach(item => {
        item.style.opacity = '1';
        
        // Make book details visible by default
        const bookDetails = item.querySelector('.book-details');
        if (bookDetails) {
            bookDetails.style.opacity = '1';
            bookDetails.style.transform = 'translateY(0)';
        }
        
        // Make book hover visible by default
        const bookHover = item.querySelector('.book-hover');
        if (bookHover) {
            bookHover.style.opacity = '0.9';
        }
        
        // Simplify hover effect
        item.addEventListener('mouseenter', () => {
            const bookHover = item.querySelector('.book-hover');
            if (bookHover) {
                bookHover.style.opacity = '1';
            }
            
            const bookDetails = item.querySelector('.book-details');
            if (bookDetails) {
                bookDetails.style.opacity = '1';
                bookDetails.style.transform = 'translateY(0)';
            }
        });
    });
}

// Add a subtle parallax effect on scroll - disabled for better performance
window.addEventListener('scroll', () => {
    // Only apply on desktop
    if (window.innerWidth <= 768) return;
    
    const scrollY = window.scrollY;
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle) {
        heroTitle.style.transform = `translateY(${scrollY * 0.05}px)`; // Reduced effect
    }
});

// Initialize testimonial carousel
function initTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    
    // Make sure testimonials are visible
    testimonials.forEach(testimonial => {
        testimonial.style.opacity = '0';
        testimonial.style.transform = 'translateX(50px)';
    });
    
    // Show first testimonial
    if (testimonials.length > 0) {
        testimonials[0].classList.add('active');
        testimonials[0].style.opacity = '1';
        testimonials[0].style.transform = 'translateX(0)';
    }
    
    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Auto rotate testimonials
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
    
    // Show testimonial by index
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
            testimonial.style.opacity = '0';
            testimonial.style.transform = 'translateX(50px)';
        });
        
        // Show selected testimonial
        testimonials[index].classList.add('active');
        testimonials[index].style.opacity = '1';
        testimonials[index].style.transform = 'translateX(0)';
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        
        // Update current index
        currentIndex = index;
    }
}

// Initialize 3D book interaction
function init3DBookInteraction() {
    const book = document.querySelector('.book-3d');
    if (!book) return;
    
    // Make sure book is visible
    book.style.opacity = '1';
    
    // Add mouse move interaction
    book.addEventListener('mousemove', (e) => {
        const rect = book.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = ((x - centerX) / centerX) * 20; // Max 20 degrees
        const rotateX = -((y - centerY) / centerY) * 10; // Max 10 degrees
        
        // Apply rotation with GSAP
        gsap.to(book, {
            rotateY: rotateY,
            rotateX: rotateX,
            duration: 0.5,
            ease: 'power1.out'
        });
    });
    
    // Reset on mouse leave
    book.addEventListener('mouseleave', () => {
        gsap.to(book, {
            rotateY: 30,
            rotateX: 5,
            duration: 1,
            ease: 'elastic.out(1, 0.5)'
        });
    });
    
    // Add click interaction
    book.addEventListener('click', () => {
        // Animate book to open
        gsap.to(book, {
            rotateY: 0,
            rotateX: 0,
            scale: 1.1,
            duration: 0.8,
            ease: 'back.out(1.5)',
            onComplete: () => {
                // Return to normal after delay
                setTimeout(() => {
                    gsap.to(book, {
                        rotateY: 30,
                        rotateX: 5,
                        scale: 1,
                        duration: 1.2,
                        ease: 'elastic.out(1, 0.5)'
                    });
                }, 1500);
            }
        });
    });
}

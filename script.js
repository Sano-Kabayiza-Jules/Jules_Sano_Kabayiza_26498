document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavbar();
    initTypingEffect();
    initOrbitAnimations();
    initSmoothScroll();
    initSectionAnimations();
    initContactForm(); // WhatsApp-only contact form
    initCVDownload();
});

function initNavbar() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    });
    
    sections.forEach(section => observer.observe(section));
}

function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return;
    
    const phrases = [
        'Web Developer',
        'Network Administrator', 
        'Problem Solver',
        'AI Explorer',
        'Tech Innovator'
    ];
    
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeEffect() {
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
}

function initOrbitAnimations() {
    const planets = document.querySelectorAll('.random-orbit');

    planets.forEach((planet, index) => {
        const startAngle = Math.random() * 360;
        const radius = 120 + (index * 40);
        const duration = 15 + Math.random() * 15;
        const direction = Math.random() > 0.5 ? 'normal' : 'reverse';

        planet.style.transform = `rotate(${startAngle}deg) translateX(${radius}px) rotate(-${startAngle}deg)`;

        const animationName = `orbit${index}`;
        const keyframes = `
            @keyframes ${animationName} {
                from {
                    transform: rotate(${startAngle}deg) translateX(${radius}px) rotate(-${startAngle}deg);
                }
                to {
                    transform: rotate(${startAngle + 360}deg) translateX(${radius}px) rotate(-${startAngle + 360}deg);
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = keyframes;
        document.head.appendChild(styleSheet);

        planet.style.animation = `${animationName} ${duration}s linear infinite ${direction}`;

        planet.addEventListener('mouseenter', () => {
            planet.style.animationPlayState = 'paused';
        });

        planet.addEventListener('mouseleave', () => {
            planet.style.animationPlayState = 'running';
        });
    });
}

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initSectionAnimations() {
    const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up');

    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                if (entry.target.classList.contains('slide-in-left')) {
                    entry.target.style.transform = 'translateX(0)';
                } else if (entry.target.classList.contains('slide-in-right')) {
                    entry.target.style.transform = 'translateX(0)';
                } else {
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => elementObserver.observe(element));
}

// ===== WHATSAPP-ONLY CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) {
        console.log('Contact form not found');
        return;
    }

    // Create message container if not exists
    if (!document.getElementById('form-message')) {
        const messageDiv = document.createElement('div');
        messageDiv.id = 'form-message';
        messageDiv.style.cssText = `
            margin-bottom: 20px;
            padding: 12px;
            border-radius: 6px;
            display: none;
            font-weight: 500;
            transition: all 0.3s ease;
        `;
        form.prepend(messageDiv);
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = form.querySelector('input[name="user_name"]').value.trim();
        const email = form.querySelector('input[name="user_email"]').value.trim();
        const message = form.querySelector('textarea[name="message"]').value.trim();
        const submitBtn = form.querySelector('button[type="submit"]');

        // Validate
        if (!name || !email || !message) {
            showFormMessage('Please fill in all fields!', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address!', 'error');
            return;
        }

        // Show loading state
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Opening WhatsApp...';
        submitBtn.disabled = true;

        // Send directly to WhatsApp
        sendToWhatsApp(name, email, message);
        
        // Show success message
        showFormMessage('✅ Opening WhatsApp with your message...', 'success');
        
        // Clear form
        setTimeout(() => {
            form.reset();
        }, 500);
        
        // Reset button after 2 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }, 2000);
    });

    // Add real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function sendToWhatsApp(name, email, message) {
    // Your WhatsApp number
    const phoneNumber = '250786992184';
    
    // Format the message nicely
    const whatsappMessage = `📧 *New Message from Portfolio Website* 📧

👤 *Name:* ${name}
📧 *Email:* ${email}
💬 *Message:*
${message}

⏰ *Sent:* ${new Date().toLocaleString()}
🌐 *Via:* Sano Kabayiza Jules Portfolio`;

    // URL encode the message
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    setTimeout(() => {
        window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    }, 500);
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name') || field.getAttribute('placeholder');
    
    if (!value && field.hasAttribute('required')) {
        showFieldError(field, `${fieldName} is required`);
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #ff3860;
        font-size: 12px;
        margin-top: 4px;
        display: block;
    `;
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#ff3860';
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '';
}

function showFormMessage(text, type) {
    const messageDiv = document.getElementById('form-message');
    if (!messageDiv) return;
    
    messageDiv.textContent = text;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';
    
    // Style based on type
    if (type === 'success') {
        messageDiv.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
        messageDiv.style.color = '#4CAF50';
        messageDiv.style.border = '1px solid rgba(76, 175, 80, 0.3)';
    } else if (type === 'error') {
        messageDiv.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
        messageDiv.style.color = '#f44336';
        messageDiv.style.border = '1px solid rgba(244, 67, 54, 0.3)';
    }
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function initCVDownload() {
    const cvButton = document.querySelector('.hero-buttons .glow-genz-button');
    
    if (cvButton) {
        cvButton.addEventListener('click', function(e) {
            // Optional: Add tracking or confirmation
            setTimeout(() => {
                showToast('📄 CV download started! Thank you for your interest.', 'success');
            }, 500);
        });
    }
}

// ===== TOAST NOTIFICATION (Optional) =====
function showToast(message, type = 'info') {
    // Create toast container if not exists
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(toastContainer);
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        padding: 12px 20px;
        border-radius: 6px;
        background: ${type === 'success' ? 'rgba(76, 175, 80, 0.9)' : type === 'error' ? 'rgba(244, 67, 54, 0.9)' : 'rgba(33, 150, 243, 0.9)'};
        color: white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
        backdrop-filter: blur(10px);
    `;
    
    toastContainer.appendChild(toast);
    
    // Add animation styles
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 3000);
}

// ===== COPY TO CLIPBOARD FOR EMAIL/PHONE =====
function initCopyToClipboard() {
    const emailElement = document.querySelector('.contact-item span');
    const phoneElement = document.querySelectorAll('.contact-item span')[1];
    
    if (emailElement) {
        emailElement.style.cursor = 'pointer';
        emailElement.addEventListener('click', function() {
            copyToClipboard('sanokabayizajules@gmail.com');
        });
    }
    
    if (phoneElement) {
        phoneElement.style.cursor = 'pointer';
        phoneElement.addEventListener('click', function() {
            copyToClipboard('+250786992184');
        });
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        showToast('Failed to copy', 'error');
    });
}

// Initialize copy to clipboard on contact items
// Add this to DOMContentLoaded if you want this feature:
// initCopyToClipboard();

// ===== ADDITIONAL ENHANCEMENTS =====
// Add these to DOMContentLoaded if desired:

function initFormAnimations() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
}

function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--accent);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 20px;
        display: none;
        justify-content: center;
        align-items: center;
        box-shadow: 0 4px 12px rgba(255, 56, 56, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
        backdrop-filter: blur(5px);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide based on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
}

// Uncomment to enable back to top button:
// initBackToTop();

// ===== ENHANCE THE HERO BUTTON =====
function enhanceHeroButton() {
    const heroButton = document.querySelector('.hero-buttons .glow-genz-button');
    
    if (heroButton) {
        heroButton.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.5s ease-in-out';
        });
        
        heroButton.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
        
        // Add pulse animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { box-shadow: 0 0 25px rgba(255, 56, 56, 1); }
                50% { box-shadow: 0 0 35px rgba(255, 56, 56, 1), 0 0 60px rgba(255, 92, 92, 0.8); }
                100% { box-shadow: 0 0 25px rgba(255, 56, 56, 1); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Add to DOMContentLoaded:
// enhanceHeroButton();
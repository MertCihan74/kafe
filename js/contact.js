// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initMapInteraction();
    initFAQAccordion();
    initContactAnimations();
});

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', handleContactSubmit);

    // Real-time validation
    initContactValidation();

    // Phone masking for contact form
    initContactPhoneMask();
}

function handleContactSubmit(e) {
    e.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;

    // Disable button and show loading
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';

    // Collect form data
    const formData = new FormData(e.target);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };

    // Simulate API call
    setTimeout(() => {
        // Show success message
        showNotification('Mesajınız başarıyla gönderildi! En kısa sürede size geri dönüş yapacağız.', 'success');

        // Reset form
        e.target.reset();

        // Re-enable button
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;

        // Log contact data (for demo purposes)
        console.log('Contact Data:', contactData);

        // In a real implementation, you would send this to your backend:
        // fetch('/api/contact', { method: 'POST', body: JSON.stringify(contactData) })

    }, 2000);
}

function initContactValidation() {
    const form = document.getElementById('contactForm');

    form.addEventListener('input', function(e) {
        const field = e.target;

        if (field.hasAttribute('required') && field.value.trim()) {
            clearFieldError(field);

            // Additional validation
            if (field.type === 'email' && !isValidEmail(field.value)) {
                showFieldError(field, 'Geçerli bir e-posta adresi girin');
            }

            if (field.type === 'tel' && field.value && !isValidPhone(field.value)) {
                showFieldError(field, 'Geçerli bir telefon numarası girin');
            }
        }
    });
}

function initContactPhoneMask() {
    const phoneInput = document.getElementById('contactPhone');
    if (!phoneInput) return;

    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length >= 1) {
            if (value.startsWith('0')) {
                // Format as 0XXX XXX XX XX
                if (value.length <= 4) {
                    value = value;
                } else if (value.length <= 7) {
                    value = value.slice(0, 4) + ' ' + value.slice(4);
                } else if (value.length <= 9) {
                    value = value.slice(0, 4) + ' ' + value.slice(4, 7) + ' ' + value.slice(7);
                } else {
                    value = value.slice(0, 4) + ' ' + value.slice(4, 7) + ' ' + value.slice(7, 9) + ' ' + value.slice(9, 11);
                }
            } else {
                // Format as +90 XXX XXX XX XX
                if (value.length <= 3) {
                    value = '+90 ' + value;
                } else if (value.length <= 6) {
                    value = '+90 ' + value.slice(0, 3) + ' ' + value.slice(3);
                } else if (value.length <= 8) {
                    value = '+90 ' + value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6);
                } else {
                    value = '+90 ' + value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 8) + ' ' + value.slice(8, 10);
                }
            }
        }

        e.target.value = value;
    });
}

// Map Interaction
function initMapInteraction() {
    const mapPlaceholder = document.querySelector('.map-placeholder');
    const mapBtn = document.querySelector('.map-btn');

    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('click', function() {
            showNotification('Google Maps entegrasyonu yakında eklenecek!', 'info');
        });
    }

    if (mapBtn) {
        mapBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Open Google Maps with restaurant location
            const address = encodeURIComponent('Sahil Yolu No:12, Amasra, Bartın');
            window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
        });
    }
}

// FAQ Accordion
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('h4');
        const answer = item.querySelector('p');

        // Initially hide answers
        answer.style.display = 'none';
        answer.style.opacity = '0';
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'all 0.3s ease';

        question.style.cursor = 'pointer';
        question.style.userSelect = 'none';

        // Add click event
        question.addEventListener('click', function() {
            const isOpen = answer.style.display === 'block';

            if (isOpen) {
                // Close
                answer.style.opacity = '0';
                answer.style.maxHeight = '0';
                setTimeout(() => {
                    answer.style.display = 'none';
                }, 300);
                question.classList.remove('active');
            } else {
                // Close other open items first
                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('p');
                    const otherQuestion = otherItem.querySelector('h4');

                    otherAnswer.style.opacity = '0';
                    otherAnswer.style.maxHeight = '0';
                    setTimeout(() => {
                        otherAnswer.style.display = 'none';
                    }, 300);
                    otherQuestion.classList.remove('active');
                });

                // Open this one
                answer.style.display = 'block';
                answer.style.maxHeight = answer.scrollHeight + 'px';
                setTimeout(() => {
                    answer.style.opacity = '1';
                }, 10);
                question.classList.add('active');
            }
        });

        // Add hover effect
        question.addEventListener('mouseenter', function() {
            if (!question.classList.contains('active')) {
                question.style.color = 'var(--primary-color)';
            }
        });

        question.addEventListener('mouseleave', function() {
            if (!question.classList.contains('active')) {
                question.style.color = '';
            }
        });
    });
}

// Contact Animations
function initContactAnimations() {
    // Animate contact cards on scroll
    const contactCards = document.querySelectorAll('.contact-info-card, .faq-item');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    contactCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Utility Functions
function showFieldError(field, message) {
    clearFieldError(field);

    field.style.borderColor = '#ef4444';

    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;

    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    field.style.borderColor = '';

    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^(\+90|0)?[5][0-9]{9}$/;
    const cleanPhone = phone.replace(/\s+/g, '').replace(/[-()]/g, '');
    return phoneRegex.test(cleanPhone);
}

function showNotification(message, type = 'info') {
    if (window.RestaurantApp && window.RestaurantApp.showNotification) {
        window.RestaurantApp.showNotification(message, type);
    } else {
        // Fallback notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1001;
            max-width: 400px;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// Contact methods quick actions
document.addEventListener('click', function(e) {
    // Phone links
    if (e.target.closest('.phone-link')) {
        const link = e.target.closest('.phone-link');
        const phone = link.querySelector('a').href;
        if (confirm('Bu numarayı aramak istiyor musunuz?')) {
            window.location.href = phone;
        }
        e.preventDefault();
    }

    // WhatsApp links
    if (e.target.closest('.whatsapp-link')) {
        const link = e.target.closest('.whatsapp-link');
        const whatsapp = link.href;
        window.open(whatsapp, '_blank');
        e.preventDefault();
    }

    // Email links
    if (e.target.closest('.email-link')) {
        const link = e.target.closest('.email-link');
        const email = link.href;
        if (confirm('E-posta uygulaması açılacak. Devam edilsin mi?')) {
            window.location.href = email;
        }
        e.preventDefault();
    }
});

// Social media links
document.addEventListener('click', function(e) {
    if (e.target.closest('.social-link-large')) {
        e.preventDefault();
        const link = e.target.closest('.social-link-large');
        const platform = link.querySelector('span').textContent.toLowerCase();

        showNotification(`${platform} sayfası yakında aktif olacak!`, 'info');
    }
});

// Reservation Form JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initReservationForm();
    initDateRestrictions();
    initPhoneMask();
});

// Initialize reservation form
function initReservationForm() {
    const form = document.getElementById('reservationForm');
    if (!form) return;

    // Step navigation
    initStepNavigation();

    // Form validation and submission
    form.addEventListener('submit', handleReservationSubmit);

    // Real-time validation
    initRealTimeValidation();

    // Update summary on form changes
    initSummaryUpdates();
}

// Step navigation functionality
function initStepNavigation() {
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');

    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const nextStepId = getNextStepId(currentStep.id);

            if (validateCurrentStep(currentStep)) {
                showStep(nextStepId);
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const prevStepId = getPrevStepId(currentStep.id);
            showStep(prevStepId);
        });
    });
}

function getNextStepId(currentStepId) {
    const steps = ['step1', 'step2', 'step3'];
    const currentIndex = steps.indexOf(currentStepId);
    return steps[currentIndex + 1] || currentStepId;
}

function getPrevStepId(currentStepId) {
    const steps = ['step1', 'step2', 'step3'];
    const currentIndex = steps.indexOf(currentStepId);
    return steps[currentIndex - 1] || currentStepId;
}

function showStep(stepId) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });

    // Show target step
    const targetStep = document.getElementById(stepId);
    if (targetStep) {
        targetStep.classList.add('active');

        // Smooth scroll to step
        targetStep.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    // Update progress indicator
    updateProgressIndicator(stepId);
}

function updateProgressIndicator(activeStepId) {
    const steps = ['step1', 'step2', 'step3'];
    const activeIndex = steps.indexOf(activeStepId);

    // Update existing progress indicators
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressConnectors = document.querySelectorAll('.progress-connector');

    progressSteps.forEach((step, index) => {
        // Reset classes
        step.classList.remove('completed', 'active');

        // Add appropriate classes
        if (index <= activeIndex) {
            step.classList.add('completed');
        }
        if (steps[index] === activeStepId) {
            step.classList.add('active');
        }
    });

    progressConnectors.forEach((connector, index) => {
        connector.classList.toggle('completed', index < activeIndex);
    });
}

function getStepLabel(stepId) {
    const labels = {
        'step1': 'Tarih & Saat',
        'step2': 'İletişim',
        'step3': 'Onay'
    };
    return labels[stepId] || '';
}

// Form validation
function validateCurrentStep(step) {
    const requiredFields = step.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'Bu alan zorunludur');
            isValid = false;
        } else {
            clearFieldError(field);

            // Additional validation
            if (field.type === 'email' && !isValidEmail(field.value)) {
                showFieldError(field, 'Geçerli bir e-posta adresi girin');
                isValid = false;
            }

            if (field.type === 'tel' && !isValidPhone(field.value)) {
                showFieldError(field, 'Geçerli bir telefon numarası girin');
                isValid = false;
            }
        }
    });

    return isValid;
}

function initRealTimeValidation() {
    const form = document.getElementById('reservationForm');

    form.addEventListener('input', function(e) {
        const field = e.target;

        if (field.hasAttribute('required') && field.value.trim()) {
            clearFieldError(field);

            // Real-time validation for specific fields
            if (field.type === 'email') {
                if (!isValidEmail(field.value)) {
                    showFieldError(field, 'Geçerli bir e-posta adresi girin');
                }
            }

            if (field.type === 'tel') {
                if (!isValidPhone(field.value)) {
                    showFieldError(field, 'Geçerli bir telefon numarası girin');
                }
            }
        }

        // Update summary in real-time
        updateReservationSummary();
    });
}

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
    // Turkish phone number validation
    const phoneRegex = /^(\+90|0)?[5][0-9]{9}$/;
    const cleanPhone = phone.replace(/\s+/g, '').replace(/[-()]/g, '');
    return phoneRegex.test(cleanPhone);
}

// Date restrictions
function initDateRestrictions() {
    const dateInput = document.getElementById('reservationDate');
    if (!dateInput) return;

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30);

    dateInput.min = tomorrow.toISOString().split('T')[0];
    dateInput.max = maxDate.toISOString().split('T')[0];

    // Set default date to tomorrow
    dateInput.value = tomorrow.toISOString().split('T')[0];

    // Update available times based on date
    dateInput.addEventListener('change', function() {
        updateAvailableTimes(this.value);
    });
}

function updateAvailableTimes(selectedDate) {
    const timeSelect = document.getElementById('reservationTime');
    const selectedDateObj = new Date(selectedDate);
    const today = new Date();

    // Reset options
    const options = timeSelect.querySelectorAll('option');
    options.forEach(option => {
        if (option.value) {
            option.disabled = false;
        }
    });

    // If selected date is today, disable past times
    if (selectedDateObj.toDateString() === today.toDateString()) {
        const currentHour = today.getHours();
        const currentMinute = today.getMinutes();

        options.forEach(option => {
            if (option.value) {
                const [hour, minute] = option.value.split(':').map(Number);
                if (hour < currentHour || (hour === currentHour && minute <= currentMinute)) {
                    option.disabled = true;
                }
            }
        });
    }
}

// Phone number masking
function initPhoneMask() {
    const phoneInput = document.getElementById('phone');
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

// Update reservation summary
function initSummaryUpdates() {
    updateReservationSummary();

    // Update summary when form changes
    document.getElementById('reservationForm').addEventListener('input', updateReservationSummary);
}

function updateReservationSummary() {
    const summaryDate = document.getElementById('summaryDate');
    const summaryTime = document.getElementById('summaryTime');
    const summaryPartySize = document.getElementById('summaryPartySize');
    const summaryName = document.getElementById('summaryName');
    const summaryEmail = document.getElementById('summaryEmail');
    const summaryPhone = document.getElementById('summaryPhone');
    const summaryRequests = document.getElementById('summaryRequests');

    // Get form values
    const date = document.getElementById('reservationDate').value;
    const time = document.getElementById('reservationTime').value;
    const partySize = document.getElementById('partySize').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const requests = document.getElementById('specialRequests').value;

    // Format date
    if (date) {
        const dateObj = new Date(date);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        summaryDate.textContent = dateObj.toLocaleDateString('tr-TR', options);
    }

    summaryTime.textContent = time || '-';
    summaryPartySize.textContent = partySize ? partySize + ' Kişi' : '-';
    summaryName.textContent = (firstName + ' ' + lastName).trim() || '-';
    summaryEmail.textContent = email || '-';
    summaryPhone.textContent = phone || '-';

    if (requests.trim()) {
        summaryRequests.style.display = 'flex';
        summaryRequests.querySelector('.value').textContent = requests;
    } else {
        summaryRequests.style.display = 'none';
    }
}

// Handle reservation submission
function handleReservationSubmit(e) {
    e.preventDefault();

    const submitButton = document.getElementById('submitReservation');
    const originalText = submitButton.innerHTML;

    // Disable button and show loading
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Rezervasyon yapılıyor...';

    // Collect form data
    const formData = new FormData(e.target);
    const reservationData = {
        date: formData.get('date'),
        time: formData.get('time'),
        partySize: formData.get('partySize'),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        specialRequests: formData.get('specialRequests'),
        timestamp: new Date().toISOString(),
        status: 'pending'
    };

    // Simulate API call (replace with actual Firebase integration)
    setTimeout(() => {
        // Simulate success
        showNotification('Rezervasyonunuz başarıyla alındı! En kısa sürede size geri dönüş yapacağız.', 'success');

        // Reset form and go back to first step
        e.target.reset();
        showStep('step1');

        // Re-enable button
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;

        // Log reservation data (for demo purposes)
        console.log('Reservation Data:', reservationData);

        // In a real implementation, you would send this to Firebase:
        // firebase.firestore().collection('reservations').add(reservationData)

    }, 2000);
}

// Utility function for notifications (defined in main.js)
function showNotification(message, type) {
    if (window.RestaurantApp && window.RestaurantApp.showNotification) {
        window.RestaurantApp.showNotification(message, type);
    } else {
        alert(message); // Fallback
    }
}

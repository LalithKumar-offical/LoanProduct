// Global variables
let currentRole = '';

// Page management
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// Role selection
document.addEventListener('DOMContentLoaded', function() {
    const roleCards = document.querySelectorAll('.role-card');
    
    roleCards.forEach(card => {
        card.addEventListener('click', function() {
            const role = this.dataset.role;
            showLogin(role);
        });
        
        // Add hover sound effect (optional)
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Show login page
function showLogin(role) {
    currentRole = role;
    const loginTitle = document.getElementById('loginTitle');
    const loginRoleIcon = document.getElementById('loginRoleIcon');
    const loginFooter = document.getElementById('loginFooter');
    
    // Clear any previous error messages
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
    
    // Clear form fields
    const form = document.getElementById('loginForm');
    if (form) {
        form.reset();
    }
    
    // Update login page based on role
    switch(role) {
        case 'admin':
            loginTitle.textContent = 'Admin Login';
            loginRoleIcon.innerHTML = '<i class="fas fa-shield-alt"></i>';
            loginRoleIcon.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            loginFooter.style.display = 'none';
            break;
        case 'branch-manager':
            loginTitle.textContent = 'Branch Manager Login';
            loginRoleIcon.innerHTML = '<i class="fas fa-building"></i>';
            loginRoleIcon.style.background = 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
            loginFooter.style.display = 'none';
            break;
        case 'customer':
            loginTitle.textContent = 'Customer Login';
            loginRoleIcon.innerHTML = '<i class="fas fa-user"></i>';
            loginRoleIcon.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            loginFooter.style.display = 'block';
            break;
    }
    
    showPage('loginPage');
}

// Show signup page
function showSignup() {
    if (currentRole === 'customer') {
        showPage('customerSignup');
    } else if (currentRole === 'branch-manager') {
        showPage('branchManagerSignup');
    }
}

// Show forgot password
function showForgotPassword() {
    const forgotTitle = document.getElementById('forgotTitle');
    const forgotRoleIcon = document.getElementById('forgotRoleIcon');
    
    // Clear form
    const form = document.getElementById('forgotForm');
    if (form) {
        form.reset();
    }
    
    switch(currentRole) {
        case 'admin':
            forgotTitle.textContent = 'Admin Password Reset';
            forgotRoleIcon.innerHTML = '<i class="fas fa-shield-alt"></i>';
            forgotRoleIcon.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            break;
        case 'branch-manager':
            forgotTitle.textContent = 'Branch Manager Password Reset';
            forgotRoleIcon.innerHTML = '<i class="fas fa-building"></i>';
            forgotRoleIcon.style.background = 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
            break;
        case 'customer':
            forgotTitle.textContent = 'Customer Password Reset';
            forgotRoleIcon.innerHTML = '<i class="fas fa-user"></i>';
            forgotRoleIcon.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            break;
    }
    
    showPage('forgotPassword');
}

// Back to role selection
function backToRoleSelection() {
    showPage('roleSelection');
    currentRole = '';
}

// Back to login
function backToLogin() {
    showLogin(currentRole);
}

// Password toggle
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggle = input.nextElementSibling;
    const icon = toggle.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
}

function updatePasswordStrength(inputId) {
    const input = document.getElementById(inputId);
    const strengthBar = input.closest('.form-group').querySelector('.strength-fill');
    const strengthText = input.closest('.form-group').querySelector('.strength-text');
    
    if (!strengthBar || !strengthText) return;
    
    const strength = checkPasswordStrength(input.value);
    const percentage = (strength / 5) * 100;
    
    strengthBar.style.width = percentage + '%';
    
    const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const strengthColors = ['#ef4444', '#f59e0b', '#f59e0b', '#10b981', '#10b981'];
    
    if (input.value.length > 0) {
        strengthText.textContent = `Password strength: ${strengthLabels[strength - 1] || 'Very Weak'}`;
        strengthBar.style.background = strengthColors[strength - 1] || '#ef4444';
    } else {
        strengthText.textContent = 'Password strength';
        strengthBar.style.width = '0%';
    }
}

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    const errorDiv = field.closest('.form-group').querySelector('.field-error');
    
    field.style.borderColor = '#ef4444';
    field.style.backgroundColor = '#fef2f2';
    if (errorDiv) {
        errorDiv.textContent = message;
    }
}

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    const errorDiv = field.closest('.form-group').querySelector('.field-error');
    
    field.style.borderColor = '#e5e7eb';
    field.style.backgroundColor = 'white';
    if (errorDiv) {
        errorDiv.textContent = '';
    }
}

// Real-time validation
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for real-time validation after a delay to ensure DOM is ready
    setTimeout(() => {
        const inputs = document.querySelectorAll('input, select');
        
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                clearFieldError(this.id);
                
                // Password strength checking
                if (this.type === 'password' && (this.id.includes('Password') && !this.id.includes('Confirm'))) {
                    updatePasswordStrength(this.id);
                }
            });
            
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }, 100);
});

function validateField(field) {
    const value = field.value.trim();
    const fieldId = field.id;
    
    // Email validation
    if (field.type === 'email' && value && !validateEmail(value)) {
        showFieldError(fieldId, 'Please enter a valid email address');
        return false;
    }
    
    // Phone validation
    if (field.type === 'tel' && value && !validatePhone(value)) {
        showFieldError(fieldId, 'Please enter a valid phone number');
        return false;
    }
    
    // Age validation
    if (fieldId === 'custAge' && value) {
        const age = parseInt(value);
        if (age < 18) {
            showFieldError(fieldId, 'You must be at least 18 years old');
            return false;
        }
        if (age > 100) {
            showFieldError(fieldId, 'Please enter a valid age');
            return false;
        }
    }
    
    // Password validation
    if (field.type === 'password' && fieldId.includes('Password') && !fieldId.includes('Confirm')) {
        if (value && value.length < 8) {
            showFieldError(fieldId, 'Password must be at least 8 characters');
            return false;
        }
        if (value && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
            showFieldError(fieldId, 'Password must contain uppercase, lowercase, and number');
            return false;
        }
    }
    
    // Confirm password validation
    if (fieldId.includes('ConfirmPassword')) {
        const passwordField = document.getElementById(fieldId.replace('Confirm', ''));
        if (passwordField && value !== passwordField.value) {
            showFieldError(fieldId, 'Passwords do not match');
            return false;
        }
    }
    
    return true;
}

// Form submissions
document.addEventListener('DOMContentLoaded', function() {
    // Wait for DOM to be fully loaded
    setTimeout(() => {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleLogin();
            });
        }
        
        // Branch Manager signup form
        const branchManagerForm = document.getElementById('branchManagerForm');
        if (branchManagerForm) {
            branchManagerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleBranchManagerSignup();
            });
        }
        
        // Customer signup form
        const customerForm = document.getElementById('customerForm');
        if (customerForm) {
            customerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleCustomerSignup();
            });
        }
        
        // Forgot password form
        const forgotForm = document.getElementById('forgotForm');
        if (forgotForm) {
            forgotForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleForgotPassword();
            });
        }
    }, 100);
});

function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const submitBtn = document.getElementById('loginSubmitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const errorDiv = document.getElementById('loginError');
    
    // Hide previous errors
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
    
    // Validate fields
    if (!email || !password) {
        if (errorDiv) {
            errorDiv.style.display = 'block';
            errorDiv.querySelector('span').textContent = 'Please fill in all fields';
        }
        return;
    }
    
    if (!validateEmail(email)) {
        showFieldError('loginEmail', 'Please enter a valid email address');
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    if (btnText) btnText.style.display = 'none';
    if (btnLoader) btnLoader.style.display = 'flex';
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.disabled = false;
        if (btnText) btnText.style.display = 'block';
        if (btnLoader) btnLoader.style.display = 'none';
        
        // Check credentials based on role
        let isValidLogin = false;
        let welcomeMessage = '';
        
        switch (currentRole) {
            case 'admin':
                if (email === 'admin@finsphere.com' && password === 'admin123') {
                    isValidLogin = true;
                    welcomeMessage = 'Login successful! Welcome Admin.';
                }
                break;
            case 'branch-manager':
                if (email === 'manager@finsphere.com' && password === 'manager123') {
                    isValidLogin = true;
                    welcomeMessage = 'Login successful! Welcome Branch Manager.';
                }
                break;
            case 'customer':
                if (email === 'user@finsphere.com' && password === 'user123') {
                    isValidLogin = true;
                    welcomeMessage = 'Login successful! Welcome Customer.';
                }
                break;
        }
        
        if (isValidLogin) {
            showSuccessModal('Success!', welcomeMessage, true); // Pass redirect flag
        } else {
            if (errorDiv) {
                errorDiv.style.display = 'block';
                errorDiv.querySelector('span').textContent = 'Invalid email or password. Please try again.';
            }
        }
    }, 2000);
}

function handleBranchManagerSignup() {
    const form = document.getElementById('branchManagerForm');
    if (!form) return;
    
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Validate all fields
    let isValid = true;
    const inputs = form.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showFieldError(input.id, 'This field is required');
            isValid = false;
        } else if (!validateField(input)) {
            isValid = false;
        }
    });
    
    // Check terms acceptance
    const termsCheckbox = document.getElementById('bmTerms');
    if (termsCheckbox && !termsCheckbox.checked) {
        showFieldError('bmTerms', 'You must accept the terms and conditions');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Show loading state
    submitBtn.disabled = true;
    if (btnText) btnText.style.display = 'none';
    if (btnLoader) btnLoader.style.display = 'flex';
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.disabled = false;
        if (btnText) btnText.style.display = 'block';
        if (btnLoader) btnLoader.style.display = 'none';
        
        showSuccessModal(
            'Account Created Successfully!',
            'Your Branch Manager account has been created and is pending approval. You will receive an email notification once your account is approved.'
        );
    }, 2000);
}

function handleCustomerSignup() {
    const form = document.getElementById('customerForm');
    if (!form) return;
    
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Validate all fields
    let isValid = true;
    const inputs = form.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showFieldError(input.id, 'This field is required');
            isValid = false;
        } else if (!validateField(input)) {
            isValid = false;
        }
    });
    
    // Check terms acceptance
    const termsCheckbox = document.getElementById('custTerms');
    if (termsCheckbox && !termsCheckbox.checked) {
        showFieldError('custTerms', 'You must accept the terms and conditions');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Show loading state
    submitBtn.disabled = true;
    if (btnText) btnText.style.display = 'none';
    if (btnLoader) btnLoader.style.display = 'flex';
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.disabled = false;
        if (btnText) btnText.style.display = 'block';
        if (btnLoader) btnLoader.style.display = 'none';
        
        showSuccessModal(
            'Welcome to FinSphere!',
            'Your customer account has been created successfully. You can now log in and start exploring our loan products and services.'
        );
    }, 2000);
}

function handleForgotPassword() {
    const email = document.getElementById('forgotEmail').value;
    const submitBtn = document.querySelector('#forgotForm .submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    if (!email || !validateEmail(email)) {
        showFieldError('forgotEmail', 'Please enter a valid email address');
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    if (btnText) btnText.style.display = 'none';
    if (btnLoader) btnLoader.style.display = 'flex';
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.disabled = false;
        if (btnText) btnText.style.display = 'block';
        if (btnLoader) btnLoader.style.display = 'none';
        
        showSuccessModal(
            'Reset Link Sent!',
            `If an account with email ${email} exists, a password reset link has been sent to your inbox. Please check your email and follow the instructions to reset your password.`
        );
    }, 2000);
}

// Modal functions
function showSuccessModal(title, message, shouldRedirect = false) {
    const modal = document.getElementById('successModal');
    const titleElement = document.getElementById('successTitle');
    const messageElement = document.getElementById('successMessage');
    
    if (titleElement) titleElement.textContent = title;
    if (messageElement) messageElement.textContent = message;
    if (modal) {
        modal.style.display = 'block';
        
        // Store redirect flag
        modal.dataset.shouldRedirect = shouldRedirect;
        
        // Add click outside to close
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        const shouldRedirect = modal.dataset.shouldRedirect === 'true';
        modal.style.display = 'none';
        
        if (shouldRedirect) {
            // Redirect based on current role
            redirectToDashboard();
        } else {
            // Normal behavior for signup success
            if (currentRole) {
                showLogin(currentRole);
            } else {
                showPage('roleSelection');
            }
        }
    }
}

// New function to handle dashboard redirects
function redirectToDashboard() {
    switch (currentRole) {
        case 'admin':
            // Redirect to admin dashboard
            window.location.href = 'admin.html';
            break;
        case 'branch-manager':
            // Redirect to branch manager dashboard
            window.location.href = 'branch-manager.html';
            break;
        case 'customer':
            // Redirect to customer dashboard
            window.location.href = 'customer.html';
            break;
        default:
            // Fallback to role selection
            showPage('roleSelection');
    }
}

// Add smooth scrolling and enhanced interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons
    setTimeout(() => {
        const buttons = document.querySelectorAll('.submit-btn, .role-card');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Add floating animation to background shapes
        const shapes = document.querySelectorAll('.floating-shape');
        shapes.forEach((shape, index) => {
            shape.style.animationDelay = `${index * 2}s`;
        });
    }, 100);
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .submit-btn, .role-card {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);
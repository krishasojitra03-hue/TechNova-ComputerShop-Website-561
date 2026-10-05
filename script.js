/* ===================================================================
   TechNova Computers - Interactive JavaScript Engine
   Features: Mobile Nav, Real-time Filter & Search, Form Validation,
             URL Query Prefill, Modal Alerts & Scroll Animations
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initCurrentYear();
    initProductFilters();
    initEnquiryForm();
    initPrefillFromUrl();
    initScrollReveal();
});

/* --- 1. Mobile Navigation & Sticky Header --- */
function initNavigation() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    const navbar = document.querySelector('.navbar');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburgerBtn.classList.toggle('active');
            navLinks.classList.toggle('open');
            document.body.classList.toggle('nav-locked');
        });

        // Close menu when clicking outside or clicking any nav link
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                hamburgerBtn.classList.remove('active');
                navLinks.classList.remove('open');
                document.body.classList.remove('nav-locked');
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navLinks.classList.remove('open');
                document.body.classList.remove('nav-locked');
            });
        });
    }

    // Sticky navbar backdrop shadow on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });

    // Highlight current page active link
    highlightActivePage();
}

function highlightActivePage() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-link');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/* --- 2. Scroll Utilities & Back-to-Top --- */
function initScrollEffects() {
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 350) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/* --- 3. Dynamic Footer Year --- */
function initCurrentYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const year = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = year;
    });
}

/* --- 4. Products Filter & Live Search --- */
function initProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('product-search');
    const productCards = document.querySelectorAll('.product-card');
    const noResultsMsg = document.getElementById('no-products-found');

    if (!productCards.length) return;

    let activeCategory = 'all';
    let searchQuery = '';

    function filterProducts() {
        let visibleCount = 0;

        productCards.forEach(card => {
            const category = card.getAttribute('data-category') || '';
            const title = card.querySelector('.product-title')?.textContent.toLowerCase() || '';
            const desc = card.querySelector('.product-desc')?.textContent.toLowerCase() || '';
            const specs = card.querySelector('.product-specs-list')?.textContent.toLowerCase() || '';

            const matchesCategory = (activeCategory === 'all' || category.toLowerCase() === activeCategory.toLowerCase());
            const matchesSearch = !searchQuery || 
                title.includes(searchQuery) || 
                desc.includes(searchQuery) || 
                specs.includes(searchQuery) || 
                category.toLowerCase().includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
                card.style.animation = 'fadeInCard 0.4s ease forwards';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (noResultsMsg) {
            noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.getAttribute('data-filter') || 'all';
            filterProducts();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim().toLowerCase();
            filterProducts();
        });
    }

    // Check if category was passed via query parameter (e.g., products.html?category=gaming)
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('category');
    if (catParam) {
        const targetBtn = Array.from(filterButtons).find(btn => 
            btn.getAttribute('data-filter')?.toLowerCase() === catParam.toLowerCase()
        );
        if (targetBtn) {
            targetBtn.click();
        }
    }
}

/* --- 5. URL Query Prefill for Enquiry Page --- */
function initPrefillFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const itemParam = urlParams.get('item');
    const serviceParam = urlParams.get('service');
    const selectElem = document.getElementById('enquiry-interest');
    const messageElem = document.getElementById('enquiry-message');

    const targetValue = itemParam || serviceParam;

    if (targetValue && selectElem) {
        // Look for match in options
        let found = false;
        for (let i = 0; i < selectElem.options.length; i++) {
            if (selectElem.options[i].text.toLowerCase().includes(targetValue.toLowerCase())) {
                selectElem.selectedIndex = i;
                found = true;
                break;
            }
        }

        // If not found in select dropdown, select "Custom Build / Other" and write in message
        if (!found) {
            for (let i = 0; i < selectElem.options.length; i++) {
                if (selectElem.options[i].value === 'other') {
                    selectElem.selectedIndex = i;
                    break;
                }
            }
        }

        if (messageElem && !messageElem.value) {
            messageElem.value = `Hello TechNova team, I am interested in: "${decodeURIComponent(targetValue)}". Please share specifications, pricing, and availability.`;
        }
    }
}

/* --- 6. Enquiry Form Validation & Submission Modal --- */
function initEnquiryForm() {
    const form = document.getElementById('tnc-enquiry-form');
    if (!form) return;

    const nameInput = document.getElementById('enquiry-name');
    const emailInput = document.getElementById('enquiry-email');
    const phoneInput = document.getElementById('enquiry-phone');
    const interestSelect = document.getElementById('enquiry-interest');
    const budgetSelect = document.getElementById('enquiry-budget');
    const messageInput = document.getElementById('enquiry-message');
    const contactMethodRadios = document.querySelectorAll('input[name="contact_method"]');

    const modal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalWhatsappBtn = document.getElementById('modal-whatsapp-link');

    // Realtime error clearing
    [nameInput, emailInput, phoneInput, interestSelect, budgetSelect, messageInput].forEach(field => {
        if (!field) return;
        field.addEventListener('input', () => clearFieldError(field));
        field.addEventListener('change', () => clearFieldError(field));
    });

    // Validation rules
    function validateForm() {
        let isValid = true;

        // Name Validation (At least 3 characters)
        if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
            showFieldError(nameInput, 'Please enter your full name (minimum 3 characters).');
            isValid = false;
        } else {
            showFieldSuccess(nameInput);
        }

        // Email Validation (RFC standard pattern)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
            showFieldError(emailInput, 'Please enter a valid email address (e.g., yourname@domain.com).');
            isValid = false;
        } else {
            showFieldSuccess(emailInput);
        }

        // Indian 10-Digit Phone Validation (Starts with 6-9, followed by 9 digits)
        const phoneClean = phoneInput.value.trim().replace(/[\s\-+]/g, '');
        const phonePattern = /^(91)?[6-9]\d{9}$/;
        if (!phoneClean || !phonePattern.test(phoneClean)) {
            showFieldError(phoneInput, 'Please enter a valid 10-digit Indian mobile number (e.g., 9876543210).');
            isValid = false;
        } else {
            showFieldSuccess(phoneInput);
        }

        // Product/Service Selection
        if (!interestSelect.value) {
            showFieldError(interestSelect, 'Please select the product or service you are enquiring about.');
            isValid = false;
        } else {
            showFieldSuccess(interestSelect);
        }

        // Budget Selection
        if (!budgetSelect.value) {
            showFieldError(budgetSelect, 'Please select your estimated budget range.');
            isValid = false;
        } else {
            showFieldSuccess(budgetSelect);
        }

        // Message Validation
        if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
            showFieldError(messageInput, 'Please share a brief message describing your requirement (minimum 10 characters).');
            isValid = false;
        } else {
            showFieldSuccess(messageInput);
        }

        return isValid;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Generate Random Reference ID
            const randomCode = Math.floor(1000 + Math.random() * 9000);
            const refId = `TNC-2026-${randomCode}`;

            // Get selected contact method
            let selectedMethod = 'Phone Call';
            contactMethodRadios.forEach(radio => {
                if (radio.checked) selectedMethod = radio.value;
            });

            // Populate Modal Content
            document.getElementById('modal-ref-id').textContent = refId;
            document.getElementById('modal-client-name').textContent = nameInput.value.trim();
            document.getElementById('modal-phone-num').textContent = phoneInput.value.trim();
            document.getElementById('modal-interest-val').textContent = interestSelect.options[interestSelect.selectedIndex].text;
            document.getElementById('modal-contact-method').textContent = selectedMethod;

            // Show Confirmation Modal
            modal.classList.add('active');

            // Reset form fields
            form.reset();
            clearAllFieldHighlights();
        }
    });

    // Reset button handler
    form.addEventListener('reset', () => {
        setTimeout(() => {
            clearAllFieldHighlights();
        }, 10);
    });

    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    function showFieldError(input, errorText) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        const parent = input.closest('.form-group');
        let errorEl = parent.querySelector('.error-message');
        if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.className = 'error-message';
            parent.appendChild(errorEl);
        }
        errorEl.innerHTML = `<i class="fas fa-circle-exclamation"></i> ${errorText}`;
        errorEl.classList.add('show');
    }

    function showFieldSuccess(input) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        const parent = input.closest('.form-group');
        const errorEl = parent.querySelector('.error-message');
        if (errorEl) {
            errorEl.classList.remove('show');
        }
    }

    function clearFieldError(input) {
        input.classList.remove('is-invalid');
        const parent = input.closest('.form-group');
        const errorEl = parent.querySelector('.error-message');
        if (errorEl) {
            errorEl.classList.remove('show');
        }
    }

    function clearAllFieldHighlights() {
        const fields = form.querySelectorAll('.form-control, .form-select');
        fields.forEach(f => {
            f.classList.remove('is-invalid', 'is-valid');
        });
        const errors = form.querySelectorAll('.error-message');
        errors.forEach(err => err.classList.remove('show'));
    }
}

/* --- 7. Subtle Scroll Reveal Animations --- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.glass-card, .why-card, .service-card, .product-card, .testimonial-card, .pillar-card');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            observer.observe(el);
        });

        // Trigger reveal CSS
        const style = document.createElement('style');
        style.innerHTML = `
            .revealed {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            @keyframes fadeInCard {
                from { opacity: 0; transform: scale(0.96); }
                to { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

# TechNova Computers — Web Application

> **Project Title:** TechNova Computers - Modern Computer Shop & Hardware Enquiry Portal  
> **Location:** `C:\Users\KRISHA\Desktop\Krisha`  
> **Contact Details:** Phone: `+91 98765 43210` | Email: `info@technovacomputers.com` | Website: `www.technovacomputers.com`

---

## 📌 Project Overview
**TechNova Computers** is a responsive web application designed for a modern computer retail, custom PC architecture, and technical hardware repair center. 

The website features an original dark navy and electric blue / neon cyan theme with glassmorphism UI elements, micro-interactions, responsive design across all screen sizes, and client-side form validation.

---

## 🗂️ File Structure
```
Krisha/
├── index.html            # Home page (Hero, Featured Gear, Why Us, Services, Testimonials, CTA)
├── products.html         # Hardware catalog with live search & 7-category filtering
├── services.html         # 9 technical services, diagnostic workflow & booking
├── about.html            # Company background, 4 core pillars & engineering bench info
├── enquiry.html          # Interactive enquiry portal with full JS validation & modal
├── style.css             # Unified CSS design system & responsive styling
├── script.js             # Client-side validation, search/filters, mobile drawer, modals
├── README.md             # Project documentation guide
└── assets/
    └── images/           # High-resolution technology photography & components
        ├── hero-setup.jpg
        ├── gaming-pc.jpg
        ├── workstation-pc.jpg
        ├── laptop-pro.jpg
        ├── laptop-ultrabook.jpg
        ├── laptop-creator.jpg
        ├── desktop-allinone.jpg
        ├── custom-pc-build.jpg
        ├── monitor-ultrawide.jpg
        ├── monitor-gaming.jpg
        ├── keyboard-mouse.jpg
        ├── gaming-mouse.jpg
        ├── printer.jpg
        ├── nvme-ssd.jpg
        ├── ram-ssd.jpg
        ├── accessories-headset.jpg
        ├── wifi-router.jpg
        ├── technician-repair.jpg
        └── about-store.jpg
```

---

## 🚀 Key Features

### 1. Home Page (`index.html`)
- **Hero Section:** "Computer Shop" with dual CTAs ("Explore Products" and "Send Enquiry") and modern battlestation imagery.
- **Section Breakdown:**
  1. *Featured Products:* Flagship liquid-cooled gaming PC, AI ultrabook, curved ultrawide monitor, and wireless mechanical set.
  2. *Why Choose Us:* 100% Genuine Brands, Certified Tech Engineers, Custom PC Builds, Transparent Pricing.
  3. *Our Services Preview:* Repair, SSD/RAM upgrades, custom architectures.
  4. *Customer Highlights:* Authentic user and developer testimonials.
  5. *Call to Action:* Direct consultation prompt.

### 2. Product Catalog (`products.html`)
- **Product Categories (7 Categories):**
  - Laptops
  - Desktop PCs
  - Gaming PCs
  - Monitors
  - Keyboards & Mouse
  - Printers
  - Computer Accessories
- **Interactive Features:**
  - Real-time search filter across product titles, descriptions, and specifications.
  - Category pill filter tabs with smooth transitions.
  - "Enquire Now" button on every card that redirects to `enquiry.html` and automatically pre-fills the enquiry form with that product.

### 3. Services Page (`services.html`)
- **4 Core Services:**
  1. Computer / Laptop Repair
  2. SSD & RAM Memory Upgrade
  3. Custom PC Architecture & Assembly
  4. Windows & Software Setup
- **4-Step Diagnostic Workflow:** Intake -> Transparent Estimate -> Precision Repair -> Quality Benchmark.

### 4. About Us Page (`about.html`)
- Overview of TechNova Computers shop and in-house engineering lab.
- **The Four Pillars:** Quality Products, Expert Support, Affordable Solutions, Customer Satisfaction.

### 5. Enquiry & Contact Portal (`enquiry.html`)
- **Comprehensive Enquiry Form:**
  - Full Name (required, min 3 characters)
  - Email Address (valid RFC email regex)
  - Phone Number (10-digit Indian phone validation: `^[6-9]\d{9}$`)
  - Product/Service selection dropdown (grouped into Products and Services)
  - Budget range selector
  - Preferred contact method (Phone Call, Email, In-Store Visit)
  - Message requirement field (min 10 characters)
  - Submit Enquiry & Reset Form buttons
- **Submission Feedback:** Generates a unique reference ticket (e.g. `TNC-2026-XXXX`) and renders an animated glassmorphic modal with a summary of the enquiry.
- **Contact Details Card:**
  - Website: `www.technovacomputers.com`
  - Phone: `+91 98765 43210` (`tel:+919876543210`)
  - Email: `info@technovacomputers.com` (`mailto:info@technovacomputers.com`)

---

## 💻 How to Run Locally
1. Navigate to the folder:
   `C:\Users\KRISHA\Desktop\Krisha`
2. Double-click **`index.html`** or right-click and choose **Open with -> Google Chrome / Microsoft Edge / Firefox**.
3. No server is required; all CSS, JavaScript, and images are relative and work seamlessly under the `file:///` protocol.

// Smooth scroll for navigation links
document.querySelectorAll(".nav-links li").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionId = link.textContent.toLowerCase().replace(" ", "-");
    document.querySelector(`.${sectionId}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// Advanced product hover effects
const productCards = document.querySelectorAll(".product-card, .deal-card");
productCards.forEach((card) => {
  const image = card.querySelector("img");
  const button = card.querySelector("button");

  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      scale: 1.05,
      boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
      duration: 0.3,
    });
    gsap.to(image, {
      scale: 1.1,
      duration: 0.3,
    });
    gsap.to(button, {
      opacity: 1,
      y: 0,
      duration: 0.3,
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      scale: 1,
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      duration: 0.3,
    });
    gsap.to(image, {
      scale: 1,
      duration: 0.3,
    });
    gsap.to(button, {
      opacity: 0,
      y: 20,
      duration: 0.3,
    });
  });
});

// Enhanced add to cart functionality with cart simulation
const cart = {
  items: [],
  total: 0,
  addItem(product, price) {
    this.items.push({ product, price });
    this.total += price;
    this.updateCartDisplay();
  },
  updateCartDisplay() {
    const cartIcon = document.querySelector(".nav-icons span:last-child");
    const cartCount = document.createElement("span");
    cartCount.classList.add("cart-count");
    cartCount.textContent = this.items.length;

    // Remove existing count if any
    const existingCount = cartIcon.querySelector(".cart-count");
    if (existingCount) existingCount.remove();

    cartIcon.appendChild(cartCount);
  },
};

const addToCartButtons = document.querySelectorAll(
  ".product-card button, .deal-card button"
);
addToCartButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card, .deal-card");
    const productName = card.querySelector("h3").textContent;
    const price = parseFloat(
      card.querySelector("p").textContent.replace("$", "")
    );

    // Add animation to cart icon
    const cartIcon = document.querySelector(".nav-icons span:last-child");
    gsap.fromTo(
      cartIcon,
      { scale: 1 },
      {
        scale: 1.2,
        repeat: 1,
        yoyo: true,
        duration: 0.2,
      }
    );

    // Add to cart
    cart.addItem(productName, price);

    // Show toast notification
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.textContent = `Added ${productName} to cart`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => document.body.removeChild(toast), 300);
      }, 2000);
    }, 10);
  });
});

// Category hover effects with subtle animations
const categoryItems = document.querySelectorAll(".category-item");
categoryItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    gsap.to(item, {
      backgroundColor: "#f0f0f0",
      scale: 1.05,
      duration: 0.3,
    });
  });

  item.addEventListener("mouseleave", () => {
    gsap.to(item, {
      backgroundColor: "white",
      scale: 1,
      duration: 0.3,
    });
  });
});

// Newsletter signup with validation
const customTreatmentButton = document.querySelector(
  ".custom-treatment button"
);
customTreatmentButton.addEventListener("click", () => {
  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.placeholder = "Enter your email";

  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
        <div class="modal-content">
            <h2>Get Personalized Skincare</h2>
            <p>We'll create a custom routine just for you!</p>
        </div>
    `;
  modal.querySelector(".modal-content").appendChild(emailInput);

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Start Assessment";
  modal.querySelector(".modal-content").appendChild(submitBtn);

  document.body.appendChild(modal);

  submitBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      alert(
        `Thank you! We'll send a personalized skincare routine to ${email}`
      );
      document.body.removeChild(modal);
    } else {
      alert("Please enter a valid email address");
    }
  });
});

// Dynamic price display
function updatePrices() {
  const prices = document.querySelectorAll(".product-card p, .deal-card p");
  prices.forEach((priceEl) => {
    const price = parseFloat(priceEl.textContent.replace("$", ""));
    const discountedPrice = price * 0.9; // 10% off
    priceEl.innerHTML = `<s>$${price.toFixed(2)}</s> $${discountedPrice.toFixed(
      2
    )}`;
  });
}

// Run price update on page load
window.addEventListener("load", updatePrices);

// Responsive menu toggle
function handleResponsiveMenu() {
  const navLinks = document.querySelector(".nav-links");
  const menuToggle = document.querySelector(".menu-toggle");

  if (window.innerWidth <= 768) {
    menuToggle.style.display = "block";
    navLinks.style.display = "none";
  } else {
    menuToggle.style.display = "none";
    navLinks.style.display = "flex";
  }
}

// Run on load and resize
window.addEventListener("load", handleResponsiveMenu);
window.addEventListener("resize", handleResponsiveMenu);

// Add some styles for new elements
const styles = `
<style>
.cart-count {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #ff4d4d;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
}

.toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #4a90e2;
    color: white;
    padding: 15px;
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1000;
}

.toast.show {
    opacity: 1;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
    max-width: 400px;
    width: 100%;
}

.modal-content input {
    width: 100%;
    padding: 10px;
    margin: 20px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.modal-content button {
    background-color: #4a90e2;
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 5px;
    cursor: pointer;
}
</style>
`;
document.head.insertAdjacentHTML("beforeend", styles);

document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  // Create mobile nav menu
  const mobileNav = document.createElement("div");
  mobileNav.classList.add("mobile-nav");

  // Clone nav links for mobile menu
  const mobileNavLinks = Array.from(navLinks.children).map((link) => {
    const mobileLink = link.cloneNode(true);
    return mobileLink;
  });

  mobileNavLinks.forEach((link) => mobileNav.appendChild(link));

  // Insert mobile nav after nav container
  const navContainer = document.querySelector(".nav-container");
  navContainer.insertAdjacentElement("afterend", mobileNav);

  // Toggle mobile menu
  mobileMenuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (
      !mobileMenuBtn.contains(event.target) &&
      !mobileNav.contains(event.target)
    ) {
      mobileNav.classList.remove("active");
    }
  });
});

(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // Determine if the current page is within the 'pages' directory
  const inPages = location.pathname.includes("/pages/");

  // Dynamically resolve relative paths
  const paths = {
    home: inPages ? "../index.html" : "index.html",
    about: inPages ? "about.html" : "pages/about.html",
    works: inPages ? "projects.html" : "pages/projects.html",
    contact: inPages ? "contact.html" : "pages/contact.html",
    resume: inPages ? "../Ornelt_Lemellari.pdf" : "Ornelt_Lemellari.pdf",
  };

  // Inject Header
  const header = $("[data-site-header]");
  if (header) {
    header.className = "site-header";
    header.innerHTML = `
      <div class="container header">
        <a class="brand" href="${paths.home}">
          <span class="brand-mark" aria-hidden="true"></span>Ornelt
        </a>
        <button class="menu-btn" type="button" aria-controls="site-nav" aria-expanded="false">Menu</button>
        <nav class="nav" id="site-nav" aria-label="Primary">
          <a href="${paths.home}" data-nav="home">Home</a>
          <a href="${paths.about}" data-nav="about">About</a>
          <a href="${paths.works}" data-nav="projects">Works</a>
          <a href="${paths.resume}" download>Resume</a>
          <a href="${paths.contact}" data-nav="contact">Contact</a>
          <a class="resume-btn" href="${paths.resume}" download>Download CV</a>
        </nav>
      </div>
    `;
  }

  // Inject Footer
  const footer = $("[data-site-footer]");
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="container footer-inner">
        <p>© <span data-year></span> Ornelt Lemellari</p>
        <p>Built with HTML, CSS, and JavaScript</p>
      </div>
    `;
  }

  // Set current year in footer
  const yearEl = $("[data-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Set active state on nav links
  const currentPage = document.body?.dataset?.page;
  if (currentPage) {
    $$("#site-nav a[data-nav]").forEach((link) => {
      if (link.dataset.nav === currentPage) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  // Mobile navigation menu toggle
  const menuBtn = $(".menu-btn");
  const siteNav = $("#site-nav");
  if (menuBtn && siteNav) {
    menuBtn.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
      menuBtn.textContent = isOpen ? "Close" : "Menu";
    });

    // Close mobile nav when clicking outside of it
    document.addEventListener("click", (e) => {
      if (siteNav.classList.contains("open") && !siteNav.contains(e.target) && !menuBtn.contains(e.target)) {
        siteNav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "Menu";
      }
    });
  }

  // Custom toast notification helper
  const showToast = (message) => {
    let toast = $(".toast-msg");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast-msg";
      toast.innerHTML = `<span class="icon">✓</span><span class="text"></span>`;
      document.body.appendChild(toast);
    }
    toast.querySelector(".text").textContent = message;
    
    // Trigger layout reflow to make transition work
    toast.offsetHeight; 
    toast.classList.add("show");
    
    setTimeout(() => {
      toast.classList.remove("show");
    }, 4000);
  };

  // Contact form handler
  const form = $("#contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = fd.get("name");
      const email = fd.get("email");
      const message = fd.get("message");
      
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      
      showToast("Redirecting to email client...");
      
      setTimeout(() => {
        location.href = `mailto:orneltlemellari@gmail.com?subject=Portfolio%20contact&body=${body}`;
        form.reset();
      }, 1000);
    });
  }
})();

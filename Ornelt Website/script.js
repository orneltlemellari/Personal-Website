
(() => {
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const inPages=location.pathname.includes("/pages/");
  const home=inPages?"../index.html":"index.html", about=inPages?"about.html":"pages/about.html", works=inPages?"projects.html":"pages/projects.html", contact=inPages?"contact.html":"pages/contact.html", resume=inPages?"../OrneltLemellari.pdf":"OrneltLemellari.pdf";
  const header=$("[data-site-header]");
  if(header){header.className="site-header";header.innerHTML=`<div class="container header"><a class="brand" href="${home}"><span class="brand-mark" aria-hidden="true"></span>Ornelt</a><button class="menu-btn" type="button" aria-controls="site-nav" aria-expanded="false">Menu</button><nav class="nav" id="site-nav" aria-label="Primary"><a href="${home}" data-nav="home">Home</a><a href="${about}" data-nav="about">About</a><a href="${works}" data-nav="projects">Works</a><a href="${resume}" download>Resume</a><a href="${contact}" data-nav="contact">Contact</a><a class="resume-btn" href="${resume}" download>Download CV</a></nav></div>`;}
  const footer=$("[data-site-footer]");
  if(footer){footer.className="site-footer";footer.innerHTML=`<div class="container footer-inner"><p>© <span data-year></span> Ornelt Lemellari</p><p>Built with HTML, CSS, and JavaScript</p></div>`;}
  const y=$("[data-year]"); if(y) y.textContent=new Date().getFullYear();
  const page=document.body?.dataset?.page; $$("#site-nav a[data-nav]").forEach(a=>{if(a.dataset.nav===page)a.setAttribute("aria-current","page");});
  const btn=$(".menu-btn"), nav=$("#site-nav"); if(btn&&nav) btn.addEventListener("click",()=>{const open=nav.classList.toggle("open"); btn.setAttribute("aria-expanded",String(open));});
  const form=$("#contact-form"); if(form) form.addEventListener("submit",e=>{e.preventDefault(); const fd=new FormData(form); const body=encodeURIComponent(`Name: ${fd.get("name")}\nEmail: ${fd.get("email")}\n\n${fd.get("message")}`); location.href=`mailto:orneltlemellari@gmail.com?subject=Portfolio%20contact&body=${body}`;});
})();

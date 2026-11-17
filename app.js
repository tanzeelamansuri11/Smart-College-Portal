const app = document.getElementById("app");
const nav = document.getElementById("mainNav");
const menuToggle = document.getElementById("menuToggle");
document.getElementById("year").textContent = new Date().getFullYear();

const routes = {
  home: renderHome,
  departments: renderDepartments,
  faculty: renderFaculty,
  notices: renderNotices,
  enquiry: renderEnquiry
};

function getRoute() {
  return location.hash.replace("#", "") || "home";
}

function navigate() {
  const route = getRoute();
  (routes[route] || renderNotFound)();
  document.querySelectorAll("[data-link]").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${route}`);
  });
  nav.classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderHome() {
  app.innerHTML = `
    <section class="hero">
      <div class="hero-content">
        <p class="eyebrow">D. Y. PATIL COLLEGE OF ENGINEERING · AKURDI, PUNE</p>
        <h1>Shape your future<br><span>with knowledge.</span></h1>
        <p class="hero-copy">Welcome to D. Y. Patil College of Engineering, Akurdi. Explore academic departments, meet our faculty and stay updated with college announcements.</p>
        <div class="hero-actions"><a class="btn btn-primary" href="#departments" data-link>Explore Departments</a><a class="btn btn-outline" href="#enquiry" data-link>Make an Enquiry</a></div>
      </div>
      <div class="hero-art" aria-hidden="true"><div class="art-circle"></div><div class="art-card card-one">✦<br><b>Learn</b></div><div class="art-card card-two">⌘<br><b>Create</b></div><div class="art-card card-three">↗<br><b>Grow</b></div></div>
    </section>
    <section class="stats section-wrap"><div><strong>6+</strong><span>Departments</span></div><div><strong>50+</strong><span>Faculty Members</span></div><div><strong>Industry</strong><span>Focused Learning</span></div></section>
    <section class="section-wrap intro"><div><p class="eyebrow">WELCOME TO D. Y. PATIL COLLEGE OF ENGINEERING</p><h2>A campus built for<br><span>what comes next.</span></h2></div><p>Our Smart College Portal for D. Y. Patil College of Engineering, Akurdi brings essential academic information into one place. Browse departments and courses, discover faculty profiles, read notices and send your questions through the enquiry form.</p></section>
    <section class="section-wrap"><div class="section-heading"><div><p class="eyebrow">QUICK ACCESS</p><h2>Explore the portal</h2></div></div><div class="quick-grid">
      <a class="quick-card" href="#departments" data-link><span>01</span><h3>Departments</h3><p>Explore programmes and areas of study.</p><b>Explore →</b></a>
      <a class="quick-card" href="#faculty" data-link><span>02</span><h3>Our Faculty</h3><p>Get to know the people who guide you.</p><b>Meet faculty →</b></a>
      <a class="quick-card" href="#notices" data-link><span>03</span><h3>Latest Notices</h3><p>Stay informed about college updates.</p><b>View notices →</b></a>
    </div></section>`;
}

function pageHeader(label, title, description) {
  return `<section class="page-banner"><p class="eyebrow">D. Y. PATIL COLLEGE OF ENGINEERING, AKURDI · ${label}</p><h1 class="page-title">${title}</h1><p>${description}</p></section>`;
}

async function loadJSON(file) {
  const response = await fetch(`data/${file}`);
  if (!response.ok) throw new Error(`Could not load ${file}`);
  return response.json();
}

function showError(message) {
  app.querySelector(".page-content").innerHTML = `<div class="empty">${message}. Please check that you are running the project with Live Server.</div>`;
}

async function renderDepartments() {
  app.innerHTML = pageHeader("ACADEMICS", "Our Departments", "Discover programmes, subjects and learning opportunities.") + `<section class="section-wrap page-content"><p>Loading departments...</p></section>`;
  try {
    const departments = await loadJSON("departments.json");
    app.querySelector(".page-content").innerHTML = `<div class="card-grid">${departments.map((d, i) => `
      <article class="content-card"><span class="tag">${d.code}</span><h3>${d.name}</h3><p>${d.shortDescription}</p>
      <button class="detail-toggle" aria-expanded="false">View Details +</button>
      <div class="detail"><b>Courses:</b> ${d.courses.join(", ")}<br><b>About:</b> ${d.description}</div></article>`).join("")}</div>`;
  } catch (error) { showError(error.message); }
}

async function renderFaculty() {
  app.innerHTML = pageHeader("OUR PEOPLE", "Meet Our Faculty", "Learn from experienced educators and mentors.") + `<section class="section-wrap page-content"><p>Loading faculty...</p></section>`;
  try {
    const faculty = await loadJSON("faculty.json");
    app.querySelector(".page-content").innerHTML = `<div class="card-grid">${faculty.map(f => `
      <article class="content-card"><div class="faculty-avatar">${f.initials}</div><h3>${f.name}</h3><span class="tag">${f.department}</span><p>${f.designation}</p>
      <button class="detail-toggle" aria-expanded="false">View Details +</button><div class="detail"><b>Specialization:</b> ${f.specialization}<br><b>Email:</b> ${f.email}</div></article>`).join("")}</div>`;
  } catch (error) { showError(error.message); }
}

async function renderNotices() {
  app.innerHTML = pageHeader("CAMPUS UPDATES", "Notices & Announcements", "Important information and updates for students.") + `<section class="section-wrap page-content"><p>Loading notices...</p></section>`;
  try {
    const notices = await loadJSON("notices.json");
    app.querySelector(".page-content").innerHTML = notices.map(n => `
      <article class="notice-item"><div><h3>${n.title}</h3><p>${n.description}</p></div><span class="notice-date">${n.date}</span></article>`).join("");
  } catch (error) { showError(error.message); }
}

function renderEnquiry() {
  app.innerHTML = pageHeader("GET IN TOUCH", "Student Enquiry", "Have a question? Send us your enquiry using the form below.") + `
    <section class="section-wrap page-content form-layout">
      <aside class="form-info"><p class="eyebrow">WE'RE HERE TO HELP</p><h2>Let's start a conversation.</h2><p>Fill in your details and select the department you are interested in. This student project stores enquiries in your browser using localStorage.</p></aside>
      <form class="enquiry-form" id="enquiryForm" novalidate>
        <div class="field"><label for="studentName">Full Name *</label><input id="studentName" name="studentName" placeholder="Enter your name"><div class="error" id="nameError"></div></div>
        <div class="field"><label for="email">Email Address *</label><input id="email" name="email" type="email" placeholder="name@example.com"><div class="error" id="emailError"></div></div>
        <div class="field"><label for="phone">Phone Number *</label><input id="phone" name="phone" inputmode="numeric" placeholder="10-digit mobile number"><div class="error" id="phoneError"></div></div>
        <div class="field"><label for="department">Department *</label><select id="department" name="department"><option value="">Select department</option><option>Artificial Intelligence and Data Science</option><option>Computer Engineering</option><option>Information Technology</option><option>Mechanical Engineering</option><option>Electronics and Telecommunication</option><option>Civil Engineering</option></select><div class="error" id="departmentError"></div></div>
        <div class="field"><label for="message">Your Enquiry *</label><textarea id="message" name="message" placeholder="Write your question..."></textarea><div class="error" id="messageError"></div></div>
        <button class="submit-btn" type="submit">Submit Enquiry →</button><div id="formSuccess" class="success" role="status"></div>
      </form>
    </section>`;
}

function renderNotFound() {
  app.innerHTML = pageHeader("PAGE NOT FOUND", "Sorry, this page does not exist", "Use the navigation to explore the portal.") + `<section class="section-wrap"><a class="btn btn-primary" href="#home" data-link>Go to Home</a></section>`;
}

document.addEventListener("click", event => {
  const link = event.target.closest("[data-link]");
  if (link) {
    const target = link.getAttribute("href");
    if (target && target.startsWith("#")) {
      event.preventDefault();
      if (location.hash === target) navigate();
      else location.hash = target;
    }
  }

  const toggle = event.target.closest(".detail-toggle");
  if (toggle) {
    const detail = toggle.nextElementSibling;
    detail.classList.toggle("open");
    const expanded = detail.classList.contains("open");
    toggle.textContent = expanded ? "Hide Details −" : "View Details +";
    toggle.setAttribute("aria-expanded", String(expanded));
  }
});

menuToggle.addEventListener("click", () => nav.classList.toggle("open"));
window.addEventListener("hashchange", navigate);

document.addEventListener("submit", event => {
  if (event.target.id !== "enquiryForm") return;
  event.preventDefault();
  const form = event.target;
  const values = Object.fromEntries(new FormData(form).entries());
  const errors = {
    nameError: values.studentName.trim().length < 2 ? "Please enter your full name." : "",
    emailError: !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(values.email) ? "Enter a valid email address." : "",
    phoneError: !/^[6-9]\\d{9}$/.test(values.phone.trim()) ? "Enter a valid 10-digit mobile number." : "",
    departmentError: !values.department ? "Please select a department." : "",
    messageError: values.message.trim().length < 10 ? "Please enter at least 10 characters." : ""
  };
  Object.entries(errors).forEach(([id, message]) => document.getElementById(id).textContent = message);
  if (Object.values(errors).some(Boolean)) return;

  const enquiries = JSON.parse(localStorage.getItem("collegeEnquiries") || "[]");
  enquiries.push({ ...values, submittedAt: new Date().toLocaleString() });
  localStorage.setItem("collegeEnquiries", JSON.stringify(enquiries));
  form.reset();
  document.getElementById("formSuccess").textContent = "Your enquiry has been saved successfully in this browser.";
});

navigate();

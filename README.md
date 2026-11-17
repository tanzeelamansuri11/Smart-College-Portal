# D. Y. Patil College of Engineering, Akurdi — Smart College Website Portal

A responsive, single-page-style college information portal created for the Web Technology I CCE-5 mini project.

## Features
- Home page with portal overview and quick links
- Departments loaded dynamically from `data/departments.json`
- Faculty profiles loaded dynamically from `data/faculty.json`
- Notices loaded dynamically from `data/notices.json`
- Student enquiry form with client-side validation
- Enquiries saved in browser `localStorage`
- JavaScript hash-based navigation without full page reload
- Expand/collapse details for departments and faculty
- Responsive layout for desktop, tablet and mobile screens
- Loading and error messages for JSON data

## Project structure
```text
Smart_College_Website_Portal/
├── index.html
├── style.css
├── app.js
├── README.md
└── data/
    ├── departments.json
    ├── faculty.json
    └── notices.json
```

## How to run
1. Download or clone this repository.
2. Open the folder in Visual Studio Code.
3. Install the **Live Server** extension if it is not already installed.
4. Right-click `index.html` and choose **Open with Live Server**.
5. Use the navigation links to visit each section.

> Important: Run using Live Server (or another local HTTP server). Fetching local JSON files may not work if `index.html` is opened directly with `file://`.

## College identity and logo\nThe header and footer use a locally stored SVG logo asset (`assets/dypcoe-logo.svg`) styled to match the DYP college logo appearance shown in official college academic material. The logo file is included in this repository, so it does not require an internet connection.\n\nOfficial college website: https://www.dypcoeakurdi.ac.in/\n\n## Technologies used
- HTML5 for page structure
- CSS3 for styling and responsive layout
- JavaScript (ES6) for routing, event handling, validation and data loading
- JSON for department, faculty and notice data
- Fetch API with async/await for asynchronous JSON loading
- localStorage for saving enquiry form submissions

## How the main JavaScript features work
- `navigate()` reads the current URL hash and calls the matching page-rendering function.
- `loadJSON()` uses `fetch()` to request a JSON file and checks the response status.
- `renderDepartments()`, `renderFaculty()` and `renderNotices()` load JSON and build page content dynamically.
- The click event listener handles navigation and expand/collapse buttons.
- The enquiry form submit listener validates each field and saves valid submissions to `localStorage`.

## Testing checklist
- [ ] Home page opens correctly.
- [ ] Each navigation link changes the view without a full page reload.
- [ ] Department cards appear from JSON.
- [ ] Faculty cards appear from JSON.
- [ ] Notices appear from JSON.
- [ ] View Details buttons expand and collapse information.
- [ ] Empty or invalid enquiry fields show validation messages.
- [ ] A valid enquiry is saved in localStorage.
- [ ] Layout works on desktop and mobile widths.
- [ ] JSON loading error message appears if a data file is unavailable.

## Notes
This is an academic demonstration project. Faculty names, email addresses and notices are sample data. Replace them with verified college information before any real-world use. The college logo graphic is a recreated SVG based on the logo appearance in official college material; use an official high-resolution logo file supplied by the college if one is available.

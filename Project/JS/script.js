const applicationsSection = document.querySelector(".applications_section");

const applications = [{
    id: 1,
    company: "Acme Digital",
    role: "Front-End Developer",
    status: "Interview",
    date: "2026-08-10",
    notes: "Second Interview Friday"
}, {
    id: 2,
    company: "Google",
    role: "Front-End Developer",
    status: "Applied",
    date: "2026-08-10",
    notes: "Application Sent"
}, {
    id: 3,
    company: "Facebook",
    role: "Front-End Developer",
    status: "Rejected",
    date: "2026-08-10",
    notes: "Not Invited For Interview"
}];

applications.forEach((application) => {
    const applicationCard = document.createElement("div");
    applicationCard.classList.add("applications_section_card");
    const companyLogo = document.createElement("div");
    companyLogo.classList.add("applications_company_logo");
    companyLogo.textContent = application.company;
    applicationCard.appendChild(companyLogo);
    applicationsSection.appendChild(applicationCard);
});
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

//Get Applications Total
const totalApplications = document.querySelector("#totalApplications");
totalApplications.textContent = applications.length;

//Total Applied and Percentage
const appliedApplications = applications.filter((application) => application.status === "Applied");
const totalAppliedEl = document.querySelector("#appliedApplications");
totalAppliedEl.textContent = appliedApplications.length;

let appliedPercentage;
const totalAppliedPercentage = document.querySelector("#applied_percentage");
if (applications.length === 0) {
    totalAppliedPercentage.textContent = "0%";
} else {
    appliedPercentage = Math.round(appliedApplications.length / applications.length * 100);
    totalAppliedPercentage.textContent = `${appliedPercentage}%`;
}

//Total Interview and Percentage
const interviewApplications = applications.filter((application) => application.status === "Interview");
const totalInterviewEl = document.querySelector("#interviewApplications");
totalInterviewEl.textContent = interviewApplications.length;

let interviewPercentage;
const totalInterviewPercentage = document.querySelector("#interview_percentage");
if (applications.length === 0) {
    totalInterviewPercentage.textContent = "0%";
} else {
    interviewPercentage = Math.round(interviewApplications.length / applications.length * 100);
    totalInterviewPercentage.textContent = `${interviewPercentage}%`;
}

//Total Offers and Percentage
const applicationOffers = applications.filter((application) => application.status === "Offer");
const totalOffersEl = document.querySelector("#offersApplications");
totalOffersEl.textContent = applicationOffers.length;

let offerPercentage;
const totalOffersPercentage = document.querySelector("#offer_percentage");
if (applications.length === 0) {
    totalOffersPercentage.textContent = "0%";
} else {
    offerPercentage = Math.round(applicationOffers.length / applications.length * 100);
    totalOffersPercentage.textContent = `${offerPercentage}%`;
}

//Total Rejections and Percentage
const rejectedApplications = applications.filter((application) => application.status === "Rejected");
const totalRejectedEl = document.querySelector("#rejectedApplications");
totalRejectedEl.textContent = rejectedApplications.length;

let rejectionsPercentage;
const totalRejectionPercentage = document.querySelector("#reject_percentage");
if (applications.length === 0) {
    totalRejectionPercentage.textContent = "0%";
} else {
    rejectionsPercentage = Math.round(rejectedApplications.length / applications.length * 100);
    totalRejectionPercentage.textContent = `${rejectionsPercentage}%`;
}

const createApplicationCard = application => {
    //Company Initials
    const companyWords = application.company.split(" ");
    const initials = companyWords.map(word => word.charAt(0)).join("");

    //Application Date
    const applicationDateObject = new Date(application.date);

    const applicationDateOptions = {
        day: "numeric",
        month: "short",
        year: "numeric"
    };

    const formattedApplicationDate = applicationDateObject.toLocaleDateString("en-GB", applicationDateOptions);

    const applicationCard = document.createElement("div");
    applicationCard.classList.add("applications_section_card");
    applicationsSection.appendChild(applicationCard);

    const companyLogo = document.createElement("div");
    companyLogo.classList.add("applications_company_logo");
    applicationCard.appendChild(companyLogo);
    companyLogo.textContent = initials;

    const applicationInfo = document.createElement("div");
    applicationInfo.classList.add("applications_card_info");
    applicationCard.appendChild(applicationInfo);

    const applicationHeading = document.createElement("div");
    applicationHeading.classList.add("applications_card_heading");
    applicationInfo.appendChild(applicationHeading);

    const applicationTitle = document.createElement("h3");
    applicationTitle.classList.add("applications_card_title");
    applicationTitle.textContent = application.role;
    applicationHeading.appendChild(applicationTitle);

    const applicationStatus = document.createElement("p");
    applicationStatus.classList.add("applications_card_status");
    applicationStatus.textContent = application.status;
    applicationHeading.appendChild(applicationStatus);

    switch(application.status) {
        case "Interview":
            applicationStatus.classList.add("status_interview");
            break;
        case "Applied":
            applicationStatus.classList.add("status_applied");
            break;
        case "Rejected":
            applicationStatus.classList.add("status_rejected");
            break;
        case "Offer":
            applicationStatus.classList.add("status_offer");
            break;
        case "Interested":
            applicationStatus.classList.add("status_interested");
            break;
        default:
            break;
    };

    const applicationName = document.createElement("p");
    applicationName.classList.add("applications_card_name");
    applicationName.textContent = application.company;
    applicationInfo.appendChild(applicationName);

    const applicationMeta = document.createElement("div");
    applicationMeta.classList.add("applications_card_meta");
    applicationInfo.appendChild(applicationMeta);

    const applicationDate = document.createElement("p");
    applicationDate.classList.add("applications_card_date");
    applicationDate.textContent = formattedApplicationDate;
    applicationMeta.appendChild(applicationDate)

    const applicationSeparator = document.createElement("span");
    applicationSeparator.setAttribute("aria-hidden", "true");
    applicationSeparator.textContent = "•";
    applicationMeta.appendChild(applicationSeparator);

    const applicationNotes = document.createElement("p");
    applicationNotes.classList.add("applications_card_notes");
    applicationNotes.textContent = application.notes;
    applicationMeta.appendChild(applicationNotes);

    const applicationMenu = document.createElement("button");
    applicationMenu.classList.add("applications_card_menu");
    applicationMenu.setAttribute("aria-label", "Application options");
    applicationCard.appendChild(applicationMenu);

    const applicationMenuIcon = document.createElement("i");
    applicationMenuIcon.classList.add("fa-solid", "fa-ellipsis-vertical");
    applicationMenuIcon.setAttribute("aria-hidden", "true");
    applicationMenu.appendChild(applicationMenuIcon);
};

applications.forEach((application) => {
    createApplicationCard(application);
});


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

// Totals and Percentages
const updateStat = (status, countSelector, percentageSelector) => {
    const filteredApplications = applications.filter((application) => application.status === status);

    const countElement = document.querySelector(countSelector);
    countElement.textContent = filteredApplications.length;

    const percentageElement = document.querySelector(percentageSelector);
    if (applications.length === 0) {
        percentageElement.textContent = "0%";
    } else {
        const percentage = Math.round(filteredApplications.length / applications.length * 100);
        percentageElement.textContent = `${percentage}%`;
    }
};

updateStat("Applied", "#appliedApplications", "#applied_percentage");
updateStat("Interview", "#interviewApplications", "#interview_percentage");
updateStat("Offer", "#offersApplications", "#offer_percentage");
updateStat("Rejected", "#rejectedApplications", "#reject_percentage");

//Application Buttons
const allApplicationsCount = document.querySelector("#allCount");
allApplicationsCount.textContent = applications.length;

const updateFilterCount = (status, countSelector) => {
    const filteredApplications = applications.filter((application) => application.status === status);
    const countElement = document.querySelector(countSelector);
    countElement.textContent = filteredApplications.length;
};

updateFilterCount("Interested", "#interestedCount");
updateFilterCount("Applied", "#appliedCount");
updateFilterCount("Interview", "#interviewCount");
updateFilterCount("Offer", "#offerCount");
updateFilterCount("Rejected", "#rejectedCount");

const filterButtons = document.querySelectorAll(".status_filter");
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((filterButton) => {
            filterButton.classList.remove("active");
        });
        button.classList.add("active");
        const applicationCards = document.querySelectorAll(".applications_section_card");
        const selectedStatus = button.dataset.status;
        applicationCards.forEach((card) => {
            card.remove();
        });
        const noApplicationMessage = document.querySelector(".no_application_message");
        if (noApplicationMessage) {
            noApplicationMessage.remove();
        }
        if (selectedStatus === "All") {
            applications.forEach((application) => {
            createApplicationCard(application);
        });
        } else {
            const filteredApplications = applications.filter(
            (application) => application.status === selectedStatus
        );
        filteredApplications.forEach((application) => {
            createApplicationCard(application);
        });
        if (filteredApplications.length === 0) {
            const noApplicationText = document.createElement("p");
            noApplicationText.classList.add("no_application_message");
            noApplicationText.textContent = "No Applications Found";
            applicationsSection.appendChild(noApplicationText);
            }   
        }
    });
});

//Create Application Cards
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


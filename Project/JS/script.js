// ========================================
// DATA
// ========================================
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

// ========================================
// DOM ELEMENTS
// ========================================
const applicationsSection = document.querySelector(".applications_section");

const totalApplications = document.querySelector("#totalApplications");

const allApplicationsCount = document.querySelector("#allCount");

const filterButtons = document.querySelectorAll(".status_filter");

const applicationSearch = document.querySelector(".application_search");


// ========================================
// FUNCTIONS
// ========================================

// Create Application Cards

const createApplicationCard = application => {
// Company Initials
    const companyWords = application.company.split(" ");
    const initials = companyWords
        .map(word => word.charAt(0))
        .join("");

    // Application Date

    const applicationDateObject = new Date(application.date);

    const applicationDateOptions = {
        day: "numeric",
        month: "short",
        year: "numeric"
    };

    const formattedApplicationDate =
        applicationDateObject.toLocaleDateString(
            "en-GB",
            applicationDateOptions
        );


    // Create Card

    const applicationCard = document.createElement("div");

    applicationCard.classList.add("applications_section_card");

    applicationsSection.appendChild(applicationCard);


    // Company Logo

    const companyLogo = document.createElement("div");

    companyLogo.classList.add("applications_company_logo");

    applicationCard.appendChild(companyLogo);

    companyLogo.textContent = initials;


    // Application Information

    const applicationInfo = document.createElement("div");

    applicationInfo.classList.add("applications_card_info");

    applicationCard.appendChild(applicationInfo);


    // Application Heading

    const applicationHeading = document.createElement("div");

    applicationHeading.classList.add("applications_card_heading");

    applicationInfo.appendChild(applicationHeading);


    // Application Title

    const applicationTitle = document.createElement("h3");

    applicationTitle.classList.add("applications_card_title");

    applicationTitle.textContent = application.role;

    applicationHeading.appendChild(applicationTitle);


    // Application Status

    const applicationStatus = document.createElement("p");

    applicationStatus.classList.add("applications_card_status");

    applicationStatus.textContent = application.status;

    applicationHeading.appendChild(applicationStatus);


    // Status Styling

    switch (application.status) {
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
    }


    // Company Name

    const applicationName = document.createElement("p");

    applicationName.classList.add("applications_card_name");

    applicationName.textContent = application.company;

    applicationInfo.appendChild(applicationName);


    // Application Meta

    const applicationMeta = document.createElement("div");

    applicationMeta.classList.add("applications_card_meta");

    applicationInfo.appendChild(applicationMeta);


    // Application Date

    const applicationDate = document.createElement("p");

    applicationDate.classList.add("applications_card_date");

    applicationDate.textContent = formattedApplicationDate;

    applicationMeta.appendChild(applicationDate);


    // Separator

    const applicationSeparator = document.createElement("span");

    applicationSeparator.setAttribute("aria-hidden", "true");

    applicationSeparator.textContent = "•";

    applicationMeta.appendChild(applicationSeparator);


    // Application Notes

    const applicationNotes = document.createElement("p");

    applicationNotes.classList.add("applications_card_notes");

    applicationNotes.textContent = application.notes;

    applicationMeta.appendChild(applicationNotes);


    // Application Menu

    const applicationMenu = document.createElement("button");

    applicationMenu.classList.add("applications_card_menu");

    applicationMenu.setAttribute(
        "aria-label",
        "Application options"
    );

    applicationCard.appendChild(applicationMenu);


    // Application Menu Icon

    const applicationMenuIcon = document.createElement("i");

    applicationMenuIcon.classList.add(
        "fa-solid",
        "fa-ellipsis-vertical"
    );

    applicationMenuIcon.setAttribute("aria-hidden", "true");

    applicationMenu.appendChild(applicationMenuIcon);
};


// Update Stats

const updateStat = (status, countSelector, percentageSelector) => {

    const filteredApplications = applications.filter(
        (application) => application.status === status
    );

    const countElement = document.querySelector(countSelector);

    countElement.textContent = filteredApplications.length;

    const percentageElement =
        document.querySelector(percentageSelector);

    if (applications.length === 0) {
        percentageElement.textContent = "0%";
    } else {
        const percentage = Math.round(
            filteredApplications.length /
            applications.length *
            100
        );
        percentageElement.textContent = `${percentage}%`;
    }
};


// Update Filter Counts

const updateFilterCount = (status, countSelector) => {

    const filteredApplications = applications.filter(
        (application) => application.status === status
    );

    const countElement = document.querySelector(countSelector);

    countElement.textContent = filteredApplications.length;
};


// ========================================
// INITIAL PAGE SETUP
// ========================================

// Total Applications

totalApplications.textContent = applications.length;


// Stats

updateStat(
    "Applied",
    "#appliedApplications",
    "#applied_percentage"
);

updateStat(
    "Interview",
    "#interviewApplications",
    "#interview_percentage"
);

updateStat(
    "Offer",
    "#offersApplications",
    "#offer_percentage"
);

updateStat(
    "Rejected",
    "#rejectedApplications",
    "#reject_percentage"
);


// Filter Counts

allApplicationsCount.textContent = applications.length;

updateFilterCount(
    "Interested",
    "#interestedCount"
);

updateFilterCount(
    "Applied",
    "#appliedCount"
);

updateFilterCount(
    "Interview",
    "#interviewCount"
);

updateFilterCount(
    "Offer",
    "#offerCount"
);

updateFilterCount(
    "Rejected",
    "#rejectedCount"
);


// Initial Application Cards

applications.forEach((application) => {
    createApplicationCard(application);
});


// ========================================
// EVENT LISTENERS
// ========================================

// Status Filter Functionality

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach((filterButton) => {
            filterButton.classList.remove("active");
        });
        // Add active class to clicked button
        button.classList.add("active");
        // Get cards currently displayed
        const applicationCards =
            document.querySelectorAll(
                ".applications_section_card"
            );
        // Get selected status
        const selectedStatus = button.dataset.status;
        // Remove currently displayed cards
        applicationCards.forEach((card) => {
            card.remove();
        });
        // Remove old "No Applications Found" message
        const noApplicationMessage =
            document.querySelector(
                ".no_application_message"
            );
        if (noApplicationMessage) {
            noApplicationMessage.remove();
        }
        // Display Applications
        if (selectedStatus === "All") {
            applications.forEach((application) => {
                createApplicationCard(application);
            });
        } else {
            const filteredApplications =
                applications.filter(
                    (application) =>
                        application.status === selectedStatus
                );
            filteredApplications.forEach((application) => {
                createApplicationCard(application);
            });

            // No Applications Found

            if (filteredApplications.length === 0) {
                const noApplicationText =
                    document.createElement("p");
                noApplicationText.classList.add(
                    "no_application_message"
                );
                noApplicationText.textContent =
                    "No Applications Found";
                applicationsSection.appendChild(
                    noApplicationText
                );
            }
        }
    });
});

// Search Functionality

applicationSearch.addEventListener("input", () => {
    const searchTerm = applicationSearch.value.toLowerCase();
    const searchApplications = applications.filter((application) => 
        application.company.toLowerCase().includes(searchTerm) || application.role.toLowerCase().includes(searchTerm));

    const applicationCards = document.querySelectorAll(".applications_section_card");
    applicationCards.forEach((card) => {
        card.remove();
    });
    const noApplicationMessage =document.querySelector(".no_application_message");
    if (noApplicationMessage) {
        noApplicationMessage.remove();
    };
    searchApplications.forEach((application) => {
        createApplicationCard(application);
    });
    if (searchApplications.length === 0) {
        const noApplicationText = document.createElement("p");
        noApplicationText.classList.add("no_application_message");
        noApplicationText.textContent = "No Application Found";
        applicationsSection.appendChild(noApplicationText);
    };
});



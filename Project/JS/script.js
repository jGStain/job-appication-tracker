// ========================================
// DATA
// ========================================
let applications = [{
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

let currentStatus = "All";
let currentSearchTerm = "";
let applicationToDelete = null;
let applicationToEdit = null;
let selectedApplication = null;

const savedApplications = localStorage.getItem("applications");

if (savedApplications) {
    const parsedApplications = JSON.parse(savedApplications);
    applications = parsedApplications;
}

// ========================================
// DOM ELEMENTS
// ========================================
const applicationsSection = document.querySelector(".applications_section");

const totalApplications = document.querySelector("#totalApplications");

const allApplicationsCount = document.querySelector("#allCount");

const filterButtons = document.querySelectorAll(".status_filter");

const applicationSearch = document.querySelector(".application_search");

const applicationForm = document.querySelector("#add_application_form");

const addApplicationButton = document.querySelector(".app_header_add");

const applicationModal = document.querySelector(".application_modal");

const closeApplicationButton = document.querySelector(".application_form_close");

const deleteModal = document.querySelector(".delete_modal");

const deleteModalClose = document.querySelector(".delete_modal_close");

const deleteModalCancel = document.querySelector(".delete_modal_cancel");

const deleteModalConfirm = document.querySelector(".delete_modal_confirm");

const applicationFormTitle = document.querySelector(".application_form_title");

const applicationFormSubmit = document.querySelector(".application_form_submit");

const applicationHeader = document.querySelector(".app_header");

const applicationDetails = document.querySelector(".application_details");

const applicationDashboard = document.querySelector(".applications_dashboard");

const applicationDetailsBack = document.querySelector(".application_details_back");


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

    const companyLogo = document.createElement("button");

    companyLogo.type = "button";

    companyLogo.setAttribute(
        "aria-label", 
        `View ${application.company} application details`
    );

    companyLogo.classList.add("applications_company_logo");

    applicationCard.appendChild(companyLogo);

    companyLogo.textContent = initials;

    companyLogo.addEventListener("click", () => {
        selectedApplication = application.id;
        applicationHeader.classList.add("hidden");
        applicationDetails.classList.remove("hidden");
        applicationDashboard.classList.add("hidden");
    });

    applicationDetailsBack.addEventListener("click", () => {
        selectedApplication = null;
        applicationHeader.classList.remove("hidden");
        applicationDetails.classList.add("hidden");
        applicationDashboard.classList.remove("hidden");
    });


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

    applicationMenu.dataset.id = application.id;

    applicationMenu.addEventListener("click", () => {
        applicationOptions.classList.toggle("hidden");
    });

    applicationCard.appendChild(applicationMenu);

    //Application Options

    const applicationOptions = document.createElement("div");

    applicationOptions.classList.add("applications_card_options", "hidden");

    applicationCard.appendChild(applicationOptions);

    const editApplicationButton = document.createElement("button");

    editApplicationButton.textContent = "Edit";

    editApplicationButton.classList.add("applications_card_edit");

    const deleteApplicationButton = document.createElement("button");

    deleteApplicationButton.textContent = "Delete";

    deleteApplicationButton.classList.add("applications_card_delete");

    deleteApplicationButton.addEventListener("click", () => {
        applicationToDelete = application.id;
        deleteModal.classList.remove("hidden");
        applicationOptions.classList.add("hidden");
    });

    editApplicationButton.addEventListener("click", () => {
        applicationToEdit = application.id;
        document.querySelector("#company").value = application.company;
        document.querySelector("#role").value = application.role;
        document.querySelector("#date").value = application.date;
        document.querySelector("#status").value = application.status;
        document.querySelector("#salary").value = application.salary || "";
        document.querySelector("#jobUrl").value = application.jobUrl || "";
        document.querySelector("#notes").value = application.notes;
        applicationFormTitle.textContent = "Edit Application";
        applicationFormSubmit.textContent = "Save Changes";
        applicationModal.classList.remove("hidden");
        applicationOptions.classList.add("hidden");
    });

    applicationOptions.appendChild(editApplicationButton);
    applicationOptions.appendChild(deleteApplicationButton);


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

const updateFilterCounts = () => {
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
};

// Stats

const updateStats = () => {

    totalApplications.textContent = applications.length;

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
};

//Remove applcation results

const clearApplicationResults = () => {
    const applicationCards = document.querySelectorAll(".applications_section_card");
    applicationCards.forEach((card) => {
        card.remove();
    });
    const noApplicationMessage = document.querySelector(".no_application_message");
    if (noApplicationMessage) {
        noApplicationMessage.remove();
    }
};

const renderApplications = () => {
    console.log("Search term:", currentSearchTerm);
    const filteredApplications = applications.filter((application) => {
        const matchesStatus = currentStatus === "All" || application.status === currentStatus;
        const matchesSearch = application.company.toLowerCase().includes(currentSearchTerm) || application.role.toLowerCase().includes(currentSearchTerm);
        return matchesStatus && matchesSearch;
    });

    clearApplicationResults();

    filteredApplications.forEach((application) => {
        createApplicationCard(application);
    });

    if (filteredApplications.length === 0) {
        const noApplicationText = document.createElement("p");
        noApplicationText.classList.add("no_application_message");
        noApplicationText.textContent = "No Application Found";
        applicationsSection.appendChild(noApplicationText);
    };
};

const updateApplicationUI = () => {
    renderApplications();
    updateFilterCounts();
    updateStats();
};


// ========================================
// INITIAL PAGE SETUP
// ========================================

updateApplicationUI();

// ========================================
// EVENT LISTENERS
// ========================================

//Add Application

applicationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const company = document.querySelector("#company").value;
    const role = document.querySelector("#role").value;
    const date = document.querySelector("#date").value;
    const status = document.querySelector("#status").value;
    const salary = document.querySelector("#salary").value;
    const jobUrl = document.querySelector("#jobUrl").value;
    const notes = document.querySelector("#notes").value;

    if (applicationToEdit !== null) {
        const application = applications.find((application) => applicationToEdit === application.id);
        application.company = company;
        application.role = role;
        application.date = date;
        application.status = status;
        application.salary = salary;
        application.jobUrl = jobUrl;
        application.notes = notes;
    } else {
        const id = Date.now();

        const newApplication = {
            id,
            company,
            role,
            status,
            date,
            salary,
            jobUrl,
            notes
        };

        applications.push(newApplication);

    }

    localStorage.setItem("applications", JSON.stringify(applications));

    updateApplicationUI();

    applicationForm.reset();
    applicationModal.classList.add("hidden");

    applicationToEdit = null;

    updateApplicationUI();

    applicationForm.reset();

    applicationModal.classList.add("hidden");
});

// Status Filter Functionality

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach((filterButton) => {
            filterButton.classList.remove("active");
        });
        // Add active class to clicked button
        button.classList.add("active");
        // Get selected status
        currentStatus = button.dataset.status;

        renderApplications();
    });
});

// Search Functionality

applicationSearch.addEventListener("input", () => {
    currentSearchTerm = applicationSearch.value.toLowerCase();
    renderApplications();
});

// Add Application

addApplicationButton.addEventListener("click", () => {
    applicationModal.classList.remove("hidden");
    applicationFormTitle.textContent = "Add Application";
    applicationFormSubmit.textContent = "Add Application";
    applicationToEdit = null;
});

// Close Application Form

closeApplicationButton.addEventListener("click", () => {
    applicationModal.classList.add("hidden");
    applicationForm.reset();
    applicationToEdit = null;
});

deleteModalCancel.addEventListener("click", () => {
    deleteModal.classList.add("hidden");

    applicationToDelete = null;
});

deleteModalClose.addEventListener("click", () => {
    deleteModal.classList.add("hidden");
    applicationToDelete = null;
});

deleteModalConfirm.addEventListener("click", () => {
    applications = applications.filter((item) => {
        return item.id !== applicationToDelete;
    });

    localStorage.setItem("applications", JSON.stringify(applications));
    updateApplicationUI();
    deleteModal.classList.add("hidden");
    applicationToDelete = null;
});
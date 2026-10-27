// ========================================
// DATA
// ========================================
let applications = [];

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

const applicationDetailsCompany = document.querySelector(".application_details_company");

const applicationDetailsRole = document.querySelector(".application_details_role");

const applicationDetailsStatus = document.querySelector(".application_details_status");

const applicationDetailsSalary = document.querySelector(".application_details_salary");

const applicationDetailsDate = document.querySelector(".application_details_date");

const applicationDetailsUrl = document.querySelector(".application_details_url");

const applicationDetailsNotes = document.querySelector(".application_details_notes");

const addNoteButton = document.querySelector(".application_details_add_note");

const additionalNoteForm = document.querySelector(".application_details_note_form");

const cancelNoteButton = document.querySelector(".application_details_note_cancel");

const additionalNoteInput = document.querySelector(".application_details_note_input");

const saveNoteButton = document.querySelector(".application_details_note_save");

const additionalNotesList = document.querySelector(".application_details_notes_list");

const applicationDetailsLogo = document.querySelector(".application_details_company_logo");

const addEventButton = document.querySelector(".application_details_add_event");

const eventForm = document.querySelector(".application_details_event_form");

const eventTitleInput = document.querySelector(".application_details_event_title");

const eventDateInput = document.querySelector(".application_details_event_date");

const eventDescriptionInput = document.querySelector(".application_details_event_description");

const saveEventButton = document.querySelector(".application_details_event_save");

const cancelEventButton = document.querySelector(".application_details_event_cancel");

const timelineList = document.querySelector(".application_details_timeline_list");

const applicationDetailsEdit = document.querySelector(".application_details_edit");

const applicationDetailsDelete = document.querySelector(".application_details_delete");

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
        const applicationData = applications.find((application) => selectedApplication === application.id);
        renderApplicationDetails(applicationData);
        
        applicationHeader.classList.add("hidden");
        applicationDetails.classList.remove("hidden");
        applicationDashboard.classList.add("hidden");
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

const createAdditionalNote = (note, applicationData) => {
    const noteElement = document.createElement("p");
    noteElement.classList.add("application_details_additional_note");
    const deleteNoteButton = document.createElement("button");
    deleteNoteButton.classList.add("application_details_note_delete");
    deleteNoteButton.type = "button";
    deleteNoteButton.setAttribute("aria-label", "Delete note");
    const deleteNoteIcon = document.createElement("i");
    deleteNoteIcon.classList.add("fa-solid", "fa-trash-can");
    deleteNoteIcon.setAttribute("aria-hidden", "true");
    deleteNoteButton.appendChild(deleteNoteIcon);
    noteElement.textContent = note.text;
    noteElement.appendChild(deleteNoteButton);
    additionalNotesList.appendChild(noteElement);

    deleteNoteButton.addEventListener("click", () => {
        const noteIndex = applicationData.additionalNotes.findIndex(item => item.id === note.id);
        if (noteIndex !== -1) {
            applicationData.additionalNotes.splice(noteIndex, 1);
            localStorage.setItem("applications", JSON.stringify(applications));
            noteElement.remove();
        }
    });
};

const renderTimeline = applicationData => {
    timelineList.innerHTML = "";

    const events = [...(applicationData.importantDates || [])];

    if (applicationData.date) {
        events.push({
            id: "application-submitted",
            title: "Application Submitted",
            date: applicationData.date,
            description: "Application submitted",
            automatic: true
        });
    }

    const sortedEvents = [...events].sort(
        (a, b) => a.date.localeCompare(b.date)
    );

    sortedEvents.forEach((event, index) => {
        const eventElement = document.createElement("div");
        eventElement.classList.add("application_details_timeline_event");
        const nextEvent = sortedEvents[index + 1];

        if (nextEvent) {
            if (nextEvent.completed) {
                eventElement.classList.add("timeline_line_completed");
            } else {
                eventElement.classList.add("timeline_line_pending");
            }
        }

        if (event.completed) {
            eventElement.classList.add("timeline_event_completed");
        }

        if (event.automatic) {
            eventElement.classList.add("timeline_event_submitted");
        }

        const eventTitle = document.createElement("h4");
        eventTitle.textContent = event.title;

        const eventDate = document.createElement("p");
        eventDate.textContent = new Date(
            `${event.date}T00:00:00`
        ).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });

        const eventDescription = document.createElement("p");
        eventDescription.textContent = event.description;

        eventElement.append(
            eventTitle,
            eventDate,
            eventDescription
        );

        if (!event.automatic) {
            const eventDeleteButton = document.createElement("button");
            eventDeleteButton.classList.add("application_details_event_delete");
            const deleteButtonIcon = document.createElement("i");
            deleteButtonIcon.classList.add("fa-solid", "fa-trash-can");
            eventDeleteButton.appendChild(deleteButtonIcon);
            eventDeleteButton.type = "button";
            eventDeleteButton.setAttribute("aria-label", "Delete event");
            eventElement.appendChild(eventDeleteButton);
            const eventCompleteButton = document.createElement("button");
            eventCompleteButton.type = "button";
            eventCompleteButton.classList.add("application_details_event_complete");
            eventCompleteButton.setAttribute("aria-label", "Toggle event completion");
            eventCompleteButton.textContent = event.completed ? "Mark Incomplete" : "Mark Complete";
            eventElement.appendChild(eventCompleteButton);

            if (!event.completed) {
                eventCompleteButton.classList.add("event_complete_pending");
            }

            eventDeleteButton.addEventListener("click", () => {
                const eventIndex = applicationData.importantDates.findIndex(
                    item => item.id === event.id
                );
                if (eventIndex !== -1) {
                    applicationData.importantDates.splice(eventIndex, 1);
                    localStorage.setItem("applications", JSON.stringify(applications));
                    renderTimeline(applicationData);
                }
            });

            eventCompleteButton.addEventListener("click", () => {
                event.completed = !event.completed;
                localStorage.setItem("applications", JSON.stringify(applications));
                    renderTimeline(applicationData);
            });
        }
        timelineList.appendChild(eventElement);
    });
};

const renderApplicationDetails = applicationData => {
    const companyInitials = applicationData.company
        .trim()
        .split(/\s+/)
        .map(word => word.charAt(0))
        .join("")
        .toUpperCase();
            
    applicationDetailsLogo.textContent = companyInitials;
    applicationDetailsCompany.textContent = applicationData.company;
    applicationDetailsRole.textContent = applicationData.role;
    applicationDetailsStatus.textContent = applicationData.status;

    applicationDetailsStatus.classList.remove(
        "status_interested", 
        "status_applied", 
        "status_interview", 
        "status_offer", 
        "status_rejected"
    );

    applicationDetailsStatus.classList.add(`status_${applicationData.status.toLowerCase()}`);

    if (!applicationData.salary) {
        applicationDetailsSalary.textContent = "Salary not specified";
    } else {
        applicationDetailsSalary.textContent = `£${Number(applicationData.salary).toLocaleString("en-GB")}`;
    }

    if (applicationData.date) {
        const applicationDateObject = new Date(applicationData.date);

        const dateOptions = {
            day: "numeric",
            month: "short",
            year: "numeric"
        };

        const formattedDate =
            applicationDateObject.toLocaleDateString(
                "en-GB",
                dateOptions
            );
            
        applicationDetailsDate.textContent = formattedDate;
    } else {
        applicationDetailsDate.textContent = "Date not specified";
    }

    if (applicationData.jobUrl) {
        applicationDetailsUrl.href = applicationData.jobUrl;
        applicationDetailsUrl.textContent = "View Job Advertisement";
    } else {
        applicationDetailsUrl.removeAttribute("href");
        applicationDetailsUrl.textContent = "Job URL not specified";
    }

    applicationDetailsNotes.textContent = applicationData.notes || "No initial notes added";
    additionalNotesList.innerHTML = "";

    const savedNotes = applicationData.additionalNotes || [];

    savedNotes.forEach(note => {
        createAdditionalNote(note, applicationData);
    });

    renderTimeline(applicationData);

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
    const salaryNumber = Number(salary);

    if (salary !== "") {
        if (salaryNumber > 300000 || salaryNumber < 0) {
            alert("Salary cannot be below £0 or exceed £300,000");
            return;
        }
        if (!Number.isInteger(salaryNumber)) {
            alert("Salary must be a whole number");
            return;
        }
    }

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

    if (applicationToEdit !== null && selectedApplication === applicationToEdit) {
        const updatedApplication = applications.find(
            application => selectedApplication === application.id
        );
        renderApplicationDetails(updatedApplication);
    }

    updateApplicationUI();

    applicationForm.reset();
    applicationModal.classList.add("hidden");

    applicationToEdit = null;
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

    if (selectedApplication === applicationToDelete) {
        applicationDetails.classList.add("hidden");
        applicationDashboard.classList.remove("hidden");
        applicationHeader.classList.remove("hidden");
        selectedApplication = null;
    }

    applicationToDelete = null;
});

//Back Button
applicationDetailsBack.addEventListener("click", () => {
    selectedApplication = null;
    applicationHeader.classList.remove("hidden");
    applicationDetails.classList.add("hidden");
    applicationDashboard.classList.remove("hidden");
});

//Add Note
addNoteButton.addEventListener("click", () => {
    additionalNoteForm.classList.remove("hidden");
});

//Cancel Note
cancelNoteButton.addEventListener("click", () => {
    additionalNoteForm.classList.add("hidden");
    additionalNoteInput.value = "";
});

//Save Note
saveNoteButton.addEventListener("click", () => {
    const applicationData = applications.find(
        application => application.id === selectedApplication
    );
    const noteText = additionalNoteInput.value.trim();
    // 1. Validate the note
    if (noteText === "") {
        console.log("Empty note detected");
        return;
    }

    // 2. Initialise the additionalNotes array if it doesn't exist
    if (!applicationData.additionalNotes) {
        applicationData.additionalNotes = [];
    }

    // 3. Create and save new note
    const newNote = {
        id: Date.now(),
        text: noteText
    };

    applicationData.additionalNotes.push(newNote);
    localStorage.setItem("applications", JSON.stringify(applications));

    createAdditionalNote(newNote, applicationData);

    additionalNoteInput.value = "";
    additionalNoteForm.classList.add("hidden");
});

addEventButton.addEventListener("click", () => {
    eventForm.classList.remove("hidden");
    eventTitleInput.focus();
});

cancelEventButton.addEventListener("click", () => {
    eventForm.classList.add("hidden");

    eventTitleInput.value = "";
    eventDateInput.value = "";
    eventDescriptionInput.value = "";
});

saveEventButton.addEventListener("click", () => {
    const eventTitle = eventTitleInput.value.trim();
    const eventDate = eventDateInput.value;
    const eventDescription = eventDescriptionInput.value.trim();

    if (!eventTitle || !eventDate) {
        alert("PLease enter an event title and date");
        return;
    }

    const applicationData = applications.find(
        application => application.id === selectedApplication
    );

    if (!applicationData) return;

    if (!applicationData.importantDates) {
        applicationData.importantDates = [];
    }

    const newEvent = {
        id: Date.now(),
        title: eventTitle,
        date: eventDate,
        description: eventDescription,
        completed: false
    };

    applicationData.importantDates.push(newEvent);
    renderTimeline(applicationData);

    localStorage.setItem("applications", JSON.stringify(applications));

    eventForm.classList.add("hidden");
    eventTitleInput.value = "";
    eventDateInput.value = "";
    eventDescriptionInput.value = "";

    console.log(applicationData.importantDates);
});

applicationDetailsEdit.addEventListener("click", () => {
    const applicationToUpdate = applications.find(
        application => application.id === selectedApplication
    );

    applicationToEdit = applicationToUpdate.id;
    
    document.querySelector("#company").value = applicationToUpdate.company;
    document.querySelector("#role").value = applicationToUpdate.role;
    document.querySelector("#date").value = applicationToUpdate.date;
    document.querySelector("#status").value = applicationToUpdate.status;
    document.querySelector("#notes").value = applicationToUpdate.notes;
    document.querySelector("#salary").value = applicationToUpdate.salary || "";
    document.querySelector("#jobUrl").value = applicationToUpdate.jobUrl || "";

    applicationModal.classList.remove("hidden");
    applicationFormTitle.textContent = "Edit Application";
    applicationFormSubmit.textContent = "Save Changes";
});

applicationDetailsDelete.addEventListener("click", () => {
    applicationToDelete = selectedApplication;
    deleteModal.classList.remove("hidden");
});
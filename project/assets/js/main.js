// DECLARE CoursePortal Object
const CoursePortal = {} || CoursePortal

// SET HTML Element References
CoursePortal.currentYear = document.getElementById("current-year");
CoursePortal.lastUpdate = document.getElementById("last-update");

// FUNCTIONS

// initialize
CoursePortal.initialize = () => {
    CoursePortal.currentYear.innerText = new Date().getFullYear();
    CoursePortal.lastUpdate.innerText = document.lastModified;
}


// EVENT LISTENERS

// Document loaded
document.addEventListener('DOMContentLoaded', function() {
    CoursePortal.initialize();
})

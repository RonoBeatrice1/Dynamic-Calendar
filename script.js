// Select the elements with class "current-month" and "calendar-days"
let currentMonth = document.querySelector(".current-month");
let calendarDays = document.querySelector(".calendar-days");

// Create Date objects for today and the current date
let today = new Date();
let date = new Date();

// Set the text content of the "current-month" element to display the current month and year
currentMonth.textContent = date.toLocaleDateString("en-US", { month: 'long', year: 'numeric' });

// Set the time of the 'today' Date object to midnight for accurate comparisons
today.setHours(0, 0, 0, 0);

// Call the renderCalendar function to initialize the calendar
renderCalendar();

function renderCalendar() {
    // Calculate the last day of the previous month, total days in the current month,
    // and the weekday of the first day of the current month
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const totalMonthDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const startWeekDay = new Date(date.getFullYear(), date.getMonth(), 0).getDay();

    // Clear the HTML content of the "calendar-days" element
    calendarDays.innerHTML = "";

    // Define the total number of calendar days (6 rows x 7 days per row)
    let totalCalendarDay = 6 * 7;

    // Loop through each day in the calendar
    for (let i = 0; i < totalCalendarDay; i++) {
        let day = i - startWeekDay;

        if (i <= startWeekDay) {
            // Add previous month days
            calendarDays.innerHTML += `${prevLastDay - i}`;
        } else if (i <= startWeekDay + totalMonthDay) {
            // Add current month days
            date.setDate(day);
            date.setHours(0, 0, 0, 0);

            // Determine the CSS class for the day based on whether it's the current day or not
            let dayClass = date.getTime() === today.getTime() ? 'current-day' : 'month-day';
            calendarDays.innerHTML += `${day}`;
        } else {
            // Add next month days
            calendarDays.innerHTML += `${day - totalMonthDay}`;
        }
    }
}

// Add click event listeners to the elements with class "month-btn"
document.querySelectorAll(".month-btn").forEach(function (element) {
    element.addEventListener("click", function () {
        // Update the 'date' variable based on whether it's a previous or next month button
        date = new Date(currentMonth.textContent);
        date.setMonth(date.getMonth() + (element.classList.contains("prev") ? -1 : 1));

        // Update the displayed month and render the calendar
        currentMonth.textContent = date.toLocaleDateString("en-US", { month: 'long', year: 'numeric' });
        renderCalendar();
    });
});

// Add click event listeners to elements with class "btn"
document.querySelectorAll(".btn").forEach(function (element) {
    element.addEventListener("click", function () {
        let btnClass = element.classList;

        // Update the 'date' variable based on the button clicked (Today, Previous Year, Next Year)
        date = new Date(currentMonth.textContent);
        if (btnClass.contains("today"))
            date = new Date();
        else if (btnClass.contains("prev-year"))
            date = new Date(date.getFullYear() - 1, 0, 1);
        else
            date = new Date(date.getFullYear() + 1, 0, 1);

        // Update the displayed month and render the calendar
        currentMonth.textContent = date.toLocaleDateString("en-US", { month: 'long', year: 'numeric' });
        renderCalendar();
    });
});

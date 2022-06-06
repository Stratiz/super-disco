

// Get dates
let dateString = new Intl.DateTimeFormat("en",{dateStyle: 'full'}).format(Date.now());
let currentHour = new Intl.DateTimeFormat("en",{hour: '2-digit', hour12: false}).format(Date.now());

// Data setter and getter functions
function getNotes() {
    return JSON.parse(localStorage.getItem("notes")) || {};
}

function setNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes))
}

// Main init function
$(function() {
    let dateLabel = $("#currentDay");
    let timeBlockList = $("#timeBlockList");
    dateLabel.text(dateString); // Set date at top
    
    // Fetch note data
    let initNoteData = getNotes(); 

    // Create list item for each hour
    for (let i = 9; i < 18; i++) { // Look for 9-5 workday
        
        // Create elements
        let listItem = $('<li class = "time-block"></li>')
        let time = $('<div class="column-side hour" style="text-align: right; vertical-align: text-top">' + (i/12 > 1 && (i % 12) + " PM" || i + " AM") + '</div>')
        let textBox = $('<textarea class="column-middle description" style="vertical-align: text-top;" data-hour=' + i + '></textarea>')
        let button = $('<button class="column-side saveBtn"><i class="material-icons md-48 center button-img">save</i></button>')
        
        // Append elements under main element 
        listItem.append(time);
        listItem.append(textBox);
        listItem.append(button);

        // Determine if past present or future.
        if (currentHour == i) {
            textBox.addClass("present");
        } else if (currentHour > i) {
            textBox.addClass("past");
        } else {
            textBox.addClass("future");
        }
        
        // Get value from data
        textBox.val(initNoteData[i]);

        // Add to list
        timeBlockList.append(listItem)
    }

    // Click event for clicking a descendant of the time block list.
    timeBlockList.on('click', "button", function (element) {
        let inputBox = $(element.currentTarget.parentNode).find("textarea")
        var noteData = getNotes();
        var hourTarget = inputBox.attr("data-hour");
        if (hourTarget) {
            noteData[hourTarget] = inputBox.val();
            setNotes(noteData);
        } else {
            console.log("no hour target?");
        }
    });
});
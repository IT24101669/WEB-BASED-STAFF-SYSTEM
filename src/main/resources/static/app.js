// ===============================
// app.js - Attendance & Leave Frontend
// ===============================

// ---------- UTILITIES ----------
function showSuccess(message) {
    alert("Success: " + message);
}

function showError(message) {
    alert("Error: " + message);
}

// Confirm before action (leave approval/rejection, delete etc.)
function confirmAction(message) {
    return confirm("Action" + message);
}

// Auto-fill today's date in attendance forms
document.addEventListener("DOMContentLoaded", function () {
    let dateInput = document.querySelector("input[name='date']");
    if (dateInput && !dateInput.value) {
        let today = new Date().toISOString().split("T")[0];
        dateInput.value = today;
    }
});

// ---------- LEAVE MANAGEMENT ----------

// Confirm approve/reject leave
function confirmLeaveAction(action) {
    return confirmAction("Are you sure you want to " + action + " this leave request?");
}

// Confirm cancel leave
function confirmCancelLeave() {
    return confirmAction("Do you really want to cancel this leave?");
}

// ---------- ATTENDANCE MANAGEMENT ----------

// Confirm delete attendance
function confirmDeleteAttendance() {
    return confirmAction("Do you really want to delete this attendance record?");
}

// ---------- HR REPORT FILTER ----------
function filterTable(tableId, inputId) {
    let input = document.getElementById(inputId);
    let filter = input.value.toLowerCase();
    let table = document.getElementById(tableId);
    let rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) { // skip header
        let cells = rows[i].getElementsByTagName("td");
        let match = false;
        for (let j = 0; j < cells.length; j++) {
            if (cells[j]) {
                let textValue = cells[j].textContent || cells[j].innerText;
                if (textValue.toLowerCase().indexOf(filter) > -1) {
                    match = true;
                    break;
                }
            }
        }
        rows[i].style.display = match ? "" : "none";
    }
}

// ---------- FORM VALIDATION ----------
function validateForm(formId) {
    let form = document.getElementById(formId);
    if (!form) return true;

    let inputs = form.querySelectorAll("input[required], select[required], textarea[required]");
    for (let input of inputs) {
        if (!input.value.trim()) {
            showError("Please fill all required fields!");
            input.focus();
            return false;
        }
    }
    return true;
}

var baseUrlForRedirect = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;

$(document).ready(function () {
    $('#SubmitBtn').click(validateForm);
    $("#CancelBtn").click(returnToSummary);
    populateUserDDL();
})

var returnToSummary = function () {
    window.location.replace(baseUrlForRedirect + "/LineItem/Summary");
}

var populateUserDDL = function() {
    $.ajax({
        type: 'GET',
        url: "http://localhost:53601/ProjectServices/ProjectService.svc/WebUserService/",
        success: function (data) {
            //Method to be implemented
        },
        error: function (err) {
            alert('Error getting users');
        }
    })
}

var validateForm = function (e) {
    if ($('#newItemForm').valid()) {
        var start = new Date($("#startDate").val());
        var end = new Date($("#deadline").val());
        if (end > start) {
            addItem();
        } else {
            alert("End date must be later than start date");
        }
    }
}

var addItem = function () {
    var itemData = {
        "itemInfo": {
            "itemName": $("#projName").val(),
            "description": $("#description").val(),
            "startDate": $("#startDate").val(),
            "deadline": $("#deadline").val(),
            "assignedToId": $("#assignedTo").val(),
            "priority": $("#priority").val()
        }
    };
    $.ajax({
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ "request": itemData }),
        url: "http://localhost:53601/ProjectServices/ProjectService.svc/WebProjectService/addproject",
        success: function (data) {
            //Use replace instead of actually setting href, as this simulates a redirect
            window.location.replace(baseUrlForRedirect + "/Project/Summary/");
        },
        error: function (err) {
            alert("Error adding project");
        }
    });
}
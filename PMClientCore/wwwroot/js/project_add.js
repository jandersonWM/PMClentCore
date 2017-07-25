var baseUrlForRedirect = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;

$(document).ready(function () {
    $('#SubmitBtn').click(validateForm);
    $("#CancelBtn").click(returnToSummary);
    populateUserDDL();
})

var returnToSummary = function () {
    window.location.replace(baseUrlForRedirect + "/Project/Summary");
}

var populateUserDDL = function() {
    $.ajax({
        type: 'GET',
        url: "http://localhost:53601/ProjectServices/ProjectService.svc/WebProjectService/projUsers",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#assignedTo").append('<option value=' + data[i].Value + '>' + data[i].Text + '</option>');
            }
        },
        error: function (err) {
            alert('Error getting users');
        }
    })
}

var validateForm = function (e) {
    if ($('#newProjectForm').valid()) {
        var start = new Date($("#startDate").val());
        var end = new Date($("#deadline").val());
        if (end > start) {
            addProject();
        } else {
            alert("End date must be later than start date");
        }
    }
}

var addProject = function () {
    var projectData = {
        "projectInfo": {
            "projectName": $("#projName").val(),
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
        data: JSON.stringify({ "request": projectData }),
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
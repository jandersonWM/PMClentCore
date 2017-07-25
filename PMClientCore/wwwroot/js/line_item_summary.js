$(document).ready(function () {
    var urlArr = window.location.href.split('/');
    var projId = urlArr[urlArr.length - 1];
    $.ajax({
        type: 'POST',
        contentType: "application\json",
        data: {},
        url: "http://localhost:53601/LineItemServices/LineItemService.svc/WebLineItemService/allItems?projectId=" + projId,
        success: function (data) {
            populateTable(data.LineItems);
            for (var i = 0; i < data.FilterTypes.length; i++) {
                $("#FilterTypesDDL").append('<option value=' + data.FilterTypes[i].Value + '>' + data.FilterTypes[i].Text + '</option>')
            }
        }
    });
    $('#addBtn').attr('href', baseUrl + "/LineItem/Add");
    $('#FilterTypesDDL').change(getFilterOptions);
    $('#FilterOptsDDL').change(filterTable);
});

var baseUrl = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;

var getFilterOptions = function () {
    $("#FilterOptsDDL").html("");
    var type = this.value;
    if (type == "0") {
        getAllProjects();
    } else {
        $.ajax({
            type: 'GET',
            url: "http://localhost:53601/LineItemServices/LineItemService.svc/WebLineItemService/filterOpts?val=" + type,
            success: function (data) {
                $("#FilterOptsDDL").append('<option value="0">Select...</option>')
                for (var i = 0; i < data.length; i++) {
                    var text = data[i].Text;
                    if (type == "2" || type == "3") {
                        text = pad(text);
                    }
                    $("#FilterOptsDDL").append('<option value=' + data[i].Value + '>' + text + '</option>')
                }
            },
            error: function (err) {
                alert("Error: " + err.toString());
            }
        })
    }
}

var filterTable = function () {
    $('#ProjectsTable tbody').html("");
    var val = this.value;
    var type = ($("#FilterTypesDDL").val())
    var bodyData = {
        options: {
            "FilterVal": val,
            "FilterBy": $("#FilterTypesDDL").val()
        }
    };
    $.ajax({
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            "options": {
                "FilterVal": val,
                "FilterBy": type
            }
        }),
        //data: JSON.stringify(bodyData);
        url: "http://localhost:53601/LineItemServices/LineItemService.svc/WebLineItemService/allItems",
        success: function (data) {
            populateTable(data.Projects)
        },
        error: function () {
            alert('Error');
        }
    });

}

var pad = function (str) {
    if (str.length < 7) {
        str = "0" + str;
    }
    return str;
}

var cleanDate = function (dateStr) {
    var milliseconds = dateStr.split('-')[0].substr(6);
    var calendarDate = new Date(parseInt(milliseconds));
    //return calendarDate.getMonth() + "/" + calendarDate.getDate() + "/" +
    return calendarDate;
}

//var calcDuration = function (dtStart, dtEnd) {
//    var durationMS = dtEnd - dtStart;
//    var durationDays = Math.ceil(durationMS / 86400000);
//    return durationDays;
//}

//This can also be used to add a new row instead of rebuilding the table from scratch
var populateTable = function (itemData) {
    for (var i = 0; i < itemData.length; i++) {
        var dateStart = cleanDate(itemData[i].startDate);
        var endDate = cleanDate(itemData[i].endDate);
        //var duration = calcDuration(dateStart, endDate);
        var rowHtml = '<tr>';
        rowHtml += '<td>' + itemData[i].lineItemName + '</td>';
        rowHtml += '<td>' + itemData[i].description + '</td>';
        rowHtml += '<td>' + itemData[i].projectName + '</td>';
        rowHtml += '<td>' + dateStart.toLocaleDateString() + '</td>';
        rowHtml += '<td>' + endDate.toLocaleDateString() + '</td>';
        rowHtml += '<td>' + itemData[i].assignedTo + '</td>';
        rowHtml += '<td>' + itemData[i].type + '</td>';
        rowHtml += '</tr>';
        $("#ItemsTable tbody").append(rowHtml);
    }
}
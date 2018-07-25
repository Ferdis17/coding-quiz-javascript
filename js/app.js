
/** Author: M. Ferdinand **/
/** Date created: Thur 7/24/2018 **/

$(document).ready(function(){

    const tasksData = [];

    /** Add a new Task */
    const addTask = function(task) {
        addTaskToListView(task);
        addTaskToArrayData(task);
    }

    /** Adds the task data to List UI */
    const addTaskToListView = function(task) {

        const newTaskItem = "<li class='list-group-item'>" + task.name + " - " + task.date + " - "+ task.assigned  +"</li>";
        $("#olstTasks").append(newTaskItem);
    }

    /** Adds the task to the tasksData array */
    const addTaskToArrayData = function(task) {
        tasksData.push(task);
    }

    // Fetch and display tasksData from server using AJAX
    $.ajax({
        url: "data/tasks.json",
        type: "GET",
        dataType: "json"
    }).done(function(data) {
        data.forEach((objTask) => {
            addTask(objTask);
        });
    }).fail(function(xhr, status, err) {
        alert("Error: " + status + " - " + err);
    }).always(function(xhr, status) {
       
    });
    
    // Form submission
    $("#taskRegForm").on("submit", function(event) {
        event.preventDefault();
        const taskName = $("#name").val();
        const taskDate = $("#date").val();
        const assigned = $("#assigned").val();
        const objNewTask = {
            "name": taskName,
            "date": taskDate,
            "assigned": assigned
        };
        addTask(objNewTask);
        $("#name").val("");
        $("#date").val("");
        $("#assigned").val("");
        $("#name").focus();
    });
    $("#name").focus();
});

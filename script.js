//Seaching by title
var searchForm = document.querySelector("#search-form");
    searchForm.oninput = function () {
    var val = searchForm.value.trim();
    var titlesBox = document.querySelectorAll('#task-title');
    var oneTaskBox = document.querySelectorAll('#one-task');

    if (val != '') {
        for (var i = 0; i < titlesBox.length; i++) { //Looking for a match between the entered data and the value of the titles
            if (titlesBox[i].innerText.toLowerCase().search(val.toLowerCase()) == -1) {
                oneTaskBox[i].classList.add('hide'); //Hiding of div
            } else {
                oneTaskBox[i].classList.remove('hide'); //Displaying of div
            }
        }
    } else { //When input is empty
        for (var i = 0; i < titlesBox.length; i++) {
            oneTaskBox[i].classList.remove('hide');
        }
    }
}

//Filtering by priority
var selectPriority = document.querySelector('#select-priority-filter');
selectPriority.onchange = function () { //When the user selects priority values from the drop-down list
    
    var priorityVal = selectPriority.value; //Choosen value
    var priorityBox = document.querySelectorAll('#task-priority');
    var oneTaskBox = document.querySelectorAll('#one-task');

    if (priorityVal == "high" || "medium" || "low") {
        for (var i = 0; i < priorityBox.length; i++) {
            if (priorityBox[i][0].innerText.toLowerCase().search(priorityVal) == -1) { //Looking for a match between choosen priority and div's priority value
                oneTaskBox[i].classList.add('hide'); //Hiding of div
            }
            if (priorityVal == "all") {
                oneTaskBox[i].classList.remove('hide'); //Displaying of div
            }
        }  
    }
}   

//Filtering by status
var selectStatus = document.querySelector('#select-status-filter');
selectStatus.onchange = function () { //When the user selects status values from the drop-down list
    
    var statusVal = selectStatus.value; //Choosen value
    var statusBox = document.querySelectorAll('#task-status');
    var oneTaskBox = document.querySelectorAll('#one-task');

    if (statusVal == "done" || "open") {
        for (var i = 0; i < statusBox.length; i++) {
            if (statusBox[i].innerText.toLowerCase().search(statusVal) == -1) { //Looking for a match between choosen status and div's status value
                oneTaskBox[i].classList.add('hide'); //Hiding of div
            } 
            if (statusVal == "all") {
                oneTaskBox[i].classList.remove('hide'); //Displaying of div
            }         
        }
    }
}


//Show and fill a modal window by clicking on buttons
var btnFillTask = document.getElementById("btn-fill-task"),
    btnAdd = document.getElementById("btn-add"),
    btnCancel = document.getElementById("btn-cancel");

var modal = document.querySelector(".modal"),
    backdrop = document.querySelector(".backdrop");

function closeModal() { //Hiding modal window
    modal.style.display = "none";
    backdrop.style.display = "none";
}

btnFillTask.onclick = function () { //After click on "Create" display modal window
    modal.style.display = "block";
    backdrop.style.display = "block";
};

btnAdd.addEventListener('click', closeModal); //Close modal after creating of task
btnCancel.addEventListener('click', closeModal); //Close modal after click on "Cancel"
backdrop.addEventListener('click', closeModal); //Close modal after click on backdrop

var titleValue, descriptionValue, priorityValue; //Creating global variables to communicate with private functions

//Geting values from modal window
var addTask = document.forms['add-task-form'];

addTask.addEventListener("submit", function (event) {
    event.preventDefault();

    titleValue = addTask.querySelector("#input-title").value;
    descriptionValue = addTask.querySelector("#input-description").value;

    var selectedPriorityIndex = document.querySelector("#edit-priority").selectedIndex;
    var selectedPriorityValue = document.querySelector("#edit-priority").options;
    priorityValue = selectedPriorityValue[selectedPriorityIndex].text;

    if (titleValue !== "") {
        createOneTask();
    } else {
        alert("Title field can't be empty");
        modal.style.display = "block";
        backdrop.style.display = "block";
    }
});

//Creating, editing, deleting of one task
function createOneTask() {

    //Сreating the connection between the unit task and the task list
    var taskList = document.querySelector(".task-list"),
        oneTask = document.createElement("div");

        oneTask.className = "one-task-class";
        oneTask.id = "one-task";

        taskList.appendChild(oneTask);

    //Create and set the value for the task status
    var taskStatus = document.createElement("p");

        taskStatus.id = "task-status";

        taskStatus.style.display = "none";
        taskStatus.textContent = "Open";

        oneTask.appendChild(taskStatus);

    //Сreating div (taskTitleBox) that consist title from modal window and input element for edit mode
    var taskTitleBox = document.createElement("div"),
        taskTitle = document.createElement("p"),
        editTaskTitle = document.createElement("input");

        taskTitleBox.className = "task-title-box";
        taskTitle.id = "task-title";
        editTaskTitle.id = "edit-task-title";

        taskTitleBox.appendChild(taskTitle);
        taskTitleBox.appendChild(editTaskTitle);
        oneTask.appendChild(taskTitleBox);

        taskTitle.textContent = titleValue; //Pass the value of the modal window

        editTaskTitle.style.display = "none";
        editTaskTitle.maxLength = 32;
        addTask.querySelector("#input-title").value = ''; //Cleaning text for next task adding
        
    //Сreating div (descriptionTitleBox) that consist description from modal window and input element for edit mode
    var taskDescriptionBox = document.createElement("div"),
        taskDescription = document.createElement("p"),
        editTaskDescription = document.createElement("textarea");
        
        taskDescriptionBox.className = "task-description-box";
        taskDescription.id = "task-description";
        editTaskDescription.id = "edit-task-description";

        taskDescriptionBox.appendChild(taskDescription);
        taskDescriptionBox.appendChild(editTaskDescription);
        oneTask.appendChild(taskDescriptionBox);
        
        taskDescription.textContent = descriptionValue; //Pass the value of the modal window

        editTaskDescription.style.display = "none";
        editTaskDescription.maxLength = 96;
        addTask.querySelector("#input-description").value = ''; //Cleaning text for next task adding

    //Creating div (taskButtonsBox) that consist all button or select elements in unit task window
    var taskButtonsBox = document.createElement("div");
        taskButtonsBox.className = "task-buttons-box";
        oneTask.appendChild(taskButtonsBox);

    //Creating select element for priority
    var taskSelectPriority = document.createElement("select"),
        priorityBegin = new Option(priorityValue, "priority-begin", true, true),
        priorityHigh = new Option("High", "priority-high"),
        priorityMedium = new Option("Medium", "priority-medium"),
        priorityLow = new Option("Low", "priority-low");

        taskSelectPriority.id = "task-priority";

        priorityBegin.disabled = true; //To display the user's choice on the first line and work correctly with the rest of the options
        taskSelectPriority.disabled = true; //So user can change the priority only after pressing the edit option

        taskSelectPriority.appendChild(priorityBegin);
        taskSelectPriority.appendChild(priorityHigh);
        taskSelectPriority.appendChild(priorityMedium);
        taskSelectPriority.appendChild(priorityLow);
        taskButtonsBox.appendChild(taskSelectPriority);

    //Creating select element for options
    var taskSelectOption = document.createElement("select"),
        optionBegin = new Option("...", "option-begin", true, true),
        optionDone = new Option("Done", "option-done"),
        optionEdit = new Option("Edit", "option-edit"),
        optionDelete = new Option("Delete", "option-delete");

        taskSelectOption.id = "task-option";

        taskSelectOption.appendChild(optionBegin);
        taskSelectOption.appendChild(optionDone);
        taskSelectOption.appendChild(optionEdit);
        taskSelectOption.appendChild(optionDelete);
        taskButtonsBox.appendChild(taskSelectOption);

    //Creating a button to finish editing
    var editDone = document.createElement("button");
        editDone.id = "btn-edit-confirm";
        taskButtonsBox.appendChild(editDone);
  
        editDone.textContent = "Apply";
        editDone.style.display = "none";

    //Actions for the user to select options
    taskSelectOption.onchange = function () {
        var option = taskSelectOption.value;
        //Option that change status from "Done" to "Open"
        if (option == 'option-begin') {
            oneTask.style.backgroundColor = 'rgba(128, 128, 128, 0.2)';
            taskStatus.textContent = "Open";
        }
        //Option that change status from "Open" to "Done"
        if (option == 'option-done') {
            oneTask.style.backgroundColor = 'rgba(62, 197, 62, 0.589)';
            taskStatus.textContent = "Done";
        }
        //Option that allows editing of title, description & task priority
        if (option == 'option-edit') {
            taskSelectPriority.disabled = false;
            taskTitle.style.display = "none";   ////Hiding old <p> element for title
            taskDescription.style.display = "none";  //Hiding old <p> element for description
            taskSelectOption.style.display = "none"; //Hiding options select to put a button "Apply" instead
            editTaskTitle.style.display = "block";  //Display input for title
            editTaskDescription.style.display = "block"; //Display input for description
            editDone.style.display = "inline"; //Display button "Apply"
            oneTask.style.backgroundColor = 'rgba(128, 128, 128, 0.2)';

            //Setting values from title, descr to input values
            editTaskTitle.value = taskTitle.textContent;
            editTaskDescription.value = taskDescription.textContent;

            //When user changes priority of task
            taskSelectPriority.onchange = function () {
                var priority = taskSelectPriority.value;

                if (priority == 'priority-high') {
                    priorityValue.textContent = 'High';
                    priorityBegin.textContent = 'High';
                }

                if (priority == 'priority-medium') {
                    priorityValue.textContent = 'Medium';
                    priorityBegin.textContent = 'Medium';
                }

                if (priority == 'priority-low') {
                    priorityValue.textContent = 'Low';
                    priorityBegin.textContent = 'Low';
                }
            };

            //When user clicking on "Apply" button
            editDone.addEventListener("click", function (event) {
                event.preventDefault();

                //Setting a new values to title, descr from inputs
                taskTitle.textContent = editTaskTitle.value;
                taskDescription.textContent = editTaskDescription.value;

                //Hiding inputs and button "Apply"
                editDone.style.display = "none";
                editTaskTitle.style.display = "none";
                editTaskDescription.style.display = "none";
                
                //Display title, description, options select and deactivating priority select
                taskTitle.style.display = "block";
                taskDescription.style.display = "block";
                taskSelectOption.style.display = "inline";
                taskSelectPriority.disabled = true;
            });
        }

        //Deleting option
        if (option == 'option-delete') {
            taskList.removeChild(oneTask);
        }
    };
}

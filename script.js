// Variables
const dateHeader = document.querySelector("#dateHeader");
let noteCount = 0;
const addButton = document.querySelector("#addButton");
const noteText = document.querySelector(`#noteText-${noteCount}`);
const delBtn = document.querySelector(".delete-btn");
let deleteBtns = document.querySelectorAll(".delete-btn");
const input = document.querySelector("#input");

// Reset input on load
input.value = null;

//Get current date and print it in front-end
function getCurrentDate() {
  const date = new Date();
  const day = date.getDate();
  const year = date.getFullYear();
  // Date print
  dateHeader.innerHTML = `${date.toLocaleDateString("el-gr", {
    weekday: "long",
  })}, ${day} ${date.toLocaleString("el-gr", {
    month: "long",
  })} ${year} <br/> ${date.toLocaleTimeString("en-GB")}`;
}
getCurrentDate();
setInterval(getCurrentDate, 1000);

//Create new note on button press
addButton.addEventListener("click", addNote);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addNote();
  }
});

function addNote() {
  noteCount++;
  const mainWindow = document.querySelector("#mainWindow");
  const noteHTMLTemplate = `
  <div class = "note-item" id="item-${noteCount}"> 
  <input type="checkbox" data-count="${noteCount}"name="notecheck" id="notecheck-${noteCount}" class="note-check">
  <span class="note-text" id="noteText-${noteCount}">${input.value}</span>
  <button class="delete-btn" data-count="${noteCount}"  id="deleteBtn-${noteCount}" type="button">X</button>
  </div>
  `;
  if (input.value.length === 0) {
    alert("The note is empty");
  } else {
    mainWindow.innerHTML += noteHTMLTemplate;
    input.value = null;
  }
}

// Event Listeners for deleting existing noted and
// marking notes as completed
mainWindow.addEventListener("click", (event) => {
  const clickedElement = event.target;
  if (clickedElement.classList.contains("delete-btn")) {
    const deleteBtn = clickedElement;
    const count = deleteBtn.dataset.count;
    const itemToDelete = document.querySelector(`#item-${count}`);
    itemToDelete.style.backgroundColor = "#E34234";
    itemToDelete.style.opacity = "0";
    setTimeout(function () {
      itemToDelete.remove();
    }, 800);

    noteCount--;
  }

  if (clickedElement.classList.contains("note-check")) {
    const checkBox = clickedElement;
    const parentDiv = checkBox.parentElement;
    const count = checkBox.dataset.count;
    const text = document.querySelector(`#noteText-${count}`);

    checkBox.addEventListener("change", () => {
      if (checkBox.checked) {
        text.classList.add("completed-task");
        parentDiv.style.backgroundColor = " #636363";
      }
      if (!checkBox.checked) {
        text.classList.remove("completed-task");
        parentDiv.style.backgroundColor = "white";
      }
    });
  }
});

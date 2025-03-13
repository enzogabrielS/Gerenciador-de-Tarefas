const columns = document.querySelectorAll(".column--cards");
let draggedCard;
const removebtn = document.getElementById("removebutton");
const editbtn = document.getElementById("editbutton");


const dragStart = (event) => {
    draggedCard = event.target;
    event.dataTransfer.effectAllowed = "move";
}

const dragOver = (event) => {
    event.preventDefault();
}

const dragEnter = ({ target }) => {
    if (target.classList.contains("column--cards")) {
        target.classList.add("column--highlight");
    }
}

const dragLeave = ({ target }) => {
    target.classList.remove("column--highlight");
}

const dropEvt = ({ target }) => {
    if (target.classList.contains("column--cards")) {
        target.classList.remove("column--highlight");
        target.append(draggedCard);
    }
}

const createCard = ({ target }) => {
    if (!target.classList.contains("column--cards")) return;

    const card = document.createElement("section");
    card.className = "card";
    card.draggable = true;
    card.contentEditable = "true";

    card.addEventListener("focusout", () => {
        card.contentEditable = "false";
        if (!card.textContent.trim()) {
            card.remove();
        }
    });

    card.addEventListener("dragstart", dragStart);

    // Adiciona eventos para mostrar/ocultar botão
    card.addEventListener("mouseenter", showEditButton);
    card.addEventListener("mouseleave", hideEditButton);

    target.append(card);
    card.focus();
}

const editCard = () => {
    
    card.contentEditable = "true";
    card.focus();
}

const showEditButton = (event) => {
    const card = event.target;
    card.editbtn.style.display = "block";
    removebtn.style.display = "block";
    card.appendChild(editButton);
}

const hideEditButton = (event) => {
    
    const card = event.target;
    const editButton = card.querySelector(".edit-button");
    if (editButton) {
        editButton.remove();
    }
}

columns.forEach((column) => {
    column.addEventListener("dragover", dragOver);
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
    column.addEventListener("drop", dropEvt);
    column.addEventListener("dblclick", createCard);
});

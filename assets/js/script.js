const columns = document.querySelectorAll(".column--cards");
const cards = document.querySelectorAll("cards");

let draggedCard;

const dragStart = (event) => {
    draggedCard = event.target;
    event.dataTransfer.effectAllowed = "move";
}
const dragOver = (event) => {
    event.preventDefault();
    
}
const dragEnter = ({target}) => {
    if(target.classList.contains("column--cards")){
        target.classList.add("column--highlight");
    }
}
const dragLeave = ({target}) => {
        target.classList.remove("column--highlight");
    
}
const dropEvt = ({target}) => {
    if (target.classList.contains("column--cards")) {

        target.classList.remove("column--highlight");
        target.append(draggedCard);

    }
}
const createCard = ({target}) => {
    if (!target.classList.contains("column--cards")) return
     //se esse elemento que eu cliquei nao tiver a classe coulmn--cards ele nao executara o codigo abaixo

    const card = document.createElement("section");

    card.className = "card";
    card.draggable = "true";
    card.contentEditable = "true";

    card.addEventListener("focusout", () =>{
        card.contentEditable = "false";

        if (!card.textContent) {
            card.remove();
        }
    })
    
    card.addEventListener("dragstart", dragStart);

    target.append(card); // adiciona card dentro da minha coluna
    card.focus() // faz com que ao clicar ele ja esteja na funcao de ser editado, podendo escrever dentro
}

const editCard = ({target}) => {
    if (target.classList.contains("card")) {
        target.contentEditable = "true";
        target.focus();
    }
}

columns.forEach((column) => {
    column.addEventListener("dragover", dragOver);
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
    column.addEventListener("drop", dropEvt);
    column.addEventListener("dblclick", createCard);
    column.addEventListener("dblclick", editCard);
})


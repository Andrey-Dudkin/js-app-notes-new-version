const notesCards = document.querySelector(".cards_notes");
const noteForm = document.querySelector(".user_form");
const noteInput = document.querySelector(".user_input");
const hexColors = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
];
let notes = []
if(localStorage.getItem("notes")){
    notes = JSON.parse(localStorage.getItem("notes"));
}
notes.forEach(function(note){
    let cardNote = document.createElement("div");
    cardNote.id = note.noteId;
    cardNote.dataset.div = "delete";
    cardNote.className = "card_note";
    cardNote.innerHTML = `<p>${note.noteText}</p>`
    cardNote.style.backgroundColor = note.noteColor
    notesCards.append(cardNote);
})

noteForm.addEventListener("submit", function(e){
    e.preventDefault();
    if(noteInput.value === ""){
        noteInput.style.borderColor = "#ff0000";
    }else{
        noteInput.style.borderColor = "#ffff00";
         addNote();
    }
});
notesCards.addEventListener("dblclick", deleteNote);


// * Функции

function addNote(){
    const newNote = {
        noteId: Date.now(),
        noteText: noteInput.value,
    };
    let note = document.createElement("div");
    note.id = newNote.noteId;
    note.dataset.div = "delete";
    note.className = "card_note";
    note.innerHTML = `<p>${newNote.noteText}</p>`
    notesCards.append(note);
    colorGenerator(note,newNote)
    notes.push(newNote);
    seveInLocalStorage();
    noteInput.value = "";
    return note;
};

function deleteNote(e){
    if(e.target.dataset.div === "delete"){
        const cardNote = e.target;
        const noteId = Number(cardNote.id);
        notes = notes.filter(function(note){
            return  note.noteId !== noteId 
        })
        seveInLocalStorage();
        

        cardNote.remove();
    };
};

function seveInLocalStorage(){
    localStorage.setItem("notes", JSON.stringify(notes))
};

function getRandomNambers(){
    return Math.floor(Math.random() * hexColors.length);
};

function colorGenerator(note,newNote){
    let colorHex = "#";
    for(let i = 0; i < 6; i++){
        colorHex += hexColors[getRandomNambers()]
    };
    note.style. backgroundColor = colorHex;
    newNote.noteColor = colorHex;
};
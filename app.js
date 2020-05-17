showNotes();

/*This is for adding title and note*/

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    if (notes == "") {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    showNotes();
});

/* this is for showing the notes in box */

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index) {
        html += `
<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
	<div class="card-body">
		<h5 class="card-title">${element.title}</h5>
		<p class="card-text"> ${element.text}</p>
		<button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
	</div>
</div>`;

    });

    /*Nothing to show ! Use "Add a note " section above to add notes.*/

    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show ! Use "Add a note " section above to add notes.`;
    }
}

/*This is for delete the notes*/

function deleteNote(index) {

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

/*This is for search the notes*/

let search = document.getElementById('searchTxt');
search.addEventListener('input', function() {
    let inputval = search.value.toLowercase();
    let noteCards = document.getElementByClassName('noteCard');
    Array.from(noteCards).foreach(function(element) {
        let cardTxt = element.getElementByTagName('p')[0].innerText;
        if (cardTxt.includes(inputval)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})
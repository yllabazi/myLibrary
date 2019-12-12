let myLibrary = [];

function Book(title, author, published, pages, read = true) {
    this.title = title;
    this.author = author;
    this.published = published;
    this.pages = pages;
    this.read = read ? "✔" : "✗";
}

function addBooksToLibrary(book) {
    myLibrary.push(book);
}

const addBook = (ev) => {
    ev.preventDefault();
    let book = new Book(
        document.querySelector('#title').value,
        document.querySelector('#author').value,
        Number(document.querySelector("#published").value),
        Number(document.querySelector("#pages").value),
        document.querySelector('input[name="read"]').checked
    );

    myLibrary.push(book);
    render();
    deleteRow();
    changeRead();
    document.forms[0].reset();
}

function render() {
    for (let i = tableBody.rows.length; i < myLibrary.length; i++) {

        let newRow = tableBody.insertRow(tableBody.rows.length);

        for (let j = 0; j < 5; j++) {
            let cell = newRow.insertCell();
            if(j === 4){
                cell.className = "read";
            }
            let text = document.createTextNode(myLibrary[i][Object.keys(myLibrary[i])[j]]);
            cell.appendChild(text);
        }

        let cellBtn = newRow.insertCell();
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn', 'btn-warning', 'btn-sm');
        deleteBtn.textContent = "delete";
        cellBtn.appendChild(deleteBtn);

    }
}

function deleteAllRows(){
    let i = 0;
    while(i < tableBody.rows.length){
        tableBody.deleteRow(i);
    }
}

function deleteRoww() {
    for (let i = 1; i < table.rows.length; i++) {
        table.rows[i].cells[5].onclick = function() {
            index = this.parentElement.rowIndex;
            table.deleteRow(index);
        }
    }
}

let changeRead = () =>{
    document.querySelector('.tableBody').addEventListener('click', (e)=>{
        if(e.target.className == "read"){
            e.target.textContent == '✔' ? e.target.textContent = "✗" : e.target.textContent = "✔"
        }
    })
}

let index, table = document.querySelector('.table');
const tableBody = document.querySelector('.tableBody')
const addBtn = document.querySelector('.btn-info');
const bookForm = document.querySelector('.bookForm');
const submitBtn = document.querySelector('.submit');
const formClose = document.querySelector('.close');


let b1 = new Book("Muslimani Productiv", "Muhamed Faris", 2019, 259, true);
let b2 = new Book("Power of Habit", "Charles Duhigg", 2012, 330, false);

addBtn.addEventListener('click', () => {
    bookForm.setAttribute('style', 'visibility: visible;');
    addBtn.setAttribute('style', 'visibility: hidden;');
})

submitBtn.addEventListener('click', addBook);

formClose.addEventListener('click', (e) => {
    e.preventDefault();
    bookForm.setAttribute('style', 'visibility: hidden;');
    addBtn.setAttribute('style', 'visibility: visible;');
})

addBooksToLibrary(b1);
addBooksToLibrary(b2);
render();
deleteRoww();
changeRead();
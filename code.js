let myLibrary = [];

function Book(title, author, pageCount, hasBeenRead) {
    this.id = crypto.randomUUID();
    this.pageCount = pageCount;
    this.author = author;
    this.title = title;
    this.hasBeenRead = hasBeenRead;
    this.readBook = function() {
        this.hasBeenRead = true;
    }
}

function getBookById (id) {
    for (book of myLibrary) {
        if (book.id === id) {
            return book;
        }
    }
}

function addBookToLibrary(formData) {
    clearLibrary();
    myLibrary.push(new Book(formData.get("title"), formData.get("author"), formData.get("pageCount"), formData.get("hasBeenRead")));
    displayLibrary();
}

function clearLibrary () {
    const libraryDiv = document.querySelector("#library");
    for (book of myLibrary) {
        bookDiv = document.querySelector("[id=\"" + book.id + "\"]");
        if (bookDiv !== null) {
            libraryDiv.removeChild(bookDiv);
        }
    }
}

function removeBook(book) {
    clearLibrary();
    myLibrary = myLibrary.filter(b => b.id !== book.id);
}

function displayLibrary() {
    const libraryDiv = document.querySelector("#library");
    for (book of myLibrary) {
        const bookDiv = document.createElement("div");
        bookDiv.className = "book";
        bookDiv.id = book.id;
        bookDiv.innerHTML = `
        <div class=\"title\">${book.title}</div>
        <div class=\"author\">${book.author}</div>
        <div class=\"pageCount\">${book.pageCount} pages</div>`
        if (book.hasBeenRead) {
            bookDiv.innerHTML += `<div class=\"beenRead\">Read</div>`
        }
        else {
            bookDiv.innerHTML += `<div class=\"beenRead\">Not read yet</div>`
        }
        bookDiv.innerHTML += `<div><button class=\"readBook\" data-bookid="${book.id}">Read Book</button>`
        bookDiv.innerHTML += `<div><button class=\"removeBook\" data-bookid="${book.id}">Remove Book</button>`
        libraryDiv.appendChild(bookDiv);
    }
    const readButtons = document.querySelectorAll(".readBook");
    for (button of readButtons) {
        button.addEventListener("click", (e) => {
            const buttonBookId = e.target.dataset.bookid;
            const bookObject = getBookById(buttonBookId);
            bookObject.readBook();
            clearLibrary();
            displayLibrary();
        })
    }

    const removeButtons = document.querySelectorAll(".removeBook");
    for (button of removeButtons) {
        button.addEventListener("click", (e) => {
            const buttonBookId = e.target.dataset.bookid;
            const bookObject = getBookById(buttonBookId);
            removeBook(bookObject);
            displayLibrary();
        })
    }
}

const dialog = document.querySelector("#libraryDialog");
const showButton = document.querySelector("#addBook");

showButton.addEventListener("click", () => {
    dialog.showModal();
})

const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    dialog.close();
    addBookToLibrary(new FormData(e.target));
    e.target.reset();
})
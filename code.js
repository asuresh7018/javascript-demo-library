const myLibrary = [new Book("TestTitle", "Author", 300, true)];

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

function addBookToLibrary(formData) {
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

function displayLibrary() {
    clearLibrary();
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
        libraryDiv.appendChild(bookDiv);
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
})
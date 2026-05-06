const myLibrary = [];

function Book() {
    this.id = crypto.randomUUID();

}

function addBookToLibrary() {

}

function displayLibrary() {
    const libraryDiv = document.querySelector("#library");
    for (book of myLibrary) {
        const bookDiv = document.createElement("div");
        bookDiv.className = "book";
        bookDiv.id = book.id;
        libraryDiv.appendChild(bookDiv);
    }
}

const dialog = document.querySelector("#libraryDialog");
const showButton = document.querySelector("#addBook");

showButton.addEventListener("click", () => {
    dialog.showModal();
})
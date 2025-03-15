const myLibrary = [];

const cancelButton = document.getElementById('cancelButton');
const form = document.querySelector('.form-container');

const addNewBook = () => {
  document.getElementById("popUpForm").style.display = "block";
  addBookButton.style.display = "none";
}

cancelButton.addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("popUpForm").style.display = "none";
  form.reset();
  addBookButton.style.display = "block";
});

const addBookButton = document.getElementById('new-book');
addBookButton.addEventListener("click", addNewBook);
document.querySelector('.form-container').addEventListener('submit', function(event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('readOption').checked;

  addBookToLibrary(title,author,pages,read);
  displayBooks();
  document.getElementById("popUpForm").style.display = "none";
  form.reset();
  addBookButton.style.display = "block";
});

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();

  this.toggleRead = function () {
    this.read = !this.read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  myLibrary.push(book)
}

const displayBooks = () => {
    const libraryContainer = document.getElementById('library-container')
    libraryContainer.innerHTML = '';

    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        const title = document.createElement('h2');
        title.textContent = book.title;

        const author = document.createElement('p');
        author.textContent = `Author: ${book.author}`;

        const pages = document.createElement('p');
        pages.textContent = `Pages: ${book.pages}`;

        const read = document.createElement('p');
        read.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;

        const toggleReadButton = document.createElement('button');
        toggleReadButton.textContent = "Toggle Read";
        toggleReadButton.addEventListener("click", function() {
          book.toggleRead();
          read.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;
        })

        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Delete';
        deleteButton.setAttribute('data-id', book.id);
        deleteButton.addEventListener("click", function() {
            const bookId = this.getAttribute('data-id');
            myLibrary.splice(myLibrary.findIndex(book => book.id === bookId), 1);
            libraryContainer.removeChild(bookCard);
        });

        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        bookCard.appendChild(read);
        bookCard.appendChild(toggleReadButton);
        bookCard.appendChild(deleteButton);

        libraryContainer.appendChild(bookCard);
    })
}

addBookToLibrary("The Hobbit", "J. R. R. Tolkien", 312, true);
addBookToLibrary("The Last Wish", "Andrzej Sapkowski", 288, false);
displayBooks();
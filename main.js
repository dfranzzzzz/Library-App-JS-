// Library Log
const booksTotal    = document.querySelector(`#books_total`);
const booksFinished = document.querySelector(`#books_finished`);
const booksUnread   = document.querySelector('#books_unread');

// Book
// const bookTitle  = document.querySelector(`.book_title`);
// const bookAuthor = document.querySelector(`.book_author`);
// const bookGenre  = document.querySelector(`.book_genre`);

// Button
const btnAdd    = document.querySelector(`.add_book`);

// Listed Books
const bookList = document.querySelector(`.listed_books`);

// Form
const modal = document.querySelector(`.modal`);
const form = document.querySelector(`.list_form`);
const form_title = document.querySelector(`#form_title`);
const form_author = document.querySelector(`#form_author`);
const form_genre = document.querySelector(`#form_genre`);
const form_status = document.querySelector(`#form_status`);

window.onload = function () {
  // const btnDone   = document.querySelectorAll(`.book_done`);
  // const btnUnread = document.querySelectorAll(`.book_unread`);
  // btnDone.forEach(button => button.addEventListener(`click`, doneToUnread));
  // btnUnread.forEach(button => button.addEventListener(`click`, unreadToDone));

  
  
  // Event Listeners
  btnAdd.addEventListener(`click`, showForm);
  window.addEventListener(`click`, clickExitForm);
  bookList.addEventListener(`click`, Book.deleteBook);
}

form.addEventListener(`submit`, (e) => {
  e.preventDefault();
  new Book(`${form_title.value}`, `${form_author.value}`, `${form_genre.value}`, `${form_status.value}`);
  resetForm();
  exitForm();
});

exitForm = () => {
  modal.style.display = "none";
}

clickExitForm = (e) => {
  if (e.target == modal) exitForm();
}

showForm = () => {
  modal.style.display = "flex";
}

resetForm = () => {
  form.reset();
}


// doneToUnread = (e) => {
//   e.target.classList.remove(`book_done`);
//   e.target.classList.add(`book_unread`);
//   e.target.innerText = `UNREAD`;
//   alert("asdfas")
// }

// unreadToDone = (e) => {
//   e.target.classList.remove(`book_unread`);
//   e.target.classList.add(`book_done`);
//   e.target.innerText = `DONE`;
//   console.log(e);
// }

class Book {
  constructor (title, author, genre, status) {
    this.title  = title;
    this.author = author;
    this.genre  = genre;
    this.status = status;
    Book.allBooks.push(this);
    this.createBook();
  }

  getSummary() {
    console.log(this.title);
    console.log(this.author);
    console.log(this.genre);
    console.log(this.status);
  }

  createBook () {
    const book         = document.createElement(`div`);
    const bookTitle    = document.createElement(`h4`);
    const bookAuthor   = document.createElement(`h4`);
    const bookGenre    = document.createElement(`h4`);
    const indicatorBtn = document.createElement(`button`);
    const deleteBtn    = document.createElement(`button`);

    book.className       = `book`;
    bookTitle.className  = `book_title`;
    bookAuthor.className = `book_author`;
    bookGenre.className  = `book_genre`;
    deleteBtn.className  = `book_delete`;
    if (this.status === 'DONE') indicatorBtn.className = `book_done`;
    if (this.status === 'UNREAD') indicatorBtn.className = `book_unread`;

    bookTitle.innerText    = `${this.title}`
    bookAuthor.innerText   = `${this.author}`
    indicatorBtn.innerText = `${this.status}`;
    bookGenre.innerText    = `${this.genre}`
    deleteBtn.innerText    = `DELETE`;

    bookList.append(book);
    book.append(bookTitle);
    book.append(bookAuthor);
    book.append(bookGenre);
    book.append(indicatorBtn);
    book.append(deleteBtn);
  }

  static deleteBook (e) {
    // event bubbling
    if(e.target.className == 'book_delete') {
      const book = e.target.parentElement;
      const title = `${e.target.parentElement.childNodes[0].innerText}`; 
      const index = Book.allBooks.findIndex(x => x.title === title);
      bookList.removeChild(book);
      Book.allBooks.splice(index, 1);
    }
  }

  static allBooks = [];
}

// Test Samples
new Book (`Atomic Habits`, `James Clear`, `Self-help`, `DONE`);
new Book (`Subtle Art of not Giving a F*ck`, `Mark Manson`, `Self-help`, `UNREAD`);
new Book (`Naruto`, `Mark Manson`, `Self-help`, `UNREAD`);
new Book (`Eren`, `Mark Manson`, `Self-help`, `DONE`);
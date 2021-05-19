// Library Log
const booksTotal    = document.querySelector(`#books_total`);
const booksFinished = document.querySelector(`#books_finished`);
const booksUnread   = document.querySelector('#books_unread');

// Book
// const bookTitle  = document.querySelector(`.book_title`);
// const bookAuthor = document.querySelector(`.book_author`);
// const bookGenre  = document.querySelector(`.book_genre`);

// Button
// const btnUnread = document.querySelector(`.book_unread`);
// const btnDone   = document.querySelector(`.book_done`);

// Listed Books
const bookList = document.querySelector(`.listed_books`);

window.onload=function(){
  const btnDelete = document.querySelectorAll(`.book_delete`);

  // Event Listeners
  btnDelete.forEach(button => button.addEventListener(`click`, Book.deleteBook));
}

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
    const title = `${e.target.parentElement.childNodes[0].innerText}`; 
    const index = Book.allBooks.findIndex(x => x.title === title);
    Book.allBooks.splice(index, 1);
    e.target.parentElement.remove();
  }

  static allBooks = [];
}

// Test Samples
new Book (`Atomic Habits`, `James Clear`, `Self-help`, `DONE`);
new Book (`Subtle Art of not Giving a F*ck`, `Mark Manson`, `Self-help`, `UNREAD`);
new Book (`Naruto`, `Mark Manson`, `Self-help`, `UNREAD`);
new Book (`Eren`, `Mark Manson`, `Self-help`, `DONE`);



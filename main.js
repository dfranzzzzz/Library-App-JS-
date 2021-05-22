// Firebase configuration and initialization
var firebaseConfig = {
  apiKey: "AIzaSyAZ23WFMbLO7hv-3AjeeQaBN36EWFPzEvE",
  authDomain: "library-7cff7.firebaseapp.com",
  databaseURL: "https://library-7cff7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "library-7cff7",
  storageBucket: "library-7cff7.appspot.com",
  messagingSenderId: "806283825553",
  appId: "1:806283825553:web:9c83676d1768bcb4810a30",
  measurementId: "G-XCSB27CF8K"
};

firebase.initializeApp(firebaseConfig);

// Reference books collection
var booksRef = firebase.database().ref('books');

// For DOM manipulations
const bookList = document.querySelector(`.listed_books`);
const btnAdd   = document.querySelector(`.add_book`);
const modal    = document.querySelector(`.modal`);
const form     = document.querySelector(`.list_form`);

// Event Listeners
window.onload = function () {  
  window  .addEventListener(`click`, clickExitForm);
  btnAdd  .addEventListener(`click`, showForm);
  bookList.addEventListener(`click`, Book.deleteBook); // event bubbling concept
  bookList.addEventListener(`click`, Book.toggleStatus); // event bubbling concept
}

// Form functions
form.addEventListener(`submit`, (e) => {
  e.preventDefault();
  var title  = getInputVal(`form_title`);
  var author = getInputVal(`form_author`);
  var genre  = getInputVal(`form_genre`);
  var status = getInputVal(`form_status`);
  saveBook(title, author, genre, status);
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

saveBook = (title, author, genre, status) => {
  var newBookRef = booksRef.child(`${title}`);
  newBookRef.set({
    Title : title,
    Author: author,
    Genre : genre,
    Status: status
  });
}

getInputVal = (id) => {
  return document.getElementById(id).value;
}

renderBooks = (data) => {
  document.querySelectorAll(".book").forEach(book => book.remove()) 
  var books = data.val();
  if (books == null) return;
  var keys = Object.keys(books);
  for ( var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var title = books[k].Title;
    var author = books[k].Author;
    var genre = books[k].Genre;
    var status = books[k].Status;
    Book.createBook (`${title}`, `${author}`, `${genre}`, `${status}`);
  }
}

class Book {
  static createBook (title, author, genre, status) {
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
    if (status === 'DONE') indicatorBtn.className = `book_done`;
    if (status === 'UNREAD') indicatorBtn.className = `book_unread`;

    bookTitle.innerText    = `${title}`
    bookAuthor.innerText   = `${author}`
    indicatorBtn.innerText = `${status}`;
    bookGenre.innerText    = `${genre}`
    deleteBtn.innerText    = `DELETE`;

    bookList.append(book);
    book.append(bookTitle);
    book.append(bookAuthor);
    book.append(bookGenre);
    book.append(indicatorBtn);
    book.append(deleteBtn);
  }

  static toggleStatus (e) {
    // if status is DONE
    if (e.target.className == 'book_done') {
      const book  = e.target.parentElement;
      const title = `${book.childNodes[0].innerText}`; 
      booksRef.child(title).update({
        Status: `UNREAD`
      })
    }

    // if status is UNREAD
    if (e.target.className == 'book_unread') {
      const book  = e.target.parentElement;
      const title = `${book.childNodes[0].innerText}`; 
      booksRef.child(title).update({
        Status: `DONE`
      })
    }
  }

  static deleteBook (e) {
    if (e.target.className == 'book_delete') {
      const book  = e.target.parentElement;
      const title = `${book.childNodes[0].innerText}`; 
      booksRef.child(title).remove()
    }
  }
}

booksRef.on('value', renderBooks);
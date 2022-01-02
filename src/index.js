// Book Class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI class: Handle the UI tasks
class UI {
  static displayBookList() {
    const books = Store.getBook();
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row); // appending data in to table
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const conatainer = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    conatainer.insertBefore(div, form);
    setTimeout(() => document.querySelector(".alert").remove(), 2000);
  }
  static clearFields() {
    document.querySelector("#title-el").value = " ";
    document.querySelector("#author-el").value = " ";
    document.querySelector("#isbn-el").value = " ";
  }
}
// Handle storage
class Store {
  static getBook() {
    let books;
    if (localStorage.getItem("books") == null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }
  static addBook(book) {
    const books = Store.getBook();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBook();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}
// Display the data
document.addEventListener("DOMContentLoaded", UI.displayBookList());

// Event add book
document.querySelector("#add-btn").addEventListener("click", function () {
  const title = document.querySelector("#title-el").value;
  const author = document.querySelector("#author-el").value;
  const isbn = document.querySelector("#isbn-el").value;

  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("All Fields Are reuired!", "danger");
  } else {
    // Initiate new book
    const book = new Book(title, author, isbn);
    UI.addBookToList(book);
    Store.addBook(book);
    UI.showAlert("Book Added!", "success");
    UI.clearFields();
  }
});

// Event remove book
document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  UI.showAlert("Book removed", "danger");
});

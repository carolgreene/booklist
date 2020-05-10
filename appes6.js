//make classes
//Book just needs to use constructor to make a new book
class Book {
  constructor(title, author, isbn) {
    this.title = title
    this.author = author
    this.isbn = isbn
  }
}


//UI will contain all of the methods to update the UI w/our info
class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list')   
    const row = document.createElement('tr')
    
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href='#' class="delete">X</a></td>
    `
    list.appendChild(row);   
  }

  showAlert(message, className) {    
    const div = document.createElement('div')    
    div.className = `alert ${className}`       
    div.appendChild(document.createTextNode(message)) 

    const container = document.querySelector('.container')    
    const form = document.querySelector('#book-form')
    container.insertBefore(div, form)  

    setTimeout(function() {    
    document.querySelector('.alert').remove();
    }, 3000)      
  }    

  deleteBook(target) {
    if(target.className === 'delete') {    
      target.parentElement.parentElement.remove()
    }
  }  

  clearFields() {
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('isbn').value = ''
  }
}

//Local Storage class. All methods are static. They are part of the class but not part of the object
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();
    //iterate thru books array & pass each book to the ui so it'll show after refresh
    books.forEach(function(book){
      const ui = new UI;
      //add book to UI
      ui.addBookToList(book)
    })
  }

  static addBook(book) {
    const books = Store.getBooks();
    //add book to local storage
    books.push(book);
    //set local storage to new array
    localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBook(isbn) {
    const books = Store.getBooks()

    books.forEach(function(book, index) {
      if(book.isbn === isbn) {
        books.splice(index, 1)
      }
    })
    localStorage.setItem('books', JSON.stringify(books))
  }
}

//Event Listeners

//DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e) {
  const title = document.getElementById('title').value
        author = document.getElementById('author').value
        isbn = document.getElementById('isbn').value

  const book = new Book(title, author, isbn);
  const ui = new UI();   
  
  if(title === '' || author === '' || isbn === '') {
    ui.showAlert('Please enter all fields','error' )  //takes in the msg & the className of the msg
  } else {
    ui.addBookToList(book)
    //add to local storage
    Store.addBook(book)

    ui.showAlert('Book Added', 'success')
    ui.clearFields()
  }
  e.preventDefault()
})  

//event listener for delete book
document.getElementById('book-list').addEventListener('click', function(e) {
  const ui = new UI()
  ui.deleteBook(e.target)

  //remove from local storage.parent is the td element. previousElementSibling is the td element right b4, whick is the isbn
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent)   //use textContent to get what's inside element

  ui.showAlert('Book deleted', 'success')
  e.preventDefault()
})
// 1. Book Constructor   after this is done, do event listener & console.log to test
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// 2. UI Constructor build an empty object
function UI() {}

// 4. add book to list prototype function
UI.prototype.addBookToList = function(book) {
  console.log(book)
  //get element & set to variable
  const list = document.getElementById('book-list')   
  //create tr element & set to variable
  const row = document.createElement('tr')
  //insert cols (using innerHTML of the element you created)
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class="delete">X</a></td>
  `
  //append to original variable
  list.appendChild(row);   
}

// 6. Show alert prototype function
UI.prototype.showAlert = function(message, className) {
  //create div variable
  const div = document.createElement('div')
  //add class to div
  div.className = `alert ${className}`    
  //add text & append to div
  div.appendChild(document.createTextNode(message))
  //get parent or the div
  const container = document.querySelector('.container')
  //get form & assign to variable
  const form = document.querySelector('#book-form')
  //insert alert into parent
  container.insertBefore(div, form)  //takes in what we want to insert & where to insert. insert div b4 form
  //Timeout after 3 sec
  setTimeout(function() {
  //get part of document u want to set timeout to (you're removing the alert after 3 secs)
  document.querySelector('.alert').remove();
  }, 3000)      
}    

// 8. Delete Book prototype function
UI.prototype.deleteBook = function(target) {
  console.log(target)
  if(target.className === 'delete') {
  //the target is the a tag.  
  //traverse the dom up to the <tr> and delete it(1st parentElement is <th>. 2nd parentElement is <tr>)
  //the tr contains all of the book info along w/the delete x. 
  //if you delete the <tr> everything is removed
    target.parentElement.parentElement.remove()
  }
}  

// 5.Clear Fields prototype function (get the fields & clear them)
UI.prototype.clearFields = function() {
  document.getElementById('title').value = ''
  document.getElementById('author').value = ''
  document.getElementById('isbn').value = ''
}

// 3.Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e) {
  //get form values  
  const title = document.getElementById('title').value
        author = document.getElementById('author').value
        isbn = document.getElementById('isbn').value

  //Instantiate book & UI    
  const book = new Book(title, author, isbn);
  const ui = new UI();   
  
  //validate entry
  if(title === '' || author === '' || isbn === '') {
    ui.showAlert('Please enter all fields','error' )  //takes in the msg & the className of the msg
  } else {
  //add book to list
  ui.addBookToList(book)
  //show success
  ui.showAlert('Book Added', 'success')
  //clear fields
  ui.clearFields()
  }
  e.preventDefault()
})  

// 7. Event listener for delete. get the parent of the delete (tbody)
document.getElementById('book-list').addEventListener('click', function(e) {
  //instantiate ui
 const ui = new UI()
 //call deleteBook prototype
  ui.deleteBook(e.target)
  //show alert
  ui.showAlert('Book deleted', 'success')
  e.preventDefault()
})
  
  
  
  

  
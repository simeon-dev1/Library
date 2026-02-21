//DOM ELEMENT SEECTORS
//book-card-container
const container = document.getElementById('book-cards');

//header sect 
//> create new book
const createNewBtn = document.querySelector("#create-new-btn");

const bookCount = document.querySelector("#book-count")

//modal
const modal = document.getElementById('new-book-modal');
const closeBtn = document.getElementById('close-modal');
const cancelBtn = document.getElementById('cancel-btn');
const form = document.getElementById('new-book-form');


//Initial Page Stuff
this.addEventListener("DOMContentLoaded", displayBooks)

//EVENT LISTENERS
createNewBtn.addEventListener("click", (e) => {
	modal.showModal()
})

modal.addEventListener("click", (e) => {
	if (e.target === modal) {
		closeModal();
		//closes modal when its background is clicked
	}
})

closeBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);


//INITIAL BOOK SHELF ARRAY
let myLibrary = [];



// 1. CONSTRUCTORS  
// NEW BOOK CONSTRUCTOR
class Book {

	this.id = crypto.randomUUID()
	this.created_at = new Date().toLocaleDateString()

	constructor(title, author = "unknown", pageNumber = 0, haveRead = false, content = "") {
		this.title = title;
		this.author = author;
		this["No of pages"] = pageNumber;
		this["has been read"] = haveRead ? true : false;
	}

	info() {
		let endPhrase = (this["has been read"] === true) ? ", has been read":
						(this["has been read"] === false) ? ", not read yet" :
						".";
		return `${this.title} by ${this.author}, ${this["No of pages"]} pages${endPhrase}`;
	}

	checkReadStatus() {		
		if (this["has been read"] === true) {
			return "Read: ✓"
		}
		else {
			return "Read: X"
		}
	}
}

//2. DYNAMIC LOADING OF BOOKS TO FRONTEND
function displayBooks() {

  let books = myLibrary
  bookCount.innerText = books.length;
  
  // Clear existing content (optional - remove if you want to append)
  container.innerHTML = '';

  //check for empty array and load empty
  if (books.length === 0) {
  	container.innerHTML = `<h3 style="color: blue">No books yet</h3>`
  }
  
  // Loop through each book and create a card
  books.forEach(book => {
    // Create main card div
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.dataset.id = book.id; // Store ID for easy access
    //check read status
    let readStatus = book.checkReadStatus()
    // Build the inner HTML
    bookCard.innerHTML = `
      <div class="book-stuff">
        <p class="id">${book.id}</p>
        <p class="title">${book.title}</p>
        <p class="author">By ${book.author}</p>
        <p class="page-numbers">${book["No of pages"]} pages</p>
        <p>${readStatus}</p>
      </div>
      <div class="book-tools">
        <i class="fas fa-edit" data-action="edit" data-id="${book.id}"></i>
        <i class="fas fa-trash-alt" data-action="delete" data-id="${book.id}"></i>
        <i class="fas fa-info-circle" data-action="info" data-id="${book.id}"></i>
        <i class="fas fa-book-open" data-action="read" data-id="${book.id}"></i>
      </div>
    `;
    
    // Added click handlers for the icons
    const icons = bookCard.querySelectorAll('.book-tools i');
    icons.forEach(icon => {
      icon.addEventListener('click', handleIconClick);
    });
    
    // Append card to book card container
    container.appendChild(bookCard);
  });
}

//3. BOOK CARD ICONS
//Handler function for 
//icon clicks in book cards

function handleIconClick(event) {
  const icon = event.currentTarget;
  const action = icon.dataset.action;
  const bookId = icon.dataset.id;
  
  console.log(`${action} clicked for book ID: ${bookId}`);

	//fetch matching object details
	let book = myLibrary.find(book => book.id === bookId)
	console.log(book)
	bookIndex = myLibrary.findIndex(storage => book.id === storage.id)
	console.log(bookIndex)
  
  // Add your logic here
  switch(action) {
    case 'edit':
      alert("Edit Book functionaity coming soon")
      break;
    case 'delete':
    let response = confirm("Are you sure you want to delete this book?")
    	if (response) {
    		myLibrary.splice(bookIndex, 1)
    		displayBooks()
    	}
      break;
    case 'info':
      alert(`${book.info()}`)
      break;
    case 'read':
      if (book["has been read"] === true) {
      	book["has been read"] = false;
      	displayBooks();
      }
      else if (book["has been read"] === false) {
      	book["has been read"] = true;
      	displayBooks();
      }
      break;
  }
}



//4. "ADD NEW BOOK" MODAL FUNCTIONS

// Close modal functions
function closeModal() {
  modal.close();
  form.reset(); // Clear form
}

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent default dialog closing
  
  // Get form data
  const formData = new FormData(form);
  const newBook = new Book(
  	formData.get("title"),
  	formData.get("author"),
  	formData.get("pages"),
  	formData.get("read"),
  	formData.get("content"),
  )
  
  // Add to library (your existing array)
  myLibrary.push(newBook);

  // Refresh display
  displayBooks();

  // Close modal
  closeModal();
});

//MODAL UX REFINES
// Close modal when clicking outside
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});



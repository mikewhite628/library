const titleField = document.querySelector('.title')
const submitButton = document.querySelector('.sub')
const authorField = document.querySelector('.author')
const pagesField = document.querySelector('.pages')
const completeField = document.querySelector('.complete')

const book1 = new Book('Think Like a Programmer', 'Anton Spraul', 326, 'have not finished')
const book2 = new Book('Pragmatic Programmer', 'Andy Hunt', 356, 'have not finished')

let meLibrary = [book1, book2];


function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}



function addBookToLibrary() {
    meLibrary.push(new Book (titleField.value, authorField.value, pagesField.value, completeField.value))
}





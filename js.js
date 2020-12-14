const titleField = document.querySelector('.title')
const submitButton = document.querySelector('.sub')
const authorField = document.querySelector('.author')
const pagesField = document.querySelector('.pages')
const bookshelf = document.querySelector('.bookshelf')
const createNew = document.querySelector('.create-new')
const form = document.querySelector('.myform')
const haveRead = document.getElementsByName('have-read')
const backgroundFade = document.getElementById('overlay-back')

let meLibrary = [];

submitButton.addEventListener('click', addBookToLibrary)

class Book {
    constructor(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read 
}

    markComplete = function(){
    this.read = 'complete'
}

    markIncomplete = function(){
    this.read = 'incomplete'
}
}

function addBookToLibrary() {
    let newItem
    meLibrary.push(new Book (titleField.value, authorField.value, pagesField.value, checkRead()));
    let lastItem = meLibrary.length-1;
    newItem = meLibrary[lastItem];
    db.collection('Books').add({
        title: newItem.title,
        author: newItem.author,
        pages: newItem.pages,
        read: newItem.read
    })
    resetValues();
    form.style.visibility = 'hidden';
    backgroundFade.style.display = 'none'
}

checkRead = () => {
    for (i = 0; i < haveRead.length; i++ ){
        if (haveRead[i].checked) {
            status = haveRead[i].value;
    }
    return status
}
}

createNew.addEventListener('click', function(){
    form.style.visibility = 'visible'
    backgroundFade.style.display = 'block'
    backgroundFade.style.transition = 'background-color 2s'
})

resetValues = () => {
    titleField.value = ''
    authorField.value = ''
    pagesField.value = ''
    haveRead.value = ''
    status.value = ''

}

function renderBooks(doc){
    let bookCard = document.createElement('div');
    let theAuthor = document.createElement('span');
    let theTitle = document.createElement('span');
    let thePages =  document.createElement('span');
    let theRead = document.createElement('span');
    let completeToggle = document.createElement('button');
    let remove = document.createElement('div');

    bookshelf.style.gridTemplateColumns = (`repeat(auto-fit, minmax(200px, 1fr))`);
    
    bookCard.classList.add('book-box');
    bookCard.setAttribute('data-id', doc.id);

    theAuthor.classList.add('author-span');
    theTitle.classList.add('title-span');
    thePages.classList.add('pages-span');
    theRead.classList.add('read-span');
    remove.classList.add('x');
    completeToggle.classList.add('complete-toggle')

    remove.textContent = 'x'
    theTitle.textContent = `${doc.data().title}`;
    theAuthor.textContent = `Author: ${doc.data().author}`;
    thePages.textContent = `Pages: ${doc.data().pages}`;

    if(doc.data().read !== 'complete'){
        completeToggle.style.background = '#E8E6FD';
        completeToggle.innerText = 'incomplete';
    } else {
    if (doc.data().read === 'complete'){
        completeToggle.style.background = '#AFA8F8';
        completeToggle.innerText = 'complete';

    }
}

//deleting data
remove.addEventListener('click', (e) =>{
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('Books').doc(id).delete();
})


completeToggle.addEventListener('click', function(e) {
    let theid = e.target.parentElement.getAttribute('data-id')
    if(doc.data().read!== 'complete'){
        db.collection('Books').doc(theid).update({
            read: 'complete'
        })
        completeToggle.style.background = '#AFA8F8'
        completeToggle.innerText = 'complete'
    } else {
    if (doc.data().read === 'complete'){
        db.collection('Books').doc(theid).update({
            read: 'incomplete'
        })
        completeToggle.style.background = '#E8E6FD'
        completeToggle.innerText = 'incomplete'
    }
    }
})


    bookshelf.appendChild(bookCard)
    bookCard.appendChild(remove)
    bookCard.appendChild(theTitle);
    bookCard.appendChild(theAuthor);
    bookCard.appendChild(thePages);
    bookCard.appendChild(completeToggle)
    

    meLibrary.push(new Book (doc.data().title, doc.data().author, doc.data().pages, doc.data().read))
}



//saving data
form.addEventListener('submit', (e) =>{
    e.preventDefault();

})

//real time listener
db.collection('Books').orderBy('read').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change =>{
        if(change.type == 'added'){
            renderBooks(change.doc)
        } else if (change.type == 'removed'){
            let div = bookshelf.querySelector('[data-id=' + change.doc.id + ']')
            bookshelf.removeChild(div)
        }
    })
})


db.collection('Books').orderBy('read').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change =>{
        if(change.type == 'modified'){
            renderBooks(change.doc)
            let thisDiv = bookshelf.querySelector('[data-id=' + change.doc.id + ']')
            bookshelf.removeChild(thisDiv)
        } 
    })
})



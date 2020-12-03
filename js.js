const titleField = document.querySelector('.title')
const submitButton = document.querySelector('.sub')
const authorField = document.querySelector('.author')
const pagesField = document.querySelector('.pages')
const haveRead = document.getElementsByName('have-read')
const bookshelf = document.querySelector('.bookshelf')
const createNew = document.querySelector('.create-new')
const form = document.querySelector('.myform')

const book1 = new Book('Think Like a Programmer', 'Anton Spraul', 326, 'incomplete')
const book2 = new Book('Pragmatic Programmer', 'Andy Hunt', 356, 'incomplete')

let meLibrary = [book1, book2];


submitButton.addEventListener('click', addBookToLibrary)

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read 
}

Book.prototype.markComplete = function(){
    this.read = 'complete'
}

Book.prototype.markIncomplete = function(){
    this.read = 'incomplete'
}

bookDisplay = () => {
    for (i = 0; i < meLibrary.length; i++){
        buildCard(meLibrary[i])
    }
}


function addBookToLibrary() {
    let newItem
    meLibrary.push(new Book (titleField.value, authorField.value, pagesField.value, checkRead()));
    let lastItem = meLibrary.length-1;
    newItem = meLibrary[lastItem];
    buildCard(newItem);
    resetValues();
    form.style.visibility = 'hidden';
}



checkRead = () => {
    let status;
    for (i = 0; i < haveRead.length; i++ ){
        if (haveRead[i].type === 'radio' && haveRead[i].checked) {
            status = haveRead[i].value;
    }
    return status
}
}

//passing the objects we made into the function as item

buildCard = (item) => {
    let bookCard = document.createElement('div');
    let remove = document.createElement('button');
    let completeToggle = document.createElement('button');
        if(item.read !== 'complete'){
        item.markIncomplete();
        completeToggle.style.background = 'red';
        completeToggle.innerText = 'incomplete';
    } else {
    if (item.read === 'complete'){
        item.markComplete();
        completeToggle.style.background = 'green';
        completeToggle.innerText = 'complete';

    }
}


        bookCard.classList.add('book-box');
        completeToggle.classList.add('completeButton');
        completeToggle.innerText = item.read;
        completeToggle.setAttribute('id', meLibrary.indexOf(item));
        remove.innerText = 'Remove';
        remove.classList.add('remove');
        bookCard.innerHTML = `Title: ${item.title} <br><br> Author: ${item.author} <br><br>
        Pages: ${item.pages} <br><br>`
        bookshelf.appendChild(bookCard);
        bookCard.appendChild(remove);
        bookCard.appendChild(completeToggle);


            remove.addEventListener('click', function (e) {
            meLibrary.splice(meLibrary.indexOf(item),1)
            bookshelf.removeChild(bookCard)
            })



            completeToggle.addEventListener('click', function(e) {
                    if(item.read !== 'complete'){
                        item.markComplete()
                        completeToggle.style.background = 'green'
                        completeToggle.innerText = 'complete'
                    } else {
                    if (item.read === 'complete'){
                        item.markIncomplete()
                        completeToggle.style.background = 'red'
                        completeToggle.innerText = 'incomplete'
                    }
                    }
                })
    
}






createNew.addEventListener('click', function(){
    form.style.visibility = 'visible'
})



resetValues = () => {
    titleField.value = ''
    authorField.value = ''
    pagesField.value = ''
    haveRead.value = ''

}

bookDisplay()



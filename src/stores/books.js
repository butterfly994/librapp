import { action, observable, toJS } from 'mobx'
import { firebaseApp } from '../firebase'

class Books {
  @observable booklist = null
  @observable selectedCategory = null
  @observable selectedBook = null
  @observable loading = false

  @action selectBook (bookId) {
    //attaches an event listener to the user's selected book so that information about that book is automatically updated as information is changed
    if (this.bookBind && typeof this.bookBind.off === 'function') {
      this.bookBind.off()
    }
    this.bookBind = firebaseApp.database().ref('/books/' + bookId)
      .on('value', (snapshot) => {
        this.selectedBook = null
        const bookObj = snapshot.val()
        this.selectedBook = {
          bookId,
          author: bookObj.author,
          category: bookObj.category,
          imageuri: bookObj.imageuri,
          name: bookObj.name,
          status: bookObj.status,
          summary: bookObj.summary
        }
      })
  }

  @action updateBookStatus (bookId, userId, status) {
    //updates the database entry for the book with the specified bookId
    //also updates the user database entry to include in the necessary category the bookId
    firebaseApp.database().ref('/books/' + bookId).update({
      status: status
    })
    firebaseApp.database().ref(`/users/${userId}/${status[0]}`).update({
      [bookId]: ''
    })
  }

  @action selectCategory (category) {
    //selects the specified category by setting the value of the selectedCategory variable so that it can be retrieved by other pages
    this.selectedCategory = category
  }

  bindToFirebase (userId) {
    //updates the stored values in the app instance with information from the real time database on initialization
    //this method also contains logic to automatically update the status(available, overdue, etc) on initialization
    //so books go off the reserved list after 2 weeks, and become overdue after being checked out after 2 weeks
    this.loading = true
    return firebaseApp.database().ref('/books').on('value', (snapshot) => {
      this.loading = false

      const books = snapshot.val()
      this.booklist = []

      for (const bookId in books) {
        const currentStatus = books[bookId].status;
        let statusNew = currentStatus;
        if (currentStatus[0] !== 'A' && currentStatus[0] !== 'O') {
          let currentTime = require('moment')()
          let elapsed = currentTime.diff(currentStatus.slice(2), 'days')
          if (elapsed > 14) {
            if (currentStatus[0] === 'R') {
              statusNew = 'A'
            }
            else {
              statusNew[0] = 'O'
            }
          }
        }

        this.booklist.push({
          bookId,
          author: books[bookId].author,
          category: books[bookId].category,
          imageuri: books[bookId].imageuri,
          name: books[bookId].name,
          status: statusNew,
          summary: books[bookId].summary
        })
      }

    })
  }
}

const books = new Books()
export default books
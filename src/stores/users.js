import {observable, computed, action, toJS} from 'mobx'
import books from './books'
import firebase from 'firebase'
import { firebaseApp } from '../firebase'

class Users {
    @observable id=null
    @observable isLoggedIn= false
    @observable loggingIn = false
    @observable loggingError = null

    @observable userReserved = []
    @observable userCheckedOut = []
    @observable userOverdue = []

    constructor(){
        this.bindToFirebase()
    }

    @action login(username, password){
        //Takes a username and password input and uses firebase's authentication methods to validate and sign them in
        //if authentication fails, an error is returned and log in fails
        this.loggingIn = true;
        this.loggingError = null;
        firebase.auth().signInWithEmailAndPassword(username, password)
          .then(() => {
              this.loggingIn = false;
          })
          .catch((error) => {
              this.loggingIn = false;
              this.loggingError = error.message;
          })
    }

    @action logout() {
        //uses firebase's authentication system to sign the user out
        firebase.auth().signOut();
    }

    bindToFirebase(){
        //ensures that on initializing the app, new event listeners are attached to update the real time database when information is changed
        //for example, the user book arrays storing information (userReserved, etc) are wiped and updated
        //if authentication fails, all values are returned to their defaults
        return firebase.auth().onAuthStateChanged((user) => {
            if(this.booksBind && typeof this.booksBind.off === 'function'){
                this.booksBind.off();
            }
            if(this.userBind && typeof this.userBind.off === 'function'){
                this.userBind.off();
            }

            if(user){
                this.id = user.uid;
                this.isLoggedIn = true;
                this.booksBind = books.bindToFirebase(user.uid);
                this.userBind = firebaseApp.database().ref('/users/' + this.id)
                    .on('value', (snapshot) => {
                        const userObj = snapshot.val()
                        if(!userObj) return
                        this.userReserved = []
                        this.userCheckedOut = []
                        this.userOverdue = []
                        for(var id in userObj.R){
                            this.userReserved.push(id)
                        }
                        
                        for(var id in userObj.C){
                            this.userCheckedOut.push(id)
                        }

                        for(var id in userObj.O){
                            this.userOverdue.push(id)
                        }
                    })
            }
            else{
                this.id = null
                this.isLoggedIn = false
                this.userBind = null
                this.userReserved = []
                this.userCheckedOut = []
                this.userOverdue = []
            }
        })
    }
}

const users = new Users()
export default users
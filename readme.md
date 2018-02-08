# Library Companion App

Built by Adabelle Xie and Raymond Zou of the Dulaney High School chapter of Future Business Leaders of America

## Motivation

This is a submission for the FBLA Mobile Application Development event. The app allows account holders who are in the database(i.e. students and teachers of the fictional Timonium Ridge High School) to reserve and check out books. The application runs on Android devices only.

## Frameworks/Libraries Used

- [React](https://reactjs.org/) as the base framework for all of the code, a Javascript library for building user interfaces
- [React Native](https://facebook.github.io/react-native/), a framework for using React to build mobile applications 
- [React Native Navigation](https://github.com/wix/react-native-navigation), a solution for handling navigation between various screens of the mobile app
- [Firebase](https://firebase.google.com/): this app uses Firebase's Real Time Database to store information related to books in the library and user checkout/reserve data
- [Mobx and its related React and React Native bindings](https://github.com/mobxjs/mobx) for state management-sharing data between different screens of the app and isolating the backend business logic
- [Moment.js](https://momentjs.com/) to format date information and handle logic relating to durations of reserving and checking out books
- [NativeBase](https://nativebase.io/) as a solution for clean, simple user interface components

## Installation/Use Instructions

For purposes of security, src/firebase.js and android/gradle.properties have not been included. To build a version of this app, versions of these files must be created. 

The firebase.js file should be structured as follows:

```javascript
import firebase from 'firebase';

var config = {
    apiKey: "YOURAPIKEY",
    authDomain: "YOURAUTHDOMAIN",
    databaseURL: "YOURDATABASEURL",
    projectId: "YOURPROJECTID",
    storageBucket: "YOURSTORAGEBUCKET",
    messagingSenderId: "YOURMESSAGINGSENDERID"
};

export const firebaseApp = firebase.initializeApp(config);
```

The gradle.properties file should be structured as follows, and further instructions can be found [here](https://facebook.github.io/react-native/docs/signed-apk-android.html):

```
android.useDeprecatedNdk=true
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=MYPASSWORD
MYAPP_RELEASE_KEY_PASSWORD=MYPASSWORD
```

The firebase real-time database structure is given in an example file called sample.json in the root directory included with this project.

## Features

- Users can check out and reserve books from the app itself, and the database will automatically update both their account information and the status of the book
- A book automatically goes off of the reserved list, or is updated from being checked out to overdue as days go by
- A map for navigating the school library is provided with icons and helpful labels of genre and Dewey Decimals for nonfiction works
- Users can check their account status on a dedicated page, which has a dedicated section to remind them when books are overdue
- A custom-made app icon that is also integrated into the heading of each screen
- A social media integration feature that shares a link to a Goodreads page for book information with friends/followers upon a user checking out a book or reserving one
- When browsing, each book entry contains a summary, author, and an image to help users
- A robust user authentication system provided by Firebase

## Feature Wishlist

- [ ] A search feature for users to look up books they are interested in
- [x] More refined navigation with nested navigators
- [ ] Sorting books in alphabetical order for ease of navigation, either by author name or title
- [ ] Extra functionality on the home screen-possible a featured book section or some sort of library news bulletin
- [ ] Push notifications to remind the user of when books are overdue or nearing the time to return them
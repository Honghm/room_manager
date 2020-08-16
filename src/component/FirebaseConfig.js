import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyCxaXND6J3YhgEClFMPTRTuCVjYGbtSiLQ",
    authDomain: "room-manager-94bb0.firebaseapp.com",
    databaseURL: "https://room-manager-94bb0.firebaseio.com",
    projectId: "room-manager-94bb0",
    storageBucket: "room-manager-94bb0.appspot.com",
    messagingSenderId: "544831072712",
    appId: "1:544831072712:web:e90158ba4e6a9bb501f8fd"
  };

  export const firebaseApp = firebase.initializeApp(config);
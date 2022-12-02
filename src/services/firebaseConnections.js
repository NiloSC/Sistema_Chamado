import firebase from "firebase/app";
import  'firebase/auth';
import  'firebase/firestore';

let fireBaseConfig = {
    apiKey: "AIzaSyBftfC6PjKFPhJ2du11ODZlgLl2vB9cyYU",
    authDomain: "chamado-31af6.firebaseapp.com",
    projectId: "chamado-31af6",
    storageBucket: "chamado-31af6.appspot.com",
    messagingSenderId: "830233952660",
    appId: "1:830233952660:web:7fc6d91017db9191334f81",
    measurementId: "G-3ZYG3BRJGJ"
  };
  
 if(!firebase.apps.length){
    firebase.initializeApp(fireBaseConfig);
 };


 export default firebase;
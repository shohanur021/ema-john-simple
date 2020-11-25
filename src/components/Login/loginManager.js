import  firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramwork = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
        }
}
export const handleGoogleSignIn = () => {
    const googleprovider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleprovider)
    .then(res=> {
      const {displayName, photoURL, email} = res.user;
      const signedIndUser = {
        isSignIn : true,
        name : displayName,
        email : email,
        photo : photoURL,
        success : true
      }
      return signedIndUser;
    })
    .catch(err => {
      console.log(err);
      console.log(err.massage);
    })
  }

  export const handleSignOut = () => {
    firebase.auth().signOut()
    .then(res => {
      const signedOutdUser = {
        isSignIn : false,
        name : '' , 
        photo : '' ,
        email : '' 
      }
      return signedOutdUser;
    })
    .catch(err => {
          
    })
  }

  export const handleFBSignIn = () => {
    const fbprovider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbprovider).then(function(result) {
      var token= result.credential.accessToken;
      var user = result.user;
      user.success = true;
      return user;
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }

  export const createUserWithEmailAndPassword = (name,email,password) => {
    return firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((res) => {
    const newUserInfo = res.user;
    newUserInfo.error = '';
    newUserInfo.success = true;
    updateUserName(name);
    return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
  }

  export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
  }

  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log("username update sucessfuly");
    }).catch(function(error) {
      console.log(error);
    });
}
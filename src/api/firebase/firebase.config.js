import firebase from 'firebase';

export const firebaseConfig = {
    apiKey: "AIzaSyD0WNo9_Y0ihT7aP7noZusJrzVBAQ-LVWg",
    authDomain: "media-tracker-2000.firebaseapp.com",
    projectId: "media-tracker-2000",
    storageBucket: "media-tracker-2000.appspot.com",
    messagingSenderId: "11999161286",
    appId: "1:11999161286:web:a5ad9baf2d6725a667a0c7",
    measurementId: "G-CXFKCPB9T4"
};
/**
 * @type {firebaseui.auth.Config}
 */
export const firebaseUIConfig = {
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ]
}
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { getFirestore } from '@firebase/firestore'

const app = firebase.initializeApp({
    apiKey: "AIzaSyCbEwQnNxKohn3QOFqMZr0RWA-H_BDZdfI",
    authDomain: "cookie-click-v2.firebaseapp.com",
    databaseURL: "https://cookie-click-v2-default-rtdb.firebaseio.com",
    projectId: "cookie-click-v2",
    storageBucket: "cookie-click-v2.appspot.com",
    messagingSenderId: "653422887073",
    appId: "1:653422887073:web:0a2844a6c34c430df670e0",
    measurementId: "G-9YTY0KNPKT"
});

export const db = getFirestore(app)

export const auth = app.auth()
export default app
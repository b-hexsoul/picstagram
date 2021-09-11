import Firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebase = Firebase.initializeApp({
  apiKey: 'AIzaSyDr5kZnaLJxdlm7euiycYHej_7yLXR-Wbo',
  authDomain: 'picstagram-hex.firebaseapp.com',
  projectId: 'picstagram-hex',
  storageBucket: 'picstagram-hex.appspot.com',
  messagingSenderId: '657566686876',
  appId: '1:657566686876:web:cab2a44b8c96fd82321759'
});

const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };

import Firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { seedDatabase } from '../seed';

const config = {

}

const firebase = Firebase.initializeApp(config)
const { FieldValue } = Firebase.firestore;

seedDatabase(firebase)

export {firebase, FieldValue}
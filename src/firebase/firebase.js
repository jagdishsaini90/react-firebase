import firebase from 'firebase';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
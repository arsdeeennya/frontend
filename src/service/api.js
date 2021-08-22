import firebase from "firebase";
import { db } from "./firebase"

export const addBbs = (name, message) => {
  db.collection("bbs").add({
    name: name,
    comment: message,
    ip: 'false',
    created_at: firebase.firestore.FieldValue.serverTimestamp(),
  })
}
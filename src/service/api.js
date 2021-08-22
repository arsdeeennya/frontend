import firebase from "firebase";
import { db } from "./firebase"

export const addBbs = (name, comment) => {
  db.collection("bbs").add({
    name: name,
    comment: comment,
    ip: 'false',
    created_at: firebase.firestore.FieldValue.serverTimestamp(),
  })
}

export const initGet = async() => {
  const bbs = await db.collection("bbs")
  .orderBy("created_at", "asc");

  return bbs.get().then((snapShot) => {
    let bbss = [];
    snapShot.forEach((doc) => {
      bbss.push({
        name: doc.data().name,
        comment: doc.data().comment,
        created_at: doc.data().created_at,
        ip: doc.data().ip,
      });
    });
    return bbss ;
  });
}
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

export const initGet = async(uid) => {
  const todo = await db.collection("todo")
  .orderBy("createdAt", "desc")
  .where("uid", "==", uid);

  return todo.get().then((snapShot) => {
    let todos = [];
    snapShot.forEach((doc) => {
      todos.push({
        id: doc.id,
        content: doc.data().content,
        isComplete: doc.data().isComplete,
      });
    });
    return todos;
  });
}
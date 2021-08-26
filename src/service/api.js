import { db } from "./firebase"

export const initGet = async() => {
  const bbs = await db.collection("bbs").orderBy("created_at", "asc");
  return bbs.get().then((snapShot) => {
    let bbss = [];

    snapShot.forEach((doc) => {
      bbss.push({
        name: doc.data().name,
        comment: doc.data().comment,
        created_at: doc.created_at,
      });
    });
    console.log(bbss);
    return bbss ;
  });
}
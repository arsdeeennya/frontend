import { db } from "./firebase"

type PostType = {
  name: string;
  comment: string;
  created_at: any;
}

export const initGet = async() => {
  const bbs = await db.collection("bbs").orderBy("created_at", "asc");
  return bbs.get().then((snapShot) => {
    let bbss:PostType[] = [];

    snapShot.forEach((doc) => {
      bbss.push({
        name: doc.data().name,
        comment: doc.data().comment,
        created_at: doc.data().created_at,
      });
    });
    return bbss ;
  });
}
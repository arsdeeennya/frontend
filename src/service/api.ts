import { db } from './firebase';
import { PostListItemModel } from '../models/firebase';

export const bbsGet = async () => {
  const bbs = await db.collection('bbs').orderBy('created_at', 'asc');
  return bbs.get().then(snapShot => {
    let bbss: PostListItemModel[] = [];

    snapShot.forEach(doc => {
      bbss.push({
        name: doc.data().name,
        comment: doc.data().comment,
        created_at: doc.data().created_at
      });
    });
    return bbss;
  });
};

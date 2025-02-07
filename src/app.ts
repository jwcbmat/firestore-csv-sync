import 'dotenv/config';
import firestore from './firestore';

async function bootstrap() {
  const apiUrl = process.env.API_URL;
  const response = await fetch(`${apiUrl}/csv-file`);
  if (!response.ok)
    throw new Error(`Error fetching data. Status: ${response.status}`);

  const data = await response.json();

  console.time('task');
  for (const item of data) {
    if (!item.oldId || !item.newId || typeof item.oldId !== 'string' || typeof item.newId !== 'string')
      continue;

    // add your-collection
    const oldDocRef = firestore.db.collection('your-collection').doc(item.oldId);
    const newDocRef = firestore.db.collection('your-collection').doc(item.newId);

    console.log('Migrating item...', item);
    try {
      // https://firebase.google.com/docs/firestore/manage-data/transactions
      await firestore.db.runTransaction(async (t) => {
        const res = await t.get(oldDocRef);
        if (!res.exists) return;

        const docData = res.data();
        t.set(newDocRef, {
          ...docData,
          oldId: item.newId,
        });

        t.delete(oldDocRef);
      });

      console.log('Item migrated successfully!');
    } catch (err) {
      console.error(`Error migrating item. ${err}`);
    }
  }
  console.timeEnd('task');
}

bootstrap().catch((error) => console.error('Error during migration:', error));


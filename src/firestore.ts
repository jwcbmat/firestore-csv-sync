import * as admin from 'firebase-admin';

class Firestore {
  public db: admin.firestore.Firestore;

  constructor() {
    admin.initializeApp({
      projectId: process.env.APP_ID
    });

    this.db = admin.firestore();
  }
}

export default new Firestore();


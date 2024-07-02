import { initializeApp } from 'firebase-admin';
import firebaseConfig from './firebaseConfig';
import { getApp } from 'firebase-admin/app';

function firebaseAdmin() {
  const app = getApp();
  return app ?? initializeApp(firebaseConfig);
}

export default firebaseAdmin;
import { initializeApp } from 'firebase-admin';
import firebaseConfig from './firebaseConfig';
import { getApps } from 'firebase-admin/app';

function firebaseAdmin() {
  const apps = getApps();
  return apps.length === 0 ? initializeApp(firebaseConfig) : apps[0];
}

export default firebaseAdmin;
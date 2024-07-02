import { getApps } from 'firebase-admin/app';
import firebaseConfig from './firebaseConfig';
import { initializeApp } from 'firebase-admin';

const firebaseAdmin = getApps()[0] ?? initializeApp(firebaseConfig);

export default firebaseAdmin;
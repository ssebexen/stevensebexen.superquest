import { getApps } from 'firebase-admin/app';
import firebaseConfig from './firebaseConfig';
import admin from 'firebase-admin';

const firebaseAdmin = getApps()[0] ?? admin.initializeApp(firebaseConfig);

export default firebaseAdmin;
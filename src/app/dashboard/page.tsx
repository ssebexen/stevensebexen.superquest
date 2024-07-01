'use client'

import { useEffect, useState } from 'react';
import styles from './page.module.sass';
import { User, getAuth } from 'firebase/auth';
import firebase from '../firebase';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth(firebase);
    const currentUser = auth.currentUser;
    if (auth.currentUser === null) {
      router.replace('/');
    }
    setUser(currentUser);
  }, [])

  return (
    <main className={styles.main}>
      <p>Welcome {user?.email}</p>
    </main>
  )
}
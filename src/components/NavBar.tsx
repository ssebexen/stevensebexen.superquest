'use client'

import { useRouter } from 'next/navigation'
import styles from './navBar.module.sass'
import { getAuth, signOut } from 'firebase/auth';
import firebase from '~/app/firebase';

export default function NavBar() {
  const router = useRouter();

  function logout() {
    signOut(getAuth(firebase));
    router.push('/');
  }

  return (
    <div className={styles.navBar}>
      <div className={styles.navBarLeft}>
        <div className={styles.navBarOption} onClick={() => router.push('/dashboard')}>Home</div>
        <div className={styles.navBarOption} onClick={() => router.push('/view')}>View</div>
        <div className={styles.navBarOption} onClick={() => router.push('/create')}>Create</div>
      </div>
      <div className={styles.navBarRight}>
        <div className={styles.navBarOption} onClick={logout} style={{justifySelf: 'end'}}>Log Out</div>
      </div>
    </div>
  )
}
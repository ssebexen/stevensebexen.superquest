'use client'

import { useRouter } from 'next/navigation'
import styles from './navBar.module.sass'
import { getAuth, signOut } from 'firebase/auth';
import Link from 'next/link';
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
        <Link className={styles.navBarOption} href='/dashboard'>Home</Link>
        <Link className={styles.navBarOption} href='/view'>View</Link>
        <Link className={styles.navBarOption} href='/create'>Create</Link>
      </div>
      <div className={styles.navBarRight}>
        <div className={styles.navBarOption} onClick={logout} style={{justifySelf: 'end'}}>Log Out</div>
      </div>
    </div>
  )
}
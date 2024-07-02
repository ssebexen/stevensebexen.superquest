'use client'

import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './editForm.module.sass';
import { useEffect, useState } from "react";
import { getAuth } from 'firebase/auth';
import { getUser, updateUserProfile } from '~/app/serverFunctions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import firebase from '~/app/firebase';

interface EditFormProps {

}
export default function EditForm(props: EditFormProps) {
  const [displayName, setDisplayName] = useState<string>('');
  const [profile, setProfile] = useState<string>('');
  const [user] = useAuthState(getAuth(firebase));
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!user || !user.email) {
        return;
      }
      const fUser = await getUser(user.email);
      if (!fUser) {
        return;
      }
      setDisplayName(fUser.displayName);
      setProfile(fUser.profile);
    })();
  }, [user])

  function done() {
    (async () => {
      if (!user) {
        router.push('/');
        return;
      }
      const firebaseToken = await user.getIdToken();
      await updateUserProfile(firebaseToken, displayName, profile);
      router.push('/dashboard');
    })();
  }

  return (
    <div className={styles.editForm}>
      <input className={styles.inputName} value={displayName} onChange={e => setDisplayName(e.target.value)} />
      <textarea className={styles.inputProfile} value={profile} onChange={e => setProfile(e.target.value)} />
      <div className={styles.linkBar}>
        <Link className={styles.link} href='/dashboard'>Cancel</Link>
        <p className={styles.link} onClick={done}>Save</p>
      </div>
    </div>
  );
}

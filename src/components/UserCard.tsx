'use client'

import { useEffect, useState } from 'react';
import styles from './userCard.module.sass';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getUser } from '~/app/serverFunctions';
import Link from 'next/link';
import firebase from '~/app/firebase';

interface UserCardProps {
}
export default function UserCard(props: UserCardProps) {
  const [displayName, setDisplayName] = useState<string>('');
  const [profile, setProfile] = useState<string>('');
  const [user] = useAuthState(getAuth(firebase));

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
  }, [user]);
  
  return (
    <div className={styles.userCard}>
      <p className={styles.displayName}>{displayName}</p>
      <p className={styles.profile}>{profile}</p>
      <hr className={styles.divider}/>
      <p>Stats go here or something idk</p>
      <Link href="/editProfile" className={styles.edit}>Edit profile</Link>
    </div>
  )
}
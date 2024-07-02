'use client'

import { FormEvent, useEffect, useState } from "react";

import styles from './page.module.sass';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from "./firebase";
import { createUser } from "./serverFunctions";
import { useRouter } from "next/navigation";

interface UrlSelectorProps {
  formAction: string;
  setFormAction: (formAction: string) => void;
}
function UrlSelector(props: UrlSelectorProps) {
  return (
    <span className={styles.formUrlSelector}>
      <p 
      className={`${styles.formUrlSelectorOption} ${props.formAction === 'login' ? styles.accent : ''}`}
      onClick={() => props.setFormAction('login')}
      >
        Login
      </p>
      <p className={styles.dark}>|</p>
      <p 
      className={`${styles.formUrlSelectorOption} ${props.formAction === 'signup' ? styles.accent : ''}`}
      onClick={() => props.setFormAction('signup')}
      >
        Sign Up
      </p>
    </span>
  )
}

export default function LoginForm() {
  const [formAction, setFormAction] = useState<string>('login');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(firebase);
    if (auth.currentUser !== null) {
      router.replace('/dashboard');
    }
  }, [])

  async function trySignup(formData: FormData): Promise<void> {
    setError('');

    const auth = getAuth(firebase);
    const username = formData.get('username')?.toString();
    const password = formData.get('password')?.toString();

    if (!username) {
      setError('UserError');
      return;
    } else if (!password) {
      setError('PasswordError');
      return;
    }

    const firebaseUser = await createUserWithEmailAndPassword(auth, username, password);
    const firebaseToken = await firebaseUser.user.getIdToken();

    const result = await createUser(firebaseToken);
    if (result.type !== 'Success') {
      setError(result.type);
      return;
    }

    await signInWithEmailAndPassword(auth, username, password);
    router.replace('/dashboard');
  }

  async function tryLogin(formData: FormData): Promise<void> {
    setError('');
    const username = formData.get('username')?.toString();
    const password = formData.get('password')?.toString();
    if (!username) {
      setError('UserError');
      return;
    } else if (!password) {
      setError('PasswordError');
      return;
    }

    const auth = getAuth(firebase);
    const firebaseUser = await signInWithEmailAndPassword(auth, username, password);
    const firebaseToken = await firebaseUser.user.getIdToken();
    if (!firebaseUser.user.email) {
      setError('NoEmailError');
      return;
    }
    router.replace('/dashboard');
  }

  async function onSubmit(formData: FormData) {
    if (formAction === 'login') {
      tryLogin(formData)
        .catch(e => console.error(e));
    } else if (formAction === 'signup') {
      trySignup(formData)
        .catch(e => console.error(e));
    } else {
      throw new Error (`Bad state; unknown form action ${formAction}`);
    }
  }

  return (
    <form className={styles.formLogin} action={(formData: FormData) => onSubmit(formData)} >
      <UrlSelector {...{formAction, setFormAction}} />
      <input className={styles.textField} name="username" type="text" placeholder="Username" />
      <input className={styles.textField} name="password" type="text" placeholder="Password" />
      <input className={styles.submitButton} type="submit" value="Go!" />
      <p>{error}</p>
    </form>
  );
}
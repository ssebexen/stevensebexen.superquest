'use client'

import { FormEvent, useState } from "react";

import styles from './page.module.sass';
import axios from "axios";
import { useFormState } from "react-dom";

export default function LoginForm() {
  const [formUrl, setFormUrl] = useState<string>('/login');
  const [formState, formAction] = useFormState(loginFormAction, {message: ''});

  async function loginFormAction(prevState: {message: string}, data: FormData) {
    return ({message:'Okay!'});
  }

  console.log(formState);

  return (
    <form className={styles.formLogin} action={formAction} >
      <span className={styles.formUrlSelector}>
        <p 
        className={`${styles.formUrlSelectorOption} ${formUrl === '/login' ? styles.accent : ''}`}
        onClick={() => setFormUrl('/login')}
        >
          Login
        </p>
        <p className={styles.dark}>|</p>
        <p 
        className={`${styles.formUrlSelectorOption} ${formUrl === '/signup' ? styles.accent : ''}`}
        onClick={() => setFormUrl('/signup')}
        >
          Sign Up
        </p>
      </span>
      <input className={styles.textField} name="username" type="text" placeholder="Username" />
      <input className={styles.textField} name="password" type="text" placeholder="Password" />
      <input className={styles.submitButton} type="submit" value="Go!" />
    </form>
  );
}
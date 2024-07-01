'use client'

import styles from "./page.module.sass";
import { useState } from "react";
import LoginForm from "./LoginForm";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Welcome to SuperQuest</h1>
      <LoginForm />
    </main>
  );
}

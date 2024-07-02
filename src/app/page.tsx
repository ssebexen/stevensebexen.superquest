import styles from "./page.module.sass";
import LoginForm from "./LoginForm";

export default function Home() {
  return (
    <main>
      <h1 className={styles.welcome}>Welcome to SuperQuest</h1>
      <LoginForm />
    </main>
  );
}

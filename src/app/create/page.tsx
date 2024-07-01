import NavBar from "~/components/NavBar";
import styles from './page.module.sass';
import AuthRedirect from "~/components/AuthRedirect";

export default function Create() {
  return (
    <main className={styles.main}>
      <AuthRedirect />
      <NavBar />
    </main>
  )
}
import styles from './page.module.sass';
import NavBar from '~/components/NavBar';
import AuthRedirect from '~/components/AuthRedirect';

export default function Dashboard() {
  return (
    <main className={styles.main}>
      <AuthRedirect />
      <NavBar />
    </main>
  )
}
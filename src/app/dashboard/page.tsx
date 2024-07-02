import ProtectedRoute from '~/components/ProtectedRoute';
import styles from './page.module.sass';
import NavBar from '~/components/NavBar';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <main className={styles.main}>
        <NavBar />
        {/* <UserCard /> */}
      </main>
    </ProtectedRoute>
  )
}
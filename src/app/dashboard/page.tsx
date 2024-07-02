import ProtectedRoute from '~/components/ProtectedRoute';
import styles from './page.module.sass';
import NavBar from '~/components/NavBar';
import UserCard from '~/components/UserCard';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <main>
        <NavBar />
        <UserCard />
      </main>
    </ProtectedRoute>
  )
}
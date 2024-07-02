import EditForm from "~/components/EditForm";
import NavBar from "~/components/NavBar";
import ProtectedRoute from "~/components/ProtectedRoute";

export default function editProfile() {
  return (
    <ProtectedRoute>
      <main>
        <NavBar />
        <EditForm />
      </main>
    </ProtectedRoute>
  )
}
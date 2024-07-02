'use client'

import { getAuth } from "firebase/auth";
import { ReactElement } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import firebase from "~/app/firebase";

interface ProtectedRouteProps {
  children: ReactElement;
}
export default function ProtectedRoute(props: ProtectedRouteProps) {
  const [user] = useAuthState(getAuth(firebase));
  const router = useRouter();

  switch (user) {
    case undefined:
      return <p>Loading...</p>
    case null:
      router.replace('/');
      return <></>;
    default:
      return props.children;
  }
  
}
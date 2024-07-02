'use client'

import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import firebase from "~/app/firebase";

export default function AuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(firebase);
    const currentUser = auth.currentUser;
    if (auth.currentUser === null) {
      router.replace('/');
    }
  }, []);

  return <></>
}
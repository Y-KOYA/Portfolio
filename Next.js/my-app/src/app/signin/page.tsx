'use client';
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';

// 許可するメールアドレス
const allowedEmails = [process.env.NEXT_PUBLIC_MAIL];

export function SignIn(): React.ReactElement {
  const router = useRouter();

  const signInWithGoogle = () => {
    //firebaseを使ってグーグルでサインインする
    signInWithPopup(auth, provider)
    .then((result) => {
      console.log("サインインできました", result);
      const email = result.user.email;
    if (email && allowedEmails.includes(email)) {
      router.push('/');
    } else {
      router.push('/404')
    }
    })
    .catch((error) => {
      console.error("サインインできません", error);
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const email = user.email
        if(email && allowedEmails.includes(email)) {
          console.log('サインイン済みです');
          ;
      }
    }
  });
  return () => unsubscribe();
  }, [router]);

    return (
      <>
        <button onClick={signInWithGoogle} className="m-2 group h-8 select-none rounded-lg bg-gradient-to-b from-zinc-800 via-zinc-700 to-zinc-600 px-3 text-sm leading-8 text-zinc-50 shadow-[0_-1px_0_1px_rgba(0,0,0,0.8)_inset,0_0_0_1px_rgb(9_9_11)_inset,0_0.5px_0_1.5px_#71717a_inset] hover:bg-gradient-to-b hover:from-zinc-900 hover:via-zinc-900 hover:to-zinc-700 active:shadow-[0_3px_0_0_rgba(0,0,0)_inset]"><span className="block group-active:[transform:translate3d(0,1px,0)]">Sign-In</span></button>
      </>
    );
}
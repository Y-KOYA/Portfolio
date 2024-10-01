'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { User } from "firebase/auth";

/* コンポーネント */
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";
import { Main } from "./_components/Main";
import { SignIn } from "./signin/page";
import { ContactForm } from "./_components/ContactForm";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    }, (error) => {
      console.error('認証状態のチェックに失敗しました', error);
    });
    return () => unsubscribe();
  }, []);
  
  const handleAdminClick = () => {
    if (user) {
      router.push('/edit')
    } else {
      router.push('/signin');
    }
};

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Header />
      </div>
      <Image
        className="rounded-full relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/me.jpg"
        alt="My Picture"
        width={180}
        height={37}
        priority
        />
        {user ? (
          <button onClick={handleAdminClick} className="m-2 group h-8 select-none rounded-lg bg-gradient-to-b from-zinc-800 via-zinc-700 to-zinc-600 px-3 text-sm leading-8 text-zinc-50 shadow-[0_-1px_0_1px_rgba(0,0,0,0.8)_inset,0_0_0_1px_rgb(9_9_11)_inset,0_0.5px_0_1.5px_#71717a_inset] hover:bg-gradient-to-b hover:from-zinc-900 hover:via-zinc-900 hover:to-zinc-700 active:shadow-[0_3px_0_0_rgba(0,0,0)_inset]"><span className="block group-active:[transform:translate3d(0,1px,0)]">Edit</span></button>
        ) : (
        <SignIn />
        )}
      <Main />
      <ContactForm />
      
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <Footer />  
      </div>
    </main>
  );
}
'use client'

import { useRouter } from 'next/navigation';
import React from 'react';

const Custom404 = () => {
  const router = useRouter();
  const goHome = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <div className="text-lg mb-8"><p>アクセスしようとしたページは見つかりませんでした……</p></div>
      <button onClick={goHome} className="group h-8 select-none rounded-lg bg-gradient-to-b from-zinc-800 via-zinc-700 to-zinc-600 px-3 text-sm leading-8 text-zinc-50 shadow-[0_-1px_0_1px_rgba(0,0,0,0.8)_inset,0_0_0_1px_rgb(9_9_11)_inset,0_0.5px_0_1.5px_#71717a_inset] hover:bg-gradient-to-b hover:from-zinc-900 hover:via-zinc-900 hover:to-zinc-700 active:shadow-[0_3px_0_0_rgba(0,0,0)_inset]"><span className="block group-active:[transform:translate3d(0,1px,0)]">ポートフォリオページに戻る</span></button>
    </div>
  );
};

export default Custom404;

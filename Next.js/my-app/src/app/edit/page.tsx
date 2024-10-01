'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { auth } from '../firebase';
import { User } from 'firebase/auth';

const Edit = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState('');
  const [achievement, setAchievement] = useState('');
  const [skill, setSkill] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser || currentUser.email !== process.env.MAIL) {
        router.push('/404');
      } else {
        setUser(currentUser as User);
        //初期データの取得
        const api_GET_key = process.env.NEXT_PUBLIC_API_V1_URL;
        if (!api_GET_key) {
          setError('API URLが設定されていません');
          return;
        }
        fetch(api_GET_key)
          .then(response => {
            if (!response.ok) {
              throw new Error('ネットワークの応答が悪いです');
            }
            return response.json()
          })
          .then(data => {
            setProfile(data.profile);
            setAchievement(data.achievement);
            setSkill(data.skill);
          })
          .catch(error => {
            console.error('ポートフォリオのデータの取得に失敗しました。', error);
            setError('ポートフォリオのデータの取得に失敗しました。');
          });
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleSave = () => {
    const updateData = {
      profile,
      achievement,
      skill
    };

    const api_PUT_key = process.env.NEXT_PUBLIC_API_V1_PUT_URL;
    if (!api_PUT_key) {
      setError('API URLが設定されていません');
      return;
    }
    
    fetch(api_PUT_key, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(updateData)
    })
    .then(response => {
      if (response.ok) {
        router.push('/');
      } else {
        alert('データ更新失敗……');
      }
    })
    .catch(error => {
      console.error('PUTメソッドを取得できませんでした', error);
      alert('データ更新失敗……');
    });
  };

  if (error) {
    return <div className="flex justify-center items-center min-h-screen">{error}</div>;
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">ポートフォリオ編集</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Profile
            <input
              type="text"
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Achievement
            <input
              type="text"
              value={achievement}
              onChange={(e) => setAchievement(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Skill
            <input
            type="text"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
          </label>
        </div>
        <button
          onClick={handleSave}
          className="group h-8 select-none rounded-lg bg-gradient-to-b from-zinc-800 via-zinc-700 to-zinc-600 px-3 text-sm leading-8 text-zinc-50 shadow-[0_-1px_0_1px_rgba(0,0,0,0.8)_inset,0_0_0_1px_rgb(9_9_11)_inset,0_0.5px_0_1.5px_#71717a_inset] hover:bg-gradient-to-b hover:from-zinc-900 hover:via-zinc-900 hover:to-zinc-700 active:shadow-[0_3px_0_0_rgba(0,0,0)_inset]"><span className="block group-active:[transform:translate3d(0,1px,0)]">保存</span></button>
      </div>
    </>
  );
};

export default Edit;
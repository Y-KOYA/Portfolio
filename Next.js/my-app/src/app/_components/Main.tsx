'use client'
import React, { useEffect, useState } from 'react'

interface Portfolio {
  profile: string;
  achievement: string;
  skill: string;
}

export function Main() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const api_GET_key = process.env.NEXT_PUBLIC_API_V1_URL;
        if (!api_GET_key) {
          setError('API URLが設定されていません。');
          return;
        }
        const response = await fetch(api_GET_key);
          if (!response.ok) {
            throw new Error('ネットワークの応答が悪いです。');
          }
        const data = await response.json();
        console.log('fetchデータ', data);
        setPortfolio(data[0]);
      } catch (error) {
        console.error('データの取得に失敗しました', error);
        setError('データの取得に失敗しました')
      }
      }
    fetchPortfolio();
  },[]);

  if (error) {
    return <div className='flex justify-center items-center min-h-screen'>{error}</div>;
  }
  if (!portfolio) {
    return <div className='flex justify-center items-center min-h-screen'>データが見つかりません。</div>;
  }

  return (
    <>
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <div className='m-3 p-3'>
          <h2 className="mb-3 text-2xl font-semibold">
            Profile
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            {portfolio.profile}
          </p>
        </div>
        <div className='m-3 p-3'>
          <h2 className="mb-3 text-2xl font-semibold">
            Achievement
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
          {portfolio.achievement}
          </p>
        </div>
        <div className='m-3 p-3'>
          <h2 className="mb-3 text-2xl font-semibold">
            Skill
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
          {portfolio.skill}
          </p>
        </div>
      </div>
    </>
  );
}
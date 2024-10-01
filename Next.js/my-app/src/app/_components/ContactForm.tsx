import React, { useState } from 'react'

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name,
      email,
      message,
    }

    try {
      const response = await fetch('/api', {
        method: "POST",
        headers: {
          Accept: 'application/json, text/plain',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('response is not ok');
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    setError(null);
  }

  return (
    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)} className='w-full max-w-lg'>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
          Name *任意
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='name'
          type='text'
          placeholder='Jane Doe'
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label='Name'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
          Mail *任意
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='email'
          type='email'
          placeholder='address'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label='Email'
          />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='message'>
          Message *必須
        </label>
        <textarea
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='message'
          placeholder=''
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          aria-label='Message'
        />
      </div>
      <div className='flex items-center justify-between'>
      <button className="group h-8 select-none rounded-lg bg-gradient-to-b from-zinc-800 via-zinc-700 to-zinc-600 px-3 text-sm leading-8 text-zinc-50 shadow-[0_-1px_0_1px_rgba(0,0,0,0.8)_inset,0_0_0_1px_rgb(9_9_11)_inset,0_0.5px_0_1.5px_#71717a_inset] hover:bg-gradient-to-b hover:from-zinc-900 hover:via-zinc-900 hover:to-zinc-700 active:shadow-[0_3px_0_0_rgba(0,0,0)_inset]"><span className="block group-active:[transform:translate3d(0,1px,0)]">送信</span></button>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </form>
  );
};

'use client';

import { GiHamburgerMenu } from 'react-icons/gi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SidebarForm } from '@/widgets/';
import { logout } from '@/features/';
import { usePatientContext } from '@/entities';
import { useUserStore } from '@/shared';
import { useHydrated } from '../hooks';

export const NavBarForm = () => {
  const { token, clearUser } = useUserStore();
  const router = useRouter();
  const { isOpen, setIsOpen } = usePatientContext();

  const onClickLogout = () => {
    clearUser();
    logout();
    router.push('/');
  };

  const hydrated = useHydrated();
  if (!hydrated) return null;

  return (
    <header>
      <nav className='flex justify-between w-screen p-3'>
        <button className='w-8 h-6' onClick={() => setIsOpen(true)}>
          <GiHamburgerMenu />
        </button>
        <ol className='flex justify-between max-w-96'>
          <li className='mx-3'>
            <Link href={'/therapist'}>Therapist</Link>
          </li>
          <li className='mx-3'>
            <Link href={'/patient'}>Patient</Link>
          </li>
          <li className='mx-3'>
            <Link href={'/plan'}>Plan</Link>
          </li>
        </ol>
        {token ? (
          <button onClick={onClickLogout}>logout</button>
        ) : (
          <button onClick={() => router.push('/login')}>login</button>
        )}
      </nav>
      {isOpen && (
        <div
          className='fixed inset-0 bg-black opacity-30 z-40'
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <SidebarForm isOpen={isOpen} setIsOpenAction={setIsOpen} />
    </header>
  );
};

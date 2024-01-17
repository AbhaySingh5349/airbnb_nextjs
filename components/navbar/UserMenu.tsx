'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { AiOutlineMenu } from 'react-icons/ai';

import { Avatar, MenuItem } from '@/components';
import { useRegisterModal, useLoginModal, useRentModal } from '@/hooks';

interface UserMenuProps {
  currentUser?: string | null;
}

<svg
  width="15"
  height="15"
  viewBox="0 0 15 15"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
    fill="currentColor"
    fill-rule="evenodd"
    clip-rule="evenodd"
  ></path>
</svg>;

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const parsedCurrentUser = currentUser && JSON.parse(currentUser || '');

  const router = useRouter();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition duration-500 hover:shadow-md md:px-2 md:py-1"
        >
          <AiOutlineMenu size={18} />
          <div className="hidden md:block">
            <Avatar src={parsedCurrentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        // transition duration-300 ease-in-out transition-transform
        // ease-out duration-300
        <div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4">
          <div className="flex cursor-pointer flex-col">
            {parsedCurrentUser ? (
              <>
                <MenuItem
                  label="My trips"
                  onClick={() => router.push('/trips')}
                />
                <MenuItem
                  label="My favorites"
                  onClick={() => router.push('/favorites')}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => router.push('/reservations')}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => router.push('/properties')}
                />
                <MenuItem label="Airbnb your home" onClick={rentModal.onOpen} />
                <hr />
                <MenuItem label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={loginModal.onOpen} />
                <MenuItem label="Sign up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

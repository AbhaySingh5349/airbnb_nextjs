'use client';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { useFavorite } from '@/hooks';

interface HeartButtonProps {
  listingId: string;
  currentUser?: string | null;
}

const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="
        relative
        cursor-pointer
        transition
        hover:opacity-80
      "
    >
      <AiOutlineHeart
        size={28}
        className="absolute -right-[2px] -top-[2px] fill-white"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-200/70'}
      />
    </div>
  );
};

export default HeartButton;

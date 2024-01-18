import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import { useLoginModal } from '@/hooks';
import { addListingToFavourite } from '@/lib/actions';

interface IUseFavorite {
  listingId: string;
  currentUser?: string | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const parsedCurrentUser = currentUser && JSON.parse(currentUser || '');

  const hasFavorited = useMemo(() => {
    const list = parsedCurrentUser?.favoritePlaces || [];

    return list.includes(listingId);
  }, [parsedCurrentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        // let request;

        if (hasFavorited) {
          //   request = () => axios.delete(`/api/favorites/${listingId}`);
          console.log('IN FAVOURITED');
        } else {
          //   request = () => axios.post(`/api/favorites/${listingId}`);
          console.log('IN NOT FAVOURITED: ', listingId);
          const updatedUser = await addListingToFavourite({
            currentUser: parsedCurrentUser,
            listingId,
          });
          console.log('updatedUser in useFavourite hook: ', updatedUser);
        }

        router.refresh();
        toast.success('Success, updated favourite places');
      } catch (error) {
        toast.error('Something went wrong in updating favourite places');
      }
    },
    [
      parsedCurrentUser,
      currentUser,
      hasFavorited,
      listingId,
      loginModal,
      router,
    ]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;

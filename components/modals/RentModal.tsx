/* eslint-disable no-unused-vars */
'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { useRentModal } from '@/hooks';

import {
  Modal,
  CategoryInput,
  Counter,
  FormInput,
  FormHeading,
  ImageUpload,
} from '@/components';

import CountrySelect from '../inputs/CountrySelect';
import { categories } from '@/constants';

import { addListing } from '@/lib/actions';

interface RentModalProps {
  currentUser?: string | null;
}

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = ({ currentUser }: RentModalProps) => {
  const parsedCurrentUser = currentUser && JSON.parse(currentUser || '');

  const router = useRouter();
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  });

  const location = watch('location');
  const category = watch('category');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const Map = useMemo(
    () =>
      dynamic(() => import('../shared/Map'), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    console.log('RENT DATA: ', data);

    try {
      await addListing({
        userId: parsedCurrentUser._id,
        title: data.title,
        description: data.description,
        imageSrc: data.imageSrc,
        category: data.category,
        roomCount: data.roomCount,
        bathroomCount: data.bathroomCount,
        guestCount: data.guestCount,
        location: JSON.stringify(data.location),
        price: data.price,
      });

      toast.success('Listing created!');
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY);
      rentModal.onClose();
    } catch (err) {
      console.log('ERRORS: ', errors);
      toast.error(`Failed to add listing: ${err}`);
    }
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <FormHeading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div
        className="
          grid 
          max-h-[50vh] 
          grid-cols-1 
          gap-3
          overflow-y-auto
          md:grid-cols-2
        "
      >
        {categories.map((item: any) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <FormHeading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <FormHeading
          title="Share some basics about your place"
          subtitle="What amenitis do you have?"
        />
        <Counter
          onChange={(value) => setCustomValue('guestCount', value)}
          value={guestCount}
          title="Guests"
          subtitle="How many guests do you allow?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue('roomCount', value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue('bathroomCount', value)}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <FormHeading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue('imageSrc', value)}
          value={imageSrc}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <FormHeading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <FormInput
          id="title"
          label="Title"
          disabled={isSubmitting}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <FormInput
          id="description"
          label="Description"
          disabled={isSubmitting}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <FormHeading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <FormInput
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isSubmitting}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      disabled={isSubmitting}
      isOpen={rentModal.isOpen}
      title="Airbnb your home!"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
};

export default RentModal;

'use client';

import React, { useCallback } from 'react';
import axios from 'axios';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
// import { signIn } from 'next-auth/react';

import toast from 'react-hot-toast';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { Modal, FormHeading, FormInput, Button } from '@/components';

import { useRegisterModal } from '@/hooks';

// import { registerUser } from '@/lib/actions';

// import { RegisterSchema } from '@/lib/validations';

const RegisterModal = () => {
  const registerModal = useRegisterModal();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
    },
  });

  const formSubmitHandler: SubmitHandler<FieldValues> = async (data) => {
    try {
      console.log('register data: ', data);
      // const user = await registerUser({
      //   username: data.username,
      //   email: data.email,
      //   password: data.password,
      // });
      // console.log('Registered user: ', user);
      await axios.post('/adsdpi/register', data);
      // registerModal.onClose();
      reset();
    } catch (err) {
      toast.error(`Failed to register: ${err}`);
    }
  };

  const onToggle = useCallback(() => {
    registerModal.onClose();
  }, [registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <FormHeading title="Welcome to Airbnb" subtitle="Create an account!" />
      <FormInput
        id="username"
        label="UserName"
        disabled={isSubmitting}
        register={register}
        errors={errors}
        required
      />
      <FormInput
        id="email"
        label="Email"
        disabled={isSubmitting}
        register={register}
        errors={errors}
        required
      />
      <FormInput
        id="password"
        label="Password"
        type="password"
        disabled={isSubmitting}
        register={register}
        errors={errors}
        required
      />
      {/* <FormInput
        id="confirm_password"
        label="ConfirmPassword"
        type="password"
        disabled={isSubmitting}
        register={register}
        errors={errors}
        required
      /> */}
    </div>
  );

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className="my-2 text-center font-light text-neutral-500">
        <p>
          Already have an account?
          <span
            onClick={onToggle}
            className="cursor-pointer text-neutral-800 hover:underline"
          >
            {' '}
            Log in
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        disabled={isSubmitting}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(formSubmitHandler)}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
};

export default RegisterModal;

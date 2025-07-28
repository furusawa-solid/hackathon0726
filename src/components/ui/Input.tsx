import { Input as ReactInput } from '@headlessui/react';
import type { UseFormRegisterReturn } from 'react-hook-form';

export type InputWithButtonProps = {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  register: UseFormRegisterReturn;
  className?: string;
};

export const Input = ({
  inputProps,
  register,
  className = '',
}: InputWithButtonProps) => {
  return (
    <ReactInput
      {...register}
      {...inputProps}
      className={`box-border flex-1 rounded-md border-none bg-gray-600 px-2 py-1 outline-none ${className}`}
    />
  );
};

import { Button } from '@headlessui/react';

export type LabelButtonProps = {
  label: string;
  onClick: () => void;
  className?: string;
};

export const LabelButton = ({
  label,
  onClick,
  className = '',
}: LabelButtonProps) => {
  return (
    <Button onClick={onClick} className={`rounded-md bg-teal-700 ${className}`}>
      {label}
    </Button>
  );
};

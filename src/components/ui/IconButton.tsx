import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@headlessui/react';

export type IconButtonProps = {
  label?: string;
  icon: IconProp;
  onClick: () => void;
  isDanger?: boolean;
  className?: string;
};

export const IconButton = ({
  label,
  icon,
  onClick,
  isDanger = false,
  className = '',
}: IconButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={`rounded-md ${isDanger ? 'bg-red-800' : 'bg-teal-700'} ${className}`}
    >
      {label}
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
};

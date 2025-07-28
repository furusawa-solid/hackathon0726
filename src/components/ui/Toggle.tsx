import { Switch } from '@headlessui/react';

type ToggleProps = {
  onChange: (checked: boolean) => void;
  checked?: boolean;
  name?: string;
  className?: string;
};

export const Toggle = ({
  onChange,
  checked = false,
  name = '',
  className = '',
}: ToggleProps) => {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      name={name}
      className={`group inline-flex h-6 w-11 items-center rounded-full bg-neutral-600 transition data-checked:bg-teal-600 ${className}`}
    >
      <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
    </Switch>
  );
};

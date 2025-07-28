import { Fieldset, Legend } from '@headlessui/react';
import type React from 'react';

type FieldsetGroupProps = {
  legend: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  legendClassName?: string;
};

export const FieldsetGroup = ({
  legend,
  children,
  className = '',
  legendClassName = '',
}: FieldsetGroupProps) => {
  return (
    <Fieldset
      className={`rounded-md border border-g px-3 pt-1 pb-3 ${className}`}
    >
      <Legend className={`px 1nt-medium ${legendClassName}`}>{legend}</Legend>
      {children}
    </Fieldset>
  );
};

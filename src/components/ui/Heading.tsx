import type { JSX } from 'react';

type HeadingProps = {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
};

export const Heading = ({
  level = 1,
  children,
  className = '',
}: HeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const baseStyles = 'font-bold tracking-tight';

  const sizeMap = {
    1: 'text-4xl',
    2: 'text-3xl',
    3: 'text-2xl',
    4: 'text-xl',
    5: 'text-lg',
    6: 'text-base',
  };

  return (
    <Tag className={`${baseStyles} ${sizeMap[level]} ${className}`}>
      {children}
    </Tag>
  );
};

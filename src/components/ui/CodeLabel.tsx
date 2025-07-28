export type CodeLabelProps = {
  label: string;
  className?: string;
};

export const CodeLabel = ({ label, className = '' }: CodeLabelProps) => {
  return (
    <code
      className={`flex flex-1 items-center overflow-hidden text-ellipsis whitespace-nowrap rounded-s-md bg-neutral-700 px-2 py-1 text-left text-sm underline decoration-neutral-400 underline-offset-4 ${className}`}
    >
      {label}
    </code>
  );
};

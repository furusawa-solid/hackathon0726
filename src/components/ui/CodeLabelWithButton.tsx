import { CodeLabel, type CodeLabelProps } from './CodeLabel';
import { IconButton, type IconButtonProps } from './IconButton';

export type CodeLabelButtonProps = {
  codeLabelProps: CodeLabelProps;
  buttonProps: IconButtonProps;
  className?: string;
};

export const CodeLabelWithButton = ({
  codeLabelProps,
  buttonProps,
  className = '',
}: CodeLabelButtonProps) => {
  return (
    <div className={`${className}`}>
      <CodeLabel {...codeLabelProps} />
      <IconButton {...buttonProps} className="rounded-l-none px-3 py-1.5" />
    </div>
  );
};

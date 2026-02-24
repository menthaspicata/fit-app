import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className, ...rest }: ButtonProps) {

    return <button       
        {...rest}
      className={clsx(
        "flex h-10 items-center text-center justify-center rounded-lg text-neutral-50 dark:text-neutral-900 bg-violet-800 hover:bg-violet-600 dark:bg-lime-400 px-4 text-sm font-medium  transition-colors dark:hover:bg-lime-300 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-lime-500 active:bg-lime-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        className,
      )}>
        {children}
        </button>
    ;
}
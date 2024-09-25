import React from 'react';

interface Props {
  className?: string;
  children: string;
}

const H1: React.FC<Props> = ({ className, children }) => {
  return (
    <h1
      className={`scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl ${className}`}
    >
      {children}
    </h1>
  );
};

const H2: React.FC<Props> = ({ className, children }) => {
  return (
    <h2
      className={`scroll-m-20 border-b pb-2 text-3xl font-bold tracking-tight first:mt-0 ${className}`}
    >
      {children}
    </h2>
  );
};

const H3: React.FC<Props> = ({ className, children }) => {
  return (
    <h3 className={`scroll-m-20 text-2xl font-medium tracking-tight ${className}`}>
      {children}
    </h3>
  );
};

const H4: React.FC<Props> = ({ className, children }) => {
  return (
    <h4 className={`scroll-m-20 text-xl font-medium tracking-tight ${className}`}>
      {children}
    </h4>
  );
};

const P: React.FC<Props> = ({ className, children }) => {
  return (
    <p className={`leading-7 font-normal [&:not(:first-child)]:mt-6 ${className}`}>
      {children}
    </p>
  );
};

const Blockquote: React.FC<Props> = ({ className, children }) => {
  return (
    <blockquote className={`mt-6 border-l-2 pl-6 italic ${className}`}>
      {children}
    </blockquote>
  );
};

const Lead: React.FC<Props> = ({ className, children }) => {
  return <p className={`text-xl text-muted-foreground ${className}`}>{children}</p>;
};

const Large: React.FC<Props> = ({ className, children }) => {
  return <div className={`text-lg font-semibold ${className}`}>{children}</div>;
};

const Small: React.FC<Props> = ({ className, children }) => {
  return (
    <small className={`text-sm font-medium leading-none ${className}`}>{children}</small>
  );
};

const Muted: React.FC<Props> = ({ className, children }) => {
  return <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>;
};

export { H1, H2, H3, H4, P, Blockquote, Lead, Large, Small, Muted };

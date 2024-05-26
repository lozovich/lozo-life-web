/* eslint-disable prettier/prettier */
import React from 'react';

type ButtonType = {
  className?: string;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset' | undefined;
  name?: string;
  value?: string;
  onClick?: (
    // eslint-disable-next-line no-unused-vars
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
  children?: JSX.Element | string;
  loading?: boolean;
  loaderColor?:
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';
  disabled?: boolean;
};

const Button = ({
  className = '',
  style = {},
  type = undefined,
  name = '',
  value = '',
  onClick,
  children,
  loading = false,
  loaderColor = 'primary',
  disabled = false,
}: ButtonType) => (
  <button
    className={`${className} `}
    onClick={onClick}
    // eslint-disable-next-line react/button-has-type
    type={type}
    style={style}
    name={name}
    disabled={disabled}
  >
    {loading && (
      <div className={`spinner-border text-${loaderColor}`} role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    )}

    {!loading ? children || value : ''}
  </button>
);

export default Button;

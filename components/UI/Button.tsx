'use client';
import React from 'react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const v = {
    primary: 'bg-[var(--accent)] text-white hover:opacity-90 focus:ring-indigo-500 active:scale-[0.98]',
    secondary: 't-surface t-text border t-border hover:bg-[var(--bg-tertiary)] focus:ring-gray-300',
    ghost: 't-muted hover:bg-[var(--bg-tertiary)] hover:t-text focus:ring-gray-300',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 focus:ring-red-400',
  };
  const sz = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-sm', lg: 'px-6 py-3 text-base' };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${v[variant]} ${sz[size]} ${className}`}>
      {children}
    </button>
  );
}
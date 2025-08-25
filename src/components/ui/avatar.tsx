import React from 'react';

interface AvatarProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({ children, className = '', onClick }) => {
  return (
    <div className={`rounded-full flex items-center justify-center ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

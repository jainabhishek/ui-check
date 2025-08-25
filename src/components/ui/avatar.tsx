import React from 'react';

interface AvatarProps {
  children: React.ReactNode;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ children, className = '' }) => {
  return (
    <div className={`rounded-full flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
};

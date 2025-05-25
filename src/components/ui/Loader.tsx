import React from 'react';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'white';
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'medium', 
  color = 'primary' 
}) => {
  const sizeMap = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  const colorMap = {
    primary: 'border-blue-500 border-t-transparent',
    white: 'border-white border-t-transparent',
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeMap[size]} ${colorMap[color]} animate-spin rounded-full border-2 border-solid`}
      ></div>
    </div>
  );
};

export default Loader;
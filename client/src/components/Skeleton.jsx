import React from 'react';
import { cn } from '../services/utils';

const Skeleton = ({ className, variant = 'rect' }) => {
  return (
    <div 
      className={cn(
        "shimmer-loader",
        variant === 'circle' ? "rounded-full" : "rounded-2xl",
        className
      )} 
    />
  );
};

export default Skeleton;

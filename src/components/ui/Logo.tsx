import React from 'react';
import { LogIn } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'lg';
}

export default function Logo({ size = 'lg' }: LogoProps) {
  const dimensions = size === 'lg' ? 'w-16 h-16' : 'w-12 h-12';
  const iconSize = size === 'lg' ? 'w-8 h-8' : 'w-6 h-6';
  
  return (
    <div className={`${dimensions} bg-green-500 rounded-lg flex items-center justify-center`}>
      <LogIn className={`${iconSize} text-white`} />
    </div>
  );
}
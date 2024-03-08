import React from 'react';

import { setBgColor } from '@/utils/setBackgroundColor';

interface StatusCardProps {
  label: string;
  type: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ label, type }) => {
  const bgColor = setBgColor(type, label);
  return (
    <div
      className={`flex justify-center items-center border-2 border-text-200 shadow-inner h-8 w-1/3 rounded-sm ${bgColor} `}
    >
      {label}
    </div>
  );
};

export default StatusCard;

import React from 'react';

interface StatusCardProps {
  label: string;
  type: string;
}

const setBgColor = (type: string, label: string): string => {
  if (type === 'status') {
    switch (label) {
      case 'todo':
        return 'green-50';
      case 'inProgress':
        return 'bg-yellow-100';
      case 'completed':
        return 'green-50';
      default:
        return 'black';
    }
  } else {
    switch (label) {
      case 'low':
        return 'green';
      case 'medium':
        return 'yellow';
      case 'high':
        return 'red';
      default:
        return 'black';
    }
  }
};

// TODO : safelist the class, read docs

const StatusCard: React.FC<StatusCardProps> = ({ label, type }) => {
  const bgColor = setBgColor(type, label);
  return (
    <div
      className={`flex justify-center items-center border border-black h-8 w-1/3 rounded-md ${bgColor} `}
    >
      {label}
    </div>
  );
};

export default StatusCard;

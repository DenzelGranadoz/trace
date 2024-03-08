export const setBgColor = (type: string, label: string): string => {
  const lowerLabel = label.toLowerCase();
  if (type === 'status') {
    return 'bg-text-200';
  }
  switch (lowerLabel) {
    case 'low':
      return 'bg-green-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'high':
      return 'bg-red-500';
    default:
      return 'bg-black';
  }
};

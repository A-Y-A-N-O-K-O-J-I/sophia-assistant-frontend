// Utility functions for the PairBot component

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const maskApiKey = (key) => {
  if (!key) return '';
  const start = key.substring(0, 6);
  const end = key.substring(key.length - 4);
  const middle = '•'.repeat(Math.min(20, key.length - 10));
  return start + middle + end;
};

export const getStatusConfig = (connectionStatus) => {
  switch (connectionStatus) {
    case 'connected':
      return {
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
        borderColor: 'border-green-300'
      };
    case 'waiting':
      return {
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-700',
        borderColor: 'border-blue-300'
      };
    default:
      return {
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-700',
        borderColor: 'border-gray-300'
      };
  }
};

export const getTimerConfig = (timeRemaining) => {
  return timeRemaining <= 30 ? {
    bgColor: 'bg-red-100',
    textColor: 'text-red-700',
    borderColor: 'border-red-300'
  } : {
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-300'
  };
};

export const getErrorConfig = (error) => {
  const isSuccess = error && (error.includes('success') || error.includes('reset'));
  
  return {
    bgColor: isSuccess ? 'bg-green-50' : 'bg-red-50',
    borderColor: isSuccess ? 'border-green-200' : 'border-red-200',
    textColor: isSuccess ? 'text-green-800' : 'text-red-800',
    iconColor: isSuccess ? 'text-green-600' : 'text-red-600'
  };
};
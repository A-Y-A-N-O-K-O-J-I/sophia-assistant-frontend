import { CheckCircle, XCircle, Wifi } from 'lucide-react';

export const getStatusIcon = (botStatus) => {
  if (botStatus.status === 'active' || botStatus.isLinked) {
    return <CheckCircle className="text-green-500" size={24} />;
  } else if (botStatus.status === 'connecting') {
    return <Wifi className="text-yellow-500 animate-pulse" size={24} />;
  } else {
    return <XCircle className="text-red-500" size={24} />;
  }
};

export const getStatusColor = (botStatus) => {
  if (botStatus.status === 'active' || botStatus.isLinked) return 'border-green-500 bg-green-50';
  if (botStatus.status === 'connecting') return 'border-yellow-500 bg-yellow-50';
  return 'border-red-500 bg-red-50';
};

export const getStatusText = (botStatus) => {
  if (botStatus.status === 'active' || botStatus.isLinked) return 'Bot Active & Connected';
  if (botStatus.status === 'connecting') return 'Bot Connecting...';
  return botStatus.isLinked ? 'Bot Linked but Inactive' : 'No Bot Linked';
};

export const getCurrentTime = () => {
  return new Date().toLocaleString();
};
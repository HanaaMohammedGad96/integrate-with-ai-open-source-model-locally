'use client';

import { useState, useEffect } from 'react';
import { Wifi, WifiOff, Loader2 } from 'lucide-react';
import { checkHealth } from '@/lib/api';

export default function StatusIndicator() {
  const [isHealthy, setIsHealthy] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const healthy = await checkHealth();
        setIsHealthy(healthy);
      } catch {
        setIsHealthy(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusConfig = () => {
    if (isChecking) {
      return {
        icon: Loader2,
        text: 'Connecting...',
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
        borderColor: 'border-yellow-200 dark:border-yellow-800',
        iconColor: 'text-yellow-500',
        animate: 'animate-spin'
      };
    }
    
    if (isHealthy) {
      return {
        icon: Wifi,
        text: 'Connected',
        color: 'text-green-600',
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        borderColor: 'border-green-200 dark:border-green-800',
        iconColor: 'text-green-500',
        animate: 'animate-pulse-glow'
      };
    }
    
    return {
      icon: WifiOff,
      text: 'Disconnected',
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      iconColor: 'text-red-500',
      animate: ''
    };
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  return (
    <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-300 ${config.bgColor} ${config.borderColor}`}>
      <IconComponent className={`w-4 h-4 ${config.iconColor} ${config.animate}`} />
      <span className={`text-sm font-medium ${config.color}`}>
        {config.text}
      </span>
    </div>
  );
}
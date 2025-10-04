'use client';

import { useState, useEffect } from 'react';
import { Wifi, WifiOff, Loader2 } from 'lucide-react';
import { checkHealth } from '@/lib/api';
import { appConfig } from '@/config/appConfig';

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
        text: appConfig.status.connecting,
        ...appConfig.statusColors.connecting
      };
    }
    if (isHealthy) {
      return {
        icon: Wifi,
        text: appConfig.status.connected,
        ...appConfig.statusColors.connected
      };
    }
    return {
      icon: WifiOff,
      text: appConfig.status.disconnected,
      ...appConfig.statusColors.disconnected
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
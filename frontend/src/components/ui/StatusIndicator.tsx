// src/components/StatusIndicator.tsx
'use client';

import { useState, useEffect } from 'react';
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

  return (
    <div className="flex items-center space-x-2">
      <div
        className={`w-2 h-2 rounded-full ${
          isChecking
            ? 'bg-yellow-400 animate-pulse'
            : isHealthy
            ? 'bg-green-400'
            : 'bg-red-400'
        }`}
      />
      <span className="text-xs text-gray-500">
        {isChecking ? 'Checking...' : isHealthy ? 'Connected' : 'Disconnected'}
      </span>
    </div>
  );
}
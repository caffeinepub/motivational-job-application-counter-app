import { useEffect, useState } from 'react';
import { useGetCallerReminderSettings } from './useQueries';

export function useReminderScheduler() {
  const { data: settings } = useGetCallerReminderSettings();
  const [showReminder, setShowReminder] = useState(false);

  useEffect(() => {
    if (!settings?.dailyReminderTime) {
      return;
    }

    const checkAndScheduleReminder = () => {
      const now = new Date();
      const [hours, minutes] = settings.dailyReminderTime!.split(':').map(Number);
      
      const targetTime = new Date();
      targetTime.setHours(hours, minutes, 0, 0);

      // If target time has passed today, schedule for tomorrow
      if (now > targetTime) {
        targetTime.setDate(targetTime.getDate() + 1);
      }

      const timeUntilReminder = targetTime.getTime() - now.getTime();

      const timeoutId = setTimeout(() => {
        // Try to show browser notification if permission granted
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Job Hunt Tracker', {
            body: 'Time to keep the fire going! Have you logged any applications today?',
            icon: '/favicon.ico',
            badge: '/favicon.ico',
          });
        }
        
        // Always show in-app reminder as fallback
        setShowReminder(true);

        // Schedule next reminder for tomorrow
        setTimeout(checkAndScheduleReminder, 1000);
      }, timeUntilReminder);

      return () => clearTimeout(timeoutId);
    };

    const cleanup = checkAndScheduleReminder();
    return cleanup;
  }, [settings]);

  const dismissReminder = () => {
    setShowReminder(false);
  };

  // Request notification permission on mount if reminders are enabled
  useEffect(() => {
    if (settings?.dailyReminderTime && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, [settings]);

  return {
    showReminder,
    dismissReminder,
  };
}

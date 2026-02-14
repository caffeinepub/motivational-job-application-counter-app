import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Bell, Loader2 } from 'lucide-react';
import { useGetCallerReminderSettings, useSaveCallerReminderSettings } from '../hooks/useQueries';

export default function ReminderSettingsDialog() {
  const { data: settings, isLoading } = useGetCallerReminderSettings();
  const saveMutation = useSaveCallerReminderSettings();
  
  const [open, setOpen] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [time, setTime] = useState('09:00');

  useEffect(() => {
    if (settings) {
      setEnabled(!!settings.dailyReminderTime);
      setTime(settings.dailyReminderTime || '09:00');
    }
  }, [settings]);

  const handleSave = async () => {
    await saveMutation.mutateAsync({
      dailyReminderTime: enabled ? time : undefined,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Bell className="w-4 h-4" />
          <span className="hidden sm:inline">Reminders</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Daily Reminder Settings</DialogTitle>
          <DialogDescription>
            Set a daily reminder to keep your job search momentum going
          </DialogDescription>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-6 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="reminder-enabled" className="text-base">
                  Enable Daily Reminder
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get a daily prompt to log applications
                </p>
              </div>
              <Switch
                id="reminder-enabled"
                checked={enabled}
                onCheckedChange={setEnabled}
              />
            </div>

            {enabled && (
              <div className="space-y-2 animate-fade-in">
                <Label htmlFor="reminder-time">Reminder Time</Label>
                <Input
                  id="reminder-time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  You'll receive a reminder at this time each day (while the app is open)
                </p>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          <Button
            onClick={handleSave}
            disabled={saveMutation.isPending}
            className="w-full gap-2"
          >
            {saveMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Settings'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

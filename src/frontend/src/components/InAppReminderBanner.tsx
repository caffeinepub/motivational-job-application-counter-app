import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, X } from 'lucide-react';

interface InAppReminderBannerProps {
  onDismiss: () => void;
}

export default function InAppReminderBanner({ onDismiss }: InAppReminderBannerProps) {
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 animate-scale-in">
      <Card className="shadow-medium border-primary/30 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary/10 flex-shrink-0">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground mb-1">
                Time to Keep the Fire Going! 🔥
              </h3>
              <p className="text-sm text-muted-foreground">
                Have you logged any job applications today? Every application brings you closer to your goal!
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onDismiss}
              className="flex-shrink-0 -mt-1 -mr-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { ReactNode } from 'react';
import LoginButton from './LoginButton';
import ReminderSettingsDialog from './ReminderSettingsDialog';
import InAppReminderBanner from './InAppReminderBanner';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { useReminderScheduler } from '../hooks/useReminderScheduler';
import { Heart } from 'lucide-react';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { data: userProfile } = useGetCallerUserProfile();
  const { showReminder, dismissReminder } = useReminderScheduler();
  
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'job-hunt-tracker'
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {showReminder && <InAppReminderBanner onDismiss={dismissReminder} />}
      
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-foreground">Job Hunt Tracker</h1>
            {userProfile && (
              <span className="text-sm text-muted-foreground hidden sm:inline">
                • {userProfile.name}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <ReminderSettingsDialog />
            <LoginButton />
          </div>
        </div>
      </header>
      
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="border-t border-border bg-card/30 py-6 mt-auto">
        <div className="container max-w-5xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1.5">
            Built with <Heart className="w-4 h-4 text-primary fill-primary" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              caffeine.ai
            </a>
          </p>
          <p className="mt-2 text-xs">© {new Date().getFullYear()} Job Hunt Tracker</p>
        </div>
      </footer>
    </div>
  );
}

import { useGetRecentApplicationEntries } from '../hooks/useQueries';
import ApplicationEntryForm from '../components/ApplicationEntryForm';
import RecentEntriesList from '../components/RecentEntriesList';
import { getMotivationalMessage, getNextMilestone } from '../utils/motivation';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Target } from 'lucide-react';

export default function HomeScreen() {
  const { data: entries, isLoading } = useGetRecentApplicationEntries();
  
  const totalCount = entries?.length || 0;
  const message = getMotivationalMessage(totalCount);
  const nextMilestone = getNextMilestone(totalCount);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section with Image */}
      <div className="relative rounded-2xl overflow-hidden shadow-medium">
        <img
          src="/assets/generated/job-hunt-hero.dim_1600x900.png"
          alt="Job hunt motivation"
          className="w-full h-48 sm:h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent flex items-end">
          <div className="p-6 sm:p-8 w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2">
              {totalCount}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              {totalCount === 1 ? 'Application Submitted' : 'Applications Submitted'}
            </p>
          </div>
        </div>
      </div>

      {/* Motivational Message & Milestone */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="shadow-soft border-primary/20 bg-primary/5">
          <CardContent className="p-6 flex items-start gap-4">
            <div className="p-3 rounded-full bg-primary/10">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Keep Going!</h3>
              <p className="text-sm text-muted-foreground">{message}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-accent/20 bg-accent/5">
          <CardContent className="p-6 flex items-start gap-4">
            <div className="p-3 rounded-full bg-accent/10">
              <Target className="w-6 h-6 text-accent-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Next Milestone</h3>
              <p className="text-sm text-muted-foreground">
                {nextMilestone > totalCount 
                  ? `${nextMilestone - totalCount} more to reach ${nextMilestone}!`
                  : 'You\'re crushing it! 🎉'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Application Entry Form */}
      <ApplicationEntryForm />

      {/* Recent Entries List */}
      <RecentEntriesList />
    </div>
  );
}


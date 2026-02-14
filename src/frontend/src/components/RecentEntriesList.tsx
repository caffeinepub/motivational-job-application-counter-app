import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetRecentApplicationEntries } from '../hooks/useQueries';
import { Loader2, Briefcase, Building2, Calendar, FileText } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function RecentEntriesList() {
  const { data: entries, isLoading } = useGetRecentApplicationEntries();

  if (isLoading) {
    return (
      <Card className="shadow-soft">
        <CardContent className="py-12 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!entries || entries.length === 0) {
    return (
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg">Recent Applications</CardTitle>
          <CardDescription>Your application history will appear here</CardDescription>
        </CardHeader>
        <CardContent className="py-12 text-center text-muted-foreground">
          <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No applications logged yet</p>
          <p className="text-sm mt-1">Start by logging your first application above!</p>
        </CardContent>
      </Card>
    );
  }

  // Sort entries newest first
  const sortedEntries = [...entries].sort((a, b) => 
    Number(b.timestamp) - Number(a.timestamp)
  );

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg">Recent Applications</CardTitle>
        <CardDescription>
          {entries.length} {entries.length === 1 ? 'application' : 'applications'} logged
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {sortedEntries.map((entry, index) => {
          const timestamp = Number(entry.timestamp) / 1_000_000; // Convert nanoseconds to milliseconds
          const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
          
          return (
            <div
              key={`${entry.timestamp}-${index}`}
              className="p-4 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Building2 className="w-4 h-4 text-primary" />
                    <span>{entry.company}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="w-4 h-4" />
                    <span>{entry.role}</span>
                  </div>
                  
                  {entry.notes && (
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-2">{entry.notes}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{timeAgo}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}


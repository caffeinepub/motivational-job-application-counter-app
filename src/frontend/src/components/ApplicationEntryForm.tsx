import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useLogApplicationEntry } from '../hooks/useQueries';
import { Loader2, Plus } from 'lucide-react';

interface ApplicationEntryFormProps {
  onSuccess?: () => void;
}

export default function ApplicationEntryForm({ onSuccess }: ApplicationEntryFormProps) {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [notes, setNotes] = useState('');
  
  const logEntry = useLogApplicationEntry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!company.trim() || !role.trim()) return;
    
    await logEntry.mutateAsync({
      company: company.trim(),
      role: role.trim(),
      notes: notes.trim() || null
    });
    
    setCompany('');
    setRole('');
    setNotes('');
    
    onSuccess?.();
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg">Log New Application</CardTitle>
        <CardDescription>
          Record the details of your latest job application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company *</Label>
            <Input
              id="company"
              placeholder="e.g., Acme Corp"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Role *</Label>
            <Input
              id="role"
              placeholder="e.g., Software Engineer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any additional details..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
          
          <Button
            type="submit"
            disabled={!company.trim() || !role.trim() || logEntry.isPending}
            className="w-full gap-2"
          >
            {logEntry.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Logging...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Log Application
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}


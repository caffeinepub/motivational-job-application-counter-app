import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, ApplicationLogEntry, ReminderSettings } from '../backend';

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Application Entry Queries
export function useGetRecentApplicationEntries() {
  const { actor, isFetching } = useActor();

  return useQuery<ApplicationLogEntry[]>({
    queryKey: ['applicationEntries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRecentApplicationEntries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useLogApplicationEntry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { company: string; role: string; notes: string | null }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.logApplicationEntry(params.company, params.role, params.notes);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applicationEntries'] });
    },
  });
}

// Reminder Settings Queries
export function useGetCallerReminderSettings() {
  const { actor, isFetching } = useActor();

  return useQuery<ReminderSettings | null>({
    queryKey: ['reminderSettings'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerReminderSettings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveCallerReminderSettings() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: ReminderSettings) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerReminderSettings(settings);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminderSettings'] });
    },
  });
}

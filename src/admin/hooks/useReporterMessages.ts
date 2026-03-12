import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '../api/client';
import type { ReporterMessage } from '@shared/types';

export function useReporterMessages(reportId: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['reporterMessages', reportId],
    queryFn: async () => {
      const response = await api.get(`/reports/${reportId}/reporter-messages`);
      return response.data.messages as ReporterMessage[];
    },
    enabled: !!reportId,
  });

  const sendMutation = useMutation({
    mutationFn: async (data: { message: string; ccSender?: boolean }) => {
      const response = await api.post(`/reports/${reportId}/reporter-messages`, data);
      return response.data.reporterMessage as ReporterMessage;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reporterMessages', reportId] });
      toast.success('Message sent to reporter');
    },
    onError: (err: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(err.response?.data?.message || 'Failed to send message');
    },
  });

  return {
    messages: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    sendMessage: sendMutation.mutate,
    sendMessageAsync: sendMutation.mutateAsync,
    isSending: sendMutation.isPending,
  };
}

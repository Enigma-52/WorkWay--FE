import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NewsDetailSidebar } from './components/NewsDetailSidebar';

interface ProvidersProps {
  children: React.ReactNode;
}


export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000, // 5 minutes
          gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
          retry: (failureCount, error: any) => {
            // Don't retry on 4xx errors except 408, 429
            if (error?.status >= 400 && error?.status < 500 && ![408, 429].includes(error.status)) {
              return false;
            }
            return failureCount < 3;
          },
          refetchOnWindowFocus: false,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <NewsDetailSidebar />
    </QueryClientProvider>
  );
}
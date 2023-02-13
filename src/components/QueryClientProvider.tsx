import {
  QueryClient,
  QueryClientProvider as RTKQueryClientProvider,
} from 'react-query';

interface Props {
  children: React.ReactNode;
}
const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: Props) => {
  return (
    <RTKQueryClientProvider client={queryClient}>
      {children}
    </RTKQueryClientProvider>
  );
};

export default QueryClientProvider;

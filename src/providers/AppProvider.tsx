import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const AppProvider:FC = ({ children }) => {
    const client = new QueryClient();
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export default AppProvider;
'use client';

import { createApolloClient } from '@/services/client';
import { ApolloProvider } from '@apollo/client';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { ReactNode } from 'react';
import '@mantine/core/styles.css';
import './globals.scss';

export default function RootLayout({ children }: { children: ReactNode }) {
  const client = createApolloClient();

  return (
    <html {...mantineHtmlProps} lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <ApolloProvider client={client}>{children}</ApolloProvider>
        </MantineProvider>
      </body>
    </html>
  );
}

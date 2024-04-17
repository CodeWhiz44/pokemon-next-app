import React, { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import Head from "next/head";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import "./globals.css";

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import("@tanstack/react-query-devtools/build/modern/production.js").then(
    (d) => ({
      default: d.ReactQueryDevtools,
    })
  )
);

function MyApp({ Component, pageProps }: AppProps) {
  const [showDevtools, setShowDevtools] = useState(true);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: false,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 60,
      },
    },
  });
  return (
    <>
      <Head>
        <title>Pokemon Next APP</title>
        <link rel="shortcut icon" href="/img/icon-512.png" />
        <link rel="apple-touch-icon" href="/img/icon-512.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#06092B" />
        <meta
          name="description"
          content="A simple project starter to work with TypeScript, React, NextJS and Styled Components"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </HydrationBoundary>
          <ReactQueryDevtools initialIsOpen />
          {showDevtools && (
            <React.Suspense fallback={null}>
              <ReactQueryDevtoolsProduction />
            </React.Suspense>
          )}
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;

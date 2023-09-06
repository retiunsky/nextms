import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import ThemeProvider from 'src/theme/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import {createEmotionCache} from 'src/theme/createEmotionCache';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { ThemeProvider as PreferredThemeProvider } from "next-themes";
import './styles.css';
import { useEffect, useState } from 'react';

const Noop = ({ children }) => <>{children}</>;
const clientSideEmotionCache = createEmotionCache();

function App(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  const FilterProvider = Component.provider || Noop;

  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;
  }
  return (
    <PreferredThemeProvider>

    <CacheProvider value={emotionCache}>
      <Head>
        <title>NextJS Dashboard</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <SidebarProvider>
      <FilterProvider>
        <ThemeProvider>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </FilterProvider>
      </SidebarProvider>
    </CacheProvider>
    </PreferredThemeProvider>

  );
}

export default App;

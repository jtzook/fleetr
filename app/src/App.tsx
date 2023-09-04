import { AppShell, Footer, Header, MantineProvider } from '@mantine/core'

import HomePage from './pages/HomePage'

export default function App() {
  return (
    <MantineProvider
      theme={{ colorScheme: 'dark' }}
      withGlobalStyles
      withNormalizeCSS
    >
      <AppShell
        padding='md'
        header={
          <Header height={80} p='xs'>
            {''}
          </Header>
        }
        footer={
          <Footer height={80} p='xs'>
            {''}
          </Footer>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <HomePage />
      </AppShell>
    </MantineProvider>
  )
}

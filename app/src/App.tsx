import {
  AppShell,
  Footer,
  Header,
  MantineProvider,
  Navbar,
} from '@mantine/core'

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
            Header
          </Header>
        }
        footer={
          <Footer height={80} p='xs'>
            Footer
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
        Home Page
      </AppShell>
    </MantineProvider>
  )
}

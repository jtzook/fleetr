import { AppShell, Header, MantineProvider, Navbar } from "@mantine/core";

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        padding="md"
        navbar={
          <Navbar width={{ base: 300 }} p="xs">
            Navbar
          </Navbar>
        }
        header={
          <Header height={60} p="xs">
            Header
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        Application
      </AppShell>
    </MantineProvider>
  );
}

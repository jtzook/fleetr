import { MantineProvider, Text } from '@mantine/core';
import Shell from './components/Shell';

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Shell />
    </MantineProvider>
  );
}
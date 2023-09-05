import { Grid, Paper } from '@mantine/core'
import Carousel from '../components/Carousel'

export default function HomePage() {
  return (
    <main
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Carousel />
    </main>
  )
}

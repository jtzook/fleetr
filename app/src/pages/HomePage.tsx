import { Grid, Paper } from '@mantine/core'
import Carousel from '../components/Carousel'

export default function HomePage() {
  return (
    // <Paper
    //   style={{
    //     width: '100%',
    //     height: '100%',
    //     background: 'blue',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   }}
    // >
    //   <Grid
    //     style={{
    //       width: '640px',
    //       height: '360px',
    //     }}
    //   >
    //     <Grid.Col
    //       span={12}
    //       style={{
    //         background: 'red',
    //         height: '30px',
    //       }}
    //     >
    //       Col 1
    //     </Grid.Col>
    //     <Grid.Col
    //       span={12}
    //       style={{
    //         background: 'white',
    //         height: '300px',
    //       }}
    //     >
    //       <Grid>
    //         <Grid.Col span={1}>1</Grid.Col>
    //         <Grid.Col span={8}>2</Grid.Col>
    //         <Grid.Col span={1}>3</Grid.Col>
    //       </Grid>
    //     </Grid.Col>
    //     <Grid.Col
    //       style={{
    //         background: 'red',
    //         height: '30px',
    //       }}
    //       span={12}
    //     >
    //       Col 3
    //     </Grid.Col>
    //   </Grid>
    // </Paper>
    <Carousel />
  )
}

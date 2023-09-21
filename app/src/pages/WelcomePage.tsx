import { Box, Button, Stack } from '@mantine/core'
import { useState } from 'react'

export default function WelcomePage() {
  const [hello, setHello] = useState('')

  const fetchHello = async () => {
    try {
      const response = await fetch('http://localhost:5000/')
      const { msg } = await response.json()
      setHello(msg)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <main
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack>
        <Box h={250}>
          <p>{hello}</p>
        </Box>
        <Button
          onClick={() => {
            fetchHello()
          }}
          w={100}
        >
          Hello
        </Button>
      </Stack>
    </main>
  )
}

import { Box, Button, Stack } from '@mantine/core'

export default function WelcomePage() {
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: 'include', // include credentials for cross-origin requests
      })

      const data = await response.json()

      if (response.ok) {
        console.log('Logged in successfully', data)
      } else {
        console.error('Login failed:', data.error)
      }
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
        <Box
          h={250}
          w={500}
          style={{
            wordBreak: 'break-all',
          }}
        >
          hi
        </Box>
        <Button
          onClick={() => {
            login('', '')
          }}
          w={100}
        >
          Hello
        </Button>
      </Stack>
    </main>
  )
}

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

  const refresh = async () => {
    const csrfToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('csrf_token='))
      ?.split('=')[1]

    if (!csrfToken) {
      console.error('CSRF token not found')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/api/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        credentials: 'include', // include credentials for cross-origin requests
      })

      const data = await response.json()

      if (response.ok) {
        console.log('Token refreshed successfully', data)
      } else {
        console.error('Token refresh failed:', data.error)
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
          h={150}
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
            // refresh()
          }}
          w={100}
        >
          Hello
        </Button>
      </Stack>
    </main>
  )
}

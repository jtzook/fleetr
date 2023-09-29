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
        credentials: 'include',
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

  const getProtectedData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/protected', {
        credentials: 'include',
      })

      const data = await res.json()

      if (res.ok) {
        console.log('Protected data:', data)
      } else {
        console.error('Protected data fetch failed:', data.error)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const getHelloData = async () => {
    try {
      const res = await fetch('http://localhost:5000/')

      const data = await res.json()

      if (res.ok) {
        console.log('Hello data:', data)
      } else {
        console.error('Hello data fetch failed:', data.error)
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
            getHelloData()
          }}
          w={100}
        >
          Hello
        </Button>
        <Button
          onClick={() => {
            login('', '')
          }}
          w={100}
        >
          Login
        </Button>
        <Button
          onClick={() => {
            refresh()
          }}
          w={100}
        >
          Refresh
        </Button>
        <Button
          onClick={() => {
            getProtectedData()
          }}
          w={100}
        >
          Get Data
        </Button>
      </Stack>
    </main>
  )
}

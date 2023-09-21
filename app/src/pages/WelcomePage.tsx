import { useEffect } from 'react'

export default function WelcomePage() {
  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((response) => response.json())
      .then((data) => {
        // Do something with the data
        console.log(data)
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching data:', error)
      })
  }, [])

  return (
    <main
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1>Welcome to Mantine</h1>
    </main>
  )
}

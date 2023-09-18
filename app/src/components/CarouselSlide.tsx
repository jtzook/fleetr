import { forwardRef } from 'react'
import { Paper } from '@mantine/core'
import { Note } from '../types/NoteTypes'

interface CarouselSlideProps {
  note: Note
  width: number
  height: number
}

const CarouselSlide = forwardRef<HTMLDivElement, CarouselSlideProps>(
  ({ note, width, height }, ref) => {
    return (
      <Paper
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width,
          height,
          fontSize: '2rem',
          fontWeight: 700,
          color: 'white',
        }}
      >
        <div
          ref={ref}
          tabIndex={0} // Make the div focusable
          style={{
            overflowY: 'auto',
            padding: 16,
            width: '100%',
            height,
          }}
        >
          <h1>{note.title}</h1>
          <p>{note.text}</p>
        </div>
      </Paper>
    )
  }
)

export default CarouselSlide

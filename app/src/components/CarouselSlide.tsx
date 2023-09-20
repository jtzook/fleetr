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
          padding: 16,
          width,
          height,
          minHeight: height,
          fontSize: '2em',
          fontWeight: 700,
          color: 'white',
          backgroundColor: 'red',
          border: '1px solid white',
          overflow: 'hidden',
        }}
        ref={ref}
        tabIndex={0}
      >
        <h1>{note.title}</h1>

        <p
          style={{
            height,
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          {note.text}
        </p>
      </Paper>
    )
  }
)

export default CarouselSlide

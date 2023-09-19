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
          width,
          height,
          fontSize: '2rem',
          fontWeight: 700,
          color: 'white',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            padding: 16,
            height,
            width: width - 8,
          }}
        >
          <h1>{note.title}</h1>

          <p
            ref={ref}
            tabIndex={0}
            style={{ overflowY: 'auto', maxHeight: 'calc(100% - 2rem)' }}
          >
            {note.text}
          </p>
        </div>
      </Paper>
    )
  }
)

export default CarouselSlide

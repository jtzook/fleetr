import { forwardRef } from 'react'
import { Paper, ScrollArea } from '@mantine/core'
import { Note } from '../types/NoteTypes'

interface CarouselSlideProps {
  note: Note
  width: number
  height: number
}

const CarouselSlide = forwardRef<HTMLDivElement, CarouselSlideProps>(
  ({ note, width, height }, ref) => {
    return (
      <ScrollArea
        style={{
          height,
          width,
        }}
        type='auto'
      >
        <Paper
          style={{
            minHeight: height,
            overflow: 'hidden',
            fontSize: '2em',
            fontWeight: 700,
            padding: 16,
          }}
          ref={ref}
          tabIndex={0}
        >
          <h1>{note.title}</h1>
          <p>{note.text}</p>
        </Paper>
      </ScrollArea>
    )
  }
)

export default CarouselSlide

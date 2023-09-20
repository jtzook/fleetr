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
          padding: 8,
          width,
          height,
          overflow: 'hidden',
          backgroundColor: 'salmon',
        }}
      >
        <Paper
          style={{
            height: height - 16,
            overflow: 'hidden',
            fontSize: '2em',
            fontWeight: 700,
            color: 'white',
            backgroundColor: 'cyan',
            padding: 16,
          }}
        >
          <div
            style={{ overflowY: 'auto', height: height - 16 }}
            ref={ref}
            tabIndex={0}
          >
            <h1>{note.title}</h1>
            <p>{note.text}</p>
          </div>
        </Paper>
      </ScrollArea>
    )
  }
)

export default CarouselSlide

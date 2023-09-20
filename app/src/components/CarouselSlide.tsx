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
      <Paper
        style={{
          width,
          height,
          minHeight: height,

          backgroundColor: 'cyan',
        }}
      >
        <ScrollArea
          style={{
            height,
            width,
            fontSize: '2em',
            fontWeight: 700,
            color: 'white',
            padding: 0,
            overflowY: 'auto',
          }}
          type='always'
          // ref={ref}
          // tabIndex={0}
        >
          <div ref={ref} tabIndex={0}>
            <h1>{note.title}</h1>
            <p>{note.text}</p>
          </div>
        </ScrollArea>
      </Paper>
    )
  }
)

export default CarouselSlide

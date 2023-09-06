import { Paper } from '@mantine/core'
import { Note } from '../types/NoteTypes'

interface CarouselSlideProps {
  note: Note
  width: number
  height: number
}

const CarouselSlide: React.FC<CarouselSlideProps> = ({
  note,
  width,
  height,
}) => {
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

export default CarouselSlide

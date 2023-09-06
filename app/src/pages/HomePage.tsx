import Carousel from '../components/Carousel'
import { Note } from '../types/NoteTypes'

export default function HomePage() {
  const notes: Note[] = [
    {
      id: 1,
      title: 'Slide 1',
      text: 'Slide 1 content. Slide 1 content. Slide 1 content. Slide ent. Slide 1 content. Slide ent. Slide 1 content. Slide ent. Slide 1 content. Slide ent. Slide 1 content. Slide ent. Slide 1 content. Slide ent. Slide 1 content. Slide ent. Slide 1 content. Slide 1 content. Slide 1 content. Slide 1 content. Slide 1 content. Slide 1 content. Slide 1 content. ',
    },
    {
      id: 2,
      title: 'Slide 2',
      text: 'Slide 2 content',
    },
    {
      id: 3,
      title: 'Slide 3',
      text: 'Slide 3 content',
    },
  ]

  return (
    <main
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Carousel notes={notes} />
    </main>
  )
}

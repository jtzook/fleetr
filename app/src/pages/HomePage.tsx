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
      text: '私たちは多くの場合、動機付けが不明確な行動について語りますが、そのような行動は、概して認識された結果につながる可能性があるという共通の認識に基づいています。私たちの多くが仕事や生活の各側面で迅速な決断を下す一方で、しばしばその影響を深く考える時間がありません。この種の短期的な視点は、長期的な成功には有益でない場合が多いです。',
    },
    {
      id: 4,
      title: 'Slide 4',
      text: '私たちは多くの場合、動機付けが不明確な行動について語りますが、そのような行動は、概して認識された結果につながる可能性があるという共通の認識に基づいています。私たちの多くが仕事や生活の各側面で迅速な決断を下す一方で、しばしばその影響を深く考える時間がありません。この種の短期的な視点は、長期的な成功には有益でない場合が多いです。',
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

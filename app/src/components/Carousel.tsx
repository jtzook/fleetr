import { Group, Button, Stack, ScrollArea, ActionIcon } from '@mantine/core'
import { useRef } from 'react'
import {
  IconCaretDown,
  IconCaretLeft,
  IconCaretRight,
  IconCaretUp,
} from '@tabler/icons-react'

const slideWidth = 640
const slideHeight = 360

interface Note {
  id: string
  title: string
  content: string
  meta?: any
}

interface SlideProps {
  Note: Note
}

const Slide: React.FC<SlideProps> = ({ Note }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: slideWidth, // make sure slideWidth is defined
        height: slideHeight, // make sure slideHeight is defined
        overflow: 'hidden',
        fontSize: '2rem',
        fontWeight: 700,
        color: 'white',
        background: 'red',
      }}
    >
      <div>
        <h1>{Note.title}</h1>
        <p>{Note.content}</p>
      </div>
    </div>
  )
}

export default function Carousel() {
  const viewport = useRef<HTMLDivElement>(null)

  const scrollToLeft = () =>
    viewport?.current?.scrollTo({ left: 0, behavior: 'smooth' })

  const scrollToRight = () =>
    viewport?.current?.scrollTo({
      left: viewport.current.scrollWidth,
      behavior: 'smooth',
    })

  const notes = [
    {
      id: '1',
      title: 'Slide 1',
      content:
        'Slide 1 content. Slide 1 content. Slide 1 content. Slide 1 content. Slide 1 content. Slide 1 content. Slide 1 content. Slide 1 content. Slide 1 content. ',
    },
    {
      id: '2',
      title: 'Slide 2',
      content: 'Slide 2 content',
    },
    {
      id: '3',
      title: 'Slide 3',
      content: 'Slide 3 content',
    },
  ]

  return (
    <Group
      style={{
        background: 'blue',
        width: slideWidth + 56,
        height: slideHeight + 56,
      }}
      spacing={0}
      noWrap={true}
    >
      <ActionIcon onClick={scrollToLeft}>
        <IconCaretLeft />
      </ActionIcon>
      <Stack
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        spacing={0}
      >
        <ActionIcon
          style={{
            visibility: 'hidden',
          }}
        >
          <IconCaretUp />
        </ActionIcon>

        <ScrollArea
          style={{
            width: slideWidth,
            height: slideHeight,
          }}
          viewportRef={viewport}
        >
          <Group
            style={{
              width: slideWidth * 3,
            }}
          >
            {notes.map((note) => (
              <Slide key={note.id} Note={note} />
            ))}
          </Group>
        </ScrollArea>

        <ActionIcon
          style={{
            visibility: 'hidden',
          }}
        >
          <IconCaretDown />
        </ActionIcon>
      </Stack>
      <ActionIcon onClick={scrollToRight}>
        <IconCaretRight />
      </ActionIcon>
    </Group>
  )
}

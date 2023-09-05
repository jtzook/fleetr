import { Group, Stack, ScrollArea, ActionIcon } from '@mantine/core'
import { KeyboardEvent, useEffect, useRef } from 'react'
import {
  IconCaretDown,
  IconCaretLeft,
  IconCaretRight,
  IconCaretUp,
} from '@tabler/icons-react'

const slideWidth = 660
const slideHeight = 360

interface Note {
  id: string
  title: string
  content: string
  meta?: any
}

interface SlideProps {
  note: Note
}

const Slide: React.FC<SlideProps> = ({ note }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: slideWidth,
        height: slideHeight,
        fontSize: '2rem',
        fontWeight: 700,
        color: 'white',
        background: 'red',
      }}
    >
      <div
        style={{
          height: slideHeight,
          overflowY: 'auto',
          padding: 28,
        }}
      >
        <h1>{note.title}</h1>
        <p>{note.content}</p>
      </div>
    </div>
  )
}

export default function Carousel() {
  const viewport = useRef<HTMLDivElement>(null)

  // Scroll to the right by one slide's width
  const scrollToRight = () => {
    viewport.current?.scrollBy({
      left: slideWidth,
      behavior: 'smooth',
    })
  }

  // Scroll to the left by one slide's width
  const scrollToLeft = () => {
    viewport.current?.scrollBy({
      left: -slideWidth, // Negative value to scroll left
      behavior: 'smooth',
    })
  }

  const leftButtonRef = useRef<HTMLButtonElement>(null)
  const rightButtonRef = useRef<HTMLButtonElement>(null)

  // Keyboard event handler
  const handleKeyDown = (e: any) => {
    if (e.key === 'ArrowRight' && rightButtonRef.current) {
      rightButtonRef.current.click()
    } else if (e.key === 'ArrowLeft' && leftButtonRef.current) {
      leftButtonRef.current.click()
    }
  }

  // Set up keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const notes = [
    {
      id: '1',
      title: 'Slide 1',
      content:
        'Slide 1 content. Slide 1 content. Slide 1 content. Slide ent. Slide 1 content. Slide ent. Slide 1 content. Slide ent. Slide 1 content. Slide ent. Slide 1 content. Slide ent. Slide 1 content. Slide ent. Slide 1 content. Slide ent. Slide 1 content. Slide 1 content. Slide 1 content. Slide 1 content. Slide 1 content. Slide 1 content. Slide 1 content. ',
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
      <ActionIcon ref={leftButtonRef} onClick={scrollToLeft}>
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
              width: slideWidth * notes.length,
            }}
            noWrap={true}
            spacing={0}
          >
            {notes.map((note) => (
              <Slide key={note.id} note={note} />
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
      <ActionIcon ref={rightButtonRef} onClick={scrollToRight}>
        <IconCaretRight />
      </ActionIcon>
    </Group>
  )
}

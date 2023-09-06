import { Group, Stack, ScrollArea, ActionIcon, Paper } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useEffect, useRef } from 'react'
import {
  IconCaretDown,
  IconCaretLeft,
  IconCaretRight,
  IconCaretUp,
} from '@tabler/icons-react'

import { Note } from '../types/NoteTypes'

interface SlideProps {
  note: Note
  width: number
  height: number
}

const Slide: React.FC<SlideProps> = ({ note, width, height }) => {
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

export default function Carousel() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const slideWidth = isMobile ? 330 : 660
  const slideHeight = 360
  const buttonOffset = isMobile ? 28 : 56

  const viewport = useRef<HTMLDivElement>(null)

  // Scroll to the right by one slide's width
  const scrollRight = () => {
    setTimeout(() => {
      viewport.current?.scrollBy({
        left: slideWidth,
        behavior: 'auto',
      })
    }, 0)
  }

  // Scroll to the left by one slide's width
  const scrollLeft = () => {
    setTimeout(() => {
      viewport.current?.scrollBy({
        left: -slideWidth,
        behavior: 'auto',
      })
    }, 0)
  }

  const leftButtonRef = useRef<HTMLButtonElement>(null)
  const rightButtonRef = useRef<HTMLButtonElement>(null)

  // Keyboard event handler
  const handleKeyDown = (e: any) => {
    if (e.key === 'ArrowRight' && rightButtonRef.current) {
      scrollRight()
    } else if (e.key === 'ArrowLeft' && leftButtonRef.current) {
      scrollLeft()
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
    <Group
      className='hide-scrollbar'
      style={{
        width: slideWidth + buttonOffset,
        height: slideHeight + buttonOffset,
      }}
      spacing={0}
      noWrap={true}
    >
      <ActionIcon ref={leftButtonRef} onClick={scrollLeft}>
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
          className='hide-scrollbar'
          style={{
            width: slideWidth,
            height: slideHeight,
          }}
          viewportRef={viewport}
        >
          <Group
            className='hide-scrollbar'
            style={{
              width: slideWidth * notes.length,
            }}
            noWrap={true}
            spacing={0}
          >
            {notes.map((note) => (
              <Slide
                key={note.id}
                note={note}
                width={slideWidth}
                height={slideHeight}
              />
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
      <ActionIcon ref={rightButtonRef} onClick={scrollRight}>
        <IconCaretRight />
      </ActionIcon>
    </Group>
  )
}

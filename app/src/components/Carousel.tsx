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
import CarouselSlide from './CarouselSlide'

interface CarouselProps {
  notes: Note[]
}

export default function Carousel({ notes }: CarouselProps) {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const slideWidth = isMobile ? 330 : 660
  const slideHeight = 360
  const buttonOffset = isMobile ? 28 : 56

  const viewport = useRef<HTMLDivElement>(null)

  // Scroll to the right by one slide's width
  const scrollRight = () => {
    if (viewport.current) {
      const currentX = viewport.current.scrollLeft

      if (currentX % slideWidth === 0) {
        viewport.current.scrollBy({
          left: slideWidth,
          behavior: 'smooth',
        })
      }
    }
  }

  // Scroll to the left by one slide's width
  const scrollLeft = () => {
    if (viewport.current) {
      const currentX = viewport.current.scrollLeft

      if (currentX % slideWidth === 0) {
        viewport.current.scrollBy({
          left: -slideWidth,
          behavior: 'smooth',
        })
      }
    }
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
              <CarouselSlide
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

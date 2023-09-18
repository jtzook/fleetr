import { Group, Stack, ScrollArea, ActionIcon, Paper } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { createRef, useEffect, useRef, useState } from 'react'
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

  const [currentSlideId, setCurrentSlideId] = useState(0)

  const scrollSlide = (direction: 'right' | 'left') => {
    if (direction === 'right' && currentSlideId < notes.length - 1) {
      setCurrentSlideId((id) => id + 1)
    } else if (direction === 'left' && currentSlideId > 0) {
      setCurrentSlideId((id) => id - 1)
    } else {
      return
    }

    if (viewport.current) {
      const currentX = viewport.current.scrollLeft

      if (currentX === 0 || currentX % slideWidth === 0) {
        const scrollAmount = direction === 'right' ? slideWidth : -slideWidth
        viewport.current.scrollBy({
          left: scrollAmount,
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
      e.preventDefault()
      scrollSlide('right')
    } else if (e.key === 'ArrowLeft' && leftButtonRef.current) {
      e.preventDefault()
      scrollSlide('left')
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const [slideRefs, setSlideRefs] = useState<React.RefObject<HTMLDivElement>[]>(
    []
  )

  // Create or update refs array
  useEffect(() => {
    setSlideRefs((refs) =>
      Array(notes.length)
        .fill(0)
        .map((_, i) => refs[i] ?? createRef<HTMLDivElement>())
    )
  }, [notes])

  useEffect(() => {
    if (slideRefs[currentSlideId]?.current) {
      slideRefs[currentSlideId].current?.focus()
    }
  }, [currentSlideId, slideRefs])

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
      <ActionIcon ref={leftButtonRef} onClick={() => scrollSlide('left')}>
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
            {notes.map((note, index) => (
              <CarouselSlide
                key={note.id}
                note={note}
                width={slideWidth}
                height={slideHeight}
                ref={
                  index === currentSlideId ? slideRefs[currentSlideId] : null
                }
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
      <ActionIcon ref={rightButtonRef} onClick={() => scrollSlide('right')}>
        <IconCaretRight />
      </ActionIcon>
    </Group>
  )
}

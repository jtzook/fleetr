import { Group, Stack, ScrollArea, ActionIcon } from '@mantine/core'
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
    if (!viewport.current) {
      return
    }

    console.log('\nscroll', direction)

    const currentX = viewport.current.scrollLeft

    if (
      (currentX === 0 && direction === 'left') ||
      (currentX === viewport.current.scrollWidth - slideWidth &&
        direction === 'right')
    ) {
      console.log('currentX is at the edge')
      return
    }

    console.log('currentX is at a stop point')

    // Calculate the new scroll position
    const scrollAmount = direction === 'right' ? slideWidth : -slideWidth

    // Clamp the new scroll position to the boundaries
    const newScrollX = currentX + scrollAmount

    viewport.current.scrollBy({
      left: newScrollX,
      behavior: 'smooth',
    })

    // Update the current slide
    setCurrentSlideId(Math.round(newScrollX / slideWidth))
  }

  const slideRefs = notes.map(() => createRef<HTMLDivElement>())
  useEffect(() => {
    if (!slideRefs[currentSlideId].current) {
      return
    }

    slideRefs[currentSlideId].current?.focus()
  }, [currentSlideId])

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
        {currentSlideId}

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
          <Group noWrap={true} spacing={0}>
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

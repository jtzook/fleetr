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

const getSlideDimensions = (isMobile: boolean) => ({
  slideWidth: isMobile ? 330 : 660,
  slideHeight: 360,
  buttonOffset: isMobile ? 28 : 56,
})

const getNextSlideId = (
  currentX: number,
  slideWidth: number,
  direction: 'right' | 'left'
) => {
  const scrollAmount = direction === 'right' ? slideWidth : -slideWidth
  const newScrollX = currentX + scrollAmount
  const nextSlideId = Math.round(newScrollX / slideWidth)
  return nextSlideId
}

const isScrollable = (
  direction: 'right' | 'left',
  nextSlideId: number,
  notesLength: number
) => {
  if (direction === 'right' && nextSlideId === notesLength) return false
  if (direction === 'left' && nextSlideId === -1) return false
  return true
}

interface CarouselProps {
  notes: Note[]
}

export default function Carousel({ notes }: CarouselProps) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const { slideWidth, slideHeight, buttonOffset } = getSlideDimensions(isMobile)

  const viewport = useRef<HTMLDivElement>(null)
  const slideRefs = notes.map(() => createRef<HTMLDivElement>())

  const [currentSlideId, setCurrentSlideId] = useState(0)
  const [nextSlideId, setNextSlideId] = useState(0)

  const scrollSlide = (direction: 'right' | 'left') => {
    if (!viewport.current) return

    const currentX = viewport.current.scrollLeft
    const nextSlideId = getNextSlideId(currentX, slideWidth, direction)

    if (!isScrollable(direction, nextSlideId, notes.length)) return

    setNextSlideId(nextSlideId)
  }

  useEffect(() => {
    if (!viewport.current) return

    if (nextSlideId === currentSlideId) return

    // scroll to the next slide
    viewport.current.scrollTo({
      left: slideWidth * nextSlideId,
      behavior: 'smooth',
    })

    setCurrentSlideId(nextSlideId)
  }, [nextSlideId])

  useEffect(() => {
    if (!viewport.current) return

    // focus on the current slide so user can use arrow keys to navigate
    if (slideRefs[currentSlideId].current) {
      setTimeout(() => {
        slideRefs[currentSlideId].current?.focus()
      }, 300)
    }
  }, [currentSlideId])

  const leftButtonRef = useRef<HTMLButtonElement>(null)
  const rightButtonRef = useRef<HTMLButtonElement>(null)

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

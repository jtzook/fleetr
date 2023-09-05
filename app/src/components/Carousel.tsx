import { Group, Button, Stack, ScrollArea } from '@mantine/core'
import { useRef } from 'react'

import Slide from './Slide'

export default function Carousel() {
  const viewport = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    console.log('Viewport: ', viewport.current)
    viewport?.current?.scrollTo({
      top: viewport.current.scrollHeight,
      behavior: 'smooth',
    })
  }

  const scrollToTop = () =>
    viewport?.current?.scrollTo({ top: 0, behavior: 'smooth' })

  const scrollToLeft = () =>
    viewport?.current?.scrollTo({ left: 0, behavior: 'smooth' })

  const scrollToRight = () =>
    viewport?.current?.scrollTo({
      left: viewport.current.scrollWidth,
      behavior: 'smooth',
    })

  return (
    <Group
      position='center'
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button onClick={scrollToLeft} variant='outline'>
        left
      </Button>
      <Stack
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button onClick={scrollToTop} variant='outline'>
          top
        </Button>
        <ScrollArea
          style={{
            width: '320px',
            height: '180px',
          }}
          viewportRef={viewport}
        >
          <Group
            style={{
              width: '1000px',
            }}
            position='center'
          >
            <Slide>1</Slide>
            <Slide>2</Slide>
            <Slide>3</Slide>
          </Group>
        </ScrollArea>
        <Button onClick={scrollToBottom} variant='outline'>
          bottom
        </Button>
      </Stack>
      <Button onClick={scrollToRight} variant='outline'>
        right
      </Button>
    </Group>
  )
}

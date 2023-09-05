import { Group, Button, Stack, ScrollArea, ActionIcon } from '@mantine/core'
import { useRef } from 'react'

import Slide from './Slide'
import {
  IconCaretDown,
  IconCaretLeft,
  IconCaretRight,
  IconCaretUp,
} from '@tabler/icons-react'

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
      <ActionIcon onClick={scrollToLeft}>
        <IconCaretLeft />
      </ActionIcon>
      <Stack
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActionIcon onClick={scrollToTop}>
          <IconCaretUp />
        </ActionIcon>

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

        <ActionIcon onClick={scrollToBottom}>
          <IconCaretDown />
        </ActionIcon>
      </Stack>
      <ActionIcon onClick={scrollToRight}>
        <IconCaretRight />
      </ActionIcon>
    </Group>
  )
}

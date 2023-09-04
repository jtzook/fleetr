import { useRef } from 'react'
import { ScrollArea, Button, Stack, Group, Paper } from '@mantine/core'

import Slide from '../components/Slide'

export default function HomePage() {
  const viewport = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    console.log('Viewport: ', viewport.current)
    viewport?.current?.scrollTo({
      top: viewport.current.scrollHeight,
      behavior: 'smooth',
    })
  }

  const scrollToCenter = () =>
    viewport?.current?.scrollTo({
      top: viewport?.current?.scrollHeight / 2,
      behavior: 'smooth',
    })

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
    <Stack align='center'>
      <ScrollArea w={300} h={200} viewportRef={viewport}>
        <Paper
          sx={{
            width: 600,
          }}
        >
          <Slide>
            私たちは多くの場合、動機付けが不明確な行動について語りますが、そのような行動は、概して認識された結果につながる可能性があるという共通の認識に基づいています。私たちの多くが仕事や生活の各側面で迅速な決断を下す一方で、しばしばその影響を深く考える時間がありません。この種の短期的な視点は、長期的な成功には有益でない場合が多いです。
          </Slide>
          <p>
            しかし、目の前の課題に集中することの重要性は、多くの場合、過小評価されています。このような瞬間瞬間の選択は、総合的な成果に大きな影響を与えることがあるからです。実際には、多くの成功したプロジェクトや企業は、一貫した努力と持続可能な戦略によって成り立っています。従って、短期的な成功と長期的な成功のバランスを見つけることが重要です
          </p>
          <p>
            結局、人々が持続的な成果を出すためには、明確な目標設定と戦略が不可欠です。これにより、各個人やチームは、より高いレベルでの成果を出すための環境を整えることができます。そして、それが全体として組織やコミュニティにプラスの影響を与え、持続的な成長を促進するでしょう。
          </p>
        </Paper>
      </ScrollArea>

      <Group position='center'>
        <Button onClick={scrollToBottom} variant='outline'>
          Scroll to bottom
        </Button>
        <Button onClick={scrollToCenter} variant='outline'>
          Scroll to center
        </Button>
        <Button onClick={scrollToTop} variant='outline'>
          Scroll to top
        </Button>
        <Button onClick={scrollToLeft} variant='outline'>
          Scroll to left
        </Button>
        <Button onClick={scrollToRight} variant='outline'>
          Scroll to right
        </Button>
      </Group>
    </Stack>
  )
}

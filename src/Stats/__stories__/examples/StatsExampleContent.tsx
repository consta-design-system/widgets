import React from 'react'

import { Example } from '@/__private__/storybook'

import { Stats } from '../..'

export const StatsExampleContent = () => (
  <Example width="200px">
    <Stats title="Заголовок" value={146} numberBadge={20} unit="единиц" layout="default" size="s" />
  </Example>
)

export const StatsExampleContentWithSign = () => (
  <Example width="200px">
    <Stats
      title="Выработка"
      value={250}
      numberBadge={20}
      unit="тысяч тонн в час"
      layout="default"
      size="s"
      withSign
    />
  </Example>
)

export const StatsExampleContentLong = () => (
  <Example width="200px">
    <Stats
      title="В этом году весна особенно прекрасна"
      value={17}
      numberBadge={20}
      unit="счастливых мгновений для каждого"
      layout="default"
      size="s"
      withSign
    />
  </Example>
)

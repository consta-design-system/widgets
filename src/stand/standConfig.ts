import { createConfig, ListCardBig } from '@consta/stand';

import image from './ConstaImage.png';

export const { createStand } = createConfig({
  title: 'Consta Widgets',
  id: 'widgets',
  groups: [
    {
      title: 'Компоненты',
      id: 'components',
      initialOpen: true,
      renderList: ListCardBig,
    },
  ],
  group: 'Библиотеки',
  image,
  description: 'Графики и диаграммы для дизайн-системы Consta',
  repositoryUrl: 'https://github.com/consta-design-system/widgets',
  order: 30,
  status: 'deprecated',
});

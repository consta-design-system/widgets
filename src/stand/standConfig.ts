import { createConfig } from '@consta/stand';

import image from './ConstaImage.png';

const groups = [
  {
    title: 'Компоненты',
    id: 'components',
    initialOpen: true,
  },
] as const;

export const { createStand } = createConfig({
  title: 'Consta Widgets',
  id: 'widgets',
  groups,
  group: 'Основные библиотеки',
  image,
  description:
    'Графики и диаграммы для дизайн-системы Consta. Эта версия поддерживается, но не развивается. Актуальная библиотека графиков —  @consta/charts.',
  repositoryUrl: 'https://github.com/consta-design-system/widgets',
  order: 30,
});

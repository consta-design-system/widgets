import { createStand } from '##/stand/standConfig';

import image from './StackedBarChart.image.svg';

export default createStand({
  title: 'StackedBarChart',
  id: 'StackedBarChart',
  image,
  group: 'components',
  description: 'Столбчатая диаграмма с накоплением.',
  version: '4.2.2',
  status: 'stable',
});

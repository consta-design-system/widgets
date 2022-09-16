import { createStand } from '##/stand/standConfig';

import image from './BarChart.image.svg';

export default createStand({
  title: 'BarChart',
  id: 'BarChart',
  image,
  group: 'components',
  description: 'Столбчатая диаграмма.',
  version: '4.2.2',
  sandbox: 'barchart-d3vql5',
  status: 'stable',
});

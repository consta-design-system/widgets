import { createStand } from '##/stand/standConfig';

import image from './DonutChart.image.svg';

export default createStand({
  title: 'DonutChart',
  id: 'DonutChart',
  image,
  group: 'components',
  description: 'Круговая диаграмма.',
  version: '4.2.2',
  status: 'stable',
});

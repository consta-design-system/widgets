import { createStand } from '##/stand/standConfig';

import image from './Stats.image.svg';

export default createStand({
  title: 'Stats',
  id: 'Stats',
  image,
  group: 'components',
  description: 'Важные числа и их изменение.',
  version: '4.2.2',
  status: 'stable',
});

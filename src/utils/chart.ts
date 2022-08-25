import { FormatValue } from '##/types';
import { isNotNil } from '##/utils/type-guards';

export const getFormattedValue = (
  v: number | null,
  formatter: FormatValue = String,
) => {
  if (!isNotNil(v)) {
    return 'Нет данных';
  }

  return formatter(v);
};

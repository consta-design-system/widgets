import { getFillPoints, isStraightLine } from '../Threshold';

const maxPoints = [
  { x: 0, y: 2 },
  { x: 1, y: 2 },
] as const;
const minPoints = [
  { x: 0, y: -2 },
  { x: 1, y: -2 },
] as const;

describe('Линейный график / линии порога', () => {
  describe('getFillPoints', () => {
    it('Получение координат заливки', () => {
      const result = getFillPoints(maxPoints, minPoints);
      expect(result).toEqual([
        { x: 1, y: 2 },
        { x: 1, y: -2 },
        { x: 0, y: -2 },
        { x: 0, y: 2 },
      ]);
    });

    it('Получение пустых координат заливки если нет минимальных координат', () => {
      const result = getFillPoints(maxPoints);
      expect(result).toEqual([]);
    });
  });

  describe('isStraightLine', () => {
    it('Определяет, что горизонтальная линия ровная', () => {
      expect(
        isStraightLine(
          [
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 2, y: 1 },
          ],
          true,
        ),
      ).toEqual(true);
    });

    it('Определяет, что горизонтальная линия неровная', () => {
      expect(
        isStraightLine(
          [
            { x: 0, y: 1 },
            { x: 1, y: 2 },
            { x: 2, y: 1 },
          ],
          true,
        ),
      ).toEqual(false);
    });

    it('Определяет, что вертикальная линия ровная', () => {
      expect(
        isStraightLine(
          [
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 1, y: 2 },
          ],
          false,
        ),
      ).toEqual(true);
    });

    it('Определяет, что вертикальная линия неровная', () => {
      expect(
        isStraightLine(
          [
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 2 },
          ],
          false,
        ),
      ).toEqual(false);
    });
  });
});

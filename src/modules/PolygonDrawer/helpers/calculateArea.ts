/**
 * Вычисляет площадь многоугольника, используя алгоритм формулы Гаусса (или Шёта).
 *
 * @param {Array<{ x: number; y: number }>} points - Массив точек, представляющих вершины многоугольника.
 * @returns {number} Площадь многоугольника.
 */
const calculateArea = (points: { x: number; y: number }[]): number => {
  if (points.length < 3) return 0; // Меньше трех точек не образуют многоугольник

  // Определяем центр масс многоугольника
  const center = points.reduce(
    (acc, point) => {
      acc.x += point.x;
      acc.y += point.y;
      return acc;
    },
    { x: 0, y: 0 },
  );
  center.x /= points.length;
  center.y /= points.length;

  // Сортируем точки по углу относительно центра
  points.sort((a, b) => {
    const angleA = Math.atan2(a.y - center.y, a.x - center.x);
    const angleB = Math.atan2(b.y - center.y, b.x - center.x);
    return angleA - angleB;
  });

  // Вычисляем площадь многоугольника по отсортированным точкам
  let area = 0;
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += points[i].x * points[j].y;
    area -= points[j].x * points[i].y;
  }
  area = Math.abs(area) / 2;
  return area;
};
export default calculateArea;

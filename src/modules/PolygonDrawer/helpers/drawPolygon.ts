import { Canvas, FabricText, Line, Polygon, Rect } from 'fabric';
import calculateArea from './calculateArea';

/**
 * Рисует многоугольник и добавляет текст с его площадью на холст.
 *
 * @param {Canvas} canvas - Объект канваса Fabric.
 * @param {Array<{ x: number; y: number }>} polygonPoints - Массив точек, представляющих вершины многоугольника.
 * @param {React.Dispatch<React.SetStateAction<Rect[]>>} setSquares - Функция для обновления состояния квадратов.
 * @param {React.Dispatch<React.SetStateAction<FabricText | null>>} setText - Функция для обновления состояния текстового объекта.
 */
const drawPolygon = (
  canvas: Canvas,
  polygonPoints: { x: number; y: number }[],
  setSquares: React.Dispatch<React.SetStateAction<Rect[]>>,
  setText: React.Dispatch<React.SetStateAction<FabricText | null>>,
) => {
  // Рисуем линии между точками
  polygonPoints.forEach((point, index) => {
    const nextPoint = polygonPoints[(index + 1) % polygonPoints.length];
    const line = new Line([point.x, point.y, nextPoint.x, nextPoint.y], {
      stroke: 'blue',
      selectable: false,
    });
    canvas.add(line);
  });

  // Создаем и добавляем полигон с заливкой
  const polygon = new Polygon(
    polygonPoints.map(p => ({ x: p.x, y: p.y })),
    {
      fill: 'rgba(0, 0, 255, 0.3)', // Полупрозрачный синий цвет
      stroke: 'blue',
      strokeWidth: 2,
      selectable: false,
    },
  );
  canvas.add(polygon);

  // Удаляем старые квадраты
  setSquares(prevSquares => {
    prevSquares.forEach(square => canvas.remove(square));
    return [];
  });

  // Удаляем старый текстовый объект, если он существует
  const text = canvas.getObjects('text')[0] as FabricText | undefined;
  if (text) {
    canvas.remove(text);
  }

  // Определение области для текста
  const canvasW = canvas.getWidth();
  const canvasH = canvas.getHeight();
  const margin = 20; // Отступ от краев canvas

  // Создание текстового объекта для площади
  const area = calculateArea(polygonPoints);
  let textX = polygonPoints[0].x + 10; // Позиция по X
  let textY = polygonPoints[0].y; // Позиция по Y

  // Проверка на выход за границы canvas и корректировка позиции
  if (textX + 150 > canvasW - margin) {
    textX = canvasW - 150 - margin;
  }
  if (textY + 30 > canvasH - margin) {
    textY = canvasH - 30 - margin;
  }

  const textLabel = new FabricText(`Площадь: ${area.toFixed(2)} кв. px`, {
    left: textX,
    top: textY,
    fontSize: 18,
    fill: 'red', // Цвет текста
    strokeWidth: 1, // Толщина обводки
    selectable: false,
  });

  // Добавляем новый текст
  canvas.add(textLabel);
  setText(textLabel); // Сохраняем текстовое состояние
};
export default drawPolygon;

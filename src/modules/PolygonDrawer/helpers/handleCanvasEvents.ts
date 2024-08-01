import { Dispatch, SetStateAction } from 'react';
import { Canvas, FabricText, Line, Rect, TEvent } from 'fabric';
import drawPolygon from './drawPolygon';

/**
 * Обрабатывает клики по холсту и добавляет новые точки или завершает рисование.
 *
 * @param {boolean} isDrawing - Флаг, указывающий, активно ли рисование.
 * @param {Array<{ x: number; y: number }>} points - Массив точек, представляющих текущие вершины многоугольника.
 * @param {Line | null} tempLine - Временная линия для отображения промежуточных этапов отрисовки.
 * @param {Dispatch<SetStateAction<{ x: number; y: number }[]>>} setPoints - Функция для обновления состояния точек.
 * @param {Dispatch<SetStateAction<Line | null>>} setTempLine - Функция для обновления состояния временной линии.
 * @param {Dispatch<SetStateAction<boolean>>} setHasFinishedDrawing - Функция для обновления состояния завершения отрисовки.
 * @param {Dispatch<SetStateAction<Rect[]>>} setSquares - Функция для обновления состояния квадратов.
 * @param {Dispatch<SetStateAction<FabricText | null>>} setText - Функция для обновления состояния текста.
 * @param {Canvas} canvas - Объект канваса Fabric.
 * @param {Dispatch<SetStateAction<boolean>>} setIsDrawing - Функция для обновления состояния активного отрисовки.
 * @returns {Function} Обработчик клика по холсту.
 */
export const handleCanvasClick =
  (
    isDrawing: boolean,
    points: { x: number; y: number }[],
    tempLine: Line | null,
    setPoints: Dispatch<SetStateAction<{ x: number; y: number }[]>>,
    setTempLine: Dispatch<SetStateAction<Line | null>>,
    setHasFinishedDrawing: Dispatch<SetStateAction<boolean>>,
    setSquares: Dispatch<SetStateAction<Rect[]>>,
    setText: Dispatch<SetStateAction<FabricText | null>>,
    setIsDrawing: Dispatch<SetStateAction<boolean>>,
    canvas: Canvas,
  ): ((e: TEvent) => void) =>
  (e: TEvent) => {
    if (!isDrawing) return;

    const pointer = canvas.getViewportPoint(e.e);
    const newPoint = { x: pointer.x, y: pointer.y };

    if (points.length > 0) {
      const snappedPoint = points.find(
        (p) => Math.abs(newPoint.x - p.x) < 8 && Math.abs(newPoint.y - p.y) < 8,
      );
      if (snappedPoint) {
        newPoint.x = snappedPoint.x;
        newPoint.y = snappedPoint.y;
      }

      const distanceToFirst = Math.sqrt(
        (newPoint.x - points[0].x) ** 2 + (newPoint.y - points[0].y) ** 2,
      );
      if (distanceToFirst < 8) {
        setPoints((prevPoints) => {
          const newPoints = [...prevPoints, prevPoints[0]];
          drawPolygon(canvas, newPoints, setSquares, setText);
          setIsDrawing(false); // Завершение отрисовки
          if (tempLine) {
            canvas.remove(tempLine); // Удаление временной линии
            setTempLine(null); // Сброс временной линии
          }
          return newPoints;
        });
        return;
      }

      const line = new Line(
        [
          points[points.length - 1].x,
          points[points.length - 1].y,
          newPoint.x,
          newPoint.y,
        ],
        { stroke: 'blue', selectable: false },
      );
      canvas.add(line);
    }

    setPoints((prevPoints) => {
      const newPoints = [...prevPoints, newPoint];

      const square = new Rect({
        left: newPoint.x - 5,
        top: newPoint.y - 5,
        width: 10,
        height: 10,
        fill: 'purple',
        stroke: 'black',
        strokeWidth: 1,
        selectable: false,
      });

      canvas.add(square);
      setSquares((prevSquares) => [...prevSquares, square]);

      return newPoints;
    });
  };

/**
 * Обрабатывает движение мыши по холсту и обновляет временную линию.
 *
 * @param {boolean} isDrawing - Флаг, указывающий, активно ли рисование.
 * @param {Array<{ x: number; y: number }>} points - Массив точек, представляющих текущие вершины многоугольника.
 * @param {Line | null} tempLine - Временная линия для отображения промежуточных этапов отрисовки.
 * @param {Dispatch<SetStateAction<Line | null>>} setTempLine - Функция для обновления состояния временной линии.
 * @param {Canvas} canvas - Объект канваса Fabric.
 * @returns {Function} Обработчик движения мыши по холсту.
 */
export const handleMouseMove =
  (
    isDrawing: boolean,
    points: { x: number; y: number }[],
    tempLine: Line | null,
    setTempLine: Dispatch<SetStateAction<Line | null>>,
    canvas: Canvas,
  ): ((e: TEvent) => void) =>
  (e: TEvent) => {
    if (!isDrawing || points.length === 0) return;

    const pointer = canvas.getViewportPoint(e.e);

    if (tempLine) {
      tempLine.set({
        x1: points[points.length - 1].x,
        y1: points[points.length - 1].y,
        x2: pointer.x,
        y2: pointer.y,
      });
      canvas.renderAll();
    } else {
      const lastPoint = points[points.length - 1];
      const newTempLine = new Line(
        [lastPoint.x, lastPoint.y, pointer.x, pointer.y],
        { stroke: 'red', selectable: false },
      );
      canvas.add(newTempLine);
      setTempLine(newTempLine);
    }
  };

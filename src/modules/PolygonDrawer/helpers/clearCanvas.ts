import { Dispatch, RefObject, SetStateAction } from 'react';
import { Canvas, FabricText, Line, Rect } from 'fabric';

/**
 * Очищает состояние канвас-поля и связанные состояния.
 *
 * Эта функция очищает холст, сбрасывает состояние точек, временной линии,
 * завершенного отрисовки, квадратов и текста.
 *
 * @param {RefObject<Canvas>} canvasRef - Ссылка на объект canvas-холста Fabric.js.
 * @param {Dispatch<SetStateAction<{ x: number; y: number }[]>>} setPoints - Функция для установки состояния точек многоугольника.
 * @param {Dispatch<SetStateAction<Line | null>>} setTempLine - Функция для установки состояния временной линии.
 * @param {Dispatch<SetStateAction<boolean>>} setHasFinishedDrawing - Функция для установки состояния завершения отрисовки.
 * @param {Dispatch<SetStateAction<Rect[]>>} setSquares - Функция для установки состояния квадратов на canvas-холсте.
 * @param {Dispatch<SetStateAction<FabricText | null>>} setText - Функция для установки состояния текста на canvas-холсте.
 */
const clearCanvas = (
  canvasRef: RefObject<Canvas>,
  setPoints: Dispatch<SetStateAction<{ x: number; y: number }[]>>,
  setTempLine: Dispatch<SetStateAction<Line | null>>,
  setHasFinishedDrawing: Dispatch<SetStateAction<boolean>>,
  setSquares: Dispatch<SetStateAction<Rect[]>>,
  setText: Dispatch<SetStateAction<FabricText | null>>,
) => {
  const canvas = canvasRef.current;
  if (canvas) {
    canvas.clear(); // Очистка холста
    setPoints([]); // Очистка состояния точек
    setTempLine(null); // Удаление временной линии
    setHasFinishedDrawing(false); // Сброс состояния завершения отрисовки

    // Очистка квадратов
    setSquares(prevSquares => {
      prevSquares.forEach(square => canvas.remove(square));
      return [];
    });

    // Очистка текста
    setText(prevText => {
      if (prevText) {
        canvas.remove(prevText);
        return null;
      }
      return null;
    });
  }
};

export default clearCanvas;

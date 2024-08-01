import { Dispatch, RefObject, SetStateAction } from 'react';
import { Canvas, FabricText, Line, Rect } from 'fabric';
import clearCanvas from './clearCanvas';

/**
 * Сбрасывает состояние отрисовки на холсте и устанавливает режим отрисовки.
 *
 * Эта функция очищает холст, сбрасывает состояние точек и временных линий, а также
 * управляет состоянием отрисовки и другими связанными состояниями.
 *
 * @param {RefObject<Canvas>} canvasRef - Ссылка на объект холста Fabric.js.
 * @param {Dispatch<SetStateAction<{ x: number; y: number }[]>>} setPoints - Функция для установки состояния точек многоугольника.
 * @param {Dispatch<SetStateAction<Line | null>>} setTempLine - Функция для установки состояния временной линии.
 * @param {Dispatch<SetStateAction<boolean>>} setHasFinishedDrawing - Функция для установки состояния завершения отрисовки.
 * @param {Dispatch<SetStateAction<Rect[]>>} setSquares - Функция для установки состояния квадратов на холсте.
 * @param {Dispatch<SetStateAction<FabricText | null>>} setText - Функция для установки состояния текста на холсте.
 * @param {Dispatch<SetStateAction<boolean>>} setIsDrawing - Функция для установки состояния режима отрисовки.
 * @param {boolean} shouldStartDrawing - Флаг, указывающий, следует ли начать рисование (true) или остановить его (false).
 */
const resetDrawingState = (
  canvasRef: RefObject<Canvas>,
  setPoints: Dispatch<SetStateAction<{ x: number; y: number }[]>>,
  setTempLine: Dispatch<SetStateAction<Line | null>>,
  setHasFinishedDrawing: Dispatch<SetStateAction<boolean>>,
  setSquares: Dispatch<SetStateAction<Rect[]>>,
  setText: Dispatch<SetStateAction<FabricText | null>>,
  setIsDrawing: Dispatch<SetStateAction<boolean>>,
  shouldStartDrawing: boolean,
) => {
  clearCanvas(
    canvasRef,
    setPoints,
    setTempLine,
    setHasFinishedDrawing,
    setSquares,
    setText,
  );
  setPoints([]); // Очистка точек перед началом нового отрисовки
  setIsDrawing(shouldStartDrawing);
};

export default resetDrawingState;

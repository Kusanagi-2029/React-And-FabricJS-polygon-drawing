import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Canvas, Line, Rect, FabricText } from 'fabric';
import styles from './PolygonDrawer.module.scss';
import useResizeCanvas from '../../hooks/resizeCanvas';
import {
  handleCanvasClick,
  handleMouseMove,
} from '../../helpers/handleCanvasEvents';
import resetDrawingState from '../../helpers/resetDrawingState';
import clearCanvas from '../../helpers/clearCanvas';
import ControlPanel from '../ControlPanel/ControlPanel';

/**
 * Компонент для отрисовки многоугольников на canvas-холсте.
 *
 * Этот компонент управляет состоянием отрисовки, добавляет и удаляет обработчики событий для отрисовки на canvas-холсте,
 * а также включает панель управления для запуска/остановки отрисовки и очистки canvas-холста.
 *
 * @component
 */
const PolygonDrawer: FC = () => {
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [tempLine, setTempLine] = useState<Line | null>(null);
  const [, setHasFinishedDrawing] = useState<boolean>(false);
  const [, setSquares] = useState<Rect[]>([]);
  const [, setText] = useState<FabricText | null>(null);
  const [canvasWidth, setCanvasWidth] = useState<number>(
    window.innerWidth * 0.8,
  );
  const [canvasHeight, setCanvasHeight] = useState<number>(
    window.innerHeight * 0.8,
  );
  const canvasRef = useRef<Canvas | null>(null);

  /**
   * Эффект для инициализации и очистки canvas-холста.
   * Создаёт новый экземпляр `Canvas` и устанавливает ширину и высоту.
   * Очистка удаляет экземпляр `Canvas` при размонтировании компонента.
   */
  useEffect(() => {
    canvasRef.current = new Canvas('canvas', {
      isDrawingMode: false,
      width: canvasWidth,
      height: canvasHeight,
    });

    return () => {
      canvasRef.current?.dispose();
    };
  }, [canvasWidth, canvasHeight]);

  /**
   * Хук для обработки изменения размеров окна и изменения размеров canvas-холста.
   */
  useResizeCanvas(setCanvasWidth, setCanvasHeight);

  /**
   * Колбэк для обработки клика по canvas-холсту.
   * Создаётся с использованием `useCallback` для предотвращения лишних перерисовок.
   */
  const handleCanvasClickCallback = useCallback(
    handleCanvasClick(
      isDrawing,
      points,
      tempLine,
      setPoints,
      setTempLine,
      setHasFinishedDrawing,
      setSquares,
      setText,
      setIsDrawing,
      canvasRef.current!,
    ),
    [
      isDrawing,
      points,
      tempLine,
      setPoints,
      setTempLine,
      setHasFinishedDrawing,
      setSquares,
      setText,
      setIsDrawing,
      canvasRef.current,
    ],
  );

  /**
   * Колбэк для обработки движения мыши по canvas-холсту.
   * Создаётся с использованием `useCallback` для предотвращения лишних перерисовок.
   */
  const handleMouseMoveCallback = useCallback(
    handleMouseMove(
      isDrawing,
      points,
      tempLine,
      setTempLine,
      canvasRef.current!,
    ),
    [isDrawing, points, tempLine, setTempLine, canvasRef.current],
  );

  /**
   * Эффект для установки и удаления обработчиков событий на canvas-холсте.
   * Добавляет обработчики событий `mouse:down` и `mouse:move` при монтировании,
   * удаляет их при размонтировании компонента.
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.on('mouse:down', handleCanvasClickCallback);
      canvas.on('mouse:move', handleMouseMoveCallback);
      return () => {
        canvas.off('mouse:down', handleCanvasClickCallback);
        canvas.off('mouse:move', handleMouseMoveCallback);
      };
    }
  }, [handleCanvasClickCallback, handleMouseMoveCallback]);

  /**
   * Обработчик клика на кнопку "Начать/Стоп".
   * Переключает режим отрисовки и сбрасывает состояние холста при необходимости.
   */
  const handleStartStopClick = () => {
    resetDrawingState(
      canvasRef,
      setPoints,
      setTempLine,
      setHasFinishedDrawing,
      setSquares,
      setText,
      setIsDrawing,
      !isDrawing,
    );
  };

  /**
   * Обработчик клика на кнопку "Очистить".
   * Очищает холст и сбрасывает состояние отрисовки.
   */
  const handleClearClick = () => {
    clearCanvas(
      canvasRef,
      setPoints,
      setTempLine,
      setHasFinishedDrawing,
      setSquares,
      setText,
    );
  };

  return (
    <div>
      <ControlPanel
        isDrawing={isDrawing}
        onStartStopClick={handleStartStopClick}
        onClearClick={handleClearClick}
      />
      <canvas
        id="canvas"
        className={styles.canvas}
        width={canvasWidth}
        height={canvasHeight}
      />
    </div>
  );
};

export default PolygonDrawer;

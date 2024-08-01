import { useEffect } from 'react';

/**
 * Хук для обработки изменения размера окна и обновления размеров холста.
 *
 * @param {React.Dispatch<React.SetStateAction<number>>} setCanvasWidth - Функция для обновления ширины холста.
 * @param {React.Dispatch<React.SetStateAction<number>>} setCanvasHeight - Функция для обновления высоты холста.
 */
const useResizeCanvas = (
  setCanvasWidth: React.Dispatch<React.SetStateAction<number>>,
  setCanvasHeight: React.Dispatch<React.SetStateAction<number>>,
) => {
  useEffect(() => {
    const handleResize = () => {
      setCanvasWidth(window.innerWidth * 0.8); // 80% от ширины окна
      setCanvasHeight(window.innerHeight * 0.8); // 80% от высоты окна
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Устанавливаем размеры при инициализации

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setCanvasWidth, setCanvasHeight]);
};
export default useResizeCanvas;

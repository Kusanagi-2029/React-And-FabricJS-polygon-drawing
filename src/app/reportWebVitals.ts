import { ReportHandler } from 'web-vitals';

/**
 * Функция для сбора и отчета о показателях производительности веб-страницы.
 *
 * @param {ReportHandler} [onPerfEntry] - Функция обратного вызова для обработки данных производительности.
 * Если предоставлена, будет вызвана для каждого показателя (CLS, FID, FCP, LCP, TTFB).
 *
 * Функция динамически импортирует модуль `web-vitals` и вызывает его методы для сбора данных
 * о производительности страницы. Если `onPerfEntry` не предоставлен или не является функцией,
 * данные о производительности не будут собраны.
 *
 * @example
 * // Пример использования функции `reportWebVitals`
 * reportWebVitals((metric) => {
 *   console.log(metric);
 * });
 *
 * @returns {void} Эта функция не возвращает значения.
 *
 * @see {@link https://web.dev/vitals/} Документация по веб-показателям.
 */
const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

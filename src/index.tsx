import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import reportWebVitals from './app/reportWebVitals';

/**
 * Создаёт корневой элемент для React и отображает компонент `App` в этом элементе.
 *
 * @function
 * @returns {void}
 */
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

/**
 * Отображает компонент `App` в корневом элементе.
 *
 * Использует `React.StrictMode` для активации дополнительных проверок и предупреждений.
 *
 * @function
 * @returns {void}
 */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

/**
 * Отчёт о веб-показателях производительности приложения.
 *
 * Вызывается функция `reportWebVitals` для сбора и отправки данных о производительности.
 *
 * @function
 * @returns {void}
 */
reportWebVitals();

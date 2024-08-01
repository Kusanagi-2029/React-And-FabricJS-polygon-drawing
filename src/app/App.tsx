/**
 * Компонент `App` — главный компонент приложения, который отображает заголовок и компонент `PolygonDrawer`.
 *
 * @component
 * @example
 * // Пример использования компонента `App`
 * <App />
 *
 * @returns {JSX.Element} Разметка компонента `App`, включающая заголовок и компонент `PolygonDrawer`.
 *
 * @see {@link PolygonDrawer} Компонент для отрисовки многоугольников.
 */
import React from 'react';
import PolygonDrawer from '../modules/PolygonDrawer';
import styles from './App.module.scss';

const App = () => (
  <div className={styles.app}>
    <h2 className={styles.title}>Рисование многоугольника</h2>
    <PolygonDrawer />
  </div>
);

export default App;

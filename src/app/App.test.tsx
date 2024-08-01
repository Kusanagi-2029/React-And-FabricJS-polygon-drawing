import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
/**
 * Мокируем компонент PolygonDrawer.
 * Это позволяет изолировать тестирование компонента App
 * и избежать фактического рендеринга PolygonDrawer.
 */
jest.mock('../modules/PolygonDrawer', () => () => (
  <div>PolygonDrawer Mock</div>
));

describe('Компонент App', () => {
  /**
   * Проверяем, что компонент App рендерится корректно.
   * Убедимся, что заголовок отображается и компонент PolygonDrawer присутствует.
   */
  test('рендерит компонент App корректно', () => {
    // Рендерим компонент App
    render(<App />);

    // Проверяем, что заголовок "Рисование многоугольника" отображается
    expect(screen.getByText('Рисование многоугольника')).toBeInTheDocument();

    // Проверяем, что компонент PolygonDrawer отображается (проверка мока)
    expect(screen.getByText('PolygonDrawer Mock')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ControlPanel from '../components/ControlPanel/ControlPanel';

// Мокаем компонент ControlButton
jest.mock('../../../shared/ui/ControlButton/ControlButton', () => ({
  __esModule: true,
  default: ({
    label,
    color,
    onClick,
  }: {
    label: string;
    color: string;
    onClick: () => void;
  }) => (
    <button
      data-testid={`control-button-${label}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {label}
    </button>
  ),
}));

describe('ControlPanel Component', () => {
  // Проверка рендеринга кнопок
  test('renders ControlButton with correct labels and colors', () => {
    const mockStartStopClick = jest.fn();
    const mockClearClick = jest.fn();

    // Рендеринг компонента с isDrawing = false
    render(
      <ControlPanel
        isDrawing={false}
        onStartStopClick={mockStartStopClick}
        onClearClick={mockClearClick}
      />,
    );

    // Проверка наличия кнопок
    expect(screen.getByTestId('control-button-Начать')).toBeInTheDocument();
    expect(screen.getByTestId('control-button-Очистить')).toBeInTheDocument();

    // Проверка цветов кнопок
    expect(screen.getByTestId('control-button-Начать')).toHaveStyle({
      backgroundColor: 'primary',
    });
    expect(screen.getByTestId('control-button-Очистить')).toHaveStyle({
      backgroundColor: 'secondary',
    });
  });

  // Проверка обработчиков кликов
  test('calls onStartStopClick and onClearClick when buttons are clicked', () => {
    const mockStartStopClick = jest.fn();
    const mockClearClick = jest.fn();

    // Рендеринг компонента с isDrawing = true
    render(
      <ControlPanel
        isDrawing={true}
        onStartStopClick={mockStartStopClick}
        onClearClick={mockClearClick}
      />,
    );

    // Клик по кнопке "Стоп"
    fireEvent.click(screen.getByTestId('control-button-Стоп'));
    expect(mockStartStopClick).toHaveBeenCalledTimes(1);

    // Клик по кнопке "Очистить"
    fireEvent.click(screen.getByTestId('control-button-Очистить'));
    expect(mockClearClick).toHaveBeenCalledTimes(1);
  });

  // Проверка изменения состояния кнопок при изменении props
  test('changes button label and color based on isDrawing prop', () => {
    const mockStartStopClick = jest.fn();
    const mockClearClick = jest.fn();

    // Рендеринг компонента с isDrawing = false
    const { rerender } = render(
      <ControlPanel
        isDrawing={false}
        onStartStopClick={mockStartStopClick}
        onClearClick={mockClearClick}
      />,
    );

    expect(screen.getByTestId('control-button-Начать')).toBeInTheDocument();
    expect(screen.getByTestId('control-button-Начать')).toHaveStyle({
      backgroundColor: 'primary',
    });

    // Рендеринг компонента с isDrawing = true
    rerender(
      <ControlPanel
        isDrawing={true}
        onStartStopClick={mockStartStopClick}
        onClearClick={mockClearClick}
      />,
    );

    expect(screen.getByTestId('control-button-Стоп')).toBeInTheDocument();
    expect(screen.getByTestId('control-button-Стоп')).toHaveStyle({
      backgroundColor: 'error',
    });
  });
});

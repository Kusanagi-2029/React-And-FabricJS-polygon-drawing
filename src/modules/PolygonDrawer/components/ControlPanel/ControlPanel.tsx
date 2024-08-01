import React from 'react';
import { Box } from '@mui/material';
import ControlButton from '../../../../shared/ui/ControlButton/ControlButton';

interface ControlPanelProps {
  /**
   * Флаг, указывающий, находится ли приложение в режиме отрисовки.
   */
  isDrawing: boolean;
  /**
   * Функция обратного вызова, вызываемая при клике на кнопку "Начать/Стоп".
   */
  onStartStopClick: () => void;
  /**
   * Функция обратного вызова, вызываемая при клике на кнопку "Очистить".
   */
  onClearClick: () => void;
}

/**
 * Панель управления, предоставляющая кнопки для управления режимом отрисовки и очистки.
 *
 * @param {ControlPanelProps} props - Пропсы компонента `ControlPanel`.
 * @returns {JSX.Element} Компонент, отображающий кнопки для начала/остановки отрисовки и очистки.
 */
const ControlPanel = ({
  isDrawing,
  onStartStopClick,
  onClearClick,
}: ControlPanelProps): JSX.Element => (
  <Box>
    <ControlButton
      label={isDrawing ? 'Стоп' : 'Начать'}
      color={isDrawing ? 'error' : 'primary'}
      onClick={onStartStopClick}
    />
    <ControlButton label="Очистить" color="secondary" onClick={onClearClick} />
  </Box>
);

export default ControlPanel;

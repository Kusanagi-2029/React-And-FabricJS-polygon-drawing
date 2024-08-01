import React, { FC } from 'react';
import { Button } from '@mui/material';

interface ControlButtonProps {
  label: string;
  color: 'primary' | 'error' | 'secondary';
  onClick: () => void;
}

/**
 * Компонент кнопки управления с заданным текстом, цветом и обработчиком клика.
 *
 * @component
 */
const ControlButton: FC<ControlButtonProps> = ({ label, color, onClick }) => (
  <Button
    variant="contained"
    color={color}
    onClick={onClick}
    sx={{ marginRight: 2 }}
  >
    {label}
  </Button>
);

export default ControlButton;

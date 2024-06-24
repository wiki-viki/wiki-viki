import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

interface ToastStyleProps {
  type?: 'check' | 'error' | 'notification';
}

export const StyledToastContainer = styled(ToastContainer)<ToastStyleProps>`
  margin-top: 60px;
  .Toastify__toast {
    border-radius: 10px;
    padding: 8px 12px;
    font-size: 14px;
    line-height: 24px;
    margin: 10px;
  }
  .Toastify__toast--info {
    background-color: #f7f7fa;
    border: 1px solid #474d66;
    min-width: 350px;
  }
  .Toastify__toast--success {
    background-color: #eef9f6;
    border: 1px solid #32a68a;
    font-weight: bold;
    color: #32a68a;
  }
  .Toastify__toast--error {
    background-color: #fbeded;
    border: 1px solid #d14343;
    font-weight: bold;
    color: #d14343;
    min-width: 384px;
  }
`;

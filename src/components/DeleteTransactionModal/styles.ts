import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${(props) => props.theme['gray-800']};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 769px) {
    min-width: 100%;
    padding: 1.5rem;
    top: auto;
    left: 0;
    transform: none;
    bottom: 0;
    border-radius: 20px 20px 0 0;

    h2 {
      font-size: 1.25rem;
    }
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 1.25rem;
`
export const CancelButton = styled.button`
  height: 50px;
  border: 0;
  background: ${(props) => props.theme['gray-600']};
  color: ${(props) => props.theme['gray-300']};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme['gray-700']};
    transition: background-color 0.2s;
  }
`

export const DeleteButton = styled.button`
  height: 50px;
  border: 0;
  background: ${(props) => props.theme['red-500']};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme['red-700']};
    transition: background-color 0.2s;
  }
`

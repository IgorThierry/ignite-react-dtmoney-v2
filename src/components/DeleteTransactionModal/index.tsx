import * as Dialog from '@radix-ui/react-dialog'

import {
  ButtonsContainer,
  CancelButton,
  Content,
  DeleteButton,
  Overlay,
} from './styles'

interface DeleteTransactionModalProps {
  isOpen: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function DeleteTransactionModal({
  isOpen,
  onConfirm,
  onCancel,
}: DeleteTransactionModalProps) {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Overlay />

        <Content>
          <Dialog.Title>
            Tem certeza que deseja deletar essa transação?
          </Dialog.Title>

          <ButtonsContainer>
            <CancelButton type="button" onClick={onCancel}>
              Cancelar
            </CancelButton>
            <DeleteButton type="button" onClick={onConfirm}>
              Deletar
            </DeleteButton>
          </ButtonsContainer>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

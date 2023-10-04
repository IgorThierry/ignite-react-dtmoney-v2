import {
  HeaderContainer,
  HeaderContent,
  LogoutButton,
  NewTransactionButton,
} from './styles'
import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'
import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react'

export function Header() {
  const [open, setOpen] = useState(false)
  const { signOutApp } = useAuth()

  function handleLogout() {
    signOutApp()
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <div style={{ display: 'flex', gap: '8px' }}>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <NewTransactionButton>Nova transação</NewTransactionButton>
            </Dialog.Trigger>

            <NewTransactionModal setOpen={setOpen} />
          </Dialog.Root>
          <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
        </div>
      </HeaderContent>
    </HeaderContainer>
  )
}

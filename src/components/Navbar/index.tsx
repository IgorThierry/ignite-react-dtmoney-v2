import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Center,
} from '@chakra-ui/react'

import logoImg from '../../assets/logo.svg'
import { useAuth } from '../../contexts/AuthContext'

export function Navbar() {
  const { signOutApp, user } = useAuth()

  function handleLogout() {
    signOutApp()
  }

  return (
    <>
      <Box bg="gray.900" px={4} shadow="sm">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <img src={logoImg} alt="Logo" />
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar size={'sm'} name={user.name} />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar size={'2xl'} name={user.name} />
                  </Center>
                  <br />
                  <Flex direction="column" align="center" gap="2">
                    <span>{user.name}</span>
                    <span>{user.email}</span>
                  </Flex>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

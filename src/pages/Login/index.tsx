import { useForm } from 'react-hook-form'

import * as z from 'zod'

import loginCoverImage from '../../assets/login-cover.jpg'
import { useAuth } from '../../contexts/AuthContext'
import { Flex, Heading, Input, Image, Button } from '@chakra-ui/react'

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type LoginFormInputs = z.infer<typeof loginFormSchema>

export function Login() {
  const { signIn } = useAuth()

  function handleLogin(data: LoginFormInputs) {
    try {
      signIn(data)
    } catch (error) {
      console.log(error)
    }
  }

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<LoginFormInputs>()

  return (
    <Flex h="100vh">
      <Flex
        display={{ base: 'none', xl: 'flex' }}
        w="100%"
        flexGrow={1}
        position="relative"
      >
        <Image
          height="100%"
          width="100%"
          objectFit="cover"
          src={loginCoverImage}
          alt="dt money"
        />
      </Flex>
      <Flex
        w="100%"
        maxW={{ base: '100%', xl: '33%' }}
        minH="100%"
        align="center"
        justify="center"
        flexDir="column"
      >
        <Flex
          as="form"
          w={{ base: '100%', md: '90%', xl: '90%' }}
          p="10"
          flexDir="column"
          onSubmit={handleSubmit(handleLogin)}
          gap="4"
        >
          <Heading textAlign="center" textTransform="uppercase" size="md">
            Acesse sua conta
          </Heading>
          <Input
            type="email"
            placeholder="E-mail"
            required
            {...register('email')}
          />
          <Input
            type="password"
            placeholder="Senha"
            required
            {...register('password')}
          />

          <Button w="100%" type="submit" isLoading={isSubmitting}>
            Entrar
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

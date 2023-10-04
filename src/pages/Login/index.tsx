import { useForm } from 'react-hook-form'
import {
  Container,
  Form,
  FormWrapper,
  Image,
  ImageWrapper,
  Title,
} from './styles'
import * as z from 'zod'

import logoImg from '../../../.github/cover.png'
import { useAuth } from '../../contexts/AuthContext'

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
    <Container>
      <ImageWrapper>
        <Image src={logoImg} alt="dt money" />
      </ImageWrapper>
      <FormWrapper>
        <Form onSubmit={handleSubmit(handleLogin)}>
          <Title>Acesse sua conta</Title>
          <input
            type="email"
            placeholder="E-mail"
            required
            {...register('email')}
          />
          <input
            type="password"
            placeholder="Senha"
            required
            {...register('password')}
          />

          <button type="submit" disabled={isSubmitting}>
            Entrar
          </button>
        </Form>
      </FormWrapper>
    </Container>
  )
}

import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;

  display: flex;
`
export const ImageWrapper = styled.div`
  display: none;
  width: 100%;
  flex-grow: 1;
  position: relative;

  @media screen and (min-width: 80em) {
    display: flex;
  }
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const FormWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 100%;
  min-height: 100%;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* margin: 0 auto; */

  @media screen and (min-width: 80em) {
    max-width: 33%;
  }
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2.5rem;
  gap: 1rem;

  @media screen and (min-width: 48em) {
    max-width: 90%;
  }

  input {
    border-radius: 6px;
    border: 0;
    background: ${(props) => props.theme['gray-900']};
    color: ${(props) => props.theme['gray-300']};
    padding: 1rem;

    &::placeholder {
      color: ${(props) => props.theme['gray-500']};
    }
  }

  button[type='submit'] {
    height: 50px;
    border: 0;
    background: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme.white};
    font-weight: bold;
    padding: 0 1.25rem;
    border-radius: 6px;
    /*   margin-top: 1rem; */
    cursor: pointer;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: ${(props) => props.theme['green-700']};
      transition: background-color 0.2s;
    }
  }
`
export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme['green-300']};

  text-transform: uppercase;
  text-align: center;
  margin-bottom: 1rem;
`

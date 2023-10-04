import { useContextSelector } from 'use-context-selector'
import { GlobalLoadingContext } from '../../contexts/GlobalLoading'
import { Message, Overlay, Spinner } from './styles'

export function GlobalLoading() {
  const { show, msg } = useContextSelector(GlobalLoadingContext, (context) => {
    return {
      show: context.show,
      msg: context.msg,
    }
  })

  if (!show) {
    return null
  }

  return (
    <Overlay>
      <Spinner />
      {msg && <Message>{msg}</Message>}
    </Overlay>
  )
}

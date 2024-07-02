import ButtonAdd from './ButtonAdd'
import CardRemoveButton from './CardRemoveButton'

function ButtonAddRemove (props) {
  const { isAdded } = props

  if (isAdded) {
    return <CardRemoveButton {...props} />
  } else {
    return <ButtonAdd {...props} />
  }
}

export default ButtonAddRemove

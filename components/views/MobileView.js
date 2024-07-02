import StyledAlert from '../misc/StyledAlert'

function MobileView () {
  return (
    <StyledAlert severity='info'>
      Mobile devices are<strong> not yet supported</strong>.<br />
      Please try landscape mode or a device with a larger screen.
    </StyledAlert>
  )
}

export default MobileView

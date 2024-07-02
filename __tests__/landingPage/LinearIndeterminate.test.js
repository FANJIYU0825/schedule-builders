import { render } from '@testing-library/react'
import LinearIndeterminate from '../../components/landingPage/navbarComponents/LinearIndeterminate'

test('Renders LinearIndeterminate component', () => {
  const { getByRole, container } = render(<LinearIndeterminate />)

  // Assert that the LinearProgress component is present
  const linearProgress = getByRole('progressbar')
  expect(linearProgress).toBeInTheDocument()

  // Assert that the LinearProgress component has the correct styles applied
  const box = container.firstChild
  expect(box).toHaveStyle('width: 100%;')
})

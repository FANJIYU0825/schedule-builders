import { render, screen } from '@testing-library/react'
import Footer from '../../components/landingPage/Footer'

describe('Footer tests', () => {
  test('Cookie Policy is rendered in footer', () => {
    render(<Footer />)
    const text = screen.getByText('Cookie Policy')
    expect(text).toBeInTheDocument()
  })
  test('Render and style of footer', () => {
    const { getByRole, container } = render(<Footer />)
    const footer = getByRole('navigation')
    expect(footer).toBeInTheDocument()

    const appBar = container.firstChild
    expect(appBar).toHaveStyle('height: 75px; backgroundColor: #FFFFFF;')
  })
})

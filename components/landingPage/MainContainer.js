import MainArea from './MainArea'
import styles from '../../styles/LandingPage.module.css'
import Footer from './Footer'
import Navbar from './navbarComponents/Navbar'
import { useState } from 'react'
import { useStepper } from '../../utils/hooks'

/**
 * @description Component that implements the container for the landing page. It has the purpose of setting a structure
 * of the different sections of the landing page.
 *
*/

function MainContainer () {
  const [loadingPage, setLoadingPage] = useState(false)
  const [state, dispatch] = useStepper()
  return (
    <>
      <div className={styles.sigill}>
        <img src='/images/sigill.png' />
      </div>
      <Navbar
        setLoadingPage={setLoadingPage}
        loadingPage={loadingPage}
        dispatch={dispatch}
      />
      <MainArea
        positionindex={state.index}
        dispatch={dispatch}
        setLoadingPage={setLoadingPage}
      />
      <Footer />
    </>
  )
}

export default MainContainer

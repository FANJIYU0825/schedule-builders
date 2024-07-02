import styles from '../../styles/LandingPage.module.css'
import { forwardRef } from 'react'
import Fade from '@mui/material/Fade'

/**
 * @description Component that implements the container for the picture area of the landing page.
 * It has the purpose to render the picture in the correct area of the screen depending on
 * if the user has started the tutorial or not. forwardRef call is needed to handle the transition animations.
 *
 * @param {int} positionindex Index of the current step in the tutorial stepper
*/

const PictureArea = forwardRef((props, ref) => {
  return (
    <div className={styles.pictureArea} ref={ref} {...props}>
      {!props.positionindex
        ? <img
            style={props.positionindex ? { left: '75px', opacity: 0.85 } : { right: '75px' }}
            src='/images/students.jpeg'
          />
        : <Fade in unmountOnExit mountOnEnter>
          <img
            style={props.positionindex ? { left: '75px', opacity: 0.85 } : { right: '75px' }}
            src='/images/students.jpeg'
          />
          </Fade>}

    </div>
  )
})

export default PictureArea

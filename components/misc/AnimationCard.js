import { motion, usePresence } from 'framer-motion'

const transition = { type: 'spring', stiffness: 500, damping: 50, mass: 1 }

/**
 * @description Animation component that runs animations on cards when they are added or removed.
 *
 * @param children - The children of the component, which are the cards.
 *
*/
function AnimationCard ({ children }) {
  const [isPresent, safeToRemove] = usePresence()

  const animations = {
    layout: true,
    initial: 'out',
    style: {
      position: isPresent ? 'static' : 'absolute'
    },
    animate: isPresent ? 'in' : 'out',
    variants: {
      in: { scaleY: 1, opacity: 1 },
      out: { scaleY: 0, opacity: 0, zIndex: -1 }
    },
    onAnimationComplete: () => !isPresent && safeToRemove(),
    transition
  }

  return (
    <motion.div
      {...animations}
    >
      {children}
    </motion.div>
  )
}

export default AnimationCard

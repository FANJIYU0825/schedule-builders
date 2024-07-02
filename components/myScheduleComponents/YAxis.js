import styles from '../../styles/Schedule.module.css'

/**
 * @description The y-axis title.
 *
 * @param {string} axisTitle - The title of the axis.
 *
*/
function YAxis ({ axisTitle }) {
  return (
    <p className={styles.yAxisName}>
      {axisTitle}
    </p>
  )
}

export default YAxis

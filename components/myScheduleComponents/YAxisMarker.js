import styles from '../../styles/Schedule.module.css'

function YAxisMarker ({ value }) {
  return (
    <div style={{ position: 'absolute', bottom: value + '%' }}>
      <p className={styles.studyPaceMarker}>
        {value + '%'}
      </p>
    </div>
  )
}

export default YAxisMarker

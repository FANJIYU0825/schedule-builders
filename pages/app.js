import Head from 'next/head'
import styles from '../styles/Home.module.css'
import MobileView from '../components/views/MobileView'
import { useState, useEffect } from 'react'
import { useWindowSize } from '../utils/hooks'
import DesktopView from '../components/views/DesktopView'
import { AppProvider } from '../components/contexts/AppContext'
import SemesterModal from '../components/misc/SemesterModal'

export default function App () {
  const [loadingViewPort, setLoadingViewPort] = useState(true)
  const [courses, setCourses] = useState([])
  // Actual committed semester and location states
  const [semester, setSemester] = useState('autumn')
  const [location, setLocation] = useState('uppsala')
  const [semesterModalOpen, setSemesterModalOpen] = useState(true)

  // Selected location/semester states holds the clicked radio button and is therefore different to the actual semester/location state
  const [selectedSemester, setSelectedSemester] = useState('autumn')
  const [selectedLocation, setSelectedLocation] = useState('uppsala')
  const [fetchError, setFetchError] = useState(false)

  const windowSize = useWindowSize()
  // This can be changed when it is known how much space is needed
  const isMobile = windowSize.width <= 1020

  useEffect(() => {
    setLoadingViewPort(false)
  }, [])

  const handleSave = async () => {
    async function getData () {
      const res = await fetch(`/api/courses/?semester=${selectedSemester}&location=${selectedLocation}`, {
        method: 'GET',
        cache: 'no-store'
      })
      const data = await res.json()
      return data
    }
    try {
      // Sync with external local storage system
      setSemester(selectedSemester)
      setLocation(selectedLocation)
      const data = await getData()
      setCourses(data)
      setFetchError(false)
    } catch (error) {
      console.error(error)
      setFetchError(true)
    }
  }

  const handleOpenSemesterModal = () => {
    setSemesterModalOpen(true)
  }

  return (
    <div>
      <Head>
        <title>Schedule Builder - App</title>
        <meta name='description' />
        <link rel='icon' href='/header_icon.svg' />
      </Head>
      {loadingViewPort
        ? ''
        : isMobile
          ? <main className={styles.mobile}>
            <MobileView />
          </main>
          : <main className={styles.main}>
            <AppProvider courses={courses} semester={semester} location={location}>
              {courses.length > 0 &&
                <DesktopView
                  handleOpenSemesterModal={handleOpenSemesterModal}
                  semester={semester}
                  location={location}
                  fetchError={fetchError}
                />}
              <SemesterModal
                handleSave={handleSave}
                setSelectedSemester={setSelectedSemester}
                setSelectedLocation={setSelectedLocation}
                selectedSemester={selectedSemester}
                selectedLocation={selectedLocation}
                setOpen={setSemesterModalOpen}
                open={semesterModalOpen}
              />
            </AppProvider>
          </main>}
    </div>
  )
}

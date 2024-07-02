import Panel from '../panelComponents/Panel'
import CourseScrollAreaExplorer from './CourseScrollAreaExplorer'
import FilterControls from '../filterSearchComponents/FilterControls'
import { useEffect, useState } from 'react'
import { useCourses, useFilters } from '../../utils/hooks'
import ErrorModal from '../misc/ErrorModal'

/**
 * @description The left panel component that contains the search and filter fields, as well as all the searched courses.
 *
 * @param handleOpenSemesterModal - Function that runs when the SemesterModal is opened
 * @param {boolean} fetchError - State variable for wether the fetch request was successful or not.
*/
function CourseExplorer ({ handleOpenSemesterModal, fetchError }) {
  const [{ courses, savedCourses }] = useCourses()
  const [filteredCourses, setFilteredCourses] = useState(courses)
  const [{ toggleSavedCourses }] = useFilters()

  useEffect(() => {
    setFilteredCourses(courses)
  }, [])

  return (
    <Panel>
      <FilterControls filteredCourses={filteredCourses} courses={toggleSavedCourses ? savedCourses : courses} amtSavedCourses={savedCourses.length} dispatchFilters={setFilteredCourses} handleOpenSemesterModal={handleOpenSemesterModal} />
      <ErrorModal />
      <CourseScrollAreaExplorer
        filteredCourses={filteredCourses}
        fetchError={fetchError}
        toggleSavedCourses={toggleSavedCourses}
      />
    </Panel>
  )
}

export default CourseExplorer

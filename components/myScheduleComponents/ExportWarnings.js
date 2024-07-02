import HeaderBox from './HeaderBox'
import PrerequisitePopoverList from '../misc/PrerequisitePopoverList'

/**
 * @description Component that renders warning popovers when exporting courses
 *              that have second cycle entry requirements or are remote.
 *
 * @param scheduledCourses A list of all courses of which to check prerequisites and location.
*/

export default function ExportWarnings ({ scheduledCourses }) {
  const entryRequirements = scheduledCourses.reduce((total, obj) => obj.period.includes('Second cycle') ? total + 1 : total, 0)
  const remote = scheduledCourses.reduce((total, obj) => obj.campus.includes('Flexible') ? total + 1 : total, 0)

  return (
    <>
      {entryRequirements !== 0
        ? (
          <HeaderBox warning elevation={1} show>
            <PrerequisitePopoverList
              courses={scheduledCourses}
              type='error'
            />
            &nbsp;
            <div>
              {entryRequirements}
            </div>
            &nbsp;Entry requirements
          </HeaderBox>
          )
        : <></>}

      {remote !== 0
        ? (
          <HeaderBox warning elevation={1} show>
            <PrerequisitePopoverList
              courses={scheduledCourses}
              type='remote'
            />
            &nbsp;
            <div>
              {remote}
            </div>
            &nbsp;Remote courses
          </HeaderBox>)
        : <></>}
    </>
  )
}

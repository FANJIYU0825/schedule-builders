import PrerequisitePopover from './PrerequisitePopover'

/**
 * @description Helper component to PrerequisitePopover and PrerequisitePopoverList.
 * This component renders text depending on the type of alert to be shown.
 *
 * @param {object} anchorEl - The anchor element for the popover.
 * @param {object} course - The course object.
 * @param {string} type - The type of alert to show.
 *
*/

function AlertInfo ({ anchorEl = null, course, type = 'prerequisites' }) {
  if (type === 'prerequisites') {
    return (
      <>
        {course.period.toLowerCase().includes('first cycle') && <PrerequisitePopover anchorEl={anchorEl} content={course.description} type='warning' />}
        {course.period.toLowerCase().includes('second cycle') && <PrerequisitePopover anchorEl={anchorEl} content={course.description} type='error' />}
        {course.period.toLowerCase().includes('general entry requirements') && <PrerequisitePopover anchorEl={anchorEl} content={course.description} type='info' />}
      </>
    )
  }
  if (type === 'remote') {
    return (
      <>
        {course.campus.toLowerCase().includes('flexible') ? <PrerequisitePopover anchorEl={anchorEl} content={course.description} type='remote' /> : null}
      </>
    )
  }
}

export default AlertInfo

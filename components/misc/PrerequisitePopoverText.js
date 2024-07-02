/**
 * @description Helper component to PrerequisitePopover and PrerequisitePopoverList.
 * This component renders text depending on the type of alert to be shown.
 *
 * @param type - The type of alert to show.
 *
*/

function PrerequisitePopoverText ({ type }) {
  switch (type) {
    case 'remote':
      return 'Remote Course'
    case 'warning':
      return 'First Cycle Entry Requirements'
    case 'error':
      return 'Second Cycle Entry Requirements'
    case 'info':
      return 'General Entry Requirements'
    default:
      return ''
  }
}

export default PrerequisitePopoverText

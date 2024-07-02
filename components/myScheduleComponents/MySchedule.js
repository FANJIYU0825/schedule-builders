import Panel from '../panelComponents/Panel'
import ScheduleContainer from './ScheduleContainer'
import ScheduleHeader from './ScheduleHeader'

/**
 * @description The my schedule panel component which is the right panel/column on the page.
 *
 * @param onHandlePanelResize - Function that toggles which panel that is expanded (left or right).
 * @param {boolean} isLeftExpanded - True if the left panel is expanded, false if the right panel is expanded.
 *
*/
function MySchedule () {
  return (
    <Panel>
      <ScheduleHeader />
      <ScheduleContainer />
    </Panel>

  )
}

export default MySchedule

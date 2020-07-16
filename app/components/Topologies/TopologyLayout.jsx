import AccordianWrapper from '../Shared/ExpandCollapse/AccordianWrapper'
import React, { useState, useEffect, useContext } from 'react'
import TopolgyRegisterationLayout from './TopolgyRegisterationLayout'

import { AppBarContext } from '../Base/Home'
import { getTopologyById } from '../../actions/TopologyActions'
import { isEmpty } from 'lodash'
import { useInterval } from '../../helper/useInterval'
import MetricsLayout from '../Graphs/DataProcessRateGraph'

// const MAX_POLL_COUNT = 200

export default function TopologyLayout ({ id }) {
  const { setAppTitle } = useContext(AppBarContext)
  const [topologyData, setTopologyData] = useState({})
  const [shouldPoll, setPolling] = useState(false)
  // const [sameStatus, setSameStatus] = useState(0)

  const shouldPollContinue = () => {
    // const inactiveStatus = ['TO_START', 'FINISHED', 'EDITED', 'STOPPED', 'ERROR', 'RUN_ERROR', 'INVALID']
    const inactiveStatus = ['FINISHED']
    const topologyInactive = inactiveStatus.indexOf(topologyData.topologyStatus) !== -1
    if (topologyInactive) return false
    return true
  }

  useEffect(() => {
    async function getTopologyData (id) {
      const res = await getTopologyById({ topologyId: id })
      setTopologyData(res)
      setAppTitle({ text: `TOPOLOGY: ${res.topologyId}` })
    }
    getTopologyData(id)
    id && setPolling(true)
  }, [])

  useInterval(async () => {
    if (!shouldPollContinue()) return
    const { topologyId } = topologyData
    const latestStatus = await getTopologyById({ topologyId })
    if (!isEmpty(latestStatus)) setTopologyData(latestStatus)
    // else setPolling(false)
    // if (latestStatus && topologyStatus === latestStatus.topologyStatus) setSameStatus(sameStatus + 1)
    // else setSameStatus(1)
    // if (sameStatus >= MAX_POLL_COUNT) { setPolling(false); setSameStatus(1) }
  }, shouldPoll ? 2000 : null)

  return (
    <div>

      <TopolgyRegisterationLayout
        propsName={topologyData.topologyId}
        propsSelectedPipelines={topologyData.topologyItems}
        propsTopologyData={topologyData}
        renderMetrics={() => {
          return (
            <AccordianWrapper
              title='View Metrics'
              renderChildrend={() => {
                return (
                  <MetricsLayout topologyData={topologyData.topologyItems} />
                )
              }}
            />
          )
        }}
      />
    </div>
  )
}

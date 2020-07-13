import 'regenerator-runtime/runtime.js'

import AppTitleBar from '../Base/AppTitleBar'
// import Chip from '@material-ui/core/Chip'
import React, { useState, useEffect } from 'react'
import TopolgyRegisterationLayout from './TopolgyRegisterationLayout'

import { getTopologyById } from '../../actions/TopologyActions'

export default function TopologyLayout ({ id }) {
  const [topologyData, setTopologyData] = useState({})

  useEffect(() => {
    async function getTopologyData (id) {
      const res = await getTopologyById({ topologyId: id })
      setTopologyData(res)
    }
    getTopologyData(id)
  }, [])

  return (
    <div>
      <AppTitleBar appTitle={`TOPOLOGY: ${topologyData.topologyId} ${id}`} />

      <TopolgyRegisterationLayout
        propsName={topologyData.topologyId}
        propsSelectedPipelines={topologyData.topologyItems}
      />
    </div>
  )
}

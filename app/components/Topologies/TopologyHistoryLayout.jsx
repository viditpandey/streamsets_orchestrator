import AccordianWrapper from '../Shared/ExpandCollapse/AccordianWrapper'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import MetricsLayout from '../Graphs/MetricsLayout'
import React, { useState, useEffect, useContext } from 'react'
import TopolgyRegisterationLayout from './TopolgyRegisterationLayout'

import { AppBarContext } from '../Base/Home'
import { CircularProgress, Typography } from '@material-ui/core'
import { getNumberOfRecordsProcessed } from '../../actions/MetricsActions'
import { getViewableDateTime } from '../../helper/commonHelper'
import { isEmpty } from 'lodash'
import { useParams } from 'react-router-dom'

export default function TopologyHistoryLayout ({ propsTopologyData, toggleHistoryView }) {
  const { setAppTitle } = useContext(AppBarContext)
  const { id } = useParams()

  const [topologyData, setTopologyData] = useState(propsTopologyData)

  const [fetchMetrics, setFetchMetrics] = useState(false)
  const [metricsData, setMetricsData] = useState([])

  useEffect(() => {
    setTopologyData(propsTopologyData)
    setAppTitle({ text: `${id} History (${topologyData.historyId})`, currentPage: 'TopologyHistoryLayout' })
    setFetchMetrics(true)
  }, [])

  useEffect(() => {
    if (fetchMetrics) {
      getProcessedRecordsNumber(topologyData)
      setFetchMetrics(false)
    }
  }, [fetchMetrics])

  async function getProcessedRecordsNumber (topologyData) {
    if (!fetchMetrics) return
    if ((topologyData.topologyStatus === 'FINISHED') && topologyData.topologyItems) {
      const allPipelineIDs = topologyData.topologyItems.map(p => ({ pipelineId: p.pipelineId, instanceId: p.instanceId }))
      const allPipelinesMetrics = allPipelineIDs.map(i => getNumberOfRecordsProcessed({ pipelineId: i.pipelineId, instanceId: i.instanceId }))
      const finalRes = await Promise.all(allPipelinesMetrics)
      setFetchMetrics(false)
      const updatedData = allPipelineIDs.map((pipelineId, index) => ({ name: pipelineId, res: finalRes[index] }))
      setMetricsData(updatedData)
    }
  }

  if (isEmpty(topologyData)) {
    return (
      <div>
        <CircularProgress />
        <Typography>Loading topology</Typography>
      </div>
    )
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Button
            className='margin-bottom-15 full-width'
            variant='contained'
            color='primary'
            size='small'
            onClick={() => toggleHistoryView(false)}
            startIcon={<ArrowBackIosIcon />}
          >
        Go Back
          </Button>
        </Grid>
      </Grid>

      <div className='margin-bottom-15' />

      <TopolgyRegisterationLayout
        propsName={id}
        propsSelectedPipelines={topologyData.topologyHistoryItems}
        // hideActionButtons
        propsTopologyData={{ ...topologyData, topologyId: topologyData.historyId }}
        setAutoRefresh={() => {}}
        startEndTime={collapsedText(topologyData)}
        renderMetrics={() => {
          return (
            <AccordianWrapper
              title='View Metrics'
              renderChildrend={() => {
                return (
                  <div className='padding-top-30'>
                    <MetricsLayout
                      topologyPipelinesData={topologyData.topologyHistoryItems}
                      metricsData={metricsData}
                    />
                  </div>
                )
              }}
            />
          )
        }}
      />
    </div>
  )
}

const collapsedText = historyItem => (
  <>
    {`start time: ${getViewableDateTime(historyItem.topologyStartTime)}`} <br />
    {`end time: ${getViewableDateTime(historyItem.topologyEndTime)}`} <br />
  </>
)

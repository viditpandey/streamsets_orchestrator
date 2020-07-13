import 'regenerator-runtime/runtime.js'

import AppTitleBar from '../Base/AppTitleBar'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Button from '@material-ui/core/Button'
// import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import React, { useState, useEffect } from 'react'

import { getTopologies } from '../../actions/TopologyActions'
import { isEmpty } from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}))

export default function TopologiesLayout () {
  const history = useHistory()

  const [topologies, setTopologies] = useState([])

  useEffect(() => {
    async function fetchTopologies () {
      const res = await getTopologies()
      setTopologies(res) // after this set status of checked pipelines to on, i.e, insert their pipelineId in checked var
    }
    fetchTopologies()
  }, [])

  const newTopology = (
    <Button
      onClick={() => history.push('/topologies/new')}
      variant='contained'
      color='primary'
      startIcon={<AddCircleIcon />}
    >
    new topology
    </Button>)

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AppTitleBar
            appTitle='TOPOLOGIES'
            renderSecondaryButton={newTopology}
          />
        </Grid>
        {isEmpty(topologies) ? null
          : <Topologies history={history} topologies={topologies} />}
      </Grid>
    </div>
  )
}

const Topologies = ({ topologies, history }) => {
  const classes = useStyles()
  return (
    <List className={classes.root}>
      {topologies.map(topologyDetails => {
        return (
          <Topology
            key={topologyDetails.topologyId}
            topology={topologyDetails}
            history={history}
          />
        )
      })}
    </List>
  )
}

const Topology = ({ topology, history }) => {
  const { topologyId, topologyItems } = topology
  const secondaryText = (
    <>
      {`pipelines: ${topologyItems.map(y => ' ' + y.pipelineId)}`}
    </>
  )
  return (
    <ListItem>
      <ListItemText
        id={topologyId}
        onClick={() => history.push(`/topologies/${topologyId}`)}
        primary={`${topologyId}`}
        secondary={secondaryText}
      />
    </ListItem>
  )
}

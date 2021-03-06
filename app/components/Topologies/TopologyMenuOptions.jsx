import Button from '@material-ui/core/Button'
import ConfigureTopologySchedule from './ConfigureTopologySchedule'
import DeleteIcon from '@material-ui/icons/Delete'
import Grid from '@material-ui/core/Grid'
import HistoryIcon from '@material-ui/icons/History'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff'
import NotificationsIcon from '@material-ui/icons/Notifications'
import React, { useState } from 'react'
import ScheduleIcon from '@material-ui/icons/Schedule'
import Switch from '@material-ui/core/Switch'

import { deleteTopology, toggleTopologyAlert } from '../../actions/TopologyActions'
import { Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'

export default function TopologyMenuOption ({ topologyData, autoRefresh, setAutoRefresh }) {
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const [anchorEl, setAnchorEl] = useState(null)
  const [openScheduler, setOpenScheduler] = useState(false)

  const handleClick = (event) => { setAnchorEl(event.currentTarget) }

  const handleClose = () => { setAnchorEl(null) }

  const deleteTopologyHandler = () => {
    deleteTopology({ topologyId: topologyData.topologyId })
      .then(() => { history.push(`/topologies/${topologyData.topologyId}/history`) })
      .catch(() => { enqueueSnackbar('Something went wring while deleting the topology', { variant: 'error' }) })
  }

  const toggleTopologyAlertHandler = () => {
    const { topologyId, topologyItems, alertStatus } = topologyData
    toggleTopologyAlert({ topologyId, topologyItems, alertStatus: !alertStatus })
      .then(() => { enqueueSnackbar('Topology alert updated', { variant: 'success' }) })
      .catch(() => { enqueueSnackbar('Something went wring while updating topology alerts.', { variant: 'error' }) })
  }

  return (
    <div>
      <ConfigureTopologySchedule
        open={openScheduler}
        setOpen={setOpenScheduler}
        topology={topologyData}
      />
      <Grid container spacing={3} justify='space-between'>
        <Grid id='set-page-autorefresh' item xs={12} md={9}>

          <Typography>{'Auto refresh topology status'}
            <Switch
              checked={autoRefresh}
              color='primary'
              onChange={e => {
                setAutoRefresh(!autoRefresh)
              }}
              name='topologyAutoRefreshStatus'
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </Typography>
        </Grid>
        <Grid id='topology-menu-options' item xs={12} md={3}>
          <Button
            className='float-right'
            aria-controls='simple-menu'
            aria-haspopup='true'
            onClick={handleClick}
          >
            Topology Options &nbsp; <MoreVertIcon />
          </Button>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => { history.push(`/topologies/${topologyData.topologyId}/history`) }}><HistoryIcon />&nbsp;History</MenuItem>
            <MenuItem onClick={() => { setOpenScheduler(true); handleClose() }}><ScheduleIcon />&nbsp;Schedule</MenuItem>
            <MenuItem onClick={() => { deleteTopologyHandler() }}><DeleteIcon />&nbsp;Delete</MenuItem>
            <MenuItem onClick={() => { toggleTopologyAlertHandler() }}>{topologyData.alertStatus ? <NotificationsIcon /> : <NotificationsOffIcon />}&nbsp;Toggle {topologyData.alertStatus ? 'off' : 'on'} topology alerts</MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </div>
  )
}

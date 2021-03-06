import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import React from 'react'
import Switch from '@material-ui/core/Switch'
import Slide from '@material-ui/core/Slide'
import TextField from '@material-ui/core/TextField'

import { Typography } from '@material-ui/core'

export const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function RenderPipelineConfigs ({
  open, setOpen, pipeline, disabled,
  setSelectedPipeline, threshold, setThreshold, waitTime,
  setWaitTime, processAfter, setProcessAfter, hideToggle
}) {
  let titleDialog = 'No pipeline Selected'
  if (!pipeline) return null
  else titleDialog = `Pipeline: ${pipeline.title || pipeline.pipelineTitle || pipeline.pipelineId}`
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setSelectedPipeline(null)}
        TransitionComponent={Transition}
        scroll='body'
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title'>{titleDialog}</DialogTitle>
        <DialogContent>
          <TextField
            id='pipeline_threshold'
            value={threshold}
            type='number'
            onChange={e => setThreshold(e.target.value)}
            variant='outlined'
            style={{ marginBottom: '15px' }}
            disabled={disabled}
            label='Retry threshold limit (# times).'
          />
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          <TextField
            id='pipeline_time_dependency'
            value={waitTime}
            type='number'
            onChange={e => setWaitTime(e.target.value)}
            variant='outlined'
            disabled={disabled}
            style={{ marginBottom: '15px' }}
            label='Time dependency (seconds).'
          />
          <br />
          {!hideToggle &&
            <Typography>{`Run this pipeline at ${processAfter} of parent pipeline`}
              <Switch
                color='primary'
                checked={processAfter === 'stop'}
                onChange={e => { !disabled && setProcessAfter(processAfter === 'start' ? 'stop' : 'start') }}
                name='processAfter'
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </Typography>}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)} color='primary'
          >
              Close
          </Button>
          <Button
            disabled={disabled}
            onClick={() => setOpen(false)} color='primary'
          >
              Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

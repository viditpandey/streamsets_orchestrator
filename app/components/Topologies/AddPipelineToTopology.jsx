import AddCircleIcon from '@material-ui/icons/AddCircle'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import PipelinesForTopology from './PipelinesForTopology'
import React from 'react'
import Slide from '@material-ui/core/Slide'

import { concat } from 'lodash'
import { generateRandomColorByStrings } from '../../helper/PipelineHelpers'

export const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const AddPipelines = ({ left, setLeft, right, setRight, open, setOpen, disabled, buttonText }) => {
  const [instanceIdsWithColor, setInstanceIds] = React.useState({})

  React.useEffect(() => {
    if (open) {
      const allInstanceIds = concat(left, right).map(i => i.instanceId)
      setInstanceIds(generateRandomColorByStrings(allInstanceIds))
    }
  }, [open])

  return (
    <div id='topology-add-pipelines'>
      <Button
        variant='contained'
        color='primary'
        size='medium'
        disabled={disabled}
        onClick={(e) => { setOpen(true) }}
        startIcon={<AddCircleIcon />}
      >
        {buttonText}
      </Button>
      <Dialog
        open={open}
        maxWidth='lg'
        TransitionComponent={Transition}
        scroll='body'
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title'>Select Pipelines</DialogTitle>
        <DialogContent />
        <PipelinesForTopology
          left={left}
          setLeft={setLeft}
          right={right}
          setRight={setRight}
          instanceIdsWithColor={instanceIdsWithColor}
        />
        <DialogActions>
          <Button onClick={() => setOpen(false)} color='primary'>
              Cancel
          </Button>
          <Button onClick={() => setOpen(false)} color='primary'>
              Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddPipelines

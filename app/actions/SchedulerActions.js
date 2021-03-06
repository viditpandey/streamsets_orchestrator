import axios from 'axios'

import { BASE_URL } from '../configs/constants'

const CREATE_SCHEDULER = BASE_URL + '/createScheduler'
const GET_SCHEDULER = topologyId => `${BASE_URL}/getScheduler/${topologyId}`

export const createScheduler = async ({ topologyId, cronConfig, toRun }) => {
  try {
    const res = await axios({
      method: 'post',
      url: CREATE_SCHEDULER,
      data: {
        topologyId: topologyId,
        cronConfig: cronConfig,
        toRun: toRun,
        createdBy: 'UI'
      }
    }
    ).catch(e => { throw (e) })
    const schedulerCreated = res.data
    console.log(`[SchedulerActions.createScheduler] scheduler created for topologyId ${topologyId}, response received}`)
    return schedulerCreated
  } catch (e) {
    console.error('[SchedulerActions.createScheduler] error:', e)
    throw e
  }
}

export const getSchedulerByTopologyId = async ({ topologyId }) => {
  console.log('[SchedulerActions.getSchedulerByTopologyId] fetching schedular details for topology id: ', topologyId)
  try {
    const res = await axios.get(GET_SCHEDULER(topologyId)).catch(e => { throw (e) })
    const response = res.data
    return response
  } catch (error) {
    console.log('[SchedulerActions.getSchedulerByTopologyId] fetching scheduler data by topology ID failed -> error', error)
    return {}
  }
}

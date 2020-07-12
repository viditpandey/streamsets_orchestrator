import axios from 'axios'
import { BASE_URL } from '../configs/constants'

const CREATE_TOPOLOGY = BASE_URL + '/createTopology'

export const createTopology = async (formData) => {
  console.log('formData:', formData)
  try {
    const topologyFields = formData.finalTreeData
    const res = await axios({
      method: 'post',
      url: CREATE_TOPOLOGY,
      data: {
        topologyFields
      }
    }
    ).catch(e => ({ data: {} }))
    const response = res.data
    console.log(`create topology attempted for topologyId ${formData.topologyId}, response received: ${JSON.stringify(response)}`)
    return response
  } catch (e) {
    console.error('[TopologyActions.createTopology] error:', e)
    return {}
  }
}
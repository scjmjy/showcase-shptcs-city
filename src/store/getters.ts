import state from './state'

export default {
    client_id: state => state.client_id,
    client_version: state => state.client_version,
    token: state => state.token,
    uid: state => state.uid,
}
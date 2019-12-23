import axios from 'axios'


const getPlayer = (playerId) => {
    
    const response = axios.get('/api/players/' + playerId)
    .then(res => res.data)
    .catch(err => console.log('oh shit', err.response.data))

    return response
}

const updatePlayer = (playerId, payload) => {

    const response = axios.patch('/api/players/' + playerId, payload)
    .catch(err => console.log('oh shit, update player failed', err.response.data))

    return response
}

const getGame = (gameId) => {

    const response = axios.get('/api/games/' + gameId)
    .then(res => res.data)
    .catch(err => console.log('oh shit', err.response.data))

    return response
}

const updateGame = (gameId, payload) => {

    axios.patch('/api/games/' + gameId, payload)
    .catch(err => console.log('oh shit, update game failed', err.response.data))

}

const sendPayment = (gameId, payload) => {

    const response = axios.post(`/api/games/${gameId}/payment`, payload)
    .catch(err => console.log('oh shit, payment failed', err.response.data))

    return response
}

const updateDeposit = (playerId, payload) => {

    const response = axios.post('/api/players/' + playerId + '/deposit', payload)
    .catch(err => console.log('deposit failed', err.response.data))

    return response
}

const freeParkingAdd = (gameId, payload) => {

    const response = axios.post(`/api/games/${gameId}/freeparkingadd`, payload)
    .catch(err => console.log('Free Parking Add failed', err.response.data))

    return response
}

const freeParkingSplit = (gameId, payload) => {
    
    const response = axios.post(`/api/games/${gameId}/freeparkingsplit`, payload)
    .catch(err => console.log('Free Parking Split failed', err.response.data))

    return response
}


const api = {

    getPlayer,
    updatePlayer,
    getGame,
    updateGame,
    sendPayment,
    updateDeposit,
    freeParkingAdd,
    freeParkingSplit





    
}



export default api
import apiUrl from '../apiConfig'
import axios from 'axios'

export const addMaterial = (user, data) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/materials/',
    headers: {
        'Authorization': `Token ${user.token}`
      },
    data: data
  })
}

export const getMaterials = user => {
  console.log(user, "my api data")
  return axios({
    url: apiUrl + '/materials/',
    method: 'GET',
    // include an authorization header, that includes our user's token
    // so the API knows who to sign out
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

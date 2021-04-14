import apiUrl from '../apiConfig'
import axios from 'axios'

export const sendScan = (user, data) => {
  console.log(data, "my api data")
  return axios({
    method: 'POST',
    url: apiUrl + '/scans/',
    headers: {
        'Authorization': `Token ${user.token}`
      },
    data: {
      name: data,
      recycleable: false,
      description: "test description",
      barcode: "test barcode"
    }
  })
}

export const scanIndex = user => {
  return axios({
    url: apiUrl + '/scans/',
    method: 'GET',
    // include an authorization header, that includes our user's token
    // so the API knows who to sign out
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

import apiUrl from '../apiConfig'
import axios from 'axios'

export const sendScan = (user, data) => {
  console.log(data, "my api data")
  if (!data.barcode) {
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
      barcode: "none"
    }
  })
} else {
  return axios({
    method: 'POST',
    url: apiUrl + '/scans/',
    headers: {
        'Authorization': `Token ${user.token}`
      },
    data: {
      name: "name",
      recycleable: false,
      description: "test description",
      barcode: data.barcode
    }
  })
}
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

export const scanItem = (user, data) => {
  return axios({
    url: apiUrl + '/scan-item/',
    method: 'GET',
    // include an authorization header, that includes our user's token
    // so the API knows who to sign out
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data
  })
}


export const addItem = (user, data) => {
  console.log(data, "my api data", data.name)
  return axios({
    method: 'POST',
    url: apiUrl + '/add-item/',
    headers: {
        'Authorization': `Token ${user.token}`
      },
      data
  })
}

import apiUrl from '../apiConfig'
import axios from 'axios'

export const saveScan = (user, data) => {
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
  const key = Object.keys(data)[0]
  const value = data[key]
  console.log(data, value, key, "in my api")
  return axios({
    url: `${apiUrl}/scan-item/${value}`,
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const scanItemWithApi = (user, data) => {
  const key = Object.keys(data)[0]
  const value = data[key]
  console.log(data, value, key, "in my api")
  return axios({
    url: `${apiUrl}/scan-item/${value}/api`,
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const getItems = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/get-items/',
    headers: {
        'Authorization': `Token ${user.token}`
      },
  })
}

export const addItem = (user, data) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/add-item/',
    headers: {
        'Authorization': `Token ${user.token}`
      },
      data
  })
}

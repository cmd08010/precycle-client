import apiUrl from '../apiConfig'
import axios from 'axios'

export const addScan = (user, data) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/scans/',
    headers: {
        'Authorization': `Token ${user.token}`
      },
    data: data
  })
}

export const getScans = user => {
  console.log(user, "my api data")
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

export const deleteScan = (user, data) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/delete-item/',
    headers: {
        'Authorization': `Token ${user.token}`
      },
      data
  })
}

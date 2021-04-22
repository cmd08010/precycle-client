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

export const deleteScan = (user, data) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/scans/' + data.id,
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

// item Api calls

export const getItems = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/items/',
    headers: {
      'Authorization': `Token ${user.token}`
    },
  })
}

export const addItem = (user, data) => {
  console.log(data, "my api data")
  return axios({
    method: 'POST',
    url: apiUrl + '/items/',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data
  })
}

export const getItem = (user, id) => {
  console.log(user, "my api data")
  return axios({
    url: apiUrl + '/item/' + id,
    method: 'GET',
    // include an authorization header, that includes our user's token
    // so the API knows who to sign out
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const updateItem = (user, data) => {
  console.log(data, "id in api")
  return axios({
    url: `${apiUrl}/update-item/`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data
  })
}
export const deleteItem = (user, id) => {
  console.log(id, "id in api")
  return axios({
    url: `${apiUrl}/items/${id}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    },
  })
}

// test admin items

export const getTestItems = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/test-items/',
    headers: {
      'Authorization': `Token ${user.token}`
    },
  })
}

export const addTestItem = (user, data) => {
  console.log(data, "my api data")
  return axios({
    method: 'POST',
    url: apiUrl + '/test-items/',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data
  })
}


export const getTestItem = (user, id) => {
  console.log(user, "my api data")
  return axios({
    url: apiUrl + '/test-item/' + id,
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const updateTestItem = (user, data) => {
  console.log(data, "id in api")
  return axios({
    url: `${apiUrl}/update-test-item/`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data
  })
}
export const deleteTestItem = (user, id) => {
  console.log(id, "id in api")
  return axios({
    url: `${apiUrl}/test-items/${id}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    },
  })
}

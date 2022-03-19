export const apiGet = async (url) => {
  const settings = {
    method: 'GET',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  };
  const response = await fetch(url);
  return await response.json();
}

export const apiPost = async (url, data = {}) => {
  const settings = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  };
  const response = await fetch(url, settings);
  return await response.json();
}

export const apiDelete = async (url, data = {}) => {
  const settings = {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  };
  const response = await fetch(url, settings);
  return await response.json();
}

export const apiPut = async (url, data = {}) => {
  const settings = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  };
  const response = await fetch(url, settings);
  return await response.json();
}
const get = async (url, queryParams = null) => {
  const params = queryParams ? new URLSearchParams(queryParams) : null;
  console.log(params);

  const response = await fetch(params ? `${url}?${params}` : url, {
    method: "GET",
  });

  const jsonResponse = response.json();

  return jsonResponse;
};

const del = async (url, body) => {
  body = null;
  const response = await fetch(url, {
    method: "DELETE",
    body: JSON.stringify(body),
  });
  const jsonResponse = response.json();
  return jsonResponse;
};

const put = async (url, body) => {
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const jsonResponse = response.json();
  return jsonResponse;
};

const api = { get, del, put };

export default api;

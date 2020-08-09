const isLogin = () => {
  return fetch('/api/user/check', {
      method: "GET",
      credentials: "include"
  })
  .then(response => {
    return response.json();
  })
  .then(login_json => {
    if (login_json.uuid) {
      return true;
    } else {
      return false;
    }
  })
};

export default isLogin
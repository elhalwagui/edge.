const f = fetch('127.0.0.1:8080/api/v1/items')
  .then(function (res) {
    return res.json();
  })
  .then(function (obj) {
    console.log(obj);
  });

var getUser = (id, callback) => {
  var user = {
    id,
    name: 'Mohit'
  };

  setTimeout(() => {
    callback(user)
  },3000);
};

getUser(20, userInfo => {
  console.log(userInfo);
});

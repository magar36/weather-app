var promise = new Promise((resolve, reject) => {
setTimeout(() => {
  resolve('let\'s see this.');
}, 2000);
});

promise.then((message) => {
  console.log(message);
}, (error) =>{
  console.log(error);
});

var add = (a,b) => {
  return new Promise((resolve, reject) => {
    if(typeof a === 'number' && typeof b === 'number'){
      setTimeout(() => {
        resolve(a+b);
      }, 2000);
    }
    else {
      reject('arguments must be numbers');
    }
  });
};

add(2,'3').then((result) => {
  console.log('total is '+result);
  return add(result,3);
}).then((result2) => {
  console.log('new result is ',result2);
}).catch((err) => {
  console.log(err);
});

console.log('Starting app.');

setTimeout(() => {
  console.log('inside callback1');
}, 2000);

setTimeout(() => {
  console.log('inside callback2');
}, 0);

console.log('Stopping app.');

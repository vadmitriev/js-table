// const listeners = [];

// function onUpdate(fn) {
//   listeners.push(fn);
// }

// function runUpdaters(fn) {
//   setTimeout(() => {
//     listeners.forEach((fn) => fn());
//   }, 0);
// }

// function observable(obj) {
//   return new Proxy(obj, {
//     set(target, name, value) {
//       target[name] = value;
//       runUpdaters();
//       return true;
//     }
//   });
// }

// export { onUpdate, observable };

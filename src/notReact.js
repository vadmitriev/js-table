// // source: https://dev.to/maturc/recreating-the-react-workflow-in-vanilla-javascript-449c

// export const notReact = (function () {
//   let _root;
//   let _templateCallback;

//   let hooks = [];
//   let idx = 0;

//   const _eventArray = [];

//   function useState(initValue) {
//     let state;
//     state = hooks[idx] !== undefined ? hooks[idx] : initValue;
//     const _idx = idx;

//     const setState = (newValue) => {
//       hooks[_idx] = newValue;
//       render();
//     };

//     idx++;
//     return [state, setState];
//   }

//   function useEffect(callback, depsArray) {
//     const oldDeps = hooks[idx];
//     let hasChanges = true;

//     if (oldDeps) {
//       hasChanges = depsArray.some((dep, i) => !Object.is(dep, oldDeps[i]));
//     }
//     hooks[idx] = depsArray;
//     idx++;
//     if (hasChanges) callback();
//   }

//   function render() {
//     idx = 0;
//     _eventArray.length = 0;
//     _root.innerHTML = _templateCallback();
//   }

//   function init(rootElement, templateCallback) {
//     _root = rootElement;
//     _templateCallback = templateCallback;
//     render();
//   }

//   function handleEventListeners(e) {
//     _eventArray.forEach((target) => {
//       if (e.target.id === target.id) {
//         e.preventDefault();
//         target.callback();
//       }
//     });
//   }

//   function addOnClick(id, callback) {
//     _eventArray.push({ id, callback });
//   }

//   document.addEventListener('click', handleEventListeners);

//   return { useState, useEffect, render, init, addOnClick };
// })();

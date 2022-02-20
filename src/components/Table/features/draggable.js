// Source: https://htmldom.dev/drag-and-drop-table-row/

const makeDraggable = (table, onDragEnd) => {
  let draggingEle;
  let draggingRowIndex;
  let placeholder;
  let list;
  let isDraggingStarted = false;

  let x = 0;
  let y = 0;

  const swap = (nodeA, nodeB) => {
    const parentA = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

    nodeB.parentNode.insertBefore(nodeA, nodeB);

    parentA.insertBefore(nodeB, siblingA);
  };

  const isAbove = (nodeA, nodeB) => {
    const rectA = nodeA.getBoundingClientRect();
    const rectB = nodeB.getBoundingClientRect();

    return rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2;
  };

  const cloneTable = () => {
    const rect = table.getBoundingClientRect();
    const width = parseInt(window.getComputedStyle(table).width);

    list = document.createElement('div');
    list.classList.add('clone-list');
    list.style.position = 'absolute';
    list.style.left = `${rect.left}px`;
    list.style.top = `${rect.top}px`;
    table.parentNode.insertBefore(list, table);

    table.style.visibility = 'hidden';

    table.querySelectorAll('tr').forEach((row) => {
      // Create a new table from given row
      const item = document.createElement('div');
      item.classList.add('draggable');

      const newTable = document.createElement('table');
      newTable.setAttribute('class', 'clone-table');
      newTable.style.width = `${width}px`;

      const newRow = document.createElement('tr');
      const cells = [].slice.call(row.children);
      cells.forEach((cell) => {
        const newCell = cell.cloneNode(true);
        newCell.style.width = `${parseInt(window.getComputedStyle(cell).width)}px`;
        newRow.appendChild(newCell);
      });

      newTable.appendChild(newRow);
      item.appendChild(newTable);
      list.appendChild(item);
    });
  };

  const mouseDownHandler = (e) => {
    const originalRow = e.target.parentNode;
    draggingRowIndex = [].slice.call(table.querySelectorAll('tr')).indexOf(originalRow);

    x = e.clientX;
    y = e.clientY;

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  const mouseMoveHandler = (e) => {
    if (!isDraggingStarted) {
      isDraggingStarted = true;

      cloneTable();

      draggingEle = [].slice.call(list.children)[draggingRowIndex];
      draggingEle.classList.add('dragging');

      // Let the placeholder take the height of dragging element
      // So the next element won't move up
      placeholder = document.createElement('div');
      placeholder.classList.add('placeholder');
      draggingEle.parentNode.insertBefore(placeholder, draggingEle.nextSibling);
      placeholder.style.height = `${draggingEle.offsetHeight}px`;
    }

    // Set position for dragging element
    draggingEle.style.position = 'absolute';
    draggingEle.style.top = `${draggingEle.offsetTop + e.clientY - y}px`;
    draggingEle.style.left = `${draggingEle.offsetLeft + e.clientX - x}px`;

    // Reassign the position of mouse
    x = e.clientX;
    y = e.clientY;

    const prevEle = draggingEle.previousElementSibling;
    const nextEle = placeholder.nextElementSibling;

    // The dragging element is above the previous element
    // User moves the dragging element to the top
    // We don't allow to drop above the header
    // (which doesn't have `previousElementSibling`)
    if (prevEle && prevEle.previousElementSibling && isAbove(draggingEle, prevEle)) {
      // The current order    -> The new order
      // prevEle              -> placeholder
      // draggingEle          -> draggingEle
      // placeholder          -> prevEle
      swap(placeholder, draggingEle);
      swap(placeholder, prevEle);
      return;
    }

    // The dragging element is below the next element
    // User moves the dragging element to the bottom
    if (nextEle && isAbove(nextEle, draggingEle)) {
      // The current order    -> The new order
      // draggingEle          -> nextEle
      // placeholder          -> placeholder
      // nextEle              -> draggingEle
      swap(nextEle, placeholder);
      swap(nextEle, draggingEle);
    }
  };

  const mouseUpHandler = () => {
    // Remove the placeholder
    placeholder && placeholder.parentNode.removeChild(placeholder);

    draggingEle.classList.remove('dragging');
    draggingEle.style.removeProperty('top');
    draggingEle.style.removeProperty('left');
    draggingEle.style.removeProperty('position');

    const endRowIndex = [].slice.call(list.children).indexOf(draggingEle);

    isDraggingStarted = false;

    list.parentNode.removeChild(list);

    // Move the dragged row to `endRowIndex`
    let rows = [].slice.call(table.querySelectorAll('tr'));
    draggingRowIndex > endRowIndex
      ? rows[endRowIndex].parentNode.insertBefore(rows[draggingRowIndex], rows[endRowIndex])
      : rows[endRowIndex].parentNode.insertBefore(
          rows[draggingRowIndex],
          rows[endRowIndex].nextSibling
        );

    // Bring back the table
    table.style.removeProperty('visibility');

    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);

    onDragEnd(draggingRowIndex, endRowIndex);
  };

  table.querySelectorAll('tr').forEach((row, index) => {
    // Ignore the header
    // We don't want user to change the order of header
    if (index === 0) {
      return;
    }

    const firstCell = row.firstElementChild;
    firstCell.classList.add('draggable');
    firstCell.addEventListener('mousedown', mouseDownHandler);
  });
};

export default makeDraggable;

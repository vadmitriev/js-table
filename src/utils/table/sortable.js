const sortTable = (event, table) => {
  if (!event.target.className.includes('arrow')) {
    return;
  }

  const id = event.target.id;
  const arrow = event.target.getElementsByClassName('arrow');
  const sortUp = arrow[0].className.includes('up');

  const tbody = table.getElementsByTagName('tbody')[0];
  const cells = Array.from(tbody.getElementsByClassName(`td-${id}`));

  const rowsArr = [];
  cells.forEach((cell) => {
    const text = cell.innerHTML.toUpperCase();
    const parentNode = cell.parentNode;
    rowsArr.push({ text, parentNode });
  });

  rowsArr.sort((a, b) => {
    if (a.text < b.text) {
      return -1;
    }
    if (a.text > b.text) {
      return 1;
    }
    return 0;
  });
  if (!sortUp) {
    rowsArr.reverse();
  }

  for (let i = 0; i < rowsArr.length - 1; i++) {
    const node = rowsArr[i].parentNode;
    const nextNode = rowsArr[i + 1].parentNode;
    tbody.insertBefore(nextNode, node);
  }

  if (sortUp) {
    arrow[0].classList.remove('up');
  } else {
    arrow[0].classList.add('up');
  }
};

export default sortTable;

const makeRowsResizable = (table, onDragEnd) => {
  const createResizableRow = (row, resizer) => {
    let y = 0;
    let h = 0;

    const mouseMoveHandler = (e) => {
      const dy = e.clientY - y;
      // eslint-disable-next-line no-param-reassign
      row.style.height = `${h + dy}px`;
    };

    const mouseUpHandler = () => {
      resizer.classList.remove('row-resizing');
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      onDragEnd();
    };

    const mouseDownHandler = (e) => {
      y = e.clientY;

      const styles = window.getComputedStyle(row);
      h = parseInt(styles.height, 10);

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);

      resizer.classList.add('row-resizing');
    };

    resizer.addEventListener('mousedown', mouseDownHandler);
  };

  const createResizableTable = () => {
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    [].forEach.call(rows, (row) => {
      // Add a resizer element to the row
      const resizer = document.createElement('div');
      resizer.classList.add('row-resizer');

      // Set the width
      resizer.style.width = `${table.offsetWidth}px`;

      row.appendChild(resizer);

      createResizableRow(row, resizer);
    });
  };

  createResizableTable();
};

export default makeRowsResizable;

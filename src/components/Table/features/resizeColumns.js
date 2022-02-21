/* Source: https://htmldom.dev/resize-columns-of-a-table/ */

const makeColumnsResizable = (table, onDragEnd) => {
  const createResizableColumn = (col, resizer) => {
    let x = 0;
    let w = 0;

    const mouseMoveHandler = (e) => {
      const dx = e.clientX - x;
      // eslint-disable-next-line no-param-reassign
      col.style.width = `${w + dx}px`;
    };

    const mouseUpHandler = () => {
      resizer.classList.remove('resizing');
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      onDragEnd();
    };

    const mouseDownHandler = (e) => {
      x = e.clientX;

      const styles = window.getComputedStyle(col);
      w = parseInt(styles.width, 10);

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);

      resizer.classList.add('resizing');
    };

    resizer.addEventListener('mousedown', mouseDownHandler);
  };

  const createResizableTable = () => {
    const cols = table.querySelectorAll('th');
    [].forEach.call(cols, (col) => {
      // Add a resizer element to the column
      const resizer = document.createElement('div');
      resizer.classList.add('resizer');

      // Set the height
      resizer.style.height = `${table.offsetHeight}px`;

      col.appendChild(resizer);

      createResizableColumn(col, resizer);
    });
  };

  createResizableTable();
};

export default makeColumnsResizable;

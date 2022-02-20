/* Source: https://htmldom.dev/resize-columns-of-a-table/ */

export const makeColumnsResizable = (
  table: HTMLTableElement,
  onDragEnd: () => void
): void => {
  const createResizableTable = () => {
    const cols = table.querySelectorAll("th");
    [].forEach.call(cols, (col: Element) => {
      // Add a resizer element to the column
      const resizer = document.createElement("div");
      resizer.classList.add("resizer");

      // Set the height
      resizer.style.height = `${table.offsetHeight}px`;

      col.appendChild(resizer);

      createResizableColumn(col, resizer);
    });
  };

  const createResizableColumn = (col: any, resizer: Element) => {
    let x = 0;
    let w = 0;

    const mouseDownHandler = (e: any) => {
      x = e.clientX;

      const styles = window.getComputedStyle(col);
      w = parseInt(styles.width, 10);

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);

      resizer.classList.add("resizing");
    };

    const mouseMoveHandler = (e: any) => {
      const dx = e.clientX - x;
      col.style.width = `${w + dx}px`;
    };

    const mouseUpHandler = () => {
      resizer.classList.remove("resizing");
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);

      onDragEnd();
    };

    resizer.addEventListener("mousedown", mouseDownHandler);
  };

  createResizableTable();
};

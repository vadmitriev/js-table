export const Pagination = (activePage: number, pageCount: number): string => {
  const generateButtons = () => {
    let html = "";
    for (let i = 1; i <= pageCount; i++) {
      const className = `btn-small ${activePage === i ? "active" : ""}`;
      html += `
	  	<button type="button" id="page" class="${className}">
			${i}
		</button>
	`;
    }

    return html;
  };

  return `
		<div class="pagination">
			<button type="button" class="btn-small" id="first">
				<<
			</button>
			${generateButtons()}
			<button type="button" class="btn-small" id="last">
				>>
			</button>
		</div>
	`;
};

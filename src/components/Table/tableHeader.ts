export const TableHeader = (): string => {
  return `
	<div class="table-header__actions">
		<div class="table-header__input-wrapper">
			<input 
				type="text" 
				class="table-header__input" 
				placeholder="Поиск"
			>
			<span class="focus-border"></span>
		</div>		
		<button type="button" id="clear" class="btn danger">
			Очистить
		</button>
		<button type="button" id="load" class="btn primary">
			Загрузить
		</button>
	</div>
	`;
};

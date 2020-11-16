Financial.income.view.image = {
	show: (images, pagination) => {
		let html = "";
	    for (let i = pagination.page * pagination.pageSize; i < images.length && i < (pagination.page + 1) * pagination.pageSize;i++){
			html += "<img class='image-box' src='"+images[i].url+"'>";
		};

		document.getElementById('financial-income-image-div').innerHTML = html;
	}
};
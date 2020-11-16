Financial.income.view = {};

Financial.income.view.filter = (incomes, pagination) => {
	if(incomes.length){
		let total_value = incomes.reduce((value, income) => { return value += income.value; }, 0);

		let html = "<tr>";
		html += "<td>Id</td>";
		html += "<td>Data</td>";
		html += "<td>Categoria</td>";
		html += "<td>Origem</td>";
		html += "<td>Valor</td>";
		html += "<td>Usuário</td>";
		html += "</tr>";
		for (let i = pagination.page * pagination.pageSize; i < incomes.length && i < (pagination.page + 1) * pagination.pageSize;i++){
			html += "<tr>";
			html += "<td><h3 class='tbl-show-link nowrap' onclick='Financial.income.controller.show("+incomes[i].id+")'>"+incomes[i].id+"</h3></td>";
			html += "<td>"+lib.convertDate(incomes[i].date)+"</td>";
			html += "<td>"+incomes[i].category_name+"</td>";
			html += "<td>"+incomes[i].origin_name+"</td>";
			html += "<td class='nowrap'>$"+lib.roundToInt(incomes[i].value, 2)+"</td>";
			html += "<td>"+incomes[i].user_name+"</td>";
			html += "</tr>";
		};


		document.getElementById("financial-income-filter-box").style.display = "";
		document.getElementById("financial-income-filter-value").innerHTML = "$"+lib.roundToInt(total_value, 2);
		document.getElementById("financial-income-filter-table").innerHTML = html;
	} else {
		document.getElementById("financial-income-filter-box").style.display = "";
		document.getElementById("financial-income-filter-value").innerHTML = "$0,00";
		document.getElementById("financial-income-filter-table").innerHTML = "Sem resultados";
	};
};

Financial.income.view.show = income => {
	document.getElementById("financial-income-show-box").style.display = "";

	let html = "<div class='container'>";
	
	html += "<div class='mobile-box three center margin-top-10'>";
	html += "<p>#"+income.id+"</p>";
	html += "</div>";

	html += "<div class='mobile-box three center margin-top-10'>";
	html += "<p>"+income.date+"</p>";
	html += "</div>";

	html += "<div class='mobile-box three center margin-top-10'>";
	html += "<p>$"+lib.roundToInt(income.value, 2)+"</p>";
	html += "</div>";

	html += "<div class='mobile-box four center margin-top-10'>";
	html += "<p>"+income.category_name+"</p>";
	html += "</div>";

	html += "<div class='mobile-box four center margin-top-10'>";
	html += "<p>"+income.origin_name+"</p>";
	html += "</div>";

	html += "<div class='mobile-box four center margin-top-10'>";
	html += "<p>"+income.user_name+"</p>";
	html += "</div>";

	html += "<div class='mobile-box four center margin-top-10'>";
	html += "<img class='image-box pointer' style='height:20px;width:20px;' src='/images/icon/add-image.png' onclick='Financial.income.controller.image.add("+income.id+")'>";
	html += "</div>";

	html += "<div class='mobile-box one center margin-top-10'>";
	html += "<p class='box one padding margin-top-10'>"+income.obs+"</p>";
	html += "</div>";


	html += "</div>";
	

	document.getElementById("financial-income-show-box").innerHTML = html;
};

// filter: (products, pagination) => {
// 	if(products.length){
// 		let html = "<tr>";
// 		html += "<td>Cód</td>";
// 		html += "<td>Nome</td>";
// 		html += "<td>Tamanho</td>";
// 		html += "<td>Cor</td>";
// 		html += "<td></td>";
// 		html += "<td></td>";
// 		html += "</tr>";
// 		for (let i = pagination.page * pagination.pageSize; i < products.length && i < (pagination.page + 1) * pagination.pageSize; i++){
// 			html += "<tr>";
// 			html += "<td><h3 class='tbl-show-link nowrap' onclick='Product.controller.manage.show("+products[i].id+")'>"+products[i].code+"</h3></td>";
// 			html += "<td>"+products[i].name+"</td>";
// 			html += "<td>"+products[i].size+"</td>";
// 			html += "<td>"+products[i].color+"</td>";
// 			html += "<td><img class='img-tbl-btn' src='/images/icon/edit.png' onclick='Product.controller.manage.edit("+products[i].id+")'></td>";
// 			html += "<td><img class='img-tbl-btn' src='/images/icon/trash.png' onclick='Product.controller.manage.delete("+products[i].id+")'></td>";
// 			html += "</tr>";
// 		};
// 		document.getElementById("product-manage-filter-table").innerHTML = html;
// 		document.getElementById("product-manage-filter-box").style.display = "";
// 	} else {
// 		document.getElementById("product-manage-filter-table").innerHTML = "Sem resultados";
// 		document.getElementById("product-manage-filter-box").style.display = "";
// 	};
// }

// function renderIncomeTable(incomes, pageSize, page){
// 	var html = "<tr>";
// 	html += "<td>Id</td>";
// 	html += "<td>Data</td>";
// 	html += "<td>Categoria</td>";
// 	html += "<td>Origem</td>";
// 	html += "<td>Valor</td>";
// 	html += "<td>Usuário</td>";
// 	html += "</tr>";
// 	for (let i = page * pageSize; i < incomes.length && i < (page + 1) * pageSize;i++){
// 		html += "<tr>";
// 		html += "<td><h3 class='tbl-show-link nowrap' onclick='showFinancialIncome("+incomes[i].id+")'>"+incomes[i].id+"</h3></td>";
// 		html += "<td>"+lib.convertDate(incomes[i].date)+"</td>";
// 		html += "<td>"+incomes[i].category_name+"</td>";
// 		html += "<td>"+incomes[i].origin_name+"</td>";
// 		html += "<td class='nowrap'>"+incomes[i].value+"</td>";
// 		html += "<td>"+incomes[i].user_name+"</td>";
// 		html += "</tr>";
// 	};
// 	document.getElementById('financial-income-report-tbl').innerHTML = html;
// 	document.getElementById('financial-income-report-div').style.display = 'block';
// 	$('#incomeReportPageNumber').text('' + (page + 1) + ' de ' + Math.ceil(incomes.length / pageSize));
// };
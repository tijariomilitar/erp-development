Financial.income.controller = {};

Financial.income.controller.create = document.getElementById("financial-income-create-form");
if(Financial.income.controller.create){
	Financial.income.controller.create.addEventListener("submit", async (event) => {
		event.preventDefault();

		event.target.elements.namedItem("submit").disabled = true;

		let income = {
			category: event.target.elements.namedItem("income_category"),
			origin: event.target.elements.namedItem("income_origin"),
			value: event.target.elements.namedItem("income_value").value,
			obs: event.target.elements.namedItem("income_obs").value
		};

		income.category_id = income.category.options[income.category.selectedIndex].value;
		income.category_name = income.category.options[income.category.selectedIndex].text;

		income.origin_id = income.origin.options[income.origin.selectedIndex].value;
		income.origin_name = income.origin.options[income.origin.selectedIndex].text;

		if(income.category_id == "0"){
			alert("É necessário selecionar uma categoria!");
			return event.target.elements.namedItem("submit").disabled = false;
		};

		if(income.origin_id == "0"){
			alert("É necessário selecionar uma origem!");
			return event.target.elements.namedItem("submit").disabled = false;
		};

		if(income.value < 0.01){
			alert("É necessário cadastrar o valor da receita!");
			return event.target.elements.namedItem("submit").disabled = false;	
		};

		document.getElementById("ajax-loader").style.visibility = "visible";
		income = await Financial.income.save(income);
		document.getElementById("ajax-loader").style.visibility = "hidden";
		if(!income){ return false; };

		event.target.elements.namedItem("income_category").value = "0";
		event.target.elements.namedItem("income_origin").value = "0";
		event.target.elements.namedItem("income_value").value = "0.00";
		event.target.elements.namedItem("income_obs").value = "";
		event.target.elements.namedItem("submit").disabled = false;
	});
};

Financial.income.controller.filter = document.getElementById("financial-income-filter-form");
if(Financial.income.controller.filter){
	Financial.income.controller.filter.addEventListener("submit", async (event) => {
		event.preventDefault();

		let income = {
			periodStart: event.target.elements.namedItem("periodStart").value,
			periodEnd: event.target.elements.namedItem("periodEnd").value,
			category_id: event.target.elements.namedItem("category_id").value,
			origin_id: event.target.elements.namedItem("origin_id").value
		};

		document.getElementById("ajax-loader").style.visibility = "visible";
		let incomes = await Financial.income.filter(income);
		document.getElementById("ajax-loader").style.visibility = "hidden";

		const pagination = { pageSize: 10, page: 0};
		$(() => { lib.carousel.execute("financial-income-filter-box", Financial.income.view.filter, incomes, pagination); });
	});
};

Financial.income.controller.show = async (income_id) => {
	document.getElementById("ajax-loader").style.visibility = "visible";
	let income = await Financial.income.findById(income_id);
	document.getElementById("ajax-loader").style.visibility = "hidden";
	if(!income){ return false};

	console.log(income);

	Financial.income.view.show(income);
};

// $("#financial-income-report-form").on('submit', (event) => {
// 	event.preventDefault();
// 	document.getElementById('financial-income-report-submit').disabled = true;

// 	document.getElementById('ajax-loader').style.visibility = 'visible';

// 	$.ajax({
// 		url: '/financial/income/filter',
// 		method: 'post',
// 		data: $("#financial-income-report-form").serialize(),
// 		success: (incomes) => {
// 			if(incomes.unauthorized){
// 				alert(incomes.unauthorized);
// 				return window.location.href = '/login';
// 			};
			
// 			if(incomes.msg){
// 				alert(incomes.msg);
// 				document.getElementById('ajax-loader').style.visibility = 'hidden';
// 				return document.getElementById('product-create-submit').disabled = false;
// 			};

// 			document.getElementById('ajax-loader').style.visibility = 'hidden';
			
// 			var pageSize = 15;
// 			var page = 0;

// 			var totalValue = 0;
// 			for(i in incomes){
// 				totalValue += incomes[i].value;
// 			};

// 			document.getElementById('income_totalValue').innerHTML = "$"+lib.roundValue(totalValue);

// 			function paging(){
// 				if(incomes.length){
// 					renderIncomeTable(incomes, pageSize, page);
// 				} else {
// 					lib.clearTable('financial-income-report-tbl', 'incomeReport');
// 				};
// 			};

// 			document.getElementById('financial-income-report-submit').disabled = false;

// 			function buttonsPaging(){
// 				$('#incomeReportNext').prop('disabled', incomes.length <= pageSize || page >= incomes.length / pageSize - 1);
// 				$('#incomeReportPrevious').prop('disabled', incomes.length <= pageSize || page == 0);
// 			};

// 			$(function(){
// 			    $('#incomeReportNext').click(function(){
// 			        if(page < incomes.length / pageSize - 1){
// 			            page++;
// 			            paging();
// 			            buttonsPaging();
// 			        };
// 			    });
// 			    $('#incomeReportPrevious').click(function(){
// 			        if(page > 0){
// 			            page--;
// 			            paging();
// 			            buttonsPaging();
// 			        };
// 			    });
// 			    paging();
// 			    buttonsPaging();
// 			});

// 			document.getElementById('financial-income-report-submit').disabled = false;
// 		}
// 	});
// });
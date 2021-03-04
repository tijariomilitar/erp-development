Ecommerce.sale.view.manage = {};

Ecommerce.sale.view.manage.filter = (sales, status, service_orders) => {
	let html = "";
	if(sales.length){
		html += "</div>";
		if(!status){
			for(let i in sales){
				html += "<div class='box one container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
					html += "<div class='mobile-box three border padding-5 center margin-top-5 tbl-show-link nowrap' onclick='Ecommerce.sale.controller.manage.show(`"+sales[i].id+"`)'><h4>"+sales[i].code+"</h4></div>";
					html += "<div class='mobile-box two-thirds border padding-5 center margin-top-5'>"+sales[i].customer_name+"</div>";
					html += "<div class='mobile-box two border padding-5 center margin-top-5'>"+sales[i].customer_user+"</div>";
					html += "<div class='mobile-box two border padding-5 center margin-top-5'>"+lib.timestampToDate(sales[i].datetime)+"</div>";
					html += "<div class='mobile-box three border padding-5 center margin-top-5'>"+sales[i].user_name+"</div>";
					html += "<div class='mobile-box three border padding-5 center margin-top-5'>"+sales[i].status+"</div>";
					html += "<div class='mobile-box three border padding-5 center margin-top-5'>"+sales[i].tracker+"</div>";
					html += "</div>";
				html += "</div>";
			};
		} else if(status == "Ag. Informações"){
			for(let i in sales){
				html += "<div class='box one container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
					html += "<div class='mobile-box three border padding-5 center margin-top-5 tbl-show-link nowrap' onclick='Ecommerce.sale.controller.manage.show(`"+sales[i].id+"`)'><h4>"+sales[i].code+"</h4></div>";
					html += "<div class='mobile-box two-thirds border padding-5 center margin-top-5'>"+sales[i].customer_name+"</div>";
					html += "<div class='mobile-box two border padding-5 center margin-top-5'>"+sales[i].customer_user+"</div>";
					html += "<div class='mobile-box two border padding-5 center margin-top-5'>"+lib.timestampToDate(sales[i].datetime)+"</div>";
					html += "<div class='mobile-box three border padding-5 center margin-top-5'>"+sales[i].user_name+"</div>";
					html += "<div class='mobile-box three border padding-5 center margin-top-5'>"+sales[i].status+"</div>";
					html += "<div class='mobile-box three border padding-5 center margin-top-5'>"+sales[i].tracker+"</div>";
					html += "<select id='ecommerce-sale-manage-change-status-select-id"+sales[i].id+"' class='mobile-box two border padding-5 center margin-top-5'>";
						// html += "<option value='Ag. Informações'>Ag. Informações</option>";
						html += "<option value='Cancelada'>Cancelada</option>";
					html += "</select>";
					html += "<button class='mobile-box two border submit-generic padding-5 center margin-top-5' onclick='Ecommerce.sale.controller.manage.changeStatus("+sales[i].id+")'>Atualizar status</button>";
					html += "</div>";
				html += "</div>";
			};
		} else if(status == "Ag. Embalo"){
			for(let i in sales){
				html += "<div class='box one container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
					html += "<div class='mobile-box three border padding-5 center margin-top-5 tbl-show-link nowrap' onclick='Ecommerce.sale.controller.manage.show(`"+sales[i].id+"`)'><h4>"+sales[i].code+"</h4></div>";
					html += "<div class='mobile-box two-thirds border padding-5 center margin-top-5'>"+sales[i].customer_name+"</div>";
					html += "<div class='mobile-box two border padding-5 center margin-top-5'>"+sales[i].customer_user+"</div>";
					html += "<div class='mobile-box two border padding-5 center margin-top-5'>"+lib.timestampToDate(sales[i].datetime)+"</div>";
					html += "<div class='mobile-box three border padding-5 center margin-top-5'>"+sales[i].user_name+"</div>";
					html += "<div class='mobile-box three border padding-5 center margin-top-5'>"+sales[i].status+"</div>";
					html += "<div class='mobile-box three border padding-5 center margin-top-5'>"+sales[i].tracker+"</div>";
					html += "<select id='ecommerce-sale-manage-change-status-select-id"+sales[i].id+"' class='mobile-box two border padding-5 center margin-top-5'>";
						html += "<option value='Ag. Informações'>Ag. Informações</option>";
						html += "<option value='Cancelada'>Cancelada</option>";
					html += "</select>";
					html += "<button class='mobile-box two border submit-generic padding-5 center margin-top-5' onclick='Ecommerce.sale.controller.manage.changeStatus("+sales[i].id+")'>Atualizar status</button>";
					html += "</div>";
				html += "</div>";
			};
		} else if(status == "Ag. Coleta"){
			html += "<div class='box one container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
				html += "<input class='mobile-box four padding-5 margin-top-5 margin-bottom-5 border center' placeholder='Código da OS'>";
				html += "<div class='mobile-box four padding-5 margin-top-5 margin-bottom-5 border center'>Nova OS</div>";
				html += "<select class='mobile-box four padding-5 margin-top-5 margin-bottom-5 border center'>";
				html += "</select>";
				html += "<div class='mobile-box four padding-5 margin-top-5 margin-bottom-5 border center'>OK</div>";
			html += "</div>";
			for(let i in sales){
				html += "<div class='box one container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
					html += "<div class='mobile-box twelve padding-5 margin-top-5 center'><input type='checkbox' name='Ecommerce-sale-os-checkbox' value='1'></div>";
					html += "<div class='mobile-box three border padding-5 center margin-top-5 tbl-show-link nowrap' onclick='Ecommerce.sale.controller.manage.show(`"+sales[i].id+"`)'><h4>"+sales[i].code+"</h4></div>";
					html += "<div class='mobile-box two border padding-5 center margin-top-5'>"+sales[i].customer_name+"</div>";
					html += "<div class='mobile-box two border padding-5 center margin-top-5'>"+sales[i].customer_user+"</div>";
					html += "<div class='mobile-box two border padding-5 center margin-top-5'>"+lib.timestampToDate(sales[i].datetime)+"</div>";
					html += "<div class='mobile-box three border padding-5 center margin-top-5'>"+sales[i].user_name+"</div>";
					html += "<div class='mobile-box three border padding-5 center margin-top-5'>"+sales[i].status+"</div>";
					html += "<div class='mobile-box three border padding-5 center margin-top-5'>"+sales[i].tracker+"</div>";
					html += "<select id='ecommerce-sale-manage-change-status-select-id"+sales[i].id+"' class='mobile-box two border padding-5 center margin-top-5'>";
						// html += "<option value='Ag. Informações'>Ag. Informações</option>";
						html += "<option value='Cancelada'>Cancelada</option>";
					html += "</select>";
					html += "<button class='mobile-box two border submit-generic padding-5 center margin-top-5' onclick='Ecommerce.sale.controller.manage.changeStatus("+sales[i].id+")'>Atualizar status</button>";
					for(let j in service_orders){
						html += "<select id='ecommerce-sale-manage-change-status-select-id"+sales[i].id+"' class='mobile-box two border padding-5 center margin-top-5'>";
						html += "<option value='"+service_orders[j].id+"'>"+service_orders[i].code+"</option>";
						html += "</select>";
					};
					html += "</div>";
				html += "</div>";
			};
		} else if(status == "Cancelada"){
			html += "<div class='box one container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
				html += "<input class='mobile-box four padding-5 margin-top-5 margin-bottom-5 border center' placeholder='Código da OS'>";
				html += "<div class='mobile-box four padding-5 margin-top-5 margin-bottom-5 border center'>Nova OS</div>";
				html += "<select class='mobile-box four padding-5 margin-top-5 margin-bottom-5 border center'>";
				html += "</select>";
				html += "<div class='mobile-box four padding-5 margin-top-5 margin-bottom-5 border center'>OK</div>";
			html += "</div>";
			for(let i in sales){
				html += "<div class='box one container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
					// html += "<div class='mobile-box twelve padding-5 margin-top-5 center'><input type='checkbox' name='Ecommerce-sale-os-checkbox' value='1'></div>";
					html += "<div class='mobile-box three border padding-5 center margin-top-5 tbl-show-link nowrap' onclick='Ecommerce.sale.controller.manage.show(`"+sales[i].id+"`)'><h4>"+sales[i].code+"</h4></div>";
					html += "<div class='mobile-box two border padding-5 center margin-top-5'>"+sales[i].customer_name+"</div>";
					html += "<div class='mobile-box two border padding-5 center margin-top-5'>"+sales[i].customer_user+"</div>";
					html += "<div class='mobile-box two border padding-5 center margin-top-5'>"+lib.timestampToDate(sales[i].datetime)+"</div>";
					html += "<div class='mobile-box three border padding-5 center margin-top-5'>"+sales[i].user_name+"</div>";
					html += "<div class='mobile-box three border padding-5 center margin-top-5'>"+sales[i].status+"</div>";
					html += "<div class='mobile-box three border padding-5 center margin-top-5'>"+sales[i].tracker+"</div>";
					// html += "<select id='ecommerce-sale-manage-change-status-select-id"+sales[i].id+"' class='mobile-box two border padding-5 center margin-top-5'>";
						// html += "<option value='Ag. Informações'>Ag. Informações</option>";
						// html += "<option value='Cancelada'>Cancelada</option>";
					// html += "</select>";
					// html += "<button class='mobile-box two border submit-generic padding-5 center margin-top-5' onclick='Ecommerce.sale.controller.manage.changeStatus("+sales[i].id+")'>Atualizar status</button>";
					// for(let j in service_orders){
					// 	html += "<select id='ecommerce-sale-manage-change-status-select-id"+sales[i].id+"' class='mobile-box two border padding-5 center margin-top-5'>";
					// 	html += "<option value='"+service_orders[j].id+"'>"+service_orders[i].code+"</option>";
					// 	html += "</select>";
					// };
					html += "</div>";
				html += "</div>";
			};
		};
		document.getElementById("ecommerce-sale-filter-box").style.display = "";
		document.getElementById("ecommerce-sale-filter-box").innerHTML = html;
	} else {
		html += "<div class='box one center padding-10 margin-top-5 margin-bottom-5 shadow'>Nenhuma venda encontrada</div>";
		document.getElementById("ecommerce-sale-filter-box").style.display = "";
		document.getElementById("ecommerce-sale-filter-box").innerHTML = html;
	};
};

Ecommerce.sale.view.manage.show = (sale) => {
	let html = "";
	html += "<div class='box one container ground'>";
		html += "<div class='box container three border-explicit padding-10 margin-top-5'>";
			html += "<div class='box one underline center bold'>Dados do cliente</div>";
			html += "<h5 class='mobile-box four margin-top-5'>Nome</h5>";
			html += "<div class='mobile-box three-fourths margin-top-5 center bold'>"+sale.customer_name+"</div>";
			html += "<h5 class='mobile-box four margin-top-5'>Usuário</h5>";
			html += "<div class='mobile-box three-fourths margin-top-5 center bold'>"+sale.customer_user+"</div>";
		html += "</div>";
		html += "<div class='box container three border-explicit padding-10 margin-top-5'>";
			html += "<div class='box one underline center bold'>Dados da venda</div>";
			html += "<h5 class='mobile-box four margin-top-5'>Origem</h5>";
			html += "<div class='mobile-box three-fourths margin-top-5 center'>"+sale.origin+"</div>";
			html += "<h5 class='mobile-box four margin-top-5'>Código</h5>";
			html += "<div class='mobile-box three-fourths margin-top-5 center'>"+sale.code+"</div>";
			html += "<h5 class='mobile-box four margin-top-5'>Data</h5>";
			html += "<div class='mobile-box three-fourths margin-top-5 center'>"+lib.timestampToDate(sale.datetime)+"</div>";
			html += "<h5 class='mobile-box four margin-top-5'>Coleta</h5>";
			html += "<div class='mobile-box three-fourths margin-top-5 center'>"+lib.timestampToDate(sale.date)+"</div>";
			html += "<h5 class='mobile-box four margin-top-5'>Embalo</h5>";
			html += "<div class='mobile-box three-fourths margin-top-5 center'>"+sale.packing_datetime+"</div>";
		html += "</div>";
		html += "<div class='box container three border-explicit padding-10 margin-top-5'>";
			html += "<div class='box one underline center bold'>Dados operacionais</div>";
			html += "<h5 class='mobile-box four margin-top-5'>Status</h5>";
			html += "<div class='mobile-box three-fourths margin-top-5 center'>"+sale.status+"</div>";
			html += "<h5 class='mobile-box four margin-top-5'>Rastreio</h5>";
			html += "<div class='mobile-box three-fourths margin-top-5 center'>"+sale.tracker+"</div>";
			html += "<h5 class='mobile-box four margin-top-5'>Coletador</h5>";
			html += "<div class='mobile-box three-fourths margin-top-5 center'>"+sale.user_name+"</div>";
			html += "<h5 class='mobile-box four margin-top-5'>Embalador</h5>";
			html += "<div class='mobile-box three-fourths margin-top-5 center'>"+sale.packing_user_name+"</div>";
		html += "</div>";
	html += "</div>";

	html += "<div class='box one container ground'>";
		html += "<div class='box two container ground border padding-5 margin-top-5'>";
		html += "<div class='box one underline center bold'>Produtos</div>";
		for(let i in sale.products){
			html += "<div class='box one one container ground box-hover border-explicit padding-10 margin-top-5'>";
				html += "<div class='mobile-box three-fourths'>"+sale.products[i].info+"</div>";
				html += "<div class='mobile-box four center bold'>"+sale.products[i].amount+"un</div>";
			html += "</div>";
		};
		html += "</div>";

		html += "<div class='box two container ground border padding-5 margin-top-5'>";
		html += "<div class='box one underline center bold'>Pacotes</div>";
		for(let i in sale.packages){
			html += "<div class='box one one container ground border-explicit padding-10 margin-top-5'>";
				html += "<div class='box one container padding-10'>";
					html += "<div class='mobile-box eight center pointer box-hover border-explicit' onclick='lib.displayDiv(`ecommerce-sale-show-package-product-"+sale.packages[i].package_id+"-div`, this);'>P"+sale.packages[i].package_id+"</div>";
					html += "<div class='mobile-box two center'>"+sale.packages[i].info+"</div>";
					html += "<h5 class='mobile-box four center border-explicit'>"+sale.packages[i].setup+"</h5>";
					html += "<div class='mobile-box eight center bold'>"+sale.packages[i].amount+"un</div>";
				html += "</div>";
				html += "<div id='ecommerce-sale-show-package-product-"+sale.packages[i].package_id+"-div' class='box one container' style='display:none'>";
				for(let j in sale.packages[i].products){
					html += "<div class='box one container border box-hover padding-5 margin-top-5'>";
						html += "<div class='mobile-box five center'>"+sale.packages[i].products[j].amount+"un</div>";
						html += "<div class='mobile-box four-fifths'>"+sale.packages[i].products[j].product_info+"</div>";
					html += "</div>";
				};
				html += "</div>";
			html += "</div>";
		};
		html += "</div>";
	html += "</div>";

	document.getElementById("ecommerce-sale-filter-box").style.display = "none";
	document.getElementById("ecommerce-sale-show-box").style.display = "";
	document.getElementById("ecommerce-sale-show-box").innerHTML = html;
};
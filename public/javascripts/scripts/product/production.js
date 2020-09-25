Product.production = { kart: [] };

// verify if kart is empty
if(JSON.parse(localStorage.getItem("productProductionKart")) != null){
	let kart = JSON.parse(localStorage.getItem("productProductionKart"));
	Product.production.kart = kart;

	renderProductProductionKart(Product.production.kart);
};

$(() => {
	$("#product-production-kart-form").on('submit', (event)=>{
		event.preventDefault();

		document.getElementById("product-production-kart-submit").disabled = true;

		var product_id = document.getElementById("product-production-kart-form").elements.namedItem('product_id');
		var amount = document.getElementById("product-production-kart-form").elements.namedItem('product_amount').value;

		if(product_id.value < 1 || !product_id.value){
			alert("É necessário selecionar um produto.");
			return document.getElementById('product-production-kart-submit').disabled = false;
		};

		if(amount < 0.01 || !amount){
			alert("É necessário preencher a quantidade de produtos que serão produzidos.");
			return document.getElementById('product-production-kart-submit').disabled = false;
		};

		var row = product_id.options[product_id.selectedIndex].text;
		splitedProduct = row.split(" | ");

		product = {
			id: product_id.value,
			code: splitedProduct[0],
			name: splitedProduct[1],
			color: splitedProduct[2],
			size: splitedProduct[3],
			amount: parseInt(amount),
			feedstocks: []
		};

		for(i in Product.production.kart){
			if(Product.production.kart[i].id == product.id){
				document.getElementById('product-production-kart-submit').disabled = false;
				return alert("Você já incluiu este produto na lista de produção.");
			};
		};

		Product.production.kart.push(product);

		Product.production.kart.sort((a, b) => {
		  return a.code - b.code;
		});

		updateProductProductionLocalStorage(Product.production.kart);
		renderProductProductionKart(Product.production.kart);

		document.getElementById("product-production-simulation-box").style.display = "none";
		document.getElementById("product-production-form").style.display = "none";
		
		document.getElementById("product-production-kart-form").elements.namedItem('product_amount').value = "";
		document.getElementById("product-production-kart-submit").disabled = false;
	});

	$("#product-production-simulation").on('submit', (event)=>{
		event.preventDefault();
		document.getElementById("product-production-simulation").elements.namedItem("submit").disabled = true;

		const storage_id = document.getElementById("product-production-simulation").elements.namedItem("storage_id").value;

		if(storage_id < 1 || !storage_id){
			alert("É necessário selecionar o estoque que irá suprir os materiais.");
			return document.getElementById("product-production-simulation").elements.namedItem("submit").disabled = false;
		};

		if(!Product.production.kart.length){
			alert("É necessário selecionar algum produto para solicitar produção.");
			return document.getElementById("product-production-simulation").elements.namedItem("submit").disabled = false;
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';
		$.ajax({
			url: "/product/production/simulate",
			method: "post",
			data: {
				storage_id: storage_id,
				products: JSON.stringify(Product.production.kart)
			},
			success: (response) => {
				if(API.verifyResponse(response, "product-production-simulation")){return};

				
				response.production.feedstocks.sort((a, b) => {
					return a.code - b.code;
				});

				var html = "";
				html += "<tr>";
				html += "<td>Cód</td>";
				html += "<td>Nome</td>";
				html += "<td>Cor</td>";
				html += "<td>Metragem</td>";
				// html += "<td>Qtd</td>";
				html += "</tr>";
				for(i in response.production.feedstocks){
					html += "<tr>";
					html += "<td class='nowrap'>"+response.production.feedstocks[i].code+"</td>";
					html += "<td>"+response.production.feedstocks[i].name+"</td>";
					html += "<td>"+response.production.feedstocks[i].color+"</td>";
					html += "<td class='nowrap'>"+response.production.feedstocks[i].amount+""+response.production.feedstocks[i].uom+"</td>";
					// html += "<td class='nowrap'>"+response.production.feedstocks[i].standard+"un</td>";
					// html += "<td class='nowrap'>"+lib.roundValue(response.production.feedstocks[i].amount/response.production.feedstocks[i].standard)+"</td>";
					html += "</tr>";
				};

				document.getElementById("product-production-simulation-box").style.display = "block";
				document.getElementById("product-production-simulation-tbl").innerHTML = html;

				if(!response.production.feedstocks.length){
					document.getElementById("product-production-form").style.display = "block";
					document.getElementById("product-production-form").elements.namedItem("storage_id").value = storage_id;
					document.getElementById("product-production-form").elements.namedItem("storage_id").disabled = true;
				} else {
					document.getElementById("product-production-form").style.display = "none";
				};

				document.getElementById("product-production-simulation").elements.namedItem("submit").disabled = false;
				document.getElementById('ajax-loader').style.visibility = 'hidden';
			}
		});
	});

	$("#product-production-form").on('submit', (event)=>{
		event.preventDefault();
		document.getElementById('product-production-form').elements.namedItem('submit').disabled = true;

		const storage_id = document.getElementById("product-production-form").elements.namedItem("storage_id").value;

		if(storage_id < 1 || !storage_id){
			alert("É necessário selecionar o estoque que irá suprir os materiais.");
			return document.getElementById('product-production-form').elements.namedItem('submit').disabled = false;
		};

		if(!Product.production.kart.length){
			alert("É necessário selecionar algum produto para solicitar produção.");
			return document.getElementById('product-production-form').elements.namedItem('submit').disabled = false;
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';

		$.ajax({
			url: "/product/production/save",
			method: "post",
			data: {
				storage_id: storage_id,
				products: JSON.stringify(Product.production.kart)
			},
			success: (response) => {
				// if(API.verifyResponse(response, "product-production-form")){return};

				console.log(response);

				response.production.feedstocks.sort((a, b) => {
					return a.code - b.code;
				});

				// Product.production.kart = [];

				// document.getElementById("product-production-simulation-box").style.display = "block";
				// document.getElementById("product-production-simulation-tbl").innerHTML = "";

				// updateProductProductionLocalStorage(Product.production.kart);
				// renderProductProductionKart(Product.production.kart);
			
				// document.getElementById('product-production-form').elements.namedItem("submit").disabled = false;
				
				// document.getElementById("product-production-form").style.display = "none";
				document.getElementById('ajax-loader').style.visibility = 'hidden';
			}
		});
	});
});

function renderProductProductionKart(products){
	var html = "";
	html += "<tr>";
	html += "<td>Código</td>";
	html += "<td>Nome</td>";
	html += "<td>Cor</td>";
	html += "<td>Tamanho</td>";
	html += "<td>Qtd</td>";
	html += "</tr>";
	for(i in products){
		html += "<tr>";
		html += "<td class='nowrap'>"+products[i].code+"</td>";
		html += "<td>"+products[i].name+"</td>";
		html += "<td>"+products[i].color+"</td>";
		html += "<td>"+products[i].size+"</td>";
		html += "<td class='nowrap'>"+products[i].amount+"un</td>";
		html += "<td><a class='tbl-show-link nowrap' onclick='removeProductFromProductionKart("+products[i].id+")'>Rem</a></td>";
		html += "</tr>";
	};

	document.getElementById("product-production-kart-tbl").innerHTML = html;
};

function removeProductFromProductionKart(id){
	var kart_backup = [];
	for(i in Product.production.kart){
		if(Product.production.kart[i].id != id){
			kart_backup.push(Product.production.kart[i]);
		};
	}

	Product.production.kart = kart_backup;

	updateProductProductionLocalStorage(Product.production.kart);
	renderProductProductionKart(Product.production.kart);
	document.getElementById("product-production-simulation-box").style.display = "none";
	document.getElementById("product-production-form").style.display = "none";
};

function updateProductProductionLocalStorage(kart){
	const stringKart = JSON.stringify(kart);
	localStorage.setItem("productProductionKart", stringKart);
	if(kart.length == 0){
		localStorage.setItem("productProductionKart", null);
	};
};
Production.product.kart = {
	array: [],
	list: async (products) => {
		if(products.length){
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
				html += "<td><a class='tbl-show-link nowrap' onclick='Production.product.kart.remove("+products[i].id+")'>Rem</a></td>";
				html += "</tr>";
			};

			document.getElementById("production-product-kart-table").innerHTML = html;
		} else {
			document.getElementById("production-product-kart-table").innerHTML = "";
		};
	},
	remove: async (product_id) => {
		var kart_backup = [];
		for(i in Production.product.kart.array){
			if(Production.product.kart.array[i].id != product_id){
				kart_backup.push(Production.product.kart.array[i]);
			};
		};

		Production.product.kart.array = kart_backup;

		Production.product.kart.localStorage.update(Production.product.kart.array, "productionProductKart");
		Production.product.kart.list(Production.product.kart.array);
		// document.getElementById("production-product-simulation-table").style.display = "none";
		document.getElementById("production-product-form").style.display = "none";
	},
	localStorage: {
		verify: async (localStorageKart) => {
			if(JSON.parse(localStorage.getItem(localStorageKart)) != null){
				let kart = JSON.parse(localStorage.getItem(localStorageKart));
				Production.product.kart.array = kart;

				Production.product.kart.list(Production.product.kart.array);
			};
		},
		update:  async (kart, localStorageKart) => {
			const stringifiedKart = JSON.stringify(kart);
			localStorage.setItem(localStorageKart, stringifiedKart);
			if(!kart.length){
				localStorage.setItem(localStorageKart, null);
			};
		}
	}
};

if(document.getElementById("production-kart-feedstock-filter-form")){
	document.getElementById("feedstock-filter-form").addEventListener("submit", (event) => {
		event.preventDefault();

		let feedstock = {
			code: document.getElementById("feedstock-filter-form").elements.namedItem('feedstock_code').value,
			name: document.getElementById("feedstock-filter-form").elements.namedItem('name').value,
			color: document.getElementById("feedstock-filter-form").elements.namedItem('color').value
		};

		console.log(feedstock);
	});
};

document.getElementById("production-product-kart-form").addEventListener("submit", async (event) => {
	event.preventDefault();

	var product_id = document.getElementById("production-product-kart-form").elements.namedItem('product_id');
	var amount = document.getElementById("production-product-kart-form").elements.namedItem('product_amount').value;

	if(product_id.value < 1 || !product_id.value){
		alert("É necessário selecionar um produto.");
		return;
	};

	if(amount < 0.01 || !amount){
		alert("É necessário preencher a quantidade de produtos que serão produzidos.");
		return;
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

	for(i in Production.product.kart.array){
		if(Production.product.kart.array[i].id == product.id){
			return alert("Você já incluiu este produto na lista de produção.");
		};
	};

	Production.product.kart.array.push(product);

	Production.product.kart.array.sort((a, b) => {
	  return a.code - b.code;
	});

	Production.product.kart.localStorage.update(Production.product.kart.array, "productionProductKart");
	Production.product.kart.list(Production.product.kart.array);

	document.getElementById("production-product-form").style.display = "none";
	
	document.getElementById("production-product-kart-form").elements.namedItem('product_amount').value = "";
});

Production.product.kart.localStorage.verify("productionProductKart");
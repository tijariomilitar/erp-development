Production.product.kart = {
	array: [],
	list: async (products) => {
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

		document.getElementById("production-product-kart-table").innerHTML = html;
	},
	remove: async () => {
		var kart_backup = [];
		for(i in production.product.kart.array){
			if(production.product.kart.array[i].id != id){
				kart_backup.push(production.product.kart.array[i]);
			};
		}

		Product.production.kart.array = kart_backup;

		Production.product.kart.localStorage.update(Product.production.kart.array);
		Production.product.kart.list(Product.production.kart.array);
		document.getElementById("product-production-simulation-box").style.display = "none";
		document.getElementById("product-production-form").style.display = "none";
	},
	localStorage: {
		verify: async () => {
			if(JSON.parse(localStorage.getItem("ProductionProductKart")) != null){
				let kart = JSON.parse(localStorage.getItem("ProductionProductKart"));
				Production.product.kart.array = kart;

				Production.product.kart.list(Production.product.kart.array);
			};
		},
		update:  async () => {
			const stringifiedKart = JSON.stringify(kart);
			localStorage.setItem("productProductionKart", stringifiedKart);
			if(kart.length == 0){
				localStorage.setItem("productProductionKart", null);
			};	
		}
	}
};

Production.product.kart.localStorage.verify();

document.getElementById("production-product-kart-form").addEventListener("submit", async (event) => {
	event.preventDefault();
	document.getElementById("product-production-kart-form").elements.namedItem("submit").disabled = true;

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

	for(i in Product.production.kart.array){
		if(Product.production.kart.array[i].id == product.id){
			document.getElementById('product-production-kart-submit').disabled = false;
			return alert("Você já incluiu este produto na lista de produção.");
		};
	};

	Product.production.kart.array.push(product);

	Product.production.kart.array.sort((a, b) => {
	  return a.code - b.code;
	});

	Production.product.kart.localStorage.update(Product.production.kart.array);
	Production.product.kart.list(Product.production.kart.array);

	document.getElementById("product-production-simulation-box").style.display = "none";
	document.getElementById("product-production-form").style.display = "none";
	
	document.getElementById("product-production-kart-form").elements.namedItem('product_amount').value = "";
	document.getElementById("product-production-kart-submit").disabled = false;

	return document.getElementById("product-production-kart-form").elements.namedItem("submit").disabled = false;
});
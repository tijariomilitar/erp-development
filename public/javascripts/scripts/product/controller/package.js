Product.controller.package = {};

Product.controller.package.create = document.getElementById("product-package-create-form");
if(Product.controller.package.create){
	Product.controller.package.create.addEventListener("submit", async event => {
		event.preventDefault();

		let package = {
			id: event.target.elements.namedItem("id").value,
			code: event.target.elements.namedItem("code").value,
			name: event.target.elements.namedItem("name").value,
			color: event.target.elements.namedItem("color").value,
			price: event.target.elements.namedItem("price").value
		};

		document.getElementById("ajax-loader").style.visibility = "visible";
		package = await Product.package.save(package);
		document.getElementById("ajax-loader").style.visibility = "hidden";
		if(!package){ return false };

		event.target.elements.namedItem("id").value = "";
		event.target.elements.namedItem("code").value = "";
		event.target.elements.namedItem("name").value = "";
		event.target.elements.namedItem("color").value = "";
		event.target.elements.namedItem("price").value = "0.00";

		document.getElementById("product-package-show-box").style.display = "none";
		document.getElementById("product-package-filter-form").submit.click();
	});
};

Product.controller.package = {};

Product.controller.package.filter = document.getElementById("product-package-filter-form");
if(Product.controller.package.filter){
	Product.controller.package.filter.addEventListener("submit", async (event) => {
		event.preventDefault();

		let package = {
			code: event.target.elements.namedItem("code").value,
			name: event.target.elements.namedItem("name").value,
			color: event.target.elements.namedItem("color").value
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';
		let packages = await Product.package.filter(package);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!packages) { return false };

		packages = lib.sort(packages, "code");

		const pagination = { pageSize: 10, page: 0};
		$(() => { lib.carousel.execute("product-package-filter-box", Product.view.package.filter, packages, pagination); });
	});
};

Product.controller.package.product = {};

Product.controller.package.product.dropdown = {
	filter: async (input, dropdown_id) => {
		event.preventDefault();

		let product = {
			 code: "",
			 name: input.value,
			 color: "",
			 brand: ""
		};

		let properties = ["code", "name", "color", "size"];

		if(product.name.length > 2){
			let products = await Product.filter(product);
			if(!products){ return false; };

			lib.dropdown.render(products, input.id, dropdown_id, "input", "id", properties);
		} else {
			lib.dropdown.render([], input.id, dropdown_id, "input", "id", properties);
		};
	}
};

Product.controller.package.show = async (package_id) => {
	document.getElementById('ajax-loader').style.visibility = 'visible';
	let package = await Product.package.findById(package_id);
	document.getElementById('ajax-loader').style.visibility = 'hidden';
	if(!package){ return false };

	document.getElementById("product-package-id").value = package_id;

	Product.view.package.show(package);

	for(i in package.products){
		let product_info = lib.splitTextBy(package.products[i].product_info, " | ");
		package.products[i].code = product_info[0];
		package.products[i].name = product_info[1];
		package.products[i].color = product_info[2];
		package.products[i].size = product_info[3];
	};

	console.log(package.products);

	Product.package.product.kart.items = package.products;
	Product.package.product.kart.update("code");
	Product.package.product.kart.list("Product.package.product.kart", Product.package.product.kart.props);
};

Product.controller.package.product.update = async () => {
	let package = {
		id: document.getElementById("product-package-id").value,
		products: JSON.stringify(Product.package.product.kart.items)
	};

	document.getElementById('ajax-loader').style.visibility = 'visible';
	package = await Product.package.product.update(package);
	document.getElementById('ajax-loader').style.visibility = 'hidden';
	if(!package){ return false };

	Product.package.product.kart.update("code");
	Product.package.product.kart.list("Product.package.product.kart", Product.package.product.kart.props);
};

Product.controller.package.edit = async (id) => {
	document.getElementById('ajax-loader').style.visibility = 'visible';
	let package = await Product.package.findById(id);
	document.getElementById('ajax-loader').style.visibility = 'hidden';
	if(!package){ return false };

	document.getElementById('product-package-create-form').elements.namedItem("id").value = package.id;
	document.getElementById('product-package-create-form').elements.namedItem("code").value = package.code;
	document.getElementById('product-package-create-form').elements.namedItem("name").value = package.name;
	document.getElementById('product-package-create-form').elements.namedItem("color").value = package.color;
	document.getElementById('product-package-create-form').elements.namedItem("price").value = package.price;
};

Product.controller.package.delete = async (id) => {
	let r = confirm('Deseja realmente excluir o pacote?');
	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		let response = await Product.package.delete(id);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!response){ return false };

		document.getElementById("product-package-show-box").style.display = "none";
		document.getElementById("product-package-filter-form").submit.click();
	};
};

Product.package.product.kart = new lib.kart("product-package-product-kart", "Product.package.product.kart", [{"code":"Código"},{"name":"Nome"},{"color":"Cor"},{"size":"Tamanho"}]);

Product.package.product.kart.add = document.getElementById("product-package-product-kart-form");
if(Product.package.product.kart.add){
	Product.package.product.kart.add.addEventListener("submit", async (event) => {
		event.preventDefault();

		if(!document.getElementById("product-package-product-kart-form").elements.namedItem("product").readOnly){ 
			return alert("Produto inválido");
		};

		let product = document.getElementById("product-package-product-kart-form").elements.namedItem("product");
		let splitedProduct = product.value.split(" | ");
		let amount = document.getElementById("product-package-product-kart-form").elements.namedItem("amount").value;

		if(splitedProduct.length < 3 || !splitedProduct){
			alert("É necessário selecionar um produto.");
			return;
		};

		if(amount < 0.01 || !amount){
			alert("É necessário preencher a quantidade do produto.");
			return;
		};

		product = {
			id: product.dataset.id,
			code: splitedProduct[0],
			name: splitedProduct[1],
			color: splitedProduct[2],
			size: splitedProduct[3],
			amount: parseInt(amount)
		};

		Product.package.product.kart.insert("id", product);
		Product.package.product.kart.update("code");
		Product.package.product.kart.list("Product.package.product.kart", Product.package.product.kart.props);

		document.getElementById("product-package-product-kart-form").elements.namedItem('product').value = "";
		document.getElementById("product-package-product-kart-form").elements.namedItem('product').dataset.id = "";
		document.getElementById("product-package-product-kart-form").elements.namedItem('amount').value = "";
	});
};
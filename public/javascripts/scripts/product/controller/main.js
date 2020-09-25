const Product = {}; 
Product.controller = {};

Product.controller.show = async (product_id) => {
	document.getElementById('ajax-loader').style.visibility = 'visible';
	
	let product = await Product.findById(product_id);
	if(!product){ return false };

	document.getElementById("product-feedstock-box").style.display = "none";
	document.getElementById("product-show-box").style.display = "block";

	Product.view.info(product, "product-info-table", "product-info-title");
	
	const pagination = { pageSize: 1, page: 0 };
	$(() => { lib.carousel.execute("product-image-box", Product.view.image.show, product.images, pagination); });
	
	document.getElementById('ajax-loader').style.visibility = 'hidden';
};

Product.controller.edit = async (id) => {
	let product = await Product.findById(id);
	if(!product){ return false };

	document.getElementById('product-create-form').elements.namedItem("id").value = product.id;
	document.getElementById('product-create-form').elements.namedItem("name").value = product.name;
	document.getElementById('product-create-form').elements.namedItem("code").value = product.code;
	document.getElementById('product-create-form').elements.namedItem("color").value = product.color;
	document.getElementById('product-create-form').elements.namedItem("size").value = product.size;
};

document.getElementById("product-filter-form").addEventListener("submit", async (event) => {
	event.preventDefault();
	document.getElementById('ajax-loader').style.visibility = 'visible';

	let product = {
		name: event.target.elements.namedItem("name").value,
		code: event.target.elements.namedItem("code").value,
		color: event.target.elements.namedItem("color").value
	};

	let products = await Product.filter(product.code, product.name, product.color);

	const pagination = { pageSize: 10, page: 0};
	if(event.target.elements.namedItem("location").value == "product-manage"){
		$(() => { lib.carousel.execute("product-manage-filter-box", Product.view.manage.filter, products, pagination); });
	} else if(event.target.elements.namedItem("location").value == "production-product"){
		Product.view.fillSelect(products, "production-product-select");
	};

	document.getElementById('ajax-loader').style.visibility = 'hidden';
});

Product.controller.delete = async (id) => {
	let r = confirm('Deseja realmente excluir o produto?');
	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		
		if(!await Product.delete(id)){ return false };
		
		document.getElementById("product-filter-form").submit.click();
		
		document.getElementById('ajax-loader').style.visibility = 'hidden';
	};
};

Product.controller.manage = {
	show: async (product_id) => {
		document.getElementById('ajax-loader').style.visibility = 'visible';

		document.getElementById("product-feedstock-add-form").elements.namedItem("id").value = "";
		document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_id").disabled = false;
		
		document.getElementById('product-manage-image-box').style.display = 'block';
		document.getElementById("product-manage-info-box").style.display = "block";
		document.getElementById("product-manage-menu-box").style.display = "block";
		
		document.getElementById("product-feedstock-box").style.display = "none";
		document.getElementById("product-feedstock-add-box").style.display = "none";

		let product = await Product.findById(product_id);
		if(!product){ return false };

		Product.view.manage.menu(product);
		Product.view.manage.info(product, "product-manage-info-title", "product-manage-info-table");
		
		const pagination = { pageSize: 1, page: 0 };
		$(() => { lib.carousel.execute("product-manage-image-div", Product.view.image.manage.show, product.images, pagination); });

		document.getElementById('ajax-loader').style.visibility = 'hidden';
	}
};
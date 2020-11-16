Product.income.controller.image = {};

Financial.income.controller.image.add = async (product_id) => {
	let image_url = prompt("Preencha com a URL da imagem");
	if(image_url){
		if(image_url.length < 7){
			return alert('URL inválida!');
		};
		if(image_url.length > 200){
			return alert('URL inválida!');
		};

		let img = '<img src="'+ image_url +'"/>';

		$(img).on("load", async () =>  {
			document.getElementById('ajax-loader').style.visibility = 'visible';

			if(!await Product.image.add(product_id, image_url)){ return false };

			await Financial.income.controller.show(product_id);

			document.getElementById('ajax-loader').style.visibility = 'hidden';
		}).bind('error', () => {
			return alert('URL inválida!');
		});
	};
};

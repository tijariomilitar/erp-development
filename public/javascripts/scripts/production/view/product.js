Product.view = {
	fillSelect: (products, select) => {
		select.innerHTML = "";
		if(products.length){
			for(i in products){
				select.innerHTML += "<option value='"+products[i].id+"'>"+products[i].code+" | "+products[i].name+" | "+products[i].color+" | "+products[i].size+"</option>"
			};
		} else {
			select.innerHTML += "<option value=''>Sem resultados</option>"
		};
	}
};
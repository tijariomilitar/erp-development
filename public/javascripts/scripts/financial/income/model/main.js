Financial.income = {};

Financial.income.save = async (income) => {
	let response = await fetch("/financial/income/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(income)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.income;
};

Financial.income.findById = async (income_id) => {
	let response = await fetch("/financial/income/id/"+income_id);
	response = await response.json();
	if(API.verifyResponse(response)){ return false };

	return response.income[0];
};

Financial.income.filter = async (income) => {
	let response = await fetch("/financial/income/filter?periodStart="+income.periodStart+"&periodEnd="+income.periodEnd+"&category_id="+income.category_id+"&origin_id="+income.origin_id);
	response = await response.json();
	if(API.verifyResponse(response)){ return false };

	return response.incomes;
};

// Product.filter = async (product) => {
// 	let response = await fetch("/product/filter?code="+product.code+"&name="+product.name+"&color="+product.color+"&size="+product.size+"&brand="+product.brand);
// 	response = await response.json();

// 	if(API.verifyResponse(response)){ return false };

// 	return response.products;
// };
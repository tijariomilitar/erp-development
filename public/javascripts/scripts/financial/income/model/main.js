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
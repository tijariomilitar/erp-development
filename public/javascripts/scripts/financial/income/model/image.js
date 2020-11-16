Financial.income.image = {
	add: async (income_id, image_url) => {
		let response = await fetch("/financial/income/image/add", {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
		    body: JSON.stringify({ income_id: income_id, image_url: image_url })
		});
		response = await response.json();

		if(API.verifyResponse(response)){ return false };
		alert(response.done);

		return income_id;
	},
	remove: async (image_id) => {
		let response = await fetch("financial/income/image/remove?image_id="+image_id, { method: 'DELETE' });
		response = await response.json();

		if(API.verifyResponse(response)){ return false };
		alert(response.done);
		
		return true;
	}
};
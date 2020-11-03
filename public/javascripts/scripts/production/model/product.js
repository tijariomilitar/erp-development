// External API
<<<<<<< HEAD
const Product = {};

=======
>>>>>>> 190ebb0ca4e9abc67f2cf498c6fce6b3efb720a8
Product.filter = async (product) => {
	let response = await fetch("/product/filter?name="+product.name+"&code="+product.code+"&color="+product.color);
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.products;
};
const db = require('../../config/connection');
const lib = require('../../config/lib');

const Sale = function(){
	this.id;
	this.sale_date;
	this.estimated_shipping_date;
	this.shipment_date;
	this.customer_id;
	this.customer_name;
	this.customer_cnpj;
	this.payment_method;
	this.status;
	this.value;
};

Sale.save = async sale => {
	let query = "INSERT INTO cms_wt_erp.sale (sale_date, estimated_shipping_date, shipment_date, customer_id, customer_name, customer_cnpj, customer_address_id, payment_method, status, value) VALUES ('"
		+sale.sale_date+"', '"
		+sale.estimated_shipping_date+"','"
		+sale.shipment_date+"','"
		+sale.customer_id+"','"
		+sale.customer_name+"','"
		+sale.customer_cnpj+"','"
		+sale.customer_address_id+"','"
		+sale.payment_method+"','"
		+sale.status+"','"
		+sale.value+"');";
	return db(query);
};

Sale.filter = (periodStart, periodEnd, params, values) => {
	let query = lib.filterByLikeAndByPeriod(periodStart, periodEnd, params, values, "sale_date", "cms_wt_erp", "sale", "id", "DESC");
	return db(query);
};

Sale.findById = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.sale WHERE id='"+id+"';";
	return db(query);
};

Sale.product = {
	save: async (sale_id, product) => {
		let query = "INSERT INTO cms_wt_erp.sale_product (sale_id, product_id, product_info, product_amount, product_price) VALUES ('"
			+sale_id+"', '"
			+product.id+"','"
			+product.info+"','"
			+product.amount+"','"
			+product.price+"');";
		return db(query);	
	},
	list: async (sale_id) => {
		let query = "SELECT * FROM cms_wt_erp.sale_product WHERE sale_id='"+sale_id+"';";
		return db(query);		
	}
};

Sale.package = {
	save: async (sale_id, package) => {
		let query = "INSERT INTO cms_wt_erp.sale_package (sale_id, name, color, amount, price) VALUES ('"
			+sale_id+"', '"
			+package.name+"','"
			+package.color+"','"
			+package.amount+"','"
			+package.price+"');";
		return db(query);
	},
	list: async (sale_id) => {
		let query = "SELECT * FROM cms_wt_erp.sale_package WHERE sale_id='"+sale_id+"';";
		return db(query);
	},
	product: {
		add: async (sale_id, package_id, product) => {
			let query = "INSERT INTO cms_wt_erp.sale_package_product (sale_id, package_id, product_id, product_code, product_info, amount) VALUES ('"
				+sale_id+"', '"
				+package_id+"','"
				+product.product_id+"','"
				+product.product_code+"','"
				+product.product_info+"','"
				+product.amount+"');";
			return db(query);	
		},
		list: async (sale_id) => {
			let query = "SELECT * FROM cms_wt_erp.sale_package_product WHERE sale_id='"+sale_id+"';";
			return db(query);
		}
	}
};

module.exports = Sale;
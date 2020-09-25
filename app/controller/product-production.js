const User = require('../model/user');
const userController = require('./user');

const lib = require('../../config/lib');

const Product = require('../model/product');
const Feedstock = require('../model/feedstock');

const productController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'man'])){
			return res.redirect("/");
		};

		try{
			const feedstockColors = await Feedstock.colorList();
			const productColors = await Product.colorList();
			res.render('product/index', { productColors, feedstockColors, user: req.user });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		};
	},
	manage: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'man','COR-GER'])){
			return res.redirect("/");
		};

		try {
			const feedstockColors = await Feedstock.colorList();
			const productColors = await Product.colorList();
			res.render('product/manage', { productColors, feedstockColors, user: req.user });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		};
	},
	save: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		const product = {
			id: parseInt(req.body.id),
			code: parseInt(req.body.code),
			name: req.body.name,
			color: req.body.color,
			size: req.body.size
		};

		if(!product.code || product.code < 1 || product.code > 9999){return res.send({ msg: 'Código de produto inválido.' })};
		if(!product.name || product.name.length > 30){return res.send({ msg: 'Preencha o nome do produto.' })};
		if(!product.color || product.color.length > 10){return res.send({ msg: 'Preencha a cor do produto.' })};
		if(!product.size || product.size.length > 3){return res.send({ msg: 'Preencha o tamanho do produto.' })};

		try {
			if(!product.id){
				var row = await Product.findByCode(product.code);
				if(row.length){return res.send({ msg: 'Este código de produto já está cadastrado.' })};
				
				var row = await Product.save(product);
				let newProduct = await Product.findById(row.insertId);
				res.send({ done: 'Produto cadastrado com sucesso!', product: newProduct });
			} else {
				var row = await Product.findByCode(product.code);
				if(row.length){
					if(row[0].id != product.id){
						return res.send({ msg: 'Este código de produto já está cadastrado.' });
					};
				};
				
				var row = await Product.update(product);
				let newProduct = await Product.findById(row.insertId);
				res.send({ done: 'Produto atualizado com sucesso!', product: newProduct });
			};
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao cadastrar o produto." });
		};
	},
	list: async (req, res) => {
		// if(!await userController.verifyAccess(req, res, ['adm','man','n/a','COR-GER'])){
		// 	return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		// };

		try {
			const products = await Product.list();
			res.send({ products });
		} catch (err){
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao listar os produtos." });
		};
	},
	findById: async (req, res) => {
		// if(!await userController.verifyAccess(req, res, ['adm', 'n/a'])){
		// 	return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		// };

		try {
			const product = await Product.findById(req.params.id);
			if(product.length){
				product[0].images = await Product.image.list(product[0].id);
			};
			res.send({ product });
		} catch (err){
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao buscar produto, favor contatar o suporte." });
		};
	},
	findByCode: async (req, res) => {
		// if(!await userController.verifyAccess(req, res, ['adm','man','n/a'])){
		// 	return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		// };

		try {
			const product = await Product.findByCode(req.params.code);
			if(product.length){
				product[0].images = await Product.image.list(product[0].id);
			};
			res.send({ product });
		} catch (err){
			console.log(err);
			res.send({ msg: err });
		};
	},
	findByName: async (req, res) => {
		// if(!await userController.verifyAccess(req, res, ['adm','man','n/a'])){
		// 	return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		// };

		try {
			let products = await Product.findByName(req.query.name);
			if(products.length){
				products[0].images = await Product.image.list(products[0].id);
				products[0].feedstocks = await Product.getFeedstocks(product[0].id);
			};
			res.send({ products });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao encontrar o produto." });
		};
	},
	filter: async (req, res) => {
		// if(!await userController.verifyAccess(req, res, ['adm', 'n/a'])){
			// return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		// };

		var params = [];
		var values = [];

		if(isNaN(req.query.code) || req.query.code < 0 || req.query.code > 9999){
			req.query.code = "";
		};

		if(req.query.code){
			params.push("code");
			values.push(req.query.code);
		};

		if(req.query.color){
			params.push("color");
			values.push(req.query.color);
		};
		try {
			if(req.query.name){
				const products = await Product.filter(req.query.name, params, values);
				res.send({ products });
			} else {
				const products = await Product.filter(false, params, values);
				res.send({ products });
			};
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao filtrar os produtos." });
		};
	},
	remove: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			await Product.feedstock.removeByProductId(req.query.id);
			await Product.image.removeAll(req.query.id);
			await Product.remove(req.query.id);
			res.send({ done: 'Produto excluído com sucesso!' });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao remover o produto, favor entrar em contato com o suporte." });
		};
	},
	image: {
		add: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','n/a'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			const image = {
				product_id: req.query.product_id,
				url: req.query.image_url
			};

			try {
				await Product.image.add(image);
				res.send({ done: 'Imagem adicionada com sucesso!' });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao incluir a imagem, favor contatar o suporte." });
			};
		},
		remove: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			try {
				await Product.image.remove(req.query.id);
				res.send({ done: 'Imagem excluída!' });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao remover a imagem do produto, favor contatar o suporte." });
			};
		}
	},
	feedstock: {
		add: async(req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','COR-GER'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			const insertion = {
				id: req.body.id,
				product_id: req.body.product_id,
				feedstock_id: req.body.feedstock_id,
				amount: parseFloat(req.body.feedstock_amount)
			};

			try {
				if(!insertion.id || insertion.id < 1){
					await Product.feedstock.add(insertion);
					res.send({ done: "Matéria-Prima adicionada com sucesso." });
				} else {
					await Product.feedstock.update(insertion);
					res.send({ done: "Matéria-Prima atualizada com sucesso." });
				};
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao cadastrar a matéria-prima, favor contatar o suporte." });
			};
		},
		list: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','COR-GER'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			try {
				var feedstocks = [];
				const product_feedstocks = await Product.feedstock.list(req.params.id);
				for(i in product_feedstocks){
					var feedstock = await Feedstock.findById(product_feedstocks[i].feedstock_id);
					feedstocks.push(feedstock[0]);
				};
				res.send({ product_feedstocks, feedstocks });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao listar as matérias-primas do produto, favor contatar o suporte." });
			};
		},
		remove: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','COR-GER'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			try {
				await Product.feedstock.remove(req.query.id);
				res.send({ done: 'Matéria-prima excluída!' });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao remover a matéria-prima." });
			};
		}
	},
	categorySave: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		const category = {
			name: req.body.product_category_name,
			shortcut: req.body.product_category_shortcut
		};

		try {
			await Product.categorySave(category);
			res.send({ done: 'Categoria cadastrada com sucesso!' });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao cadastrar a categoria." });
		};

	},
	categoryList: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','n/a'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			const categories = await Product.categoryList();
			res.send({ categories });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao listar categorias." });
		};
	},
	colorSave: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		const color = {
			name: req.body.color_name,
			shortcut: req.body.color_shortcut			
		};

		try {
			await Product.colorSave(color);
			res.send({ done: 'Cor cadastrada com sucesso!' });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao salvar a cor, favor contatar o suporte." });
		};
	},
	colorList: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man','n/a'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};
	
		try {
			const colors = await Product.colorList();
			res.send(colors);
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao listar as cores, favor contatar o suporte." });
		};
	},
	production: {
		index: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','COR-GER'])){
				return res.redirect("/");
			};

			try {
				const productColors = await Product.colorList();
				const feedstockStorages = await Feedstock.storageList();
				res.render('product/production', { user: req.user, productColors, feedstockStorages });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao acessar esta área, favor contatar o suporte." });
			};
		},
		simulation: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','cut','COR-GER'])){
				return res.redirect("/");
			};

			try {
				const productColors = await Product.colorList();
				const feedstockStorages = await Feedstock.storageList();
				res.render('product/production_simulate', { user: req.user, productColors, feedstockStorages });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao acessar esta área, favor contatar o suporte." });
			};
		},
		manage: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','COR-GER'])){
				return res.redirect("/");
			};

			res.render('product/production_manage', { user: req.user });
		},
		simulate: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','cut','COR-GER'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			const production = {
				storage_id: req.body.storage_id,
				products: JSON.parse(req.body.products),
				feedstocks: {
					enough: [],
					notEnough: []
				}
			};

			try {
				let product_feedstocks_array = [];
				for(i in production.products){
					let product_feedstocks = await Product.feedstock.list(production.products[i].id);
					for(j in product_feedstocks){
						product_feedstocks_array.push(product_feedstocks[j]);
						production.products[i].feedstocks.push(product_feedstocks[j]);
					};
				};

				product_feedstocks_array = production.products.reduce((array, production_product) => {
					for(i in array){
						if(array[i].product_id == production_product.id){
							array[i].amount = array[i].amount * production_product.amount;
						};
					};
					return array;
				}, product_feedstocks_array);

				let production_feedstocks = [];
				production_feedstocks = product_feedstocks_array.reduce((array, feedstock) => {
					for(i in array){
						if(array[i].feedstock_id == feedstock.feedstock_id){
							array[i].amount += feedstock.amount;
							return array;
						};
					};
					array.push(feedstock);
					return array;
				}, production_feedstocks);

				for(i in production_feedstocks){
					// needed to create a variable to handle async problem down in next coment
					let feedstockAmount = production_feedstocks[i].amount;
					let feedstock = await Feedstock.findById(production_feedstocks[i].feedstock_id);
					let storage_feedstock = await Feedstock.findInStorage(['storage_id', 'feedstock_id'], [production.storage_id, feedstock[0].id]);
					// if use production_feedstocks[i].amount instead variable the value is broken
					feedstock[0].amount = feedstockAmount;
					feedstock[0].amountInStorage = storage_feedstock[0].amount;
					
					if(feedstock[0].uom == 'cm'){
						feedstock[0].standardAmount = Math.round(feedstock[0].amount / feedstock[0].standard);
						feedstock[0].releasedAmount = feedstock[0].standard * feedstock[0].standardAmount;
						if(feedstock[0].standardAmount > feedstock[0].amountInStorage / feedstock[0].standard){
							production.feedstocks.notEnough.push(feedstock[0]);
						} else {
							production.feedstocks.enough.push(feedstock[0]);
						};
					} else {
						feedstock[0].standardAmount = feedstock[0].amount;
						feedstock[0].releasedAmount = feedstock[0].amount;
						if(feedstock[0].standardAmount > feedstock[0].amountInStorage){
							production.feedstocks.notEnough.push(feedstock[0]);
						} else {
							production.feedstocks.enough.push(feedstock[0]);
						};
					};
				};

				res.send({ production });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao simular a produção." });			
			};
		},
		save: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			const production = {
				date: lib.genPatternDate(),
				full_date: lib.genFullDate(),
				storage_id: req.body.storage_id,
				user: req.user.name,
				products: JSON.parse(req.body.products),
				feedstocks: {
					enough: [],
					notEnough: []
				}
			};
			try {
				//Verify if last production is already confirmed
				// const lastProduction = await Product.production.findLast();

				// if(lastProduction.length && lastProduction[0].status == "Pedido solicitado"){
				// 	return res.send({ msg: "O último pedido ainda não foi confirmado, favor confirmá-lo ou cancelá-lo antes de solicitar outra produção." });
				// };

				let product_feedstocks_array = [];
				for(i in production.products){
					let product_feedstocks = await Product.feedstock.list(production.products[i].id);
					for(j in product_feedstocks){
						product_feedstocks_array.push(product_feedstocks[j]);
						production.products[i].feedstocks.push(product_feedstocks[j])
					};
				};

				product_feedstocks_array = production.products.reduce((array, production_product) => {
					for(i in array){
						if(array[i].product_id == production_product.id){
							array[i].amount = array[i].amount * production_product.amount;
						};
					};
					return array;
				}, product_feedstocks_array);

				let production_feedstocks = [];
				production_feedstocks = product_feedstocks_array.reduce((array, feedstock) => {
					for(i in array){
						if(array[i].feedstock_id == feedstock.feedstock_id){
							array[i].amount += feedstock.amount;
							return array;
						};
					};
					array.push(feedstock);
					return array;
				}, production_feedstocks);

				for(i in production_feedstocks){
					// needed to create a variable to handle async problem down in next coment
					let feedstockAmount = production_feedstocks[i].amount;
					let feedstock = await Feedstock.findById(production_feedstocks[i].feedstock_id);
					let storage_feedstock = await Feedstock.findInStorage(['storage_id', 'feedstock_id'], [production.storage_id, feedstock[0].id]);
					// if use production_feedstocks[i].amount instead variable the value is broken
					feedstock[0].amount = feedstockAmount;
					feedstock[0].amountInStorage = storage_feedstock[0].amount;
					
					if(feedstock[0].uom == 'cm'){
						feedstock[0].standardAmount = Math.round(feedstock[0].amount / feedstock[0].standard);
						feedstock[0].releasedAmount = feedstock[0].standard * feedstock[0].standardAmount;
						if(feedstock[0].standardAmount > feedstock[0].amountInStorage / feedstock[0].standard){
							production.feedstocks.notEnough.push(feedstock[0]);
						} else {
							production.feedstocks.enough.push(feedstock[0]);
						};
					} else {
						feedstock[0].standardAmount = feedstock[0].amount;
						feedstock[0].releasedAmount = feedstock[0].amount;
						if(feedstock[0].standardAmount > feedstock[0].amountInStorage){
							production.feedstocks.notEnough.push(feedstock[0]);
						} else {
							production.feedstocks.enough.push(feedstock[0]);
						};
					};
				};

				if(production.feedstocks.notEnough.length){
					return res.send({ msg: "Não há matéria-prima suficiente para produzir todos os produtos.", production });
				} else if(!production.products.length){
					return res.send({ msg: "É necessário incluir ao menos 1 produto para solicitar produção." });
				} else {
					const production_saved = await Product.production.save(production);
					for(i in production.products){
						let product = {
							id: production.products[i].id,
							info: production.products[i].name +" | "+ production.products[i].color +" | "+ production.products[i].size,
							amount: production.products[i].amount
						};
						await Product.production.product.add(production_saved.insertId, product);
					};
					for(i in production.feedstocks.enough){
						let feedstock = {
							id: production.feedstocks.enough[i].id,
							info: production.feedstocks.enough[i].code +" | "+production.feedstocks.enough[i].name +" | "+ production.feedstocks.enough[i].color,
							uom: production.feedstocks.enough[i].uom,
							amount: production.feedstocks.enough[i].amount,
							standardAmount: production.feedstocks.enough[i].standardAmount,
							releasedAmount: production.feedstocks.enough[i].releasedAmount
						};
						await Product.production.feedstock.add(production_saved.insertId, feedstock);
					};
					res.send({ done: "Produção solicitada com sucesso, vá em 'Matéria-Prima > Estoque' para confirmar a saída." })
				};
			} catch (err){
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao solicitar produção." });
			};
		},
		filter: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','sto','cut','COR-GER'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			let params = [];
			let values = [];

			if(req.body.product_production_periodStart && req.body.product_production_periodEnd){
				var periodStart = req.body.product_production_periodStart;
				var periodEnd = req.body.product_production_periodEnd;
			} else {
				var periodStart = "";
				var periodEnd = "";
			};

			if(req.body.product_production_status){
				params.push("status");
				values.push(req.body.product_production_status);
			};

			try{
				const productions = await Product.production.filter(periodStart, periodEnd, params, values);
				res.send({ productions });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao filtrar as produções, favor contatar o suporte." });
			};
		},
		confirm: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','cut','COR-GER'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			var option = {
				production_id: req.body.production_id,
				storage_id: req.body.storage_id,
				user: req.user.name
			};

			try {
				await Product.production.confirm(option);
				const production_feedstocks = await Product.production.feedstock.list(option.production_id);
				for(i in production_feedstocks){
					var option = {
						feedstock_id: production_feedstocks[i].feedstock_id,
						storage_id: req.body.storage_id,
						amount: production_feedstocks[i].releasedAmount
					};
					await Feedstock.decreaseStorageFeedstockAmount(option);
				};
				res.send({ done: "Produção confirmada com sucesso." });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Erro ao confirmar a produção, favor contatar o suporte," });
			};
		},
		cancel: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			var option = {
				production_id: req.body.production_id,
				storage_id: req.body.storage_id,
				user: req.user.name
			};

			try {
				await Product.production.cancel(option);
				res.send({ done: "Produção cancelada com sucesso." });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Erro ao cancelar a produção, favor contatar o suporte," });
			};
		},
		findById: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','sto','cut','COR-GER'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			try {
				const production = await Product.production.findById(req.params.id);
				const production_products = await Product.production.product.list(req.params.id)
				const production_feedstocks = await Product.production.feedstock.list(req.params.id)
				for(i in production_feedstocks){
					let feedstock = await Feedstock.findById(production_feedstocks[i].feedstock_id);
					production_feedstocks[i].feedstock_standard = feedstock[0].standard;
				};
				res.send({ production, production_products, production_feedstocks });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Erro ao encontrar a produção" });
			};
		},
	}
};

module.exports = productController;
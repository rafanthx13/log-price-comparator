module.exports = (app) => {

		const { DuplicateError } = app.errors.messages;
		const { exist } = app.errors.functions;

		const getAll = () => {
			return app.db('product').select()
		};

		const getAllProductsOnlyName = () => {
			return app.db('product').select('name').orderBy('name', 'asc')
		};

		const getAllproductsByCity = (city) => {
			return app.db('product').select('name').where({ 'city': city }).orderBy('name', 'asc')
		};

		const save = async (product) => {
			const productInBD = await app.db('product').where({ name: product.name}).first()
			if(exist(productInBD))
				throw new DuplicateError(`Product '${product.name}' already exists in the database.`);

			return app.db('product').insert(product);
		};

		const update = (id, product) => {
			return app.db('product').where({ product_id: id}).update(product, '*')
		};

		const remove = (id) => {
			return app.db('product').where({ city_id: id}).del();
		};

		return { getAll, getAllProductsOnlyName,
		 save, update, remove };
}
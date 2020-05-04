module.exports = (app) => {

		const getAll = () => {
			return app.db('shop').select()
		};

		const getOnlyShop = () => {
			return app.db('shop').select('shop').orderBy('shop', 'desc')
		};

		const getShopByCity = (city) => {
			return app.db('shop').where({ city }).select('name').orderBy('name', 'desc')
		};

		const save = (shop) => {
			return app.db('shop').insert(shop);
		};

		const update = (id, shop) => {
			return app.db('shop').where({ shop_id: id}).update(shop, '*')
		};

		const remove = (id) => {
			return app.db('shop').where({ shop_id: id}).del();
		};

		return { getAll, getOnlyShop, getShopByCity, save, update, remove };
}
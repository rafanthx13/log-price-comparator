module.exports = (app) => {

		const getAll = () => {
			return app.db('city').select()
		};

		const getOnlyCity = () => {
			return app.db('city').select('city').orderBy('city', 'asc')
		};

		const getAllShopsByCity = (city) => {
			return app.db('city').select('city').where({ 'city': city }).orderBy('city', 'asc')
		};

		const save = (city) => {
			return app.db('city').insert(city);
		};

		const update = (id, city) => {
			return app.db('city').where({ city_id: id})
		};

		const remove = (id) => {
			return app.db('city').where({ city_id: id}).del();
		};

		return { getAll, getOnlyCity, getAllShopsByCity, save, update, remove };
}
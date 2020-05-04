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

		const findCityByName = (city) => {
			// NAO DEETEA: OS INSERT RETORNANO ID QUANDO TEM
			return app.db('city').where({ city }).select().first();
		};

		const save = (city) => {
			// insert retorna Array de ID , uma para cada insert, como só temos um, é só no [0]
			// O inser no MYSQL volta somente o ID do que foi criado, mas nada, nâo tem como mandar mais ndada
			return app.db('city').insert(city).then( id => {
				return { ...city, city_id : id[0] }
			})
		};

		const update = (id, city) => {
			// No MySQL retorna [1] ou [0] para o update, nâo tem como retornar o ID ou os dados a nâo ser que faça uma pesquisa denovo
			return app.db('city').where({ city_id: id}).update(city)
		};

		const remove = (id) => {
			return app.db('city').where({ city_id: id}).del();
		};

		return { getAll, getOnlyCity, getAllShopsByCity, 
			findCityByName, save, update, remove };
}
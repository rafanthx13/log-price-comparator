module.exports = (app) => {

		const { ValidateError, DuplicateError, 
			NotFoundError } = app.errors.messages;
		const { verifyDTO, exist, 
			verifyUpdateDTO } = app.errors.functions;

		let city_dto = ['city', 'state', 'country'];

		const getAll = () => {
			return app.db('city').select()
		};

		const getOnlyCity = () => {
			return app.db('city').select('city').orderBy('city', 'asc')
		};

		// to Test
		const findCityByName = (city) => {
			return app.db('city').where({ city }).select().first();
		};

		const save = async (city) => {
			let [isValid, msg] = verifyDTO(city, city_dto)
			if(!isValid)
				throw new ValidateError(msg)

			if( await checkExistCity(city.city))
				throw new DuplicateError(`City '${city.city}' already exists in the database.`);

			return app.db('city').insert(city).then( id => {
				return { city_id : id[0] , ...city }
			})
		};

		const checkExistCity = async (city_name) => {
			let cityInBD = await app.db('city').where({ city: city_name}).first()
			return exist(cityInBD)
		};

		const update = async (id, city) => {

			let [isValid, msg] = verifyUpdateDTO(city, city_dto)
			if(!isValid)
				throw new ValidateError(msg)

			if(await checkExistCity(city.city))
				throw new DuplicateError(`City '${city.city}' already exists in the database.`);

			return app.db('city').where({ city_id: id}).update(city)
				.then( wasUpdated => {
					if(!wasUpdated)
						throw new NotFoundError(`City Not Found`)
					else
						return { city_id: id, ...city }
				});
		};

		const remove = (id) => {
			return app.db('city').where({ city_id: id}).del()
				.then( wasDeleted => {
					if(!wasDeleted)
						throw new NotFoundError(`City Not Found`)
					return wasDeleted
				})
		};

		return { getAll, getOnlyCity, findCityByName,
			save, update, remove };
}


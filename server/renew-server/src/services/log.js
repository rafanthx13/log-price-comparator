module.exports = (app) => {

		const getAllFormatedLogs = () => {
			return app.db.raw(`SELECT log_id, product, 
    REPLACE( REPLACE( REPLACE( FORMAT(price, 2), ',', '$'), '.', ','), '$', '.') as price,
    shop, city, date FROM log`);
		};

		const getAllLogsByCityShop = (product, city) => {
			return app.db('log').where({ product: product, city : city }).select()
		};

		const save = (log) => {
			return app.db('log').insert(log);
		};

		const update = (id, log) => {
			return app.db('log').where({ log_id: id}).update(log, '*')
		};

		const remove = (id) => {
			return app.db('log').where({ city_id: id}).del();
		};

		return { getAllFormatedLogs, getAllLogsByCityShop,
		 save, update, remove };
}
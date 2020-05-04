module.exports = (app) => {

    const getSaldo = (userId) => {
    	// Peço somatorio das t.ammount de t.'transactions' e acc.'accounts' onde t.acc_id == acc.id
    	// Vou buscar por um userID, para as row de transactions que estejam com 'status: true'
    	// COm a data menor do que hoje (para nâo considerar dados do futuro)
    	// Agrupado por cada id (groupBy combina com SUM)
    	// Ordenado por id (Sem essa ordenação, pode ter problema nos expects dos tests de balcne por você considerar a ordem
    	// Lá 10100 vem sempre na frente de 10101)
        return app.db('transactions as t').sum('ammount')
            .join('accounts as acc', 'acc.id', '=', 't.acc_id')
            .where({user_id: userId, status: true})
            .where('date', '<=', new Date())
            .select('acc.id')
            .groupBy('acc.id')
            .orderBy('acc.id');
    };

    return { getSaldo };

    // const getSaldo = (userId) => {
    //     return app.db('transactions as t').sum('ammount')
    //         .join('accounts as acc', 'acc.id', '=', 't.acc_id')
    //         .where({user_id: userId, status: true})
    //         .where('date', '<=', new Date())
    //         .select('acc.id')
    //         .groupBy('acc.id')
    //         .orderBy('acc.id');
    // };

};
const ValidationError = require('../errors/ValidationError');

module.exports = (app) => {

    const find = (filter = {}) => {
      return app.db('transfers').where(filter).select();
    };

    const findOne = (filter = {}) => {
        return app.db('transfers').where(filter).select().first();
    };

    // chamado nas rotas
    const validate = async (transfer) => {
        if (!transfer.description) 
            throw new ValidationError('Descrição é um atributo obrigatório');
        if (!transfer.ammount) 
            throw new ValidationError('Valor é um atributo obrigatório');
        if (!transfer.date) 
            throw new ValidationError('Data é um atributo obrigatório');
        if (!transfer.acc_ori_id) 
            throw new ValidationError('Conta de origem é um atributo obrigatório');
        if (!transfer.acc_dest_id) 
            throw new ValidationError('Conta de destino é um atributo obrigatório');
        if (transfer.acc_ori_id === transfer.acc_dest_id) 
            throw new ValidationError('Não é possível transferir de uma conta para ela mesma');

        const accounts = await app.db('accounts').whereIn('id', [transfer.acc_dest_id, transfer.acc_ori_id]);
        accounts.forEach(acc => {
            if (acc.user_id !== parseInt(transfer.user_id, 10)) {
                throw new ValidationError(`Conta ${acc.id} não pertecem ao usuário`);
            }
        });
    }

    const save = async (transfer) => {
        // Slava uma tranferencia
        const trans = await app.db('transfers').insert(transfer, '*');
        const transId = trans[0].id;
        // Por consequencia, deve salvar duas transaçoes
        const transactions = [
            {description: `Transfer to acc #${transfer.acc_dest_id}`, date: transfer.date, ammount: transfer.ammount * -1,
             type: '0', acc_id: transfer.acc_ori_id, transfer_id: transId, status: true},
            {description: `Transfer from acc #${transfer.acc_ori_id}`, date: transfer.date, ammount: transfer.ammount,
             type: '1', acc_id: transfer.acc_dest_id, transfer_id: transId, status: true}
        ];
        await app.db('transactions').insert(transactions);
        return trans;
    };

    const update = async (id, transfer) => {
        // ALtera a tranferencia
        const result = await app.db('transfers').where({id}).update(transfer, '*');
        // Vai deletar as transactiona anteriores e insereir novas atualizadas (erra é uma estrategia possivel)
        const transactions = [
            {description: `Transfer to acc #${transfer.acc_dest_id}`, date: transfer.date, ammount: transfer.ammount * -1,
             type: '0', acc_id: transfer.acc_ori_id, transfer_id: id, status: true},
            {description: `Transfer from acc #${transfer.acc_ori_id}`, date: transfer.date, ammount: transfer.ammount,
             type: '1', acc_id: transfer.acc_dest_id, transfer_id: id, status: true}
        ];
        await app.db('transactions').where({transfer_id: id}).del();
        await app.db('transactions').insert(transactions);
        return result;
    };

    const remove = async (id) => {
        await app.db('transactions').where({transfer_id: id}).del();
        return app.db('transfers').where({id}).del();
    }

    return {find, save, findOne, update, validate, remove};

};
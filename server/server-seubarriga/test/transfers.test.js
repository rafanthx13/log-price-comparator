const request = require('supertest');
const app = require('../src/app');

/* Token gerado pelo https://jwt.io */
// como graças ao seed eu jasei quais dados ja foram gerados
// gerado por payload: {id: -1, name: 'User #1', mail: 'user1@mail.com'} de 'src/seed/tranfer.js'
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6LTEsIm5hbWUiOiJVc2VyICMxIiwibWFpbCI6InVzZXIxQG1haWwuY29tIn0.W6jmuFPwZOhQfhBo15kBUfqWCS4UtpiJQ1f7m6q_4xs';

const MAIN_ROUTE = '/v1/transfers';

// Meu tests deve aplicar o ssed para poder funcionar
beforeAll(async () => {
		/* opcional limpar a base, porém, afeta o desempenho do teste */
		// deve exexutar isso antes de fzzer uma 'um latest com tudoS', faça varios roolbacks até cehgar o maximo e depois um unico 'latest'
		// assim, esse latests que vai ser gerado por uns varios arquivos e tudo isso sera contado como uma migration so
		// await app.db.migrate.rollback(); // node_modules/.bin/knex migrate:rollback --env test
		// await app.db.migrate.latest(); // node_modules/.bin/knex migrate:latest --env test
		await app.db.seed.run(); // node_modules/.bin/knex seed:run --env test
});

/* Test 1) Funciona

*/
test('Deve listar apenas as transferências do usuário', () => {
		return request(app).get(MAIN_ROUTE)
				.set('authorization', `bearer ${TOKEN}`)
				.then(res => {
						expect(res.status).toBe(200);
						expect(res.body).toHaveLength(1);
						expect(res.body[0].description).toBe('Transfer #1');
				});
});


/* Test 2)

*/
test('Deve inserir uma tranferência com sucesso', () => {
	return request(app).post(MAIN_ROUTE)
		.set('authorization', `bearer ${TOKEN}`)
		.send({description: 'Regular Transfer', user_id: -1, acc_ori_id: -1, acc_dest_id: -2, ammount: 100, date: new Date()})
		.then(async res => {
			// eu tenho que validar tanto 'transfer' como 'transactions'
				// validando uma 'transfers'
				expect(res.status).toBe(201);
				expect(res.body.description).toBe('Regular Transfer');
				// validando as duas transactions que sao resultado de uma 'transfers'
				const transactions = await app.db('transactions').where({transfer_id: res.body.id});
				expect(transactions).toHaveLength(2);
				expect(transactions[0].description).toBe('Transfer to acc #-2');
				expect(transactions[1].description).toBe('Transfer from acc #-1');
				expect(transactions[0].ammount).toBe('-100.00');
				expect(transactions[1].ammount).toBe('100.00');
				expect(transactions[0].acc_id).toBe(-1);
				expect(transactions[1].acc_id).toBe(-2);
		});
});

/* Teste 3)
+ Deve retornar status 201 e os dados da transferência
+ As transações equivalentes devem ter sido geradas
+ A transação de saída deve ser negativa
+ A transação de entrada deve ser positiva
*/
describe('Ao salvar uma transferência válida...', () => {

    let transferId;
    let income;
    let outcome;

    test('Deve retornar status 201 e os dados da transferência', () => {
        return request(app).post(MAIN_ROUTE)
            .set('authorization', `bearer ${TOKEN}`)
            .send({description: 'Regular Transfer', user_id: -1, acc_ori_id: -1, acc_dest_id: -2, ammount: 100, date: new Date()})
            .then(async res => {
                expect(res.status).toBe(201);
                expect(res.body.description).toBe('Regular Transfer');
                transferId = res.body.id;
            });
    });

    test('As transações equivalentes devem ter sido geradas', async () => {
    		// O orderby garante que o outcome seja negativo e o income positivo
        const transactions = await app.db('transactions')
            .where({transfer_id: transferId})
            .orderBy('ammount');
        expect(transactions).toHaveLength(2);
        [outcome, income] = transactions; // recupero as duas transações
    });

    test('A transação de saída deve ser negativa', () => {
        expect(outcome.description).toBe('Transfer to acc #-2');
        expect(outcome.ammount).toBe('-100.00');
        expect(outcome.acc_id).toBe(-1);
        expect(outcome.type).toBe('0');
    });

    test('A transação de entrada deve ser positiva', () => {
        expect(income.description).toBe('Transfer from acc #-1');
        expect(income.ammount).toBe('100.00');
        expect(income.acc_id).toBe(-2);
        expect(income.type).toBe('1');
    });

    // devem ter o mesmo ID que pegamos antes
    test('Ambas devem referenciar a transferência que as originou', () => {
        expect(income.transfer_id).toBe(transferId);
        expect(outcome.transfer_id).toBe(transferId);
    });

    test('Ambas devem estar com status de realizadas', () => {
        expect(income.status).toBe(true);
        expect(outcome.status).toBe(true);
    });

});

/*

*/
describe('Ao tentar salvar uma tranferência inválida...', () => {

    const validTransfer = {description: 'Regular Transfer', user_id: -1, acc_ori_id: -1, acc_dest_id: -2, ammount: 100, date: new Date()};

    const template = (newData, errorMessage) => {
        return request(app).post(MAIN_ROUTE)
            .set('authorization', `bearer ${TOKEN}`)
            .send({...validTransfer, ...newData})
            .then(res => {
                expect(res.status).toBe(400);
                expect(res.body.error).toBe(errorMessage);
            });
    };

    test('Não deve inserir sem descrição', () => {
        template({ description: null }, 'Descrição é um atributo obrigatório');
    });

    test('Não deve inserir sem valor', () => {
        template({ ammount: null }, 'Valor é um atributo obrigatório');
    });

    test('Não deve inserir sem data', () => {
        template({ date: null }, 'Data é um atributo obrigatório');
    });

    test('Não deve inserir sem conta de origem', () => {
        template({ acc_ori_id: null }, 'Conta de origem é um atributo obrigatório');
    });

    test('Não deve inserir sem conta de destino', () => {
        template({ acc_dest_id: null }, 'Conta de destino é um atributo obrigatório');
    });

    test('Não deve inserir se as contas de origem e destino forem as mesmas', () => {
        template({ acc_dest_id: -1 }, 'Não é possível transferir de uma conta para ela mesma');
    });

    test('Não deve inserir se as contas pertecerem a outro usuário', () => {
        template({ acc_ori_id: -3 }, 'Conta -3 não pertecem ao usuário');
    });

});

// erroroorororor
test('Deve retornar uma transferência por id', () => {
    return request(app).get(`${MAIN_ROUTE}/-1`)
        .set('authorization', `bearer ${TOKEN}`)
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.body.description).toBe('Transfer #1');
        });
});

describe('Ao alterar uma transferência válida...', () => {

    let transferId;
    let income;
    let outcome;

    test('Deve retornar status 200 e os dados da transferência', () => {
        return request(app).put(`${MAIN_ROUTE}/-1`)
            .set('authorization', `bearer ${TOKEN}`)
            .send({description: 'Transfer Updated', user_id: -1, acc_ori_id: -1, acc_dest_id: -2, ammount: 500, date: new Date()})
            .then(async res => {
                expect(res.status).toBe(200);
                expect(res.body.description).toBe('Transfer Updated');
                expect(res.body.ammount).toBe('500.00');
                transferId = res.body.id;
            });
    });

    test('As transações equivalentes devem ter sido geradas', async () => {
        const transactions = await app.db('transactions')
            .where({transfer_id: transferId})
            .orderBy('ammount');
        expect(transactions).toHaveLength(2);
        [outcome, income] = transactions;
    });

    test('A transação de saída deve ser negativa', () => {
        expect(outcome.description).toBe('Transfer to acc #-2');
        expect(outcome.ammount).toBe('-500.00');
        expect(outcome.acc_id).toBe(-1);
        expect(outcome.type).toBe('0');
    });

    test('A transação de entrada deve ser positiva', () => {
        expect(income.description).toBe('Transfer from acc #-1');
        expect(income.ammount).toBe('500.00');
        expect(income.acc_id).toBe(-2);
        expect(income.type).toBe('1');
    });

    test('Ambas devem referenciar a transferência que as originou', () => {
        expect(income.transfer_id).toBe(transferId);
        expect(outcome.transfer_id).toBe(transferId);
    })

    test('Ambas devem está com status de realizadas', () => {
        expect(income.status).toBe(true);
        expect(outcome.status).toBe(true);
    })

});


describe('Ao tentar alterar uma tranferência inválida...', () => {

    const validTransfer = {description: 'Regular Transfer', user_id: -1, acc_ori_id: -1, acc_dest_id: -2, ammount: 100, date: new Date()};

    const template = (newData, errorMessage) => {
        return request(app).put(`${MAIN_ROUTE}/-1`)
            .set('authorization', `bearer ${TOKEN}`)
            .send({...validTransfer, ...newData})
            .then(res => {
                expect(res.status).toBe(400);
                expect(res.body.error).toBe(errorMessage);
            });
    };

    test('Não deve inserir sem descrição', () => {
        template({description: null}, 'Descrição é um atributo obrigatório');
    });

    test('Não deve inserir sem valor', () => {
        template({ammount: null}, 'Valor é um atributo obrigatório');
    });

    test('Não deve inserir sem data', () => {
        template({date: null}, 'Data é um atributo obrigatório');
    });

    test('Não deve inserir sem conta de origem', () => {
        template({acc_ori_id: null}, 'Conta de origem é um atributo obrigatório');
    });

    test('Não deve inserir sem conta de destino', () => {
        template({acc_dest_id: null}, 'Conta de destino é um atributo obrigatório');
    });

    test('Não deve inserir se as contas de origem e destino forem as mesmas', () => {
        template({acc_dest_id: -1}, 'Não é possível transferir de uma conta para ela mesma');
    });

    test('Não deve inserir se as contas pertecerem a outro usuário', () => {
        template({acc_ori_id: -3}, 'Conta -3 não pertecem ao usuário');
    });

});

describe('Ao remover uma transferência', () => {

    test('Deve retornar 204', () => {
        return request(app).delete(`${MAIN_ROUTE}/-1`)
            .set('authorization', `bearer ${TOKEN}`)
            .then(res => {
               expect(res.status).toBe(204);
            });
    });

    // considera o passa anterior, vai vuscar e vê se nâo econtra
    test('O registro deve ser removido do banco', () => {
        return app.db('transfers').where({id: -1})
            .then(res => {
                expect(res).toHaveLength(0);
            });
    });

    // Apos fazer o 'delete' da 'transfer' vrifico se relamente foi deletado as transactions
    test('As transações associadas devem ter sido removidas', () => {
        return app.db('transactions').where({transfer_id: -1})
            .then(res => {
                expect(res).toHaveLength(0);
            });
    });

});

test('Não deve retornar transferência de outro usuário', () => {
    return request(app).get(`${MAIN_ROUTE}/-2`)
        .set('authorization', `bearer ${TOKEN}`)
        .then(res => {
            expect(res.status).toBe(403)
            expect(res.body.error).toBe('Este recurso não pertence ao usuário');
        });
});


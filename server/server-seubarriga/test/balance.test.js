const request = require('supertest');
const app = require('../src/app');
const moment = require('moment');

/* Token gerado pelo https://jwt.io */
// TOKEN = { user: 'User #3' }
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAxMDAsIm5hbWUiOiJVc2VyICMzIiwibWFpbCI6InVzZXIzQG1haWwuY29tIn0.haEEjbmL_75BKW-tuVDBSXW9djjQoTfH6t-5ot0cwP4';
// TOKEN_GERAL : { User 5}
const TOKEN_GERAL = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAxMDIsIm5hbWUiOiJVc2VyICM1IiwibWFpbCI6InVzZXI1QG1haWwuY29tIn0.h1wvHEq-Ij_uqPhRh3m9W97fX-WTYRITjQRpur48iYg';

const MAIN_ROUTE = '/v1/balances';
const ROUTE_TRANSACTION = '/v1/transactions';
const ROUTE_TRANSFERS = '/v1/transfers';

beforeAll(async () => {
//     /* opcional limpar a base, porém, afeta o desempenho do teste */
    await app.db.migrate.rollback(); // node_modules/.bin/knex migrate:rollback --env test
    await app.db.migrate.latest(); // node_modules/.bin/knex migrate:latest --env test
    await app.db.seed.run(); // node_modules/.bin/knex seed:run --env test
});

// REVER INICIO DA AULA DE 30Min até os 5 min pra saber a funçâo de cada teste

describe('Ao calcular o saldo do usuário...', () => {

	test('Deve retornar apenas as contas com alguma transação', () => {
        return request(app).get(MAIN_ROUTE)
            .set('authorization', `bearer ${TOKEN}`)
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.body).toHaveLength(0);
            });
    });

	// Adiciona trasações, depois busca em 'get:/balance' e vê se a transação sai por lá
    test('Deve adicionar valores de entrada', () => {
        return request(app).post(ROUTE_TRANSACTION)
            .send({description: '1', date: new Date(), ammount: 100, type: '1', acc_id: 10100, status: true})
            .set('authorization', `bearer ${TOKEN}`)
            .then(() => {
                return request(app).get(MAIN_ROUTE)
                    .set('authorization', `bearer ${TOKEN}`)
                    .then(res => {
                        console.log(res.body);
                        expect(res.status).toBe(200);
                        expect(res.body).toHaveLength(1);
                        expect(res.body[0].id).toBe(10100);
                        expect(res.body[0].sum).toBe('100.00');
                    });
            });
    });

    // Vai subtrari 200 da conta anterior, ficando assim com 100. (Esse teste é bem parecido com o de cima)
    test('Deve subtrair as contas de saída', () => {
        return request(app).post(ROUTE_TRANSACTION)
            .send({description: '1', date: new Date(), ammount: 200, type: '0', acc_id: 10100, status: true})
            .set('authorization', `bearer ${TOKEN}`)
            .then(() => {
                return request(app).get(MAIN_ROUTE)
                    .set('authorization', `bearer ${TOKEN}`)
                    .then(res => {
                        expect(res.status).toBe(200);
                        expect(res.body).toHaveLength(1);
                        expect(res.body[0].id).toBe(10100);
                        expect(res.body[0].sum).toBe('-100.00');
                    });
            });
    });

    // Transações pendentes sâo as que tem 'status: false'; COmo essa tem satus = false, nâo deve ter um sum diferente da de cima
    // já que mesmo com uma nova tranaçâo, como ela está pendente não vai alterar
    test('Não deve considerar transações pendentes', () => {
        return request(app).post(ROUTE_TRANSACTION)
            .send({description: '1', date: new Date(), ammount: 200, type: '0', acc_id: 10100, status: false})
            .set('authorization', `bearer ${TOKEN}`)
            .then(() => {
                return request(app).get(MAIN_ROUTE)
                    .set('authorization', `bearer ${TOKEN}`)
                    .then(res => {
                        expect(res.status).toBe(200);
                        expect(res.body).toHaveLength(1);
                        expect(res.body[0].id).toBe(10100);
                        expect(res.body[0].sum).toBe('-100.00');
                    });
            });
    });

    // Adiciono uma tranferencia em outra conta, e ao fazer 'get:/balance' deve retornarn 2 suns e nâo devem se misturar
    test('Não deve considerar saldo de contas distintas', () => {
        return request(app).post(ROUTE_TRANSACTION)
            .send({description: '1', date: new Date(), ammount: 50, type: '1', acc_id: 10101, status: true})
            .set('authorization', `bearer ${TOKEN}`)
            .then(() => {
                return request(app).get(MAIN_ROUTE)
                    .set('authorization', `bearer ${TOKEN}`)
                    .then(res => {
                        expect(res.status).toBe(200);
                        expect(res.body).toHaveLength(2);
                        expect(res.body[0].id).toBe(10100);
                        expect(res.body[0].sum).toBe('-100.00');
                        expect(res.body[1].id).toBe(10101);
                        expect(res.body[1].sum).toBe('50.00');
                    });
            });
    });

    // Adiciono uma nova transaçao em outro usuário e para os outros 2 usuários dos testes anteriores
    // Nada deve mudar para eles
    test('Não deve considerar contas de outros usuários', () => {
        return request(app).post(ROUTE_TRANSACTION)
            .send({description: '1', date: new Date(), ammount: 200, type: '0', acc_id: 10102, status: true})
            .set('authorization', `bearer ${TOKEN}`)
            .then(() => {
                return request(app).get(MAIN_ROUTE)
                    .set('authorization', `bearer ${TOKEN}`)
                    .then(res => {
                        expect(res.status).toBe(200);
                        expect(res.body).toHaveLength(2);
                        expect(res.body[0].id).toBe(10100);
                        expect(res.body[0].sum).toBe('-100.00');
                        expect(res.body[1].id).toBe(10101);
                        expect(res.body[1].sum).toBe('50.00');
                    });
            });
    });

    // Uso moment para a data da transação ser de 5 dias atras e assim o código deve considerar essa transaçâo do passado
    test('Deve considerar uma transação passada', () => {
        return request(app).post(ROUTE_TRANSACTION)
            .send({description: '1', date: moment().subtract({days: 5}), ammount: 250, type: '1', acc_id: 10100, status: true})
            .set('authorization', `bearer ${TOKEN}`)
            .then(() => {
                return request(app).get(MAIN_ROUTE)
                    .set('authorization', `bearer ${TOKEN}`)
                    .then(res => {
                        expect(res.status).toBe(200);
                        expect(res.body).toHaveLength(2);
                        expect(res.body[0].id).toBe(10100);
                        expect(res.body[0].sum).toBe('150.00');
                        expect(res.body[1].id).toBe(10101);
                        expect(res.body[1].sum).toBe('50.00');
                    });
            });
    });

    // Crio uma transaçâo apra o futuro e ISSO NÂO DEVE SER CONSIDERADO. por isso os 'expects' sâo iguais do anterior
    test('Não deve considerar uma transação futura', () => {
        return request(app).post(ROUTE_TRANSACTION)
            .send({description: '1', date: moment().add({days: 5}), ammount: 250, type: '1', acc_id: 10100, status: true})
            .set('authorization', `bearer ${TOKEN}`)
            .then(() => {
                return request(app).get(MAIN_ROUTE)
                    .set('authorization', `bearer ${TOKEN}`)
                    .then(res => {
                        expect(res.status).toBe(200);
                        expect(res.body).toHaveLength(2);
                        expect(res.body[0].id).toBe(10100);
                        expect(res.body[0].sum).toBe('150.00');
                        expect(res.body[1].id).toBe(10101);
                        expect(res.body[1].sum).toBe('50.00');
                    });
            });
    });

    // Insiro uma tranferencia entre 2 usuarios e no balance dos dois usuarios, isso deve ser considerado
    test('Deve considerar transferências', () => {
        return request(app).post(ROUTE_TRANSFERS)
            .send({description: '1', date: new Date(), ammount: 250, acc_ori_id: 10100, acc_dest_id: 10101})
            .set('authorization', `bearer ${TOKEN}`)
            .then(() => {
                return request(app).get(MAIN_ROUTE)
                    .set('authorization', `bearer ${TOKEN}`)
                    .then(res => {
                        expect(res.status).toBe(200);
                        expect(res.body).toHaveLength(2);
                        expect(res.body[0].id).toBe(10100);
                        expect(res.body[0].sum).toBe('-100.00');
                        expect(res.body[1].id).toBe(10101);
                        expect(res.body[1].sum).toBe('300.00');
                    });
            });
    });

});

// Agora é de outro usuário
test('Deve calcular saldo das contas do usuário', () => {
    return request(app).get(MAIN_ROUTE)
        .set('authorization', `bearer ${TOKEN_GERAL}`)
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(2);
            expect(res.body[0].id).toBe(10104);
            expect(res.body[0].sum).toBe('162.00');
            expect(res.body[1].id).toBe(10105);
            expect(res.body[1].sum).toBe('-248.00');
        });
});
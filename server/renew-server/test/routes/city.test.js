const request = require('supertest');

const app = require('../../src/app');

// ser um stad_default e ser replaced para cada uso somente o campo que vocÊ quiser (usar spread ...)
let city_test = {
	city: "CityTest",
	state:"StateTest",
	country:"CountryTest"
};

beforeAll( async () => {
	// deleta registro antigo
	const existTestCity = await app.services.city.findCityByName("CityTest")
	if(existTestCity)
		await app.services.city.remove(existTestCity.city_id)
});

/*
{
	"city": "CityTest",
	"state":"StateTest",
	"country":"CountryTest"
}
*/

test('Should list all cities', () => {
  return request(app).get('/city')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    })
    .catch(err => {console.log("111"); console.log(err);})
});

test('Should list all cities only Cities Names', () => {
  return request(app).get('/city/city')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toMatchObject(
      	{ city : expect.any(String) }
      );
    })
    .catch(err => {console.log("342"); console.log(err.message);})
});

test('Should insert city with success', () => {
  return request(app).post('/city')
  	.send(city_test)
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.city).toBe("CityTest");
  	})
  	.catch(err => {console.log("123"); console.log(err.message);})
});

test('Should not insert city duplicate', () => {
  return request(app).post('/city')
  	.send(city_test)
    .catch((res) => {
      expect(res.status).toBe(409);
      expect(res.body.error).toBe(`City '${city_test.city}' already exists in the database.`);
  	});
});

test('Must not insert a city wihtout name.', () => {
  return request(app).post('/city')
    .send({ state:"StateTest", country:"CountryTest"})
    .catch((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("The property 'city' has an invalid value");
    });
});

/*
{
	"country": "CountryTest",
	"state": "fsafa"
}
*/

test('Must update city with success', () => {
	return app.db('city')
		.insert({	...city_test, city: "CityUpdate" })
		.then((city_id) => {
			request(app).put(`/city/${city_id}`)
				.send({ ...city_test, city: "UpdatedCity" })
				.then((res) => {
					expect(res.status).toBe(200);
          expect(res.body.city).toBe("UpdatedCity");
				})
				.catch(err => {console.log("456"); console.log(err);})
		})
		.catch(err => {console.log("789"); console.log(err);})
});

test('Must not update a non-existent city.', () => {
  return request(app).put('/city/999')
  	.send(city_test)
    .catch((res) => {
      expect(res.status).toBe(404);
      expect(res.body.error).toBe("The property 't' is invalid to sent as data");
    });
});

test('Must not update passing Invalid Data.', () => {
	return app.db('city')
		.insert({	...city_test, city: "CityUpdateRe" })
		.then((city_id) => {
  		request(app).put(`/city/${city_id}`)
		  	.send({ "t": "ttt"})
		    .catch((res) => {
		      expect(res.status).toBe(404);
		      expect(res.body.error).toBe("The property 't' is invalid to sent as data");
		    })
		})

});

test('Must delete city with success', () => {
	return app.db('city')
		.insert({	...city_test, city: "CityDelete" })
		.then((city_id) => {
			request(app).delete(`/city/${city_id}`)
				.then((res) => {
					expect(res.status).toBe(204);
				})
		})
		.catch(err => {console.log("964"); console.log(err);})
});

test('Must not delete a non-existent city.', () => {
  return request(app).delete('/city/999')
    .catch((res) => {
      expect(res.status).toBe(404);
      expect(res.body.error).toBe("City Not Found");
    });
});



afterAll( async () => {
	console.log("Clean Up DataBase of City")
	let a = await app.db('city').where({ country: "CountryTest" }).del()
});

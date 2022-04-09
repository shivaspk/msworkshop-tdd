const request = require('supertest');
const app = require('./app')
describe('TODOs API', () => {

    it('GET /todos ==> List or arrays of Todos 200 OK', () => {
        return request(app)
            .get("/todos")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining(
                        [
                            {
                                id: expect.any(Number),
                                name: expect.any(String),
                                done: expect.any(Boolean)
                            }
                        ]
                    ));
            });
    });

    it('GET /todos/id ==> a specific Todos 200 OK', () => {

        return request(app)
            .get("/todos/1")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining(
                        {
                            id: 1,
                            name: expect.any(String),
                            done: expect.any(Boolean)
                        }
                    ));
            });
    });

    it('GET /todos/id ==> a specific Todos 404 NOT Found', () => {

        return request(app)
            .get("/todos/12323232")
            .expect(404);
    });

    it('POST /todos ==> Create a TODO 201 CREATED', () => {
        return request(app)
            .post("/todos")
            .send({
                name: "watch KGF2"
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining(
                        {
                            id: expect.any(Number),
                            name: "watch KGF2",
                            done: false
                        }
                    ));
            });

    });


    it('PUT /todos/id ==> Update a TODO 200 OK', () => { 

        return request(app)
        .put("/todos/1")
        .send({
            id: 1,
            name: "watch KGF2",
            done: false
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining(
                    {
                        id: 1,
                        name: "watch KGF2",
                        done: false
                    }
                ));
        });
    });

    it('PUT /todos/id ==> Update a TODO 404 OK', () => { 

        return request(app)
        .put("/todos/121212")
        .send({
            id: 1,
            name: "watch KGF2",
            done: false
        })
        .expect(404);
    });

    it('DELETE /todos/id ==> Delete a TODO 204 OK', () => { 
        return request(app)
        .delete("/todos/1")
        .expect(204);
    });
});
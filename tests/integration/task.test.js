const mongoose = require('mongoose');
const supertest = require('supertest');

let server;
let authToken;
let taskID;

beforeAll(async () => {
    server = require('../../index');
});


afterAll(async () => {
    await server.close();
    // await mongoose.connection.dropDatabase();
});


// test in group
describe('Testing Routes', () => {


    // 1 testing signup
    test('Should return 201', async () => {

        const res = await supertest(server)
            .post('/api/user/signup')
            .send({ name: 'testuser', email: 'tester@gmail.com', password: 'tester123' });


        expect(res.status).toBe(201);

    });

    // 2 testing login
    test('Should return 200 and token', async () => {

        const res = await supertest(server)
            .post('/api/user/login')
            .send({ email: 'tester@gmail.com', password: 'tester123' });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');

        authToken = res.body.token;

    });


    // 3 testing create task
    test('Should return 201 and the created task with id', async () => {
        // mock data send in the body
        let task = {
            "title": "Running",
            "description": "asdfghjkasdfghj"
        }

        const res = await supertest(server)
            .post('/api/task/')
            .set('Authorization', authToken)
            .send(task)


        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('_id');

        taskID = res.body._id;
    });

    // 4  testing update task
    test('Should return 200 and updated task', async () => {
        // mock data send in the body
        let updatedTask = {
            "title": "Exercise",
            "description": "asdfghjkasdfghj"
        }

        const res = await supertest(server)
            .put(`/api/task/${taskID}`)
            .set('Authorization', authToken)
            .send(updatedTask)

        expect(res.status).toBe(200);
        expect(res.body.title).toBe(updatedTask.title);
        expect(res.body.description).toBe(updatedTask.description);

    });

    // 5 testing delete task
    test('Should return 204 no content after deletion', async () => {

        const res = await supertest(server)
            .delete(`/api/task/${taskID}`)
            .set('Authorization', authToken)

        expect(res.status).toBe(204);
    });


    /**** Handling Edge Cases  ****/

    // 6 deleting task without authorization token or invalid token

    test('Should return 401 no or invalid token', async () => {

        const res = await supertest(server)
            .delete(`/api/task/${taskID}`)

        expect(res.status).toBe(401);
    });

    // 7 delete task with id does not exist
    test('Should return 404 no task found with this id to delete', async () => {

        const res = await supertest(server)
            .delete(`/api/task/${taskID}`)
            .set('Authorization', authToken)

        expect(res.status).toBe(404);
    });


    // 8 updating task whose id does not exist in db

    test('Should return 404 because id of task does not exist to update', async () => {
        // mock data send in the body
        let updatedTask = {
            "title": "FE",
            "description": "asdfghjkasdfghj"
        }

        const res = await supertest(server)
            .put(`/api/task/${taskID}`)
            .set('Authorization', authToken)
            .send(updatedTask)

        expect(res.status).toBe(404);

    });

    // 9 input validation case
    test('Should return 400 and a message indicates title is required or des length min 10', async () => {
        // mock data send in the body
        let invalidTask = {
            "title": "",
            "description": "asdfghjkasdfghj"
        }

        const res = await supertest(server)
            .post('/api/task/')
            .set('Authorization', authToken)
            .send(invalidTask)


        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message');

    });

    


});
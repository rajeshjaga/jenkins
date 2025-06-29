const request = require('supertest');
const app = require('./app');

describe('Broken Tests (For Demo Purposes)', () => {
    test('this test will fail intentionally', async () => {
        const response = await request(app)
            .get('/')
            .expect(200);
        
        // This assertion will fail intentionally
        expect(response.body.message).toBe('Wrong Message');
    });

    test('another failing test', async () => {
        // This will cause a test failure
        expect(2 + 2).toBe(5);
    });

    test('async test that fails', async () => {
        const response = await request(app)
            .get('/nonexistent-endpoint')
            .expect(200); // This will fail as the endpoint returns 404
    });
});

const request = require('supertest');
const app = require('./app');

describe('Jenkins Demo Application', () => {
    describe('GET /', () => {
        test('should return application info', async () => {
            const response = await request(app)
                .get('/')
                .expect(200);
            
            expect(response.body.message).toBe('Jenkins Demo Application');
            expect(response.body.status).toBe('running');
            expect(response.body.timestamp).toBeDefined();
        });
    });

    describe('GET /health', () => {
        test('should return health status', async () => {
            const response = await request(app)
                .get('/health')
                .expect(200);
            
            expect(response.body.status).toBe('healthy');
            expect(response.body.uptime).toBeDefined();
            expect(response.body.memory).toBeDefined();
        });
    });

    describe('GET /api/users', () => {
        test('should return user list', async () => {
            const response = await request(app)
                .get('/api/users')
                .expect(200);
            
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('name');
            expect(response.body[0]).toHaveProperty('email');
        });
    });

    describe('POST /api/calculate', () => {
        test('should add two numbers correctly', async () => {
            const response = await request(app)
                .post('/api/calculate')
                .send({ a: 5, b: 3, operation: 'add' })
                .expect(200);
            
            expect(response.body.result).toBe(8);
            expect(response.body.operation).toBe('add');
        });

        test('should subtract two numbers correctly', async () => {
            const response = await request(app)
                .post('/api/calculate')
                .send({ a: 10, b: 4, operation: 'subtract' })
                .expect(200);
            
            expect(response.body.result).toBe(6);
        });

        test('should multiply two numbers correctly', async () => {
            const response = await request(app)
                .post('/api/calculate')
                .send({ a: 6, b: 7, operation: 'multiply' })
                .expect(200);
            
            expect(response.body.result).toBe(42);
        });

        test('should divide two numbers correctly', async () => {
            const response = await request(app)
                .post('/api/calculate')
                .send({ a: 15, b: 3, operation: 'divide' })
                .expect(200);
            
            expect(response.body.result).toBe(5);
        });

        test('should handle division by zero', async () => {
            const response = await request(app)
                .post('/api/calculate')
                .send({ a: 10, b: 0, operation: 'divide' })
                .expect(400);
            
            expect(response.body.error).toBe('Division by zero');
        });

        test('should handle invalid operation', async () => {
            const response = await request(app)
                .post('/api/calculate')
                .send({ a: 5, b: 3, operation: 'invalid' })
                .expect(400);
            
            expect(response.body.error).toBe('Invalid operation');
        });
    });
});

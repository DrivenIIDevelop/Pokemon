import request from 'supertest';
import app from '../server.mjs';

describe('Plaid API Tests', () => {
    it('should return a link token when calling /plaid/link-token with a valid user ID', async () => {
        const response = await request(app)
            .get('/plaid/link-token')
            .query({ userId: '123456' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('link_token');
    });


});

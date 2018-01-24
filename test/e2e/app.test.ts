import * as supertest from 'supertest';
// import * as server from '../src/server';

describe('GET /random-url', () => {
    const request = supertest('http://localhost:8000');
    it('should return 404', (done) => {
        // supertest(server)
        request
                .get('/reset')
                .expect(404, done);
    });
});

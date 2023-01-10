const request = require("supertest");
import { app } from '../../app';
import { } from 'jasmine';

it('return 201 on succesfull signup', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'Cra123456'
		})
		.expect(201);
});

it('return 400 with invalid email', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({
			email: 'testtest.com',
			password: 'Cra123456'
		})
		.expect(400);
});

it('return 400 with invalid password', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'Cr'
		})
		.expect(400);
});

it('return 400 with  missing email and password', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: "test@test.com"
		})
		.expect(400);

	return request(app)
		.post('/api/users/signup')
		.send({
			password: "Cra123456"
		})
		.expect(400);
});

it('disallows duplicate emails', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password'
		})
		.expect(201);

	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password'
		})
		.expect(400);
});

it('sets a cookie after successful signup', async () => {
	const response = await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'Cra123456'
		})
		.expect(201);

	expect(response.get('Set-Cookie')).toBeDefined();
});

it('fails when an incorrect password is supplied', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: "test@test.com",
			password: "password"
		})
		.expect(201);

	await request(app)
		.post('/api/users/signin')
		.send({
			email: "test@test.com",
			password: "pasword"
		})
		.expect(400)
});
const request = require('supertest');
const app = require('../app');
const { User, sequelize } = require('../models');
const { queryInterface } = sequelize;
const { signToken } = require('../helpers/jwt');
const bcrypt = require('bcryptjs');
const { genSalt, comparePassword } = require('../helpers/bcrypt');

beforeAll(async () => {
    try {
        const data = require('../data/users.json').map((element) => {
            const salt = genSalt(8); 
            const hash = bcrypt.hashSync(element.password, salt);

            delete element.id;
            element.password = hash;
            element.createdAt = new Date();
            element.updatedAt = new Date();
            return element;
        });

        await queryInterface.bulkInsert("Users", data, {});
    } catch (error) {
        console.log(error);
    }
});

describe('Login, perlu melakukan pengecekan pada status dan response ketika:', () => {
    test.skip('Berhasil login dan mengirimkan access_token', async () => {
        const userTest = {
            email: "admin@gmail.com",
            password: "admin" 
        };
        const { body, status } = await request(app).post('/login').send(userTest);
        expect(status).toBe(200);
        expect(body).toHaveProperty('access_token', expect.any(String));
    });

    test('Email tidak diberikan / tidak diinput', async () => {
        const userTest = {
            email: "",
            password: "admin"
        };
        const { status, body } = await request(app).post('/login').send(userTest);
        expect(status).toBe(400);
        expect(body).toHaveProperty('message', 'Email is required');
    });

    test('Password tidak diberikan / tidak diinput', async () => {
        const userTest = {
            email: "admin@gmail.com",
            password: ""
        };
        const { status, body } = await request(app).post('/login').send(userTest);
        expect(status).toBe(400);
        expect(body).toHaveProperty('message', 'Password is required');
    });

    test('Email diberikan invalid / tidak terdaftar', async () => {
        const userTest = {
            email: "invalidemail@gmail.com",
            password: "admin"
        };
        const { status, body } = await request(app).post('/login').send(userTest);
        expect(status).toBe(401);
        expect(body).toHaveProperty('message', 'invalid email/password');
    });

    test('Password diberikan salah / tidak match', async () => {
        const userTest = {
            email: "admin@gmail.com",
            password: "invalidpassword"
        };
        const { status, body } = await request(app).post('/login').send(userTest);
        expect(status).toBe(401);
        expect(body).toHaveProperty('message', 'invalid email/password');
    });
});

afterAll(async () => {
    try {
        await queryInterface.bulkDelete("Users", null, {
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
    } catch (error) {
        console.log(error);
    }
});

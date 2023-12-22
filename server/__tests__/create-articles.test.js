const request = require("supertest");
const app = require("../app");
const { signToken } = require("../helpers/jwt");
const { User, sequelize } = require("../models");
const { queryInterface } = sequelize;

const userTest = {
    username: "admin3",
    email: "admin23@gmail.com",
    password: "admin",
}

let articleTest = {
    "author": "ngasa",
    "title": "ngasal2",
    "description": "spa",
    "url": "http://apaaja.jpg",
    "urlToImage": "http://apaaja.jpg",
    "content": "apajaaaaaa",
    "authorId": 2,
}

let token = null;

beforeAll(async () => {
    try {
        const newUser = await User.create(userTest);
        token = signToken({ id: newUser.id });
    } catch (error) {
        console.log(error, '<<< ini error');
    }
});

describe.skip("POST /articles", () => {
    test('berhasil membuat data Entitas Utama', async () => {
        let { status, body } = await request(app)
            .post('/articles')
            .set('Authorization', `Bearer ${token}`)
            .send(articleTest);

        expect(status).toBe(201);
        expect(body).toHaveProperty('name', articleTest.author);
        expect(body).toHaveProperty('title', articleTest.title);
        expect(body).toHaveProperty('description', articleTest.description);
        expect(body).toHaveProperty('url', articleTest.url);
        expect(body).toHaveProperty('urlToImage', articleTest.urlToImage);
        expect(body).toHaveProperty('content', articleTest.content);
        expect(body).toHaveProperty('authorId', articleTest.authorId);
    });

    test("Gagal menjalankan fitur karena belum login", async () => {
        let { status, body } = await request(app).post('/articles');
        expect(status).toBe(401);
        expect(body).toHaveProperty('message', 'Invalid token');
    });

    test("Gagal menjalankan fitur karena token yang diberikan tidak valid", async () => {
        let { status, body } = await request(app)
            .post('/articles')
            .set('Authorization', `Bearer afajkdfhjkahfkashfkahfad`)
            .send(articleTest);

        expect(status).toBe(401);
        expect(body).toHaveProperty('message', 'Invalid token');
    });

    test("Gagal ketika request body tidak sesuai", async () => {
        let invalidArticleTest = {
            "author": "",
            "title": "ngasal2",
            "description": "spa",
            "url": 2,
            "urlToImage": "http://apaaja.jpg",
            "content": "bandung",
            "authorId": 2,
        };

        let { status, body } = await request(app)
            .post('/articles')
            .set('Authorization', `Bearer ${token}`)
            .send(invalidArticleTest);

        expect(status).toBe(400);
        expect(body).toHaveProperty('message', 'Validation error: Invalid input');
    });
});

afterAll(async () => {
    try {
        await queryInterface.bulkDelete("Articles", null, {
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });

        await queryInterface.bulkDelete("Users", null, {
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
    } catch (error) {
        console.log(error);
    }
});

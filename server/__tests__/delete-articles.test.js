const request = require("supertest");
const app = require("../app");
const { signToken } = require("../helpers/jwt");
const { User, sequelize } = require("../models");
const { queryInterface } = sequelize

const userTest = {
  username: "admin3",
  email: "admin23@gmail.com",
  password: "admin",
  role : "admin",
  phoneNumber: "1234567890",
  address: "Jl. Contoh 1"
}

let articleTest = {
    "author": "admin3",
    "title": "ngasal2",
    "description": "spa",
    "url": "http://apaaja.jpg",
    "urlToImage": "http://apaaja.jpg",
    "content": "apajaaaaaa",
    "authorId": 1,
}

let token = null
let articleId = null

beforeAll(async () => {
  try {
    let newUser = await User.create(userTest)
    token = signToken({id : newUser.id})
  } catch (error) {
    console.log(error, '<<< ini error')
  }
})


describe.skip("DELETE /articles/:id", () => {
    test('berhasil membuat data Entitas Utama', async () => {
      let {status, body} = await request(app).post('/articles').set('Authorization', `Bearer ${token}`).send(articleTest) 
      articleId = body.id
      expect(status).toBe(201)
      expect(body).toHaveProperty('name', articleTest.author);
      expect(body).toHaveProperty('title', articleTest.title);
      expect(body).toHaveProperty('description', articleTest.description);
      expect(body).toHaveProperty('url', articleTest.url);
      expect(body).toHaveProperty('urlToImage', articleTest.urlToImage);
      expect(body).toHaveProperty('content', articleTest.content);
      expect(body).toHaveProperty('authorId', articleTest.authorId);
    })

    test("Berhasil menghapus data Entitas Utama berdasarkan params id yang diberikan", async () => {
        let {status, body} = await request(app).delete(`/articles/${articleId}`).set('Authorization', `Bearer ${token}`)
        expect(status).toBe(200) 
        expect(body).toHaveProperty('message', body.message)
    })

    test("Gagal menjalankan fitur karena belum login", async () => {
        let {status, body} = await request(app).delete(`/articles/${articleId}`)
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'Invalid token')
    })

    test("Gagal menjalankan fitur karena token yang diberikan tidak valid", async() => {
        let {status, body} = await request(app).delete(`/articles/${articleId}`).set('Authorization', `Bearer afajkdfhjkahfkashfkahfad`)
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'Invalid token')
    })

    test("Gagal karena id entity yang dikirim tidak terdapat di database", async () => {
        let {status, body} = await request(app).delete(`/articles/10000`).set('Authorization', `Bearer ${token}`) 
        expect(status).toBe(404)
        expect(body).toHaveProperty('message', 'Data not found')
    })

    test("Gagal menjalankan fitur ketika user mengolah data entity yang bukan miliknya", async () => {
        let {status, body} = await request(app).delete(`/articles/2342`).set('Authorization', `Bearer ${token}`) 
        expect(status).toBe(404)
        expect(body).toHaveProperty('message', 'Data not found')
    })
})

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

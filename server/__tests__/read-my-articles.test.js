const request = require("supertest");
const app = require("../app");
const { signToken } = require("../helpers/jwt");
const { User, sequelize } = require("../models");
const { queryInterface } = sequelize

const userTest = {
  username: "admin3",
  email: "admin23@gmail.com",
  password: "admin",
  phoneNumber: "1234567890",
  address: "Jl. Contoh 1"
}

let articleTest = {
    "author" : "ngasa",
    "title": "ngasal2",
    "description": "spa",
    "url": 2,
    "urlToImage": "http://apaaja.jpg",
    "content": "bandung",
    "authorId": 2,
}

let token = null

beforeAll(async () => {
  try {
    let newUser = await User.create(userTest)
    token = signToken({id : newUser.id})
  } catch (error) {
    console.log(error, '<<< ini error')
  }
})

describe("Read /myarticles", () => {
    test.skip('berhasil membuat data Entitas Utama', async () => {
      let {status, body} = await request(app).post('/').set('Authorization', `Bearer ${token}`).send(articleTest) 
      expect(status).toBe(201)
      expect(body).toHaveProperty('name', body.author) 
      expect(body).toHaveProperty('facility', body.title) 
      expect(body).toHaveProperty('roomCapacity', body.description) 
      expect(body).toHaveProperty('imgUrl', body.url) 
      expect(body).toHaveProperty('location', body.urlToImage) 
      expect(body).toHaveProperty('price', body.content) 
      expect(body).toHaveProperty('typeId', body.authorId)
    })

    test.skip("Berhasil mendapatkan data Entitas Utama", async () => {
        let {status, body} = await request(app).get('/myarticles').set('Authorization', `Bearer ${token}`) 
        expect(status).toBe(200) 
    })

    test("Gagal menjalankan fitur karena belum login", async () => {
        let {status, body} = await request(app).get('/myarticles')
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'Invalid token')
    })
    
    test("Gagal menjalankan fitur karena token yang diberikan tidak valid", async() => {
        let {status, body} = await request(app).get('/myarticles')
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'Invalid token')
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

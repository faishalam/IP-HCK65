const request = require("supertest");
const app = require("../app");
const { signToken } = require("../helpers/jwt");
const { User, sequelize } = require("../models");
const { queryInterface } = sequelize

const userTest = {
  username: "admin3",
  email: "admin23@gmail.com",
  password: "admin",
}

// let token = null

// beforeAll(async () => {
//   try {
//     let newUser = await User.create(userTest)
//     token = signToken({id : newUser.id})
//   } catch (error) {
//     console.log(error, '<<< ini error')
//   }
// })



describe.skip("POST /add-user", () => {
  test('berhasil menambahkan user', async () => {
    const userTest = {
      username: "ad1",
      email: "admin01111@gmail.com",
      password: "admin",
      phoneNumber: "1234567890",
      address: "Jl. Contoh 1"
    }

    let {status, body} = await request(app).post('/users/add-user').set('Authorization', `Bearer ${token}`).send(userTest)
    console.log(token)
    expect(status).toBe(201)
    expect(body).toHaveProperty("username", userTest.username)
    expect(body).toHaveProperty("email", userTest.email)
    expect(body).not.toHaveProperty("password")
    expect(body).toHaveProperty("phoneNumber", userTest.phoneNumber)
    expect(body).toHaveProperty("address", userTest.address)
  })

  test('Email tidak diberikan / tidak diinput', async () => { 
    const userTest = {
      username: "ad1",
      password: "admin",
      phoneNumber: "1234567890",
      address: "Jl. Contoh 1"
    }
    let {status, body} = await request(app).post('/users/add-user').set('Authorization', `Bearer ${token}`).send(userTest)
    expect(status).toBe(400)
    expect(body).toHaveProperty("message", 'email is required')
  })

  test('Password tidak diberikan / tidak diinput', async () => { 
    const userTest = {
      username: "ad1",
      email: "admin01111@gmail.com",
      phoneNumber: "1234567890",
      address: "Jl. Contoh 1"
    }
    let {status, body} = await request(app).post('/users/add-user').set('Authorization', `Bearer ${token}`).send(userTest)
    console.log(body)
    expect(status).toBe(400)
    expect(body).toHaveProperty("message", 'password is required')
  })

  test('Email diberikan string kosong', async () => { 
    const userTest = {
      username: "ad1",
      email: "",
      password: "admin",
      phoneNumber: "1234567890",
      address: "Jl. Contoh 1"
    }
    let {status, body} = await request(app).post('/users/add-user').set('Authorization', `Bearer ${token}`).send(userTest)
    expect(status).toBe(400)
    expect(body).toHaveProperty("message", 'email is required')
  })

  test('Password diberikan string kosong', async () => { 
    const userTest = {
      username: "ad1",
      email: "admin01111@gmail.com",
      password: "",
      phoneNumber: "1234567890",
      address: "Jl. Contoh 1"
    }
    let {status, body} = await request(app).post('/users/add-user').set('Authorization', `Bearer ${token}`).send(userTest)
    console.log(body)
    expect(status).toBe(400)
    expect(body).toHaveProperty("message", 'password is required')
  })

  test('Email sudah terdaftar', async () => { 
    const userTest = {
      username: "admin3",
      email: "admin23@gmail.com",
      password: "admin",
      phoneNumber: "1234567890",
      address: "Jl. Contoh 1"
    }
    let {status, body} = await request(app).post('/users/add-user').set('Authorization', `Bearer ${token}`).send(userTest)
    console.log(body)
    expect(status).toBe(400)
    expect(body).toHaveProperty("message", 'Email has already been registered')
  })

  test('Format Email salah / invalid', async () => { 
    const userTest = {
      username: "admin3",
      email: "admin23gmail.com",
      password: "admin",
      phoneNumber: "1234567890",
      address: "Jl. Contoh 1"
    }
    let {status, body} = await request(app).post('/users/add-user').set('Authorization', `Bearer ${token}`).send(userTest)
    console.log(body)
    expect(status).toBe(400)
    expect(body).toHaveProperty("message", 'Invalid email format')
  })

  test('Gagal menambahkan user karena token yang diberikan tidak valid', async () => { 
    const userTest = {
      username: "ad1",
      email: "admin01111@gmail.com",
      password: "admin",
      phoneNumber: "1234567890",
      address: "Jl. Contoh 1"
    }
    let {status, body} = await request(app).post('/users/add-user').set('Authorization', `Bearer ldfjjakdjhfkahfkasdhfja`).send(userTest)
    console.log(body)
    expect(status).toBe(401)
    expect(body).toHaveProperty("message", 'Invalid token')
  })

  test('Gagal menambahkan user karena tidak terdapat access_token', async () => { 
    const userTest = {
      username: "admin3",
      email: "admin23gmail.com",
      password: "admin",
      phoneNumber: "1234567890",
      address: "Jl. Contoh 1"
    }
    let {status, body} = await request(app).post('/users/add-user').send(userTest)
    expect(status).toBe(401)
    expect(body).toHaveProperty("message", 'Invalid token')
  })

})

afterAll(async () => {
  try {
    await queryInterface.bulkDelete("Lodgings", null, {
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

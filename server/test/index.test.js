const axios2 = require("axios");
const axios = {
    post: async (...args) => {
        try {
            const res = await axios2.post(...args)
            return res
        } catch(e) {
            return e.response
        }
    },
    get: async (...args) => {
        try {
            const res = await axios2.get(...args)
            return res
        } catch(e) {
            return e.response
        }
    },
    put: async (...args) => {
        try {
            const res = await axios2.put(...args)
            return res
        } catch(e) {
            return e.response
        }
    },
    delete: async (...args) => {
        try {
            const res = await axios2.delete(...args)
            return res
        } catch(e) {
            return e.response
        }
    },
}

const BACKEND_URL = 'http://localhost:3000';

// Test setup helper functions
const generateRandomString = () => Math.random().toString(36).substring(7);

// const api = axios.create({
//   baseURL: BACKEND_URL, // This is the base URL for all requests
//   headers: {
//     'Content-Type': 'application/json', // Default Content-Type
//   }
// });

const setupTestUser = async(role = 'user') => {
  const username = `user_${generateRandomString()}`;
  const password = 'testPassword123!';
  
  const response=await axios.post(`${BACKEND_URL}/api/v1/signup`, {
    username,
    password,
    role
  });

  const loginResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
    username,
    password
  });
  
  return {
    username,
    password,
    token: loginResponse.data.token,
    userId: loginResponse.data.userId
  };
}

describe('Authentication', () => {
  describe('Signup', () => {
    test('should successfully create new user with valid credentials', async () => {
      const username = `user_${generateRandomString()}`;
      const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password: 'ValidPass123!',
        role: 'user'
      });
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('userId');
    });

    test('should fail with duplicate username', async () => {
      const username = `user_${generateRandomString()}`;
      await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password: 'ValidPass123!',
        role: 'user'
      });

      await expect(axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password: 'ValidPass123!',
        role: 'user'
      })).rejects.toHaveProperty('response.status', 409);
    });
  });

  // describe('Signin', () => {
  //   let testUser;

  //   beforeAll(async () => {
  //     testUser = await setupTestUser();
  //   });

  //   test('should login successfully with correct credentials', async () => {
  //     const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
  //       username: testUser.username,
  //       password: testUser.password
  //     });
  //     expect(response.status).toBe(200);
  //     expect(response.data).toHaveProperty('token');
  //     expect(response.data).toHaveProperty('userId');
  //   });

  //   test('should fail with incorrect password', async () => {
  //     await expect(axios.post(`${BACKEND_URL}/api/v1/signin`, {
  //       username: testUser.username,
  //       password: 'wrongpassword'
  //     })).rejects.toHaveProperty('response.status', 401);
  //   });

  //   test('should fail with non-existent username', async () => {
  //     await expect(axios.post(`${BACKEND_URL}/api/v1/signin`, {
  //       username: 'nonexistentuser',
  //       password: 'anypassword'
  //     })).rejects.toHaveProperty('response.status', 401);
  //   });
  // });
});


// describe('User Profile & Metadata', () => {
//   let user;
//   let admin;
//   let testAvatar;

//   beforeAll(async () => {
//     user = await setupTestUser('user');
//     admin = await setupTestUser('admin');
    
//     // Create test avatar
//     const avatarResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/avatar`,
//       {
//         imageURL: 'https://example.com/avatar.png',
//          name: 'Test Avatar'
//       },
//       {
//         headers: { Authorization: `Bearer ${admin.token}` }
//       }
//     );
//     testAvatar = avatarResponse.data;
//   });

//   test('should update user avatar successfully', async () => {
//     const response = await axios.post(
//       `${BACKEND_URL}/api/v1/user/metadata`,
//       { avatarId: testAvatar.avatarid },
//       {
//         headers: { Authorization: `Bearer ${user.token}` }
//       }
//     );

//     expect(response.status).toBe(200);
//   });

//   test('should fail to update avatar with invalid avatar ID', async () => {
//     await expect(axios.post(
//       `${BACKEND_URL}/api/v1/user/metadata`,
//       { avatarId: 'invalid-id' },
//       {
//         headers: { Authorization: `Bearer ${user.token}` }
//       }
//     )).rejects.toHaveProperty('response.status', 400);
//   });

//   test('should get available avatars', async () => {
//     const response = await axios.get(
//       `${BACKEND_URL}/api/v1/avatars`,
//       {
//         headers: { Authorization: `Bearer ${user.token}` }
//       }
//     );

//     expect(response.status).toBe(200);
//     expect(Array.isArray(response.data.avatars)).toBe(true);
//   });

//   test('should get bulk user metadata', async () => {
//     const response = await axios.get(`${BACKEND_URL}/api/v1/metadata/bulk`);
//     expect(response.status).toBe(200);
//     expect(Array.isArray(response.data.users)).toBe(true);
//   });
// });

// describe('Spaces', () => {
//   let user;
//   let admin;
//   let testMap;

//   beforeAll(async () => {
//     user = await setupTestUser('user');
//     admin = await setupTestUser('admin');

//     // Create test map
//     const mapResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/map`,
//       {
//         thumbnail: 'https://example.com/map.png',
//         dimensions: '100x200',
//         name: 'Test Map',
//         defaultElements: []
//       },
//       {
//         headers: { Authorization: `Bearer ${admin.token}` }
//       }
//     );
//     testMap = mapResponse.data;
//   });

//   test('should create space successfully', async () => {
//     const response = await axios.post(
//       `${BACKEND_URL}/api/v1/space`,
//       {
//         name: 'Test Space',
//         dimensions: '100x200',
//         thumnail:'exampl.com',
//         mapId: testMap.mapId
//       },
//       {
//         headers: { Authorization: `Bearer ${user.token}` }
//       }
//     );
//     expect(response.status).toBe(200);
//     expect(response.data).toHaveProperty('spaceId');
//   });

//   test('should create space without map ID', async () => {
//     const response = await axios.post(
//       `${BACKEND_URL}/api/v1/space`,
//       {
//         name: 'Test Space',
//         dimensions: '100x200'
//       },
//       {
//         headers: { Authorization: `Bearer ${user.token}` }
//       }
//     );

//     expect(response.status).toBe(200);
//     expect(response.data).toHaveProperty('spaceId');
//   });

//   test('should fail to create space without required fields', async () => {
//     await expect(axios.post(
//       `${BACKEND_URL}/api/v1/space`,
//       { name: 'Test Space' },
//       {
//         headers: { Authorization: `Bearer ${user.token}` }
//       }
//     )).rejects.toHaveProperty('response.status', 400);
//   });

//   test('should get user spaces', async () => {
//     const response = await axios.get(
//       `${BACKEND_URL}/api/v1/space/all`,
//       {
//         headers: { Authorization: `Bearer ${user.token}` }
//       }
//     );

//     expect(response.status).toBe(200);
//     expect(Array.isArray(response.data.spaces)).toBe(true);
//   });

//   test('should delete own space', async () => {
//     // Create a space first
//     const createResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/space`,
//       {
//         name: 'To Delete',
//         dimensions: '100x200'
//       },
//       {
//         headers: { Authorization: `Bearer ${user.token}` }
//       }
//     );

//     const deleteResponse = await axios.delete(
//       `${BACKEND_URL}/api/v1/space/${createResponse.data.spaceId}`,
//       {
//         headers: { Authorization: `Bearer ${user.token}` }
//       }
//     );

//     expect(deleteResponse.status).toBe(200);
//   });
// });

// describe('Admin Operations', () => {
//   let admin;
//   let user;

//   beforeAll(async () => {
//     admin = await setupTestUser('admin');
//     user = await setupTestUser('user');
//   });

//   test('should create avatar as admin', async () => {
//     const response = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/avatar`,
//       {
//         imageURL: 'https://example.com/avatar.png',
//         name: 'New Avatar'
//       },
//       {
//         headers: { Authorization: `Bearer ${admin.token}` }
//       }
//     );

//     expect(response.status).toBe(200);
//     expect(response.data).toHaveProperty('id');
//   });

//   test('should fail to create avatar as regular user', async () => {
//     await expect(axios.post(
//       `${BACKEND_URL}/api/v1/admin/avatar`,
//       {
//         imageURL: 'https://example.com/avatar.png',
//         name: 'New Avatar'
//       },
//       {
//         headers: { Authorization: `Bearer ${user.token}` }
//       }
//     )).rejects.toHaveProperty('response.status', 403);
//   });

//   test('should create and update element as admin', async () => {
//     // Create element
//     const createResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       {
//         imageURL: 'https://example.com/element.png',
//         width: 100,
//         height: 100,
//         isStatic: true
//       },
//       {
//         headers: { Authorization: `Bearer ${admin.token}` }
//       }
//     );

//     expect(createResponse.status).toBe(200);

//     // Update element
//     const updateResponse = await axios.put(
//       `${BACKEND_URL}/api/v1/admin/element/${createResponse.data.id}`,
//       {
//         imageURL: 'https://example.com/updated-element.png'
//       },
//       {
//         headers: { Authorization: `Bearer ${admin.token}` }
//       }
//     );

//     expect(updateResponse.status).toBe(200);
//   });
// });

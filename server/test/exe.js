// describe('socket connection operations', () => {
//             let user;
//             let admin;
//             let testMap;
//             let spaceId;
//             let socket1;
//             let socket2;
//             let userx;
//             let usery;
//             let adminx;
//             let admindy;



//             beforeAll(async () => {
//             user = await setupTestUser('User');
//             admin = await setupTestUser('Admin');
//             const mapResponse = await axios.post(
//               `${BACKEND_URL}/api/v1/admin/map`,
//               {
//                 thumbnail: 'https://example.com/map.png',
//                 dimensions: '100x200',
//                 name: 'Test Map',
//                 defaultElements: []
//               },
//               {
//                 headers: { Authorization: `Bearer ${admin.token}` }
//               }
//             );
//             testMap = mapResponse.data;
//             const response = await axios.post(
//               `${BACKEND_URL}/api/v1/space`,
//               {
//                 name: 'Test Space',
//                 dimensions: '100x200',
//                 thumnail:'exampl.com',
//                 mapId: testMap.mapId
//               },
//               {
//                 headers: { Authorization: `Bearer ${user.token}` }
//               }
//             );
//             spaceId = response.data.spaceId;

//              socket1=io(BACKEND_URL)
//              socket2=io(BACKEND_URL)
//              socket1.on('connect', () => {
//               console.log('Client connected:', clientSocket.id);
//               done();
//             });
//             socket2.on('connect', () => {
//               console.log('Client connected:', clientSocket.id);
//               done();
//             });

//           });
          
//           test('join',async()=>{
//               socket1.emit('connection',{
//                  type :"join",
//                  spacId :spaceId,
//                   token: user.token
//               })
//               console.log("this is first test")
//               socket1.on("space-joined",(data)=>{
//                     const {x,y}=data
//                     userx=x
//                     usery=y

//                 expect(true).toBe(true);
//               })


//               socket2.emit('connection',{
//                 type :"join",
//                  spacId :spaceId,
//                   token: admin.token
//               })
//               console.log('client2')
//               socket2.on("space-joined",(data)=>{
//                    const {x,y}=data
//                     adminx=x
//                     admindy=y
//                     expect(true).toBe(true);
//               })
        
//           })
  
// })
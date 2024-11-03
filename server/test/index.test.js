const axios  = require("axios");
const exp = require("constants");
const { expectCt } = require("helmet");
const { describe, default: test, before  } = require("node:test");
const { updateLanguageServiceSourceFile } = require("typescript");
const BACKEND_URL = 'http://localhost:3000'
describe('Authentication', ()=>{
        test ('user is able to sign up ',async ()=>{
            const email = 'azam'+Math.random()
            const password = "123456"
            const response = await axios.post(`${BACKEND_URL}/login`,{
                    email,
                    password
            })
            expect(response.status).toBe(200)
            const updatedresponse=await axios.post(`${BACKEND_URL}/login`,{
                email,
                password
        })
            expect(updatedresponse.status).toBe(400)
        })
        test ('user signup ',async ()=>{
          const  password= "7749"
        const response = await axios.post(`${BACKEND_URL}/register`,{
                       
                        password    
        })
        expect(response.status).toBe(400)
        })

        test ('sing in' , async()=>{
            const email = 'azambari2001@gmail.com'
            const password  = '7749'
            const response = await axios.post(`${BACKEND_URL}/login`,{
                    email,
                    password
            })
            expect(response.body.token).toBeDefined()
        })
        test ('Sign in fails if the username and password are incorrect',async()=>{
                const email = 'azambari2001@gmail.com'
                const password = '903223'
                const response = await axios.post(`${BACKEND_URL}/login`,{
                        email,
                        password
                })  
                    
                expect(response.status).toBe(403)

        })
    })

describe ('User meta data end point',()=>{
         let  token  = '' 
         let avatar_id = ''
      brforeAll( async()=>{
            const email='azambari2001@gmail.com'
            const password ='7749'
            const type = 'admin'
            const resonse = await axios.post (`${BACKEND_URL}/login`,{
                        email,
                        password,
                        type
            })

            const res_avatarid = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`,{
                "imageURL":"",
                "name" : "timy"
            })
            token = resonse.body.token  
            avatar_id=res_avatarid.data.avatarId
           
            

        })
        test('user cant update thair meta data with wron avatar id', async ( )=>{
                    const response =   await axios.post(`${BACKEND_URL}/api/v1/user/metadata`,{
                            avatarId : '12345'
                    },{
                        headers:{
                            "Authorization":`Bearer${token}`
                        }
                    })
                    expect(response.status).toBe(400)
        })
        test('user can update thair meta mdata with right avatar id ', async ()=>{
            const response =   await axios.post(`${BACKEND_URL}/api/v1/user/metadata`,{
                avatarId : avatar_id
            },{
            headers:{
                "Authorization":`Bearer${token}`
            }
             })
            expect(response.status).toBe(200)          
             })
        test('user is not able to use update thair meta data if the auth header is not present',async()=>{
            const response =   await axios.post(`${BACKEND_URL}/api/v1/user/metadata`,{
                avatarId : avatar_id
        })
            expect(response.status).toBe(403)          
             })
        })

describe ('user avatar information',()=>{
        let avataId=''
        let  token = ''
        let userId=''
        brforeAll( async()=>{
            const email='azambari2001@gmail.com'
            const password ='7749'
            const type = 'admin'
            const resonse = await axios.post (`${BACKEND_URL}/login`,{
                        email,
                        password,
                        type
            })
            userId=resonse.data.userId

            const res_avatarid = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`,{
                "imageURL":"",
                "name":"timy"
            })
            token = resonse.body.token  
            avataId=res_avatarid.data.avatarId
        })

        test('get back avatar information for the user',async()=>{
            const response = await axios.get(`${BACKEND_URL}/api/v1/user/metadata/bulk?ids=[${userId}]`)
            expect(response.data.avatars.length).toBe(1);
            expect(response.data.avatars[0].imageURL).toBe(userId);
            })
        test ('list the recently created avatars'   ,async()=>{
               const response = await    axios.get(`${BACKEND_URL}/api/v1/avatars`);
               expect(response.data.avatars.length).not.toBe(0)
               const currentavatar = response.data.avatars.find(x=>x.id===avataId)
               expect(currentavatar).toBeDefined()
        })
        
     
})
describe ('space infromation',()=>{
    let mapId=''
    let elementid1=''
    let elementid2=''
    let userId=''
    let usertoken = ''
    let admintoken= ''
    let adminId=''
    brforeAll('space infromation', async()=>{
        const email='azambari2001@gmail.com'
        const password ='7749'
        const type = 'admin'
        const response = await axios.post (`${BACKEND_URL}/login`,{
                    email,
                    password,
                    type
        })
        adminId=response.data.userId
        admintoken = resonse.body.token  
        const userresponse = await axios.post (`${BACKEND_URL}/login`,{
            email,
            password,
            type:'user'
        })
        userId=userresponse.data.userId
        usertoken=userresponse.data.usertoken

        const res_avatarid = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`,{
            "imageURL":"",
            "name":"timy"
        })
      
        avataId=res_avatarid.data.avatarId

        const element1=await axios.post(`${BACKEND_URL}/api/admin/element`,{
            'imageurl':'',
            'wodth' : '',
            "height" : '',
            "static" : true
    },{
            headers : {
                    "Authorization":`bearer ${admintoken}`
            }
    })

    const element2=await axios.post(`${BACKEND_URL}/api/admin/element`,{
        'imageurl':'',
        'wodth' : '',
        "height" : '',
        "static" : true
},{
        headers : {
                "Authorization":`bearer ${token}`
        }
})
        elementid1-element1.id
        elementid2=element2.id

        const map = await axios.post (`${BACKEND_URL}/api/v1/admin/map`,{
             "thumnail": '',
             "dimentions": '',
             "default elements":[{
                    elementid:elementid1,
                    x:20,
                    y:20
             },
             {
                elementid:elementid1,
                x:"18",
                y:"20"
             },{
                
                    elementid:elementid2,
                    x:"19",
                    y:"20"
                 
             }
            ]

        },{
            headers : {
                "Authorization":`bearer ${admintoken}`
            }
        })

        mapId=map.id


    })

    test ('creat a space',async()=>{
          const respose = await  axios.post(`${BACKEND_URL}/api/v1/space`,{
                "name": "test",
                "dimention":"100x200",
                "mapId":mapId
            },{
                headers:{
                        "Authorization":usertoken                    }
            })

            expect(respose.spaceId).toBeDefined()
    })
    test ('user is able to create a space without map id ',async()=>{
        const respose = await  axios.post(`${BACKEND_URL}/api/v1/space`,{
              "name": "test",
              "dimention":"100x200"
          },{
            headers:{
                    "Authorization":usertoken                    }
        })

          expect(respose.spaceId).toBeDefined()
  })
  test ('user is not able to creat map without map id and dimetions',async()=>{
    const respose = await  axios.post(`${BACKEND_URL}/api/v1/space`,{
          "name": "test",
          
      },{
        headers:{
                "Authorization":usertoken                    }
         }
        
      )

      expect(respose.status).toBe(400)
})

test ('user unable delete the space that doesnt exist',async()=>{
    const respose = await  axios.delete(`${BACKEND_URL}/api/v1/space/randomiddoesntexist`,{
          "name": "test",   
      },
        {
            headers:{
                    "Authorization":usertoken                    }
        }
      )

      expect(respose.status).toBe(400)
})

test ('usershould be able to delete a space that exist',async()=>{
    const respose = await  axios.post(`${BACKEND_URL}/api/v1/space`,{
        "name": "test",
        "dimention":"100x200"
    },{
        headers:{
                "Authorization":usertoken                    }
    })
    const deleteResponse = await axios.delete(`${BACKEND_URL}/api/v1/space/${respose.data.spaceId}`)

      expect(deleteResponse.status).toBe(200)
})


test ('get my spces ',async()=>{
    const respose = await  axios.post(`${BACKEND_URL}/api/v1/space`,{
        "name": "test",
        "dimention":"100x200"
    },{
        headers:{
                "Authorization":usertoken                    }
    })
    const deleteResponse = await axios.delete(`${BACKEND_URL}/api/v1/space/${respose.data.spaceId}`)

      expect(deleteResponse.status).toBe(200)
})

    test ('user should not able to delete the someone eleses a space creawted by another user',async()=>{
        const respose = await  axios.post(`${BACKEND_URL}/api/v1/space`,{
            "name": "test",
            "dimention":"100x200"
        },{
            headers:{
                    "Authorization":usertoken                    }
        })

        const deleteResponse = await axios.delete(`${BACKEND_URL}/api/v1/space/${respose.data.spaceId}`,{
            headers:{
                "Authorization":`Bearer ${admintoken}` 
            }
        })
    
          expect(deleteResponse.status).toBe(400)
    })

    test ('admine has no space intially ',async()=>{
        const response  = await axios.get(`${BACKEND_URL}.api/v1/space/all`,{ 
                headers:{
                        "Authorization":admintoken                    }
        })
        expect (response.data.spaces.length).toBe(0)
    })

    test ('admine has no space intially ',async()=>{
            const respose = await  axios.post(`${BACKEND_URL}/api/v1/space`,{
                  "name": "test",
                  "dimention":"100x200",
                  "mapId":mapId
              },{
                  headers:{
                          "Authorization":admintoken                    }
              })
              const spaceresponeses = await axios.get(`${BACKEND_URL}.api/v1/space/all`)
              const filteredspaces = spaceresponeses.data.find(x=>x.id===respose.spaceId)
              expect (spaceresponeses.data.spaces.length).toBe(1)
              expect (filteredspaces).toBeDefined()

      
       
    })


})
describe("Arena endpoints",()=>{
    let mapId=''
    let elementid1=''
    let elementid2=''
    let userId=''
    let usertoken = ''
    let admintoken= ''
    let adminId=''
    let spaceId = ''
    brforeAll('space infromation', async()=>{
        const email='azambari2001@gmail.com'
        const password ='7749'
        const type = 'admin'
        const response = await axios.post (`${BACKEND_URL}/login`,{
                    email,
                    password,
                    type
        },{
            headers:{
                    "Authorization":`bearer ${usertoken}`
            }
        })
        adminId=response.data.userId
        admintoken = resonse.body.token  
        const userresponse = await axios.post (`${BACKEND_URL}/login`,{
            email,
            password,
            type:'user'
        })
        userId=userresponse.data.userId
        usertoken=userresponse.data.usertoken

        const res_avatarid = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`,{
            "imageURL":"",
            "name":"timy"
        },{
            headers:{
                    "Authorization":`bearer ${usertoken}`
            }
        }

        )
      
        avataId=res_avatarid.data.avatarId

        const element1=await axios.post(`${BACKEND_URL}/api/admin/element`,{
            'imageurl':'',
            'wodth' : '',
            "height" : '',
            "static" : true
    },{
            headers : {
                    "Authorization":`bearer ${admintoken}`
            }
    })

    const element2=await axios.post(`${BACKEND_URL}/api/admin/element`,{
        'imageurl':'',
        'wodth' : '',
        "height" : '',
        "static" : true
},{
        headers : {
                "Authorization":`bearer ${token}`
        }
})
        elementid1-element1.id
        elementid2=element2.id

        const map = await axios.post (`${BACKEND_URL}/api/v1/admin/map`,{
             "thumnail": '',
             "dimentions": '',
             "default elements":[{
                    elementid:elementid1,
                    x:20,
                    y:20
             },
             {
                elementid:elementid1,
                x:"18",
                y:"20"
             },{
                
                    elementid:elementid2,
                    x:"19",
                    y:"20"
                 
             }
            ]

        },{
            headers : {
                "Authorization":`bearer ${admintoken}`
            }
        })
        mapId=map.id
        const space = await axios.post(`${BACKEND_URL}.api/v1`,{
                "name":"Test",
                "dimentions":"100x200",
                "mapId":"mapId"
        },{
            headers:{
                    "Authorization": `Bearer ${usertoken}`
            }
        })      
        spaceId=space.id
       
    })

    test ('incorrect space id returns a 400',async()=>{
                const response =  await  axios.get(`${BACKEND_URL}/api/v1/space/123kasdsld`,{
                    headers:{
                            "Authorization":`bearer ${usertoken}`
                    }
                })
                expect(response.status).toBe(400)
    })

    test ('correct space id returns a ',async()=>{
        const response =  await  axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`,{
            headers:{
                    "Authorization":`bearer ${usertoken}`
            }
        })
        expect(response.data.dimention).toBe("100x200")
        expect(response.data.element.length).toBe(3)

})

    test ('delete endpoint able to delete the table',async()=>{
    const eleresponse =  await  axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`,{
        headers:{
                "Authorization":`bearer ${usertoken}`
        }
    })
      await  axios.delete(`${BACKEND_URL}/api/v1/space/element`,{
            spaceId:spaceId,
            elementid: eleresponse.data.elements[0].id
    })
    const newresponse =  await  axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`,{
        headers:{
                "Authorization":`bearer ${usertoken}`
        }
        })
    expect(newresponse.data.element.length).toBe(2)

}) 
    
    test ('adding element is fails if the element lies outside the dimention  ',async()=>{
    const response =  await  axios.post (`${BACKEND_URL}/api/v1/space/element`,{
            "elementId":elementid1,
            "spaceid":spaceId,
            "x":2000, 
            "y":100000
    },{
        headers:{
                "Authorization":`bearer ${usertoken}`
        }
    })
    expect(response.status).toBe(404)

})
test ('addin element works as expected ',async()=>{
    const response =  await  axios.post (`${BACKEND_URL}/api/v1/space/element`,{
            "elementId":elementid1,
            "spaceid":spaceId,
            "x":20, 
            "y":20
    },{
        headers:{
                "Authorization":`bearer ${usertoken}`
        }
    })
    const newresponse =  await  axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`,{
        headers:{
                "Authorization":`bearer ${usertoken}`
        }
    })
    expect(newresponse.data.element.length).toBe(2)

}) 

})
describe('admin endpoints',()=>{
         
    let userId=''
    let usertoken = ''
    let admintoken= ''
    let adminId=''
    let spaceId = ''
    brforeAll('space infromation', async()=>{
        const email='azambari2001@gmail.com'
        const password ='7749'
        const type = 'admin'
        const response = await axios.post (`${BACKEND_URL}/login`,{
                    email,
                    password,
                    type
        })

        adminId=response.data.userId
        admintoken = response.body.token  
        const userresponse = await axios.post (`${BACKEND_URL}/login`,{
            email,
            password,
            type:'user'
        })
        userId=userresponse.data.userId
        usertoken=userresponse.data.usertoken

        mapId=map.id
        const space = await axios.post(`${BACKEND_URL}.api/v1`,{
                "name":"Test",
                "dimentions":"100x200",
                "mapId":"mapId"
        },{
            headers:{
                    "Authorization": `Bearer ${usertoken}`
            }
        })      
        spaceId=space.id
       
    })

    test("admin is not able to hit the admin endpoints",async()=>{
        const elementRespose=await axios.post(`${BACKEND_URL}/api/admin/element`,{
            'imageurl':'',
            'width' : '',
            "height" : '',  
            "static" : true
    },{
            headers : {
                    "Authorization":`bearer ${usertoken}`
            }
    }) 
    const mapResponse = await axios.post (`${BACKEND_URL}/api/v1/admin/map`,{
             "thumnail": '',
             "dimentions": '',
             "default elements":[ ]
            
        },{
            headers : {
                "Authorization":`bearer ${usertoken}`
            }
        })
        const creatAvatarResponse = await axios.post (`${BACKEND_URL}/api/v1/admin/avatar`,{
                "imageUrl":"",
                "name":"timmy"
       },{
           headers : {
               "Authorization":`bearer ${usertoken}`
           }
       })
       const updateElementResponse = await axios.put(`${BACKEND_URL}/api/v1/admin/avatar`,{
        "imageUrl":""
},{
   headers : {
       "Authorization":`bearer ${usertoken}`
   }
})  
        
       expect(mapResponse.status).toBe(403)
       expect(creatAvatarResponse.status).toBe(403)
       expect(elementRespose.status).toBe(403)
       expect(updateElementResponse.status).toBe(403)
       
  


    })


    test("admin able to hit the admin endpoints",async()=>{
        const elementRespose=await axios.post(`${BACKEND_URL}/api/admin/element`,{
            'imageurl':'',
            'width' : '',
            "height" : '',  
            "static" : true
    },{
            headers : {
                    "Authorization":`bearer ${admintoken}`
            }
    }) 
    const mapResponse = await axios.post (`${BACKEND_URL}/api/v1/admin/map`,{
             "thumnail": '',
             "dimentions": '',
             "default elements":[ ]
            
        },{
            headers : {
                "Authorization":`bearer ${admintoken}`
            }
        })
        const creatAvatarResponse = await axios.post (`${BACKEND_URL}/api/v1/admin/avatar`,{
                "imageUrl":"",
                "name":"timmy"
       },{
           headers : {
               "Authorization":`bearer ${admintoken}`
           }
       })

       expect(mapResponse.status).toBe(200)
       expect(creatAvatarResponse.status).toBe(200)
       expect(elementRespose.status).toBe(200)

  


    })

    test("admin is able to update the image url",async()=>{

         const elementResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/element`,{
            "imageUrl":"",
            "width":1,
            "height":1,
            "static":true
         },{
            headers:{
                Authorization:`Bearer ${admintoken}`
            }
         })
        const updateAvatarResponse = await axios.put (`${BACKEND_URL}/api/v1/admin/element/${elementResponse.data.id}`,{
            "imageUrl":"",
            "name":"timmy"
   },{
       headers : {
           "Authorization":`bearer ${admintoken}`
       }
   })   
        
        expect(updateAvatarResponse.status).toBe(200)
    })
})



describe('websocket test',()=>{
            let mapId=''
            let elementid1=''
            let elementid2=''
            let admintoken= ''
            let  adminuserId=''
            let usertoken=''
            let userId=''
            let spaceId=""
            beforeAll(async()=>{
                const adminsignupResponse=await axios.post(`${BACKEND_URL}/register`,{
                        name:'azam',
                        email:"azambari2001@gmail.com",
                        password : "7749"
                })
                const adminsignin=await axios.post(`${BACKEND_URL}/register`,{
                    email:"azambari2001@gmail.com",
                    password : "7749"
            })
                adminuserId=adminsignin.data.userId
                admintoken=adminsignin.data.token
                const usersignupresponse = await axios.post(`${BACKEND_URL}/register`,{
                    name:'asas',
                    email:'azambari',
                    password : "774w"
                })  
                const usersiginResponse = await axios.post(`${BACKEND_URL}/login`,{
                  
                    email:'azambari',
                    password : "774w"
                })  
                userId =usersiginResponse.data.userid
                usertoken = usersiginResponse.data.token

                const element1=await axios.post(`${BACKEND_URL}/api/admin/element`,{
                    'imageurl':'',
                    'wodth' : '',
                    "height" : '',
                    "static" : true
            },{
                    headers : {
                            "Authorization":`bearer ${admintoken}`
                    }
            })
        
            const element2=await axios.post(`${BACKEND_URL}/api/admin/element`,{
                'imageurl':'',
                'wodth' : '',
                "height" : '',
                "static" : true
        },{
                headers : {
                        "Authorization":`bearer ${token}`
                }
        })
                elementid1-element1.id
                elementid2=element2.id
        
                const map = await axios.post (`${BACKEND_URL}/api/v1/admin/map`,{
                     "thumnail": '',
                     "dimentions": '',
                     "default elements":[{
                            elementid:elementid1,
                            x:20,
                            y:20
                     },
                     {
                        elementid:elementid1,
                        x:"18",
                        y:"20"
                     },{
                        
                            elementid:elementid2,
                            x:"19",
                            y:"20"
                         
                     }
                    ]
        
                },{
                    headers : {
                        "Authorization":`bearer ${admintoken}`
                    }
                })
                mapId=map.id
                const space = await axios.post(`${BACKEND_URL}.api/v1`,{
                        "name":"Test",
                        "dimentions":"100x200",
                        "mapId":"mapId"
                },{
                    headers:{
                            "Authorization": `Bearer ${usertoken}`
                    }
                })      
                spaceId=space.id
              



            }) 


})
/**
 * @jest-environment node
 */

const { TestScheduler } = require('jest');
const axios = require('axios');

//please utilize you're own token
//only need to pass through your actual token, please do not add "Bearer" or "jwt"
const token = '';
const http = require('axios/lib/adapters/http');

it('Test if my username is correct', async () => {
    async function getUsers(){
        let link = 'http://turbine-pov.swimlane.io/api/v1/user';
        let res = await axios.get(link, {
            adapter: http,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        let data = res.data;
        return data['items'];
    }
    const thing = await getUsers();
    //please set your own value for what you're expecting your name to be
    //may need to change thing[n] to get the correct object from the list 
    const value = '';
    expect(thing[1]['item']['name']).toEqual(value);
    
})

it('Test if login is successful or a failure', async() =>{
    async function login(user, pass){
        let link = 'http://turbine-pov.swimlane.io/api/v1/auth/login';
        try{
            let res = await axios.post(link, {
                'username': user,
                'password': pass
                }
            );
            let data = res.data;
            return data['user'];
            }catch(error){
                return error['response']['status'];
            }
    }
    //Please pass through you're own username and password 
    let user = '';
    let pass = '';

    const test = await login(user,pass);

    if(test['username'] == user){
        //should pass through your own expected value in the toEqual()
        //pass through name here
        expect(test['name']).toEqual('')
        //pass through email here
        expect(test['email']).toEqual('')
    }else{
        //if bad credentials, will pass test if it gets a 404/failure to login
        expect(test).toEqual(404);
    }
})

it('Test if I can get my token back, and run a test with it', async () =>{
    async function getToken(){
        let link = 'http://turbine-pov.swimlane.io/api/v1/token';
        let res = await axios.get(link, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        let data = res.data;
        return data
    }

    let thing = await getToken();
    expect(thing[0]['token']).toEqual(token);
    
    async function getAsset(bearer){
        let link = 'http://turbine-pov.swimlane.io/api/v1/asset';
        let res = await axios.get(link,{
            headers: {
                'Authorization': 'Bearer ' + bearer
            }
        });
        let data = res.data;
        return data['items'][0]['item']['name'];
    }
    let newtoken = thing[0]['token'];
    let envar = await getAsset(newtoken);
    //this one is pretty static 
    expect(envar).toEqual['RF_Swimlane_Rapid7'];
})
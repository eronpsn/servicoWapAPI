var D2L = require('valence');
const axios = require('axios').default;
const https = require('https');

const RequestD2L  = async (req, res = response) => {
    var  appId = process.env.APP_ID,
        appKey = process.env.APP_KEY,
        userId = process.env.USER_ID,
        userKey = process.env.USER_KEY,    
        appContext = new D2L.ApplicationContext('localhost', appId, appKey);
        var auth ='localhost';
        var method = 'GET';
     //   const { auth, userId, userKey, path, method } = req.body
   // console.log(req.header('x-rota'));
        var path = req.header('x-rota');
         /* 
    console.log('começo');
        var callbackTarget = 'http://' + req.header('host'),
        getTokensUrl = appContext
            .createUrlForAuthentication('https://ava.grupotiradentes.com', 443, callbackTarget);
            console.log('fim');
            console.log(getTokensUrl);
            
    res
        .status(303)
        .set('Location', getTokensUrl)
        .end();
    */
    //console.log("AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");
    //console.log(auth);
    var authCallbackSearch = auth,
    userContext = appContext
        .createUserContext('https://ava.grupotiradentes.com', 443, authCallbackSearch);
    
    if (!userContext.userId || !userContext.userKey) {
    //var userId = req.params.userId,
      //  userKey = req.params.userKey;
    
    userContext = appContext
        .createUserContextWithValues('https://ava.grupotiradentes.com', 443, userId, userKey);
    }
    
    //var path = req.params.path,
    //method = 'GET'; //req.method.toLowerCase();
    //console.log(path);
    var apiCallUrl = userContext.createAuthenticatedUrl(path, method);
    //console.log(apiCallUrl);
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    })
    axios.defaults.httpsAgent = httpsAgent
    axios.get(apiCallUrl)
        .then(resp => {
            const headerDate = resp.headers && resp.headers.date ? resp.headers.date : 'no response date';
          //  console.log('Status Code:', resp.status);
          //  console.log('Date in Response header:', headerDate);
    
            const users = resp.data;
          //  console.log(users);
            res.json({
                ok: true,
                dados: users,
                msg: 'Usuário D2L'
                //message:req.body
            });
            /* for(user of users) {
               console.log(`Got user with id: ${user.id}, name: ${user.name}`);
             }*/
        })
        .catch(err => {
            console.log('Error: ', err.message);
            res.json({
                ok: false,
                msg: err.message
            });
        });
    /*
    var apiCall = request[method === 'delete' ? 'del' : method](apiCallUrl);
    
    if (['post', 'put'].indexOf(method) !== -1) {
    apiCall.type('application/json');
    req.pipe(apiCall);
    }
    
    apiCall.end(function (err, apiRes) {
    if (err) {
        res
            .status(500)
            .end();
        console.error(err);
        return;
    }
    
    res
        .status(apiRes.status)
        .set('Content-Type', apiRes.headers['content-type'])
        .end(apiRes.text);
    });*/
    };
    module.exports = {
        RequestD2L
    }

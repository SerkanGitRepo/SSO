var express = require("express");

var startdate = Object;

var router = express.Router();
var jwt_decode = require('jwt-decode');
//var beautify = require("json-beautify");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", function(req,res){
    res.render("index");
});

router.post("/index", function(req,res){
    if (req.body.txtLoginLDAP){
        res.redirect(req.body.txtLoginLDAP);
    }
    if (req.body.txtLogoutLDAP){
        res.redirect(req.body.txtLogoutLDAP);
    }
    if (req.body.txtLoginMSP){
        res.redirect(req.body.txtLoginMSP);
    }
    if (req.body.txtLogoutMSP){
        res.redirect(req.body.txtLogoutMSP);
    }
    if (req.body.txtGetUser){
        startdate=(new Date()).getTime();
        res.redirect(req.body.txtGetUser);
    }
    res.send();
});

router.get("/noregister", function(req,res){
    res.render("noregister",{title:"SSO Node Js Test"});
});

router.post("/noregister", function(req,res){

})

router.get("/home", function(req,res){
    res.render("home",{title:"SSO Node Js Test Ana Sayfa"});
});


router.get("/logout", function(req,res){
    res.render("logout",{title:"SSO Logout LDAP Page"});
});

router.get("/logoutmsp", function(req,res){
    res.render("logoutmsp",{title:"SSO Logout MSP Page"});
});

router.post('/login', function(req, res) {

    var decodedValue = jwt_decode(req.body.access_token);
    var objs = JSON.parse(JSON.stringify(decodedValue));
    var JsonSchema = JSON.parse(JSON.stringify({"jti":"acb63cbb-d669-4808-8678-83db4a3e5c74","client_id":"39940BCA23EC4B6199D53CFB58114B94:8ECD562BFF374D259EE42A2C5E385093C2E20088","sub":"serkanaks","Resource":"LDAP","name":"serkanaks","given_name":"Serkan Aksüt","phone_number":"(212) 456 23 30","mobilephone":"(533) 721 84 94","company":"ZORLU HOLDİNG A.Ş.","department":"Kalite Test ve Sürüm Yönetimi Müdürlüğü","officename":"Levent199","label":"Kalite Test ve Sürüm Yönetimi Müdürü","email":"serkan.aksut@zorlu.com","domain":"zorlu.com","userpoolid":"155","role":[],"act":"50001910","picture":"xyz","nbf":1651746055,"exp":1651749655,"iat":1651746055,"iss":"https://auth.zorlu.com/i","aud":"https://auth.zorlu.com/a"}));
console.log(decodedValue);
    var htmlstr="";

    Object.getOwnPropertyNames(objs).forEach(
        function (val, idx, array) {
            if(val != "picture" && val != "act"){
                htmlstr = htmlstr + "<p><b>" + val + ":</b>" + objs[val] + "</p>";
            } else {

                if (val == "picture"){
                    htmlstr = htmlstr + "<p><b>" + val + " Yetki:</b>Var / <b>Değer:</b>" + objs[val] + "</p>"
                    htmlstr = htmlstr + "<p><a href='" + objs[val] + "'>" + val + "</a></p>"
                } else{
                    htmlstr = htmlstr + "<p><b>" + val + " Yetki:</b>Var / <b>Değer:</b>" + objs[val] + "</p>"
                }
            }
        }
      );
//Şema Kontrol
      for (i in objs) {
        if (!JsonSchema.hasOwnProperty(i)) {
            htmlstr = "<p><h1>Schema Error Page</h1></p>"
        }
    }

    htmlstr = htmlstr + "<p><a href='http://localhost:3000'>Ana Sayfa</a></p>"
    
    res.send(
        htmlstr  
    );
    res.end();
});


router.post('/loginmsp', function(req, res) {

    var decodedValue = jwt_decode(req.body.access_token);
    var objs = JSON.parse(JSON.stringify(decodedValue));
    var JsonSchema = JSON.parse(JSON.stringify({"jti":"acb63cbb-d669-4808-8678-83db4a3e5c74","client_id":"39940BCA23EC4B6199D53CFB58114B94:8ECD562BFF374D259EE42A2C5E385093C2E20088","sub":"serkanaks","Resource":"MSP","name":"serkan.aksut78@gmail.com","given_name":"Serkan Aksüt","phone_number":"(212) 456 23 30","mobilephone":"(533) 721 84 94","company":"","department":"Kalite Test ve Sürüm Yönetimi Müdürlüğü","officename":"Levent199","label":"Kalite Test ve Sürüm Yönetimi Müdürü","email":"serkan.aksut@zorlu.com","domain":"zorlu.com","userpoolid":"155","role":[],"picture":"xyz","nbf":1651746055,"exp":1651749655,"iat":1651746055,"iss":"https://auth.zorlu.com/i","aud":"https://auth.zorlu.com/a"}));
    console.log(decodedValue);
    var htmlstr="";

    Object.getOwnPropertyNames(objs).forEach(
        function (val, idx, array) {
            if(val != "picture" && val != "act"){
                htmlstr = htmlstr + "<p><b>" + val + ":</b>" + objs[val] + "</p>";
            } else {
                if (val == "picture"){
                    htmlstr = htmlstr + "<p><b>" + val + " Yetki:</b>Var / <b>Değer:</b>" + objs[val] + "</p>"
                    htmlstr = htmlstr + "<p><a href='" + objs[val] + "'>" + val + "</a></p>"
                } else{
                    htmlstr = htmlstr + "<p><b>" + val + " Yetki:</b>Var / <b>Değer:</b>" + objs[val] + "</p>"
                }
            }
        }
      );
//Şema Kontrol
      for (i in objs) {
        if (!JsonSchema.hasOwnProperty(i)) {
            htmlstr = "<p><h1>Schema Error Page</h1></p>"
            //htmlstr = "Şema hatası"; 
        }
    }

    htmlstr = htmlstr + "<p><a href='http://localhost:3000'>Ana Sayfa</a></p>"
    
    res.send(
        htmlstr  
    );
    res.end();
});

router.get("/getuser", function(req,res){
    res.render("getuser",{title:"SSO Node Js Get User"});
});

router.post('/getuser', function(req, res) {

    var htmlstr="";
    
    const https = require('https');
//deneme
    // function returns a Promise
    function getPromise() {
	return new Promise((resolve, reject) => {

    var requestOptions = {
                hostname: "sso.zorlu.com.tr", // url or ip address
                port: 443, // default to 80 if not provided
                path: "/v2/UserInfo",
                method: "GET", // HTTP Method
                headers:{
                    "Authorization":"Bearer " + req.body.access_token 
                }
    }   ;

    https.get(requestOptions, (resp) => {

    let chunks_of_data = [];

    // A chunk of data has been received.
    resp.on('data', (fragments) => {
        chunks_of_data.push(fragments);
    });

    resp.on('end', () => {
        let response_body = Buffer.concat(chunks_of_data);
        resolve(response_body.toString());

        var objsUsr = JSON.parse(chunks_of_data);
        console.log(objsUsr);
        var JsonSchemaUsr = JSON.parse(JSON.stringify({"resource": "MSP","jti": "5635ffc5-c82c-4df2-845e-7f0f9e9f2c34","name": "serkanaks", "clientId":"C22E564BE26D44A4830E5BCD1DDAA84D:8B88AE646D96BC4E2557D800459900EB7AC51ED4","givenName": "serkanaks","phone": "(212) 456 23 30","gsm": "(533) 721 84 94","department": "Kalite Test ve Sürüm Yönetimi Müdürlüğü","company":"","officeName": "Levent199","title": "Kalite Test ve Sürüm Yönetimi Müdürü","email": "serkan.aksut@zorlu.com","domain": "zorlu.com","registrationNumber": "50001910","picture": "https:/sso.zorlu.com.tr/v2/Photo/5635ffc5-c82c-4df2-845e-7f0f9e9f2c34","userPoolId": 153,"roles": []}));

        Object.getOwnPropertyNames(objsUsr).forEach(
            function (valUsr, idx, array) {
                if(valUsr != "picture" && valUsr != "act"){
                    htmlstr = htmlstr + "<p><b>" + valUsr + ":</b>" + objsUsr[valUsr] + "</p>";
                } else {
    
                    if (valUsr == "picture"){
                        htmlstr = htmlstr + "<p><b>" + valUsr + " Yetki:</b>Var / <b>Değer:</b>" + objsUsr[valUsr] + "</p>"
                        htmlstr = htmlstr + "<p><a href='" + objsUsr[valUsr] + "'>" + valUsr + "</a></p>"
                    } else{
                        htmlstr = htmlstr + "<p><b>" + valUsr + " Yetki:</b>Var / <b>Değer:</b>" + objsUsr[valUsr] + "</p>"
                    }
                }
            }
        );
        //Şema Kontrol
        for (i in objsUsr) {
          if (!JsonSchemaUsr.hasOwnProperty(i)) {
            htmlstr = "<p><h1>Schema Error Page</h1></p>"
          }
        }
    
        htmlstr = htmlstr + "<p><a href='http://localhost:3000'>Ana Sayfa</a></p>"
    });

    resp.on('error', (error) => {
        reject(error);
    });
        });
    });
    }
    

    // async function to make http request
    async function makeSynchronousRequest(request) {
	try {
		let http_promise = getPromise();
		let response_body = await http_promise;

		// holds response from server that is passed when Promise is resolved
		//console.log(response_body);
	}
	catch(error) {
		// Promise rejected
		console.log(error);
	}
    }
    
    (async function () {
        // wait to http request to finish
        await makeSynchronousRequest();
        let end = (new Date()).getTime();
        var sonucms=end - startdate;
        if(end - startdate>1000){
            htmlstr = "<p><h1>API Performance Problem>1000ms (" + sonucms +  " ms)</h1></p>"
        }
        // below code will be executed after http request is finished
        res.send(
            htmlstr
        );
        res.end();
    })();

});


module.exports = router;
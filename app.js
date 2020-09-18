const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
   res.sendFile(__dirname+ "/signup.html");
});

app.post("/", function(req, res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  console.log(firstName, lastName, email);
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
        }

    ]
  }
  var jsonData = JSON.stringify(data);
  const url = "https://us17.api.mailchimp.com/3.0/lists/6c0b22cb53";

  const option = {
    method: "POST",
    auth: "garima:eafb2f5c01d3a43b28d2a7cb4eb748af-us17"
  }
const request = https.request(url, option, function(response){

  if (response.statusCode===200) {
    res.sendFile(__dirname +"/success.html");
  }
  else {
    res.sendFile(__dirname +"/failure.html");
  }


  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
})
 request.write(jsonData);
 request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("server is running on 3000");
});

//apikey eafb2f5c01d3a43b28d2a7cb4eb748af-us17
//id 6c0b22cb53

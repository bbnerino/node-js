const http = require("http");

const server = http.createServer((req,res)=>{
	console.log(req)
  return ("hi")
})


server.listen(3000)
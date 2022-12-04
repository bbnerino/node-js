const fs = require("fs")

const requestHandler = (req,res)=>{
  const url = req.url
  const method =req.method 
  if(url==="/"){
    // res.setHeader('Content-Type',"text/html")
    res.write('<html>')
    res.write('<head><title>hihihi</title></head>')
    res.write('<body><form action="/message" method="POST"><input name="id" type="text"><input name="pw" type="text"><button>send</button> </form></body>')
    res.write('</html>')
    return res.end()
  }
  if (url==="/message" && method==="POST"){
    const body = [];
    req.on('data',(chunk)=>{
      body.push(chunk)
    }) // 특정 이벤트를 들을 수 있도록 한다.
    return req.on('end',()=>{
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody)
      const id = parsedBody.split("&")[0].split("=")[1]
      const pw = parsedBody.split("&")[1].split("=")[1]
      fs.writeFile("message.txt",`id:${id} 이고 pw:${pw}이다`,(err)=>{
        res.statusCode = 404;
        res.setHeader('Location','/')
        return res.end()
      })
      res.statusCode = 302
      res.setHeader("Location",'/')
      return res.end()
    }) // 요청을 발행한 후에 실행
  }
  // if()
  
  res.setHeader('Content-Type',"text/html")
  res.write('<html>')
  res.write('<head><title>hihihi</title></head>')
  res.write('<body><h1>HHI</h1></body>')
  res.write('</html>')
  res.end()
}

module.exports = requestHandler
const http = require("http");

http.createServer((request, response) =>{
    response.writeHead(200, {'Content-Type':'application/json'});

    if(request.url === "/produtos"){
        response.end(JSON.stringify({
            message:"Rota de produto",
        }))
    }

    response.end(JSON.stringify("Rota default"))
}).listen(4001, ()=>
console.log("Servidor rodando"))
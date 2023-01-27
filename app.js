const express = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");

const app = express();

app.use(express.json());

let products = [];


app.post("/products", (request, response) =>{
    const {name, price} = request.body;

    const product = {
        name,
        price,
        id:randomUUID(),
    }
    products.push(product);
    fs.writeFile("products.json", JSON.stringify(products), (err) => {
        console.log(err);
    })

     return response.json(product);
});
app.get("/listaProducts", (request, response) =>{
    fs.readFile("products.json", "utf-8", (err, data) => {
        if(err){
            console.log(err);
        }else{
             products = JSON.parse(data);
        }
    })
    return response.json(products);
})

app.get("/listaOne/:id", (request, response) =>{
    const { id } = request.params;
    return response.json(products.find(product => product.id === id));
})
app.put("/update/:id", (request, response) =>{
    const { id } = request.params;
    const {name, price} = request.body;

    const productIndex = products.findIndex(product => product.id === id);
    products[productIndex] = {
        name,
        price,
        id
    }

    return response.json({message:"Produto alterado com sucesso"});
})

app.delete("/delete/:id", (request,response) =>{
    const {id} = request.params;
    const productIndex = products.findIndex(product => product.id === id);

    products.splice(productIndex, 1);

    return response.json({message:"Produto removido com sucesso"});
})

app.listen(4002, () => console.log("Running em 4002 port"));
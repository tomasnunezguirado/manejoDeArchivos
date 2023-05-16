const fs = require('fs')

class ProductManager{
    constructor(){
        this.products = []
        this.id = 0
        this.path = "./ruta.json"
    }   
    // Metodo agregar producto (verificacion y id incrementado)
    addProduct(title, description, price, thumbnail, code, stock,){
        if(title && description && price && thumbnail && code && stock ){
            const verificationCode = this.products.some(product => product.code === code)
            if(verificationCode){
                console.log("ERROR: El codigo ingresado esta repetido")
            }else{
                let id = this.id++
                const newProduct = {id, title, description, price, thumbnail, code, stock};
                this.products.push(newProduct)
                
            }
        }else{
            console.log("ERROR: Debe agregar todos los campos antes de continuar")
        }
    }
    
    // Metodo para mostrar el arreglo
    getProducts(){
        console.log(this.products)
    }
    
    //Metodo para obtener el producto por ID
    getProductById(id){
        const productID = this.products.find(product => product.id === id);
        if (!productID){
            console.log("Not found")
        }
        else{
            console.log(`Id encontrado`)
        }
    }
    // Actualizar campo de producto
        updateProduct(id, newProduct) {
            const index = this.products.findIndex(product => product.id === id);
            if (index === -1) {
                console.error("No se encontró el producto");
                return;
            }
            const productActualizado = {
                ...this.products[index],
                ...newProduct
            };
            this.products[index] = productActualizado;
            console.log("Producto actualizado correctamente");
        }
    
    //Borrar producto
    deleteProduct(id){
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1){
            console.log("No se encontro producto con ese Id")
        }
        else{
            this.products.splice(index, id)
            console.log('Se encontro el id y el producto sera borrado')
        }

    }

    saveProducts(){
        const jsonData = JSON.stringify(this.products);
        fs.writeFileSync(this.path, jsonData, error =>{
            if(error){
                console.log("Hubo un error")
            }else{
                console.log("No hubo errro")
            }
        });
    }
}




const Manager = new ProductManager()

Manager.addProduct("Fideos", "Fideos con salsa mixta", 2000,"./html", 152, 15);
Manager.addProduct("Carne", "Carne al horno con papas", 2500, "./html", 115, 5 )
Manager.addProduct("Papas", "Papas fritas con cheddar", 1000, "./html", 215, 26 )

console.log(Manager.products)

Manager.saveProducts()

Manager.getProductById(2)

Manager.deleteProduct(1)
Manager.deleteProduct(106010)

Manager.updateProduct(2, { title: "Nachos", description: "con cheddar", price: 1500, url: './html', stock: 24 });


console.log(Manager.products)
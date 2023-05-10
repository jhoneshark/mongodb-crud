const conn = require('../db/conn')
const { ObjectId } = require('mongodb')

const dbName = 'primeirobanco'

class Product {
    constructor(name, image, price, description) {
        this.name = name
        this.image = image
        this.price = price
        this.description = description
    }

    save() {
        const product = conn.db(dbName).collection('products').insertOne({
            name: this.name,
            image: this.image,
            price: this.price,
            description: this.description
        })

        return product
    }

    static getProducts(){
        const products = conn.db(dbName).collection('products').find().toArray()
        return products
    }

    static async getProductById(id) {
        const product = await conn.db(dbName).collection('products').findOne({_id: new ObjectId(id)})
        return product
    }

    static async removeProductById(id) {
        await conn.db(dbName).collection('products').deleteOne({_id: new ObjectId(id)})
        return
    }

    updateProduct(id) {
        conn
        .db(dbName)
        .collection('products')
        .updateOne({ _id:new ObjectId(id) }, { $set: this } )
    
        return
      }
  
}

module.exports = Product
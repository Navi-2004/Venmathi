const Product = require('../models/Products');


module.exports = {
    createProduct: async (req, res) => {
       
            const newProduct = new Product(req.body);
            try {
                const savedProduct = await newProduct.save();
                res.status(200).json(savedProduct);
            } catch (err) {
                res.status(500).json(err);
            }
        },

     getAllProducts: async (req, res) => {
        try{
            const products=await Products.find().sort({createdAt:-1});
            console.log(products);
            res.status(200).json(products);

        }
        catch(err){
            res.status(500).json(err);
        } 
    
},
getProduct: async (req, res) => {
    try{
        const product=await Product.findById(req.params.id);
        res.status(200).json(product);

    }
    catch(err){
        res.status(500).json("failed to get the product");
    } 

},
searchProduct:async (req,res)=>{
    try{
        const result= await Product.aggregate([
            [
                {
                  $search: {
                    index: "furniture",
                    text: {
                      query: req.query.key,
                      path: {
                        wildcard: "*"
                      }
                    }
                  }
                }
              ]
        ])
        res.status(200).json(result);
    }
    catch(err){
        res.status(500).json("Failed to search the product");
    }
}
}
import { Schema, model } from "mongoose";

const ProductsSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    user: { type: Schema.Types.Boolean, ref: 'User' }
}, { timestamps: true })

const Product = model('Product', ProductsSchema)
export default Product

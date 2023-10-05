const mongoose= require("mongoose")
const {Schema} = mongoose
const ProductSchema = new Schema({name:String})
module.exports = mongoose.model("Category",ProductSchema)
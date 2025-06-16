const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({

  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  image:{
    type:String,
    required:true

  },
  serves:{
    type:Number,
    required:true
  },
  prepTime:{
    type:String,
    required:true
  },
  cookTime:{
    type: String,
    required:true
  },
  ingredients:{
    type: String,
    required:true
  },
  instructions:{
    type: String,
    required:true
  },
  category:{
    type: String,
    required:true
  },
  })

const Recipe = mongoose.model("Recipe",recipeSchema);
module.exports = Recipe;
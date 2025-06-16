const  router = require("express").Router();

let Recipe = require("../models/recipe");

//Create a recipe
////http://localhost:3030/recipe/add

router.route("/add").post((req,res)=>{
    const title = req.body.title;
    const description =req.body.description;
    const image = req.body.image;
    const serves =Number(req.body.serves);
    const prepTime =req.body.prepTime;
    const cookTime =req.body.cookTime;
    const ingredients =req.body.ingredients;
    const instructions =req.body.instructions;
    const category =req.body.category;

    const newRecipe = new Recipe({
        title,
        description,
        image,
        serves,
        prepTime,
        cookTime,
        ingredients,
        instructions,
        category
    })

    newRecipe.save().then(()=>{
        res.json("Recipe added")
    }).catch((err)=>{
        console.log(err);
    })
})

//Read recipe details
//http://localhost:3030/recipe/
router.route("/").get((req,res)=>{

    Recipe.find().then((recipes)=>{
        res.json(recipes)
    }).catch((err)=>{
        console.log(err)
    })
})

//read specific recipe details
router.route("/get/:id").get(async(req,res)=>{
    let recipeId = req.params.id;
    const recipeData =await Recipe.findById(recipeId)
    .then((recipe)=>{
        res.status(200).send({status: "Recipe fetched", recipe})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with fetching recipe", error:err.message})
    })

})

//update a recipe
//http://localhost:3030/recipe/update

router.route("/update/:id").put(async(req,res)=>{
    let recipeId = req.params.id;
    const{title, description, image, serves, prepTime, cookTime, ingredients, instructions, category}= req.body;

    const updateRecipe = {
        title,
        description,
        image,
        serves,
        prepTime,
        cookTime,
        ingredients,
        instructions,
        category
    }

    const update = await Recipe.findByIdAndUpdate(recipeId, updateRecipe)
    .then(()=>{
        res.status(200).send({status: "Recipe updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating recipe", error:err.message});
    })
})

//delete a recipe
//http://localhost:3030/recipe/delete/csafahdxga72362473248

router.route("/delete/:id").delete(async(req,res)=>{
    let recipeId = req.params.id;

    await Recipe.findByIdAndDelete(recipeId)
    .then(()=>{
        res.status(200).send({status: "Recipe deleted"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating recipe", error:err.message});
    })
})


module.exports = router;

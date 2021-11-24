const Category = require("../models/categorySchema");
const slugify = require('slugify');
require("../database/connect");
exports.addcategory = async (req,res) => {

    try{
    const newcategory = {
        name: req.body.name,
        slug: slugify(req.body.name)
     } 

     if(req.body.parentId){
         newcategory.parentId = req.body.parentId;
     }

     const category = new Category(newcategory);   
     console.log(category);
     console.log(newcategory);
     
     const cat = await category.save();

     if(cat){
          return res.status(201).json({message:'category added'});
      }
     else(error) => {
         return res.status(400).json({error:"already exists"});
    }
}
catch(err){
    res.status(400).json({error:'something went wrong'})
}
 };


 exports.getcategory = async (req,res) =>{

    try{
   const getcategory = await Category.find({});
   console.log(getcategory);

   if(getcategory){
       res.status(200).json({getcategory});
   }
   else(err) =>{
       res.status(400).json({ error:"something went wrong" });
}

 }catch (err){
    console.log(err);
  }
}


exports.deletecategory=async(req,res)=>{
    try
    {
        const {id}=req.params;
        //console.log(id)
        const deleted = await Category.findByIdAndDelete(id)
        console.log(deleted);
        if(deleted)
        {
            res.send("data deleted")
        }
        else
        {
            res.status(400).json(("data not found"));

        }

    }
    catch(err)
    {
        res.send("Something Wrong");
        console.log(err)
    }
}
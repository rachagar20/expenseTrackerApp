import { User } from "../model/user_model.js";
export const deleteCategory=async(req,res)=>{
    const userId=req.user._id;
    const categories=req.user.categories;
    const newCategories=categories?.filter((eachCategory)=>eachCategory._id!=req.params.id)
    const user=await User.findByIdAndUpdate(userId,{$set:{categories:newCategories}},{new:true});
    res.status(200).json({user:user})
}


export const createCategory=async (req,res)=>{
    const {label,icon}=req.body;
    const categories=req.user.categories;
    const user=await User.findByIdAndUpdate(req.user._id,{ $set: { categories: [...req.user.categories, { label, icon }] } },{new:true});
    res.json({user:user});
}


export const updateCategory=async (req,res)=>{
    const { label, icon } = req.body;
  const response = await User.findByIdAndUpdate(
    { _id: req.user.id },
    {
      $set: {
        categories: req.user.categories.map((category) => {
          if (category._id == req.params.id) {
            return { label, icon };
          }
          return category;
        }),
      },
    },{new:true}
  );
  res.json({ user:response });
}
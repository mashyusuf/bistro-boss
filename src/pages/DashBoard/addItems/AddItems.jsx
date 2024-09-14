import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa6";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddItems = () => {
    const { register, handleSubmit,reset } = useForm()
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()
    const onSubmit = async (data) =>{ 
        console.log(data)
        //-------Image Upload To Imagebb Then Get an url----
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api,imageFile,{
            headers:{
                'content-type':'multipart/form-data'
            }
        });
        if(res.data.success){
            const menuItem = {
                name: data.name,
                category:data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            //-------
            const menuRes = await axiosSecure.post('/menu',menuItem)
            console.log(menuRes.data)
            if(menuRes.data.insertedId){
                reset();
                //----- Show Success
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.name} Added Successfully`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
        console.log('with Image Url', res.data)
    }
    return (
        <div>
           <SectionTitle heading="Add an item" subHeading="Add An Item"></SectionTitle>
           <div>
           <form onSubmit={handleSubmit(onSubmit)}>
           <label className="form-control w-full">
  <div className="label">
    <span className="label-text">Recipe Name</span>
  </div>
  <input type="text"  {...register("name",{required:true})}
       placeholder="Recipe Name" className="input input-bordered input-primary w-full " />
</label>


    <div className="flex gap-6 my-10">
    <label className="form-control w-full ">
    <div className="label">
    <span className="label-text">Select Category</span>
  </div>
 
 <select defaultValue="default" {...register('category',{required:true})}
     className="select select-secondary w-full ">
 <option disabled value="default">Pick your Category</option>
 <option value="salad">Salad</option>
 <option value="pizza">Pizza</option>
 <option value="soup">Soup</option>
 <option value="desart">Desart</option>
 <option value="drinks">Drinks</option>
</select>
    </label>
{/* Price Item */}
<label className="form-control w-full ">
  <div className="label">
    <span className="label-text">Price</span>
  </div>
  <input type="number"  {...register("price",{required:true})}
       placeholder="Price" className="input input-bordered input-primary w-full " />
</label>
    </div>
    <label className="form-control">
  <div className="label">
    <span className="label-text">Recipe Details</span>
    
  </div>
  <textarea  {...register("repice",{required:true})} className="textarea textarea-bordered h-24" placeholder="Details"></textarea>
</label>

      <div className="form-control w-full my-5">
      <input  {...register("image",{required:true})} type="file" className="file-input w-full max-w-xs" />
      </div>
       <button className="btn btn-info w-full">Add Item <FaUtensils className="mr-4"></FaUtensils></button>
      
    </form>
           </div>
        </div>
    );
};

export default AddItems;
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";



const FoodCard = ({item}) => {
    const {user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [,refetch] = useCart();
    const {name, image, price, recipe , _id} = item;
    const handleFoodCard =()=>{
        if(user && user.email){
            const cartItem ={
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }
            axiosSecure.post(`/carts` , cartItem)
            .then(res => {
                console.log(res.data)
                if(res.data.insertedId){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${name} Added To Your Cart`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                      refetch()
                }
            })
        }
        else{
            Swal.fire({
                title: "You Are Not Logged In",
                text: "Please Login to Add Cart!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
              }).then((result) => {
                if (result.isConfirmed) {
                navigate('/login',{state:{from:location}})
                }
              });
        }
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button onClick={handleFoodCard} className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
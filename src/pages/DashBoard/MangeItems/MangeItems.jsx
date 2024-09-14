import { MdDelete } from "react-icons/md";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const MangeItems = () => {
    const [menu , loading , refetch] = useMenu()
    const axiosSecure = useAxiosSecure();
    const  handleDeleteItem = (item)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`);
              if(res.data.deletedCount > 0){
                refetch();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Deleted SuccesFully",
                    showConfirmButton: false,
                    timer: 1500
                  });
              }
            }
          });
    }
    return (
        <div>
            <SectionTitle heading="mange all items" subHeading="HurrY Up"></SectionTitle>
            <div>
            <div className="overflow-x-auto">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th>
          #
        </th>
        <th>Image</th>
        <th>Item Name</th>
        <th>Price</th>
        <th>Update</th>
        <th>Delete</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {
        menu.map((item ,index) =>  <tr key={item._id}>
            <th>
                {index +1}
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
              </div>
            </td>
            <td>
            {item.name}
            </td>
            <td>${item.price}</td>
            <td>
            <Link to={`/dashboard/updateItem/${item._id}`}>
      <button className="btn btn-ghost btn-lg bg-orange-500">
        <FaEdit className="text-white" />
      </button>
    </Link>
            </td>
            <td> <button onClick={()=> handleDeleteItem(item)} className="btn btn-ghost btn-lg"><MdDelete className="text-red-600"></MdDelete></button></td>
          </tr>)
      }
     
    </tbody>
  </table>
</div>
            </div>
        </div>
    );
};

export default MangeItems;
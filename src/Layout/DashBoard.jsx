import { NavLink, Outlet } from "react-router-dom";
import { LuShoppingBag } from "react-icons/lu";
import { IoHomeSharp } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { GiVibratingBall } from "react-icons/gi";
import { MdBook, MdContactMail, MdHome, MdMenu, MdRestaurantMenu } from "react-icons/md";
import useCart from "../hooks/useCart";
import { FaList, FaUser, FaUtensils } from "react-icons/fa6";
import useAdmin from "../hooks/useAdmin";
const DashBoard = () => {
    const [cart] = useCart();
    //ToDo-----
    const [isAdmin] = useAdmin();

    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-500">
                <ul className="menu p-4">
                   {
                    isAdmin ? <>
                    
                    <li>
                        <NavLink to={'/dashboard/adminHome'}> <IoHomeSharp /> Admin Home</NavLink>
                        
                        </li>
                    <li>
                        <NavLink to={'/dashboard/addItems'}> <FaUtensils /> Add Items</NavLink>
                        
                        </li>
                    <li>
                        <NavLink to={'/dashboard/manageItems'}> <FaList />Mange Items</NavLink>
                        
                        </li>
                    <li>
                        <NavLink to={'/dashboard/manageBookings'}> <MdBook />Mange Bookings</NavLink>
                        
                        </li>
                    <li>
                        <NavLink to={'/dashboard/allUsers'}> <FaUser />All User</NavLink>
                        
                        </li>
                    </>   :
                    <>
                     <li>
                        <NavLink to={'/dashboard/cart'}> <LuShoppingBag /> My Cart ({cart.length})</NavLink>
                        
                        </li>
                    <li>
                        <NavLink to={'/dashboard/userHome'}> <IoHomeSharp /> User Home</NavLink>
                        
                        </li>
                    <li>
                        <NavLink to={'/dashboard/'}> <FaCalendarAlt /> Ummm</NavLink>
                        
                        </li>
                    <li>
                        <NavLink to={'/dashboard/review'}> <GiVibratingBall />Add A  Reviwe</NavLink>
                        
                        </li>
                    <li>
                        <NavLink to={'/dashboard/paymentHistory'}> <MdRestaurantMenu /> Real Payment History</NavLink>
                        
                        </li>
                    </>
                   }
                        <div className="divider"></div>
                        <li>
                        <NavLink to={'/'}> <MdHome />Home</NavLink>
                        
                        </li>
                        <li>
                        <NavLink to={'/order/salad'}> <MdMenu />Menu</NavLink>
                        
                        </li>
                        <li>
                        <NavLink to={'/'}> <MdContactMail/>Contact Us</NavLink>
                        
                        </li>

                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;
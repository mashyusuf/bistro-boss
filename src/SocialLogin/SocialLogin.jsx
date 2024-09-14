import { FaGoogle } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { googleSignIn } = useAuth(); // Corrected here
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()

    const handleGoogleSignIn = () => { // Corrected here
        googleSignIn() // Corrected here
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }
                axiosPublic.post('/users', userInfo)
                .then(res =>{
                    console.log(res.data)
                    navigate('/')
                })
            })
            .catch(error => {
                console.error('Google Sign-In failed', error);
            });
    };

    return (
        <div className="">
            <div className="divider divider-info"></div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn bg-white">
                    <FaGoogle className="mr-4" />
                    Google Login
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;

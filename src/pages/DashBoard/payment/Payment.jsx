import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import {Elements} from "@stripe/react-stripe-js"
import ChekForm from "./ChekForm";
//---TODO----
const stripePromise = loadStripe(import.meta.env.VITE_payment_Gateway_Pk)
const Payment = () => {
    return (
        <div>
            <SectionTitle heading="payment please" subHeading="hy Payment Here Guys"></SectionTitle>
            <div>
               <Elements stripe={stripePromise}>
                <ChekForm></ChekForm>
               </Elements>
            </div>
        </div>
    );
};

export default Payment;
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ChekForm = () => {
    const [error , setError] = useState('')
    const [ clientSecret , setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState()
    const stripe = useStripe();
    const [cart,refetch] = useCart();
    const {user} = useAuth();
    const navigate = useNavigate()
    const totalPrice = cart.reduce((total,item)=> total + item.price,0)
    const axiosSecure = useAxiosSecure();
    useEffect(()=>{
        if(totalPrice > 0){
            axiosSecure.post('/create-payment-intent' , {price: totalPrice})
        .then(res => {
            console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
        })
        }
    },[axiosSecure,totalPrice])
    const elements = useElements();
    const handleSubmit = async(event)=>{
    event.preventDefault();
    if(!stripe || !elements){
        return
    }
    const card = elements.getElement(CardElement)
    if(card == null){
        return
    }
    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card
    })
    if(error){
        console.log('payment error',error)
        setError(error.message);
    }
    else{
        console.log('payment method',paymentMethod)
        setError('')
    }
    //-------confirm Payment-------
    const {paymentIntent , error: confirmError} = await stripe.confirmCardPayment(clientSecret,{
        payment_method:{
            card:card,
            billing_details:{
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous'
            }
        }
    })
    if(confirmError){
        console.log('confirm error')
    }
    else{
        console.log('payment intent' , paymentIntent)
        if(paymentIntent.status === 'succeeded'){
            console.log('transaction id' , paymentIntent.id);
            setTransactionId(paymentIntent.id);
            //--------Now Save The Payment In The DataBAse------
            const payment = {
                email: user.email,
                price: totalPrice,
                transactionId: paymentIntent.id,
                data: new Date(),//--------
                cartIds: cart.map(item => item._id),
                menuItemIds: cart.map(item =>item.menuId),
                status: 'pending'
            }
            const res = await axiosSecure.post('/payments',payment);
            console.log('payment Saved' , res.data);
            refetch()
            if(res.data?.paymentResult?.insertedId){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Thank You For Your Payment",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/dashboard/paymentHistory')
            }
        }
    }

    }
    return (
        <form onSubmit={handleSubmit}>
        <CardElement
            options={{
                style: {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                },
            }}
        />
        <button className="btn btn-outline btn-success btn-primary my-6" type="submit" disabled={!stripe || !clientSecret}>
            Pay
        </button>
        <p className="text-red-600 font-bold text-xl">{error}</p>
        {
            transactionId && <p className="text-green-600 text-xl font-bold"> Your Transaction id : {transactionId}</p>
        }
        
    </form>
    );
};

export default ChekForm;
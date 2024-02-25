// import { useEffect, useRef } from 'react';
// import crypto from 'crypto-js';
// import PropTypes from 'prop-types';
// import Axios from 'axios';

// // Function to load script and append in DOM tree.
// const loadScript = src => new Promise((resolve) => {
//   const script = document.createElement('script');
//   script.src = src;
//   script.onload = () => {
//     console.log('razorpay loaded successfully');
//     resolve(true);
//   };
//   script.onerror = () => {
//     console.log('error in loading razorpay');
//     resolve(false);
//   };
//   document.body.appendChild(script);
// });


// const RenderRazorpay = ({
//   orderId,
//   keyId,
//   keySecret,
//   currency,
//   amount,
// }) => {
//   const paymentId = useRef(null);
//   const paymentMethod = useRef(null);

//   // To load razorpay checkout modal script.
//   const displayRazorpay = async (options) => {
//     const res = await loadScript(
//       'https://checkout.razorpay.com/v1/checkout.js',
//     );

//     if (!res) {
//       console.log('Razorpay SDK failed to load. Are you online?');
//       return;
//     }
//     // All information is loaded in options which we will discuss later.
//     const rzp1 = new window.Razorpay(options);

//     // If you want to retreive the chosen payment method.
//     rzp1.on('payment.submit', (response) => {
//       paymentMethod.current = response.method;
//     });

//     // To get payment id in case of failed transaction.
//     rzp1.on('payment.failed', (response) => {
//       paymentId.current = response.error.metadata.payment_id;
//     });

//     // to open razorpay checkout modal.
//     rzp1.open();
//   };


//   // informing server about payment
//   const handlePayment = async (status, orderDetails = {}) => {
//     await Axios.post(`${serverBaseUrl}/payment`,
//       {
//         status,
//         orderDetails,
//       });
//   };


//   // we will be filling this object in next step.
//   const options = {},

//   useEffect(() => {
//     console.log('in razorpay');
//     displayRazorpay(options);
//   }, []);

//   return null;
// };

// export default RenderRazorpay;
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
     "pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3"
);

export default function App() {
     const options = {
          // passing the client secret obtained from the server
          clientSecret: import.meta.env.VITE_STRIPE_SECRET,
     };

     return (
          <Elements stripe={stripePromise} options={options}>
               <form>
                    <PaymentElement />
                    <button>Submit</button>
               </form>
          </Elements>
     );
}

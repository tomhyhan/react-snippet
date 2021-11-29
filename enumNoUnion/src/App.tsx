import React, { useState } from 'react';
import './App.css';

// 🤪🤪
// enum eCheckoutProcess  {
//   detail = 'detail',
//   payment = 'payment',
//   shipping = 'shipping'
// }

type CheckoutProcess = 'detail' | 'payment' | 'shipping'

function App() {
  const [checkoutProcess, setCheckoutProcess] = useState<CheckoutProcess>('detail')
  
  return (
    <>
    {checkoutProcess === 'detail' && 
      <>
        <h1>Detail Page</h1> 
        <button type='button' onClick={()=>setCheckoutProcess('payment')}>Go to purchase</button>
      </>}
    {checkoutProcess === 'payment' && 
      <>
        <h1>Payment Page</h1> 
        <button type='button' onClick={()=>setCheckoutProcess('shipping')}>Go to shipping</button>
      </>}
    {checkoutProcess === 'shipping' && <><h1>Shipping Order Complete</h1></>}
    </>
  );
}

export default App;

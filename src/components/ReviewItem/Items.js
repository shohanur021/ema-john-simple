import React from 'react';

const Items = (probs) => {
   //console.log(probs.product);
   const productStyle = {
          border : "2px solid red",
          padding : "5px",
          margin : "15px 200px",
          color : 'white',
          backgroundColor : "#404040"       
   }

    return (
        <>
            {
               probs.product.map(pd => 
                   <div style={productStyle}>
                   <h3>{pd.name}</h3>
                   <h2>Price : {pd.price} $ </h2>
                   <h2>Quantity : {pd.quantity}</h2>
                   </div>
               )
            }
        </>
    );
};

export default Items;
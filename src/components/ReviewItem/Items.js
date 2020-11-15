import React from 'react';

const Items = (probs) => {
   //console.log(probs.product);
   const productStyle = {
          border : "2px solid red",
          padding : "5px",
          margin : "15px 10px",
          color : 'white',
          backgroundColor : "#404040"    
   }

    return (
        <div>
            {
               probs.product.map(pd => 
                <div style={productStyle}>
                   <h4>{pd.name}</h4>
                   <h2>Price : {pd.price} $ </h2> 
                   <button onClick={() => probs.removeItem(pd.key)}>remove</button> 
                   <h2>Quantity : {pd.quantity}</h2>  
                </div>
               )      
            }
        </div>
    );
};

export default Items;
export const addDecimals=(num)=>{
    return (Math.round(num*100)/100).toFixed(2);
}

export const updateCart=(state)=>{
    let costPrice=0;
    
    for(let i=0;i<state.cartItems.length;i++){
        const item=state.cartItems[i];
        costPrice=costPrice+(item.price*item.qty*100)/100;
    }
    state.costPrice=addDecimals(costPrice)

    const shippingPrice=costPrice>100?0:10;
    state.shippingPrice=addDecimals(shippingPrice);

    const taxPrice=0.15*costPrice;
    state.taxPrice=addDecimals(taxPrice);

    state.totalPrice=(
        Number(state.costPrice)+
        Number(state.shippingPrice)+
        Number(state.taxPrice)
    ).toFixed(2);

    localStorage.setItem('cart',JSON.stringify(state));

    return state;
}
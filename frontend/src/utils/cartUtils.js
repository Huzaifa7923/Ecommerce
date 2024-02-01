export const addDecimals=(num)=>{
    return (Math.round(num*100)/100).toFixed(2);
}

export const updateCart=(state)=>{

    const itemsPrice=state.cartItems.reduce((ac,item)=>ac+(item.price*100*item.qty)/100,0);

    state.itemsPrice=addDecimals(itemsPrice)

    const shippingPrice=itemsPrice>100?0:10;
    state.shippingPrice=addDecimals(shippingPrice);

    const taxPrice=0.15*itemsPrice;
    state.taxPrice=addDecimals(taxPrice);

    state.totalPrice=(
        Number(state.itemsPrice)+
        Number(state.shippingPrice)+
        Number(state.taxPrice)
    ).toFixed(2);

    localStorage.setItem('cart',JSON.stringify(state));

    return state;
}


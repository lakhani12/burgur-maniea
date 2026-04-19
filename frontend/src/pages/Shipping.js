import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiAddFill } from 'react-icons/ri'
import { useLocation, useNavigate } from 'react-router-dom'
import AddressModal from '../components/AddressModal'
import '../styles/shipping.css'
import { deleteAddress, getAdress, selectAddress, updateAddress } from '../actions/address';
import { selectOrderType } from '../actions/orders';
const Shipping = () => {

    const cartItems = useSelector(state => state.cart.cartItems)
    const allAdress = useSelector(state => state.address.addressItems)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const orderTypePreference = useSelector(state => state.order.orderType) || 'Take Away'
    const cartPrice = cartItems.reduce((total, itm) => total + itm?.price * itm?.qty, 0)
    const deleviryPrice = (cartPrice > 500 || cartPrice === 0) ? 0 : 50
    const discount = 0;
    const totalPrice = (cartPrice + deleviryPrice) - discount;
    // const auth = useSelector(state=>state.user.user)
    const location = useLocation();
    const path = location.pathname
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [selected, setSelected] = useState(0)
    const [orderType, setOrderType] = useState(orderTypePreference)
    const [addressToEdit, setAddressToEdit] = useState()
    useEffect(() => {
        if (!user) {
            navigate('/signin')
        }
    }, [])

    useEffect(() => {
        if (user) {
            dispatch(getAdress(user._id))
        }
    }, [])
    const proceedToPayment = () => {
        dispatch(selectOrderType(orderType))
        navigate('/payment')
    }

    const delteAddress = (id) => {
        dispatch(deleteAddress(id))
    }
    const handleUpdateAddress = (address) => {
        setAddressToEdit(address)
        setShow(true)
    }

    const handleSelectAddress = (address, i) => {
        setSelected(i)
        dispatch(selectAddress(address))
    }

    return (
        <>
            <div className='shipping'>
                <div className="progress">
                    <div className="status">
                        <p>Bag</p>
                        <div className={`divider`}></div>
                        <p className={` ${path === '/shipping' && 'active'}`}>Shipping</p>
                        <div className="divider"></div>
                        <p className={` ${path === '/payment' && 'active'}`}>Payment</p>
                    </div>
                </div>
                <div className="shipping-details">
                    <div className="address">
                        <div className="order-type-selection" style={{ marginBottom: '20px' }}>
                            <h3>Order Preference</h3>
                            <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '16px' }}>
                                    <input type="radio" name="orderType" value="Take Away" checked={orderType === 'Take Away'} onChange={(e) => setOrderType(e.target.value)} /> Take Away
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '16px' }}>
                                    <input type="radio" name="orderType" value="Dine In" checked={orderType === 'Dine In'} onChange={(e) => setOrderType(e.target.value)} /> Dine In
                                </label>
                            </div>
                        </div>

                        {orderType === 'Take Away' && (
                            <>
                                <h3>Select Delivery Address</h3>
                                <div className="add-sec-area">
                                    {
                                        allAdress.length > 0 ? (allAdress.map((address, i) => (
                                            <div onClick={() => handleSelectAddress(address, i)} className={`og-add ${selected === i && 'selected'}`} key={address._id}>
                                                <p>{address.name}</p>
                                                <span>{address.address},{address.town}</span>
                                                <span>{address.city},{address.state} -{address.pinCode} </span>
                                                <span><b>Mobile No:</b>{address.mobNo}</span>
                                                <div className="btns">
                                                    <button className='btn' onClick={() => delteAddress(address._id)}>Remove</button>
                                                    <button className='btn' onClick={() => handleUpdateAddress(address)}>Edit</button>
                                                </div>
                                            </div>
                                        ))
                                        ) : <h3 style={{ padding: '20px 0' }}>No Address found! Add one</h3>}

                                    <div className="add-address" onClick={() => setShow(true)}>
                                        <div className="add">
                                            <RiAddFill />
                                            <p>Add Address</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="checkout-area">
                        <div className="billing">
                            <h4>PRICE DETAILS</h4>
                            <div className="details">
                                <div className="item">
                                    <p>Price</p>
                                    <p><span>₹</span>{cartPrice}</p>
                                </div>

                                <div className="item">
                                    <p>Delivery Charges</p>
                                    <p>{deleviryPrice === 0 ? <span className='free'>Free</span> : <span>₹{deleviryPrice}</span>}</p>
                                </div>
                            </div>
                            <div className="total">
                                <h3>Total</h3>
                                <h3><span>₹</span>{totalPrice}</h3>
                            </div>
                        </div>
                        <button onClick={proceedToPayment} disabled={totalPrice === 0 ? true : false}>PROCEED TO PAYMENT</button>
                    </div>
                </div>
            </div>
            <AddressModal show={show} setShow={setShow} addressToEdit={addressToEdit} />
        </>
    );
};

export default Shipping;

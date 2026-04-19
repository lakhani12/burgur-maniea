import React, { useState, useEffect } from 'react'
import pizza from '../apis/pizza'
import SideBarA from '../components/SideBarA'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
const AdminOrders = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getOrders = async () => {
    try {
      const { data } = await pizza.get('/api/orders/admin-orders', {
        // headers: { Authorization: `Bearer ${user.token}` } // If needed
      });
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError(`FAIL: ${err.message} - ${err.response?.data?.message || 'Unknown network error'}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders()
  }, [])
  return (
    <>
      <SideBarA />
      <div className='mainarea admin '>
        <Header />
        <div className="all-orders-area">
          <h2>All Orders</h2>
          {error && <div style={{ color: "red", margin: "10px 0", fontWeight: "bold", fontSize: "1.2rem" }}>{error}</div>}
          <div className="display-orders">
            {loading ? (
              <p>Loading orders...</p>
            ) : orders.length > 0 ? orders.map((order) => (
              <Link to={`/order/${order?._id}`} key={order?._id}><div className="order-detail-card">
                <div className="order-left-details">
                  {
                    order.orderItems?.map(item => (
                      <div className='image-card' key={item?._id}>
                        <div className="img">
                          <img src={item?.image} alt="" loading="lazy" />
                        </div>
                        <div className="details">
                          <h4>{item?.name}</h4>
                          <p>qty:{item?.qty}</p>
                          <p>place Date : {order?.createdAt}</p>
                        </div>
                      </div>
                    ))

                  }
                </div>
                <div className="status">
                  <p>Placed on{order?.createdAt} </p>
                  <span>Your item has been placed.</span>
                </div>
              </div></Link>
            )) : <h1>No Past Orders</h1>

            }

          </div>
        </div>
      </div>
    </>
  )
}

export default AdminOrders
import React, { useState } from 'react'
import SideBarA from '../components/SideBarA'
import Header from '../components/Header'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import pizza from '../apis/pizza'
import { doc, setDoc } from "firebase/firestore";
import { db, firestore } from '../firebase'

const AddProduct = () => {
  const [img, setImg] = useState("")
  const [name, setName] = useState("")
  const [des, setDes] = useState("")
  const [price, setPrice] = useState("")
  const [show, setShow] = useState(false)
  const [category, setCategory] = useState("")
  const [fileName, setFileName] = useState("Add Image")
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await pizza.post("/api/products/add-product", { name, description: des, price: parseInt(price), image: img, category })

      try {
        await setDoc(doc(firestore, db.pizzas, name), {
          name,
          inStockItem: 7,
          outOfStock: false,
          img
        });
      } catch (firebaseErr) {
        console.warn("Firebase sync failed, but MongoDB succeeded:", firebaseErr);
      }

      setLoading(false)
      setShow(true)  // Show success modal
      setName("")
      setDes("")
      setPrice("")
      setCategory("")
      setImg("")
      setFileName("Add Image")
    } catch (error) {
      console.error("Add Product Error:", error);
      alert("Failed to add product: " + (error.response?.data?.message || error.message));
      setLoading(false);
    }
  }

  const handleOnChange = (e) => {
    setImg(e.target.value);
  }
  return (
    <>
      <SideBarA />
      <div className='mainarea admin '>
        <Header />

        <div className='auth'>
          <div className="form">
            <div className="logo">
              <img src="https://cdn-icons-png.flaticon.com/512/4039/4039232.png" alt="" />
            </div>

            <form onSubmit={handleSubmit}>
              <input type="text" onChange={(e) => setName(e.target.value)} name='name' placeholder='Product Name' value={name} />
              <input type="number" onChange={(e) => setPrice(e.target.value)} name="price" id="" placeholder='Price' value={price} />
              <input type="text" onChange={(e) => setDes(e.target.value)} name='description' placeholder='description' value={des} />
              <select onChange={(e) => setCategory(e.target.value)} value={category} >
                <option value="">Category</option>
                <option value="Burger">burger</option>
                <option value="Sandwich">sandwich</option>
                <option value="Smoothy">smoothy</option>
                <option value="Snak">snak</option>
                <option value="Drink">drink</option>
              </select>
              <label htmlFor="url">{'Image URL'}</label>
              <input type="url" id='url' onChange={handleOnChange} value={img} />
              <button>{'Add'}</button>

            </form>

          </div>
        </div>

      </div>

      <Message
        showModal={show}
        msg={"Product Added Successfully"}
        img={"https://cdn.dribbble.com/users/335541/screenshots/7102045/media/5b7237fe7bbfa31531d6e765576f1bc4.jpg?compress=1&resize=400x300"}
        type="success"
        closeModal={setShow}
      />
    </>
  )
}

export default AddProduct
import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { backendUrl } from '../../../Admin/src/config'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'

const Verify = () => {
  const {navigate, token, setCartItems } = useContext(ShopContext)
  const [SearchParams, setSearchParams] = useSearchParams()

  const success = SearchParams.get('success')
  const orderId = SearchParams.get('orderId')

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null 
      }

      const response = await axios.post(backendUrl + "/api/order/verifyStripe", { success, orderId }, {headers: {token}})

      if (response.data.success) {
        setCartItems({})
        navigate("/orders")
        
      }else {
        navigate("/cart")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }

  }

  useEffect(() => {
    verifyPayment()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <div>Verify</div>
  )
}

export default Verify
import React, { useContext } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets, products } from "../assets/assets";
import { useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../../../Admin/src/config";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.sizes = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        // API CALLS for COD
        case "cod": {
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          console.log(response.data);

          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        }

        case "stripe":
          {
            const responseStripe = await axios.post(
              backendUrl + "/api/order/stripe",
              orderData,
              { headers: { token } }
            );

            if (responseStripe.data.success) {
              const { session_url } = responseStripe.data;
              window.location.replace(session_url);
            } else {
              toast.error(responseStripe.data.message);
            }
          }

          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t "
    >
      {/*-----------Left Side------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            placeholder="First name"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            required
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          required
          type="email"
          placeholder="Email address"
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          required
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            required
            type="text"
            placeholder="City"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            required
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            required
            type="number"
            placeholder="Zip"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            required
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          required
          type="number"
          placeholder="Phone"
        />
      </div>

      {/*-----------------Right Side------------------ */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/*---------------Payment Method Selection------------ */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              onClick={() => setMethod("stripe")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 max-4" src={assets.stripe_logo} alt="" />
            </div>
            <div
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              onClick={() => setMethod("razorpay")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 max-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              onClick={() => setMethod("cod")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              className="bg-black text-white px-16 py-3 text-sm cursor-pointer"
              type="submit"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

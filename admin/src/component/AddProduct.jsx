import React, { useState } from 'react'
import { assets } from '../assets/admin_assets/assets'
import axios from 'axios'
import { backendurl } from '../config'
import { toast } from 'react-toastify'
import Loading from './Loading'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { editProduct } from '../Redux/ReduxSlices/productSlices'


const AddProduct = ({token}) => {
  const [productname, setProductname] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubcategory] = useState("Topwear");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [loading, setLoading] = useState(true);

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(false);
    const formData = new FormData();
    formData.append("productname", productname);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("price", price);
    formData.append("bestseller", bestseller);


    if (image1) formData.append("image1", image1);
    if (image2) formData.append("image2", image2);
    if (image3) formData.append("image3", image3);
    if (image4) formData.append("image4", image4);
    
    try {
      const res = await axios.post(
        `${backendurl}/api/product/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProductname("");
      setPrice("");
      setDescription("");
      setCategory("Men");
      setSubcategory("Topwear");
      setSizes([]);
      setBestseller(false);
      setImage1(null);
      setImage2(null);
      setImage3(null);
      setImage4(null);
      toast.success(res.data.message);
      setLoading(true);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };
  //Edit product function
  const productEdit = useSelector((state) => state.product.items[0]);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (productEdit) {
      setProductname(productEdit.productname || "");
      setPrice(productEdit.price || "");
      setDescription(productEdit.description || "");
      setCategory(productEdit.category || "Men");
      setSubcategory(productEdit.subcategory || "Topwear");
      setSizes(productEdit.sizes || []);
      setBestseller(productEdit.bestseller || false);

      if (Array.isArray(productEdit.image)) {
        setImage1(productEdit.image[0] || null);
        setImage2(productEdit.image[1] || null);
        setImage3(productEdit.image[2] || null);
        setImage4(productEdit.image[3] || null);
      }
      setEdit(true);
    }
  }, [productEdit]);
  const updateProduct = async (e) => {
    e.preventDefault();
    setLoading(false);
    const formData = new FormData();
    formData.append("productname", productname);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("price", price);
    formData.append("bestseller", bestseller);


    if (image1) formData.append("image1", image1);
    if (image2) formData.append("image2", image2);
    if (image3) formData.append("image3", image3);
    if (image4) formData.append("image4", image4);


    try {
      const res = await axios.put(
        `${backendurl}/api/product/update/${productEdit._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProductname("");
      setPrice("");
      setDescription("");
      setCategory("Men");
      setSubcategory("Topwear");
      setSizes([]);
      setBestseller(false);
      setImage1(null);
      setImage2(null);
      setImage3(null);
      setImage4(null);
      toast.success(res.data.message);
      setLoading(true);
      setEdit(false);
      dispatch(editProduct(null));
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };
  const cancel = () => {
    setProductname("");
    setPrice("");
    setDescription("");
    setCategory("Men");
    setSubcategory("Topwear");
    setSizes([]);
    setBestseller(false);
    setImage1(null);
    setImage2(null);
    setImage3(null);
    setImage4(null);
    setEdit(false);
    dispatch(editProduct(null));
  };

  return loading ? (
    <div className="container">
      <form
        className="flex flex-col w-full items-start gap-3"
        onSubmit={edit ? updateProduct : addProduct}
      >
        <div>
          <p className="mb-2">Upload Image</p>

          <div className="flex gap-2">
            <label htmlFor="image1">
              <img
                className="w-20"
                src={
                  image1
                    ? typeof image1 === "string"
                      ? image1
                      : URL.createObjectURL(image1)
                    : assets.upload_area
                }
                alt=""
              />
              <input
                type="file"
                id="image1"
                name="image1"
                hidden
                onChange={(e) => setImage1(e.target.files[0])}
              />
            </label>
            <label htmlFor="image2">
              <img
                className="w-20"
                src={
                  image2
                    ? typeof image2 === "string"
                      ? image2
                      : URL.createObjectURL(image2)
                    : assets.upload_area
                }
                alt=""
              />
              <input
                type="file"
                id="image2"
                name="image2"
                hidden
                onChange={(e) => setImage2(e.target.files[0])}
              />
            </label>
            <label htmlFor="image3">
              <img
                className="w-20"
                src={
                  image3
                    ? typeof image3 === "string"
                      ? image3
                      : URL.createObjectURL(image3)
                    : assets.upload_area
                }
                alt=""
              />
              <input
                type="file"
                id="image3"
                name="image3"
                hidden
                onChange={(e) => setImage3(e.target.files[0])}
              />
            </label>
            <label htmlFor="image4">
              <img
                className="w-20"
                src={
                  image4
                    ? typeof image4 === "string"
                      ? image4
                      : URL.createObjectURL(image4)
                    : assets.upload_area
                }
                alt=""
              />
              <input
                type="file"
                id="image4"
                name="image4"
                hidden
                onChange={(e) => setImage4(e.target.files[0])}
              />
            </label>
          </div>
        </div>

        <div className="w-full">
          <p className="mb-2">Product Name</p>
          <input
            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            placeholder="Product Name"
            value={productname}
            onChange={(e) => setProductname(e.target.value)}
          />
        </div>

        <div className="w-full">
          <p className="mb-2">Product description</p>
          <textarea
            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            placeholder="Product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className="mb-2">Product Category</p>
            <select
              className="w-full px-3 py-2"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div>
            <p className="mb-2">Product SubCategory</p>
            <select
              className="w-full px-3 py-2"
              onChange={(e) => setSubcategory(e.target.value)}
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <p className="mb-2">Product Price</p>
            <input
              className="w-full px-3 py-2 sm:w-[120px] "
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div>
          <p className="mb-2">Product Sizes</p>
          <div className="flex gap-3">
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("S")
                    ? prev.filter((item) => item !== "S")
                    : [...prev, "S"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("S") ? "bg-green-400" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                S
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("M")
                    ? prev.filter((item) => item !== "M")
                    : [...prev, "M"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("M") ? "bg-green-400" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                M
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("L")
                    ? prev.filter((item) => item !== "L")
                    : [...prev, "L"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("L") ? "bg-green-400" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                L
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("XL")
                    ? prev.filter((item) => item !== "XL")
                    : [...prev, "XL"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("XL") ? "bg-green-400" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                XL
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("XXL")
                    ? prev.filter((item) => item !== "XXL")
                    : [...prev, "XXL"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("XXL") ? "bg-green-400" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                XXL
              </p>
            </div>
          </div>
        </div>

        <div className="flex mt-2 gap-3">
          <input
            type="checkbox"
            id="bestseller"
            checked={bestseller}
            onChange={() => setBestseller((prev) => !prev)}
          />
          <label className="cursor-pointer" htmlFor="bestseller">
            Add as bestseller
          </label>
        </div>

        <div className="flex justify-center gap-5">
          {edit === false ? (
            <button
              type="submit"
              className="w-30 py-3 mt-4 bg-black text-white "
            >
              Add Product
            </button>
          ) : (
            <button
              type="submit"
              className="w-30 py-3 mt-4 bg-green-500 text-white "
            >
              Update
            </button>
          )}
          {edit === true && (
            <button
              type="submit"
              className="w-30 py-3 mt-4 bg-red-600 text-white "
              onClick={cancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  ) : (
    <Loading />
  );
}

export default AddProduct
import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../redux/trendistaSlice';

const ProductCard = (product) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // console.log(product);
  const _id = product.product.title;
  // To make the path route lower case.
  const idString = (_id) => {
    return String(_id).toLowerCase().split(' ').join('');
  };
  const rootId = idString(_id);
  // console.log(rootId);
  // console.log(product.product.isNew);
  const handleDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: product,
      },
    });
  };

  return (
    <div className="group relatives">
      <div
        onClick={handleDetails}
        className="w-full h-96 cursor-pointer overflow-hidden"
      >
        <img
          className="w-full h-full object-cover group-hover:scale-110 duration-500"
          src={product.product.image}
          alt="productImg"
        />
      </div>
      <div className="w-full border-[1px] px-2 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-titleFont text-base font-bold">
              {product.product.title.substring(0, 15)}
            </h2>
          </div>
          <div className="flex justify-end gap-2 relative overflow-hidden w-28 text-sm">
            <div className="flex gap-2 transform group-hover:translate-x-24 transition-transform duration-500">
              <p className="line-through text-gray-500">
                ${product.product.oldPrice}
              </p>
              <p className="font-semibold">${product.product.price}</p>
            </div>
            <p
              onClick={() =>
                dispatch(
                  addToCart({
                    _id: product.product._id,
                    title: product.product.title,
                    image: product.product.image,
                    price: product.product.price,
                    quantity: 1,
                    description: product.product.description,
                  })
                )
              }
              className="absolute z-20 w-[100px] text-gray-500 hover:text-gray-900 flex items-center gap-1 top-0 transform -translate-x-32 group-hover:translate-x-0 transition-transform cursor-pointer duration-500"
            >
              Add to cart{' '}
              <span>
                <BsArrowRight />
              </span>
            </p>
          </div>
        </div>
        <div>
          <p>{product.product.category}</p>
        </div>
        <div className="absolute top-4 right-0">
          {product.product.isNew && (
            <p className="bg-black text-white font-semibold font-titleFont px-6 py-1 ">
              Sale
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

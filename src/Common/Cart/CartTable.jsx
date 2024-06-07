import { API } from 'aws-amplify';
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useParams } from 'react-router-dom';

const CartTable = ({ product, removeItem }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const { institution, cognitoId } = useParams();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  const removeProduct = async (index, productId) => {
    try {
      removeItem(index);
      const response = await API.del('clients', `/any/deleteCartItem/${institution}/${cognitoId}`, {
        body: {
          productId: productId
        }
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-[60vw] flex mt-10 gap-3 px-5 pb-10 items-center max767:w-full">
      <table className="table-fixed w-full max767:w-[95vw] border">
        <thead className="h-16 bg-[#005B50]">
          <tr className='bg-[#005B50]'>
            <th className='bg-[#005B50] text-white'>ITEM</th>
            <th className='bg-[#005B50]'></th>
            <th className='bg-[#005B50] text-white'>PRICE</th>
            <th className='bg-[#005B50]'></th>
            <th className='bg-[#005B50] text-white'></th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td>
                  <Skeleton width={150} height={30} />
                </td>
                <td></td>
                <td>
                  <Skeleton width={50} height={30} />
                </td>
                <td></td>
                <td></td>
              </tr>
            ))
          ) : (
            product.map((item, index) => {
              const { heading, amount, productId, currency } = item.product;
              const currencySymbol = currency === 'INR' ? '₹' : '$'; // Add currency symbol logic
              return (
                <tr key={index}>
                  <td>
                    <div className="flex">
                      <div className="flex flex-col justify-center">
                        <p className="text-md font-bold max767:font-[300] max767:text-[0.8rem]">
                          {heading}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td></td>
                  <td>{currencySymbol}{(amount / 100)}</td> {/* Display amount with currency symbol and adjust amount */}
                  <td></td>
                  <td className="align-middle">
                    <FaTrashAlt
                      onClick={() => removeProduct(index, productId)}
                      className="m-0 h-5 w-5 cursor-pointer"
                    />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </section>
  );
};

export default CartTable;

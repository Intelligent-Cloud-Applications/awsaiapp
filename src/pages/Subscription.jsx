import React, { useContext } from "react";
import "../Components/comp/Subscription.css";
import Product from "../Components/Subscription/Product";
import Context from "../Context/Context";
import NavBar from "../Components/NavBar";

const Subscription = () => {
  const Ctx = useContext(Context);

  return (
    <div>
      <NavBar />
      <section className="Back text-[1.5rem] flex flex-col items-center h-[50rem] max1414:h-[auto] justify-center gap-[5rem] pb-20">
        <div className="text-center text-[white] text-[3.4rem] mt-20 font-bebas-neue">
          <h1>check out our exclusive offers!</h1>
          <h3 className="text-[1.5rem]">see what are the pricing in details</h3>
        </div>
        <div className="flex flex-wrap justify-center items-center w-[90vw] max-w-[80rem] gap-28">
          <ul className="flex flex-wrap justify-center items-center w-[80vw] gap-28 max800:flex-col">
            {Ctx.productList.map((product) => {
              return <Product key={product.productId} product={product} />;
            })}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Subscription;

import Bestsale from "../component/BestSale";
import Hot from "../component/Hot";
import ProductCard from "../component/ProductCard";
import CategoryProducts from "../component/CategoryProducts";


export const metadata = {
  title: "Product Shop",
  description:
    "Mua đồng hồ nam đẹp, trẻ trung, đồng hồ chất lượng, thiết kế mới, thoải mái từ thương hiệu UNIQLO với nhiều kiểu dáng cùng chất lượng",
};
export default async function Product() {
  const productRes = await fetch("http://localhost:3000/products", {cache: "no-store",});
  const products = await productRes.json();

  const categoryRes = await fetch("http://localhost:3000/categories", {cache: "no-store",});
  const categories = await categoryRes.json();

  const hotRes = await fetch("http://localhost:3000/products/hot", {cache: "no-store",});
  const hotProducts = await hotRes.json();

  const bestsaleRes = await fetch("http://localhost:3000/products/bestsale", {cache: "no-store",});
  const bestsaleProducts = await bestsaleRes.json();
  return (
    <>
      <div className="background_bg">
        <div className="watchs_section layout_padding">
          <div className="container">
            <div className="about_section_3">
              <div className="row">
                <div className="watchs_taital">
                    <h1 style={{ color: "white", textAlign: "center" }}>All Products</h1><br/>
                </div>
                <ProductCard data={products} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="background_bg">
        <div className="watchs_section layout_padding">
          <div className="container">
            <div className="about_section_3">
              <div className="row">
                <div className="watchs_taital">
                  <h1 style={{ color: "white", textAlign: "center" }}>Hot Products</h1><br/>
                </div>
                <Hot data={hotProducts} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <CategoryProducts categoryId={1} data={hotProducts} />

      <CategoryProducts categoryId={2} data={bestsaleProducts} /> */}
      {/* <div className="background_bg">
        <div className="watchs_section layout_padding">
          <div className="container">
            <div className="about_section_3">
              <div className="row">
                <div className="watchs_taital">
                  <h1 style={{ color: "white", textAlign: "center" }}>BestSale Products</h1><br/>
                </div>
                 <Bestsale data={bestsaleProducts} />
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

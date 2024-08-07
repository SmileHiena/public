import Link from "next/link";
import ProductCard from "./component/ProductCard";
import Hot from "./component/Hot";
import Bestsale from "./component/Bestsale";
import Counter from "./components/counter";

export const metadata = {
  title: "Cửa hàng bán đồng hồ",
  description: "Mua đồng hồ nam đẹp, trẻ trung, đồng hồ chất lượng, thiết kế mới, thoải mái từ thương hiệu UNIQLO với nhiều kiểu dáng cùng chất lượng",
};
export default async function Home() {
  const productRes = await fetch("http://localhost:3000/products", { cache: "no-store" });
  const products = await productRes.json();

  const categoryRes = await fetch("http://localhost:3000/categories", { cache: "no-store" });
  const categories = await categoryRes.json();

  const hotRes = await fetch("http://localhost:3000/products/hot", { cache: "no-store" });
  const hotProducts = await hotRes.json();

  const bestsaleRes = await fetch("http://localhost:3000/products/bestsale", { cache: "no-store" });
  const bestsaleProducts = await bestsaleRes.json();
  return (
    <>  
    
    {/* <Counter></Counter> */}
      <div className="header_section">
        <div className="banner_section layout_padding">
          <div id="main_slider" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="container">
                  <h1 className="banner_taital">Watchs 1</h1>
                  <p className="banner_text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered</p>
                  <div className="read_bt"><a href="#">Buy Now</a></div>
                   </div>
                </div>
              <div className="carousel-item">
                <div className="container">
                  <h1 className="banner_taital">Watchs 2</h1>
                  <p className="banner_text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered</p>
                  <div className="read_bt"><a href="#">Buy Now</a></div>
                   </div>
                </div>
              <div className="carousel-item">
                <div className="container">
                  <h1 className="banner_taital">Watchs 3</h1>
                  <p className="banner_text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered</p>
                  <div className="read_bt"><a href="#">Buy Now</a></div>
                   </div>
                </div>
             </div>
            <a className="carousel-control-prev" href="#main_slider" role="button" data-slide="prev">
              <i className="fa fa-arrow-left" style={{ fontSize: '24px', color: '#fff' }}></i>
             </a>
            <a className="carousel-control-next" href="#main_slider" role="button" data-slide="next">
              <i className="fa fa-arrow-right" style={{ fontSize: '24px', color: '#fff' }}></i>
             </a>
          </div>
       </div>

    </div>

      <div className="background_bg">
        <div className="watchs_section layout_padding">
          <div className="container">
            <h1 className="watchs_taital">01<br />Our Watchs</h1>
            <div className="watchs_section_2">
              <div className="row">
                <div className="col-md-6">
                  <div className="image_1"><img src="images/img-1.png" /></div>
                   </div>
                <div className="col-md-6">
                  <h4 className="uni_text">Uni Watch</h4>
                  <p className="watchs_text">consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip</p>
                  <h4 className="rate_text"><span style={{ color: '#b60213' }}>$</span>100</h4>
                  <div className="read_bt1"><a href="/product">Buy Now</a></div>
                   </div>
                </div>
             </div>
            <div className="watchs_section_3">
              <div className="row">
                <div className="col-md-6">
                  <h4 className="uni_text">Uni Watch</h4>
                  <p className="watchs_text">consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip</p>
                  <h4 className="rate_text"><span style={{ color: '#b60213' }}>$</span>100</h4>
                  <div className="read_bt1"><a href="#">Buy Now</a></div>
                   </div>
                <div className="col-md-6">
                  <div className="image_2"><img src="images/img-2.png" /></div>
                   </div>
                </div>
             </div>
             <div className="row">
             {/* <ProductCard data={hotProducts} title="Sản phẩm hot" />
            <ProductCard data={bestSellerProducts} title="Sản phẩm bán chạy" /> */}
             {/* <ProductCard data={products} />*/}
             <div className="watchs_taital">
                  <h1 style={{ color: "white", textAlign: "center" }}>Hot Products</h1><br/>
                </div>
                <Hot data={hotProducts} />
             </div>
            <div className="seemore_bt"><a href="#">See More</a></div>
          </div>
       </div>

        <div className="about_section layout_padding">
          <div className="container">
            <h1 className="watchs_taital">02<br />About Shop</h1>
            <div className="about_section_2">
              <div className="row">
                <div className="col-md-6">
                  <p className="about_text">consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip</p>
                  <div className="read_bt1"><a href="#">Buy Now</a></div>
                   </div>
                <div className="col-md-6">
                  <div className="image_2"><img src="images/img-3.png" /></div>
                   </div>
                </div>
             </div>
            <div className="about_section_3">
              <div className="row">
                <div className="col-md-3">
                  <div className="border_main">
                    <div className="image_4"><img src="images/img-4.png" /></div>
                      </div>
                   </div>
                <div className="col-md-3">
                  <div className="border_main">
                    <div className="image_4"><img src="images/img-5.png" /></div>
                      </div>
                   </div>
                <div className="col-md-3">
                  <div className="border_main">
                    <div className="image_4"><img src="images/img-7.png" /></div>
                      </div>
                   </div>
                <div className="col-md-3">
                  <div className="border_main">
                    <div className="image_4"><img src="images/img-5.png" /></div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>

        <div className="testimonial_section layout_padding">
          <div className="container">
            <h1 className="watchs_taital">03<br />Testimonial</h1>
            <div className="testimonial_section_2">
              <div className="row">
                <div className="col-md-6">
                  <div className="box_main">
                    <p className="testimonial_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia</p>
                      </div>
                  <div className="client_main">
                    <div className="client_left">
                      <div className="client_img"><img src="images/client-img.png" /></div>
                         </div>
                    <div className="client_right">
                      <h6 className="client_name">Jamesh Dame</h6>
                      <p className="customer_text">Customer</p>
                         </div>
                      </div>
                   </div>
                <div className="col-md-6">
                  <div className="box_main">
                    <p className="testimonial_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia</p>
                      </div>
                  <div className="client_main">
                    <div className="client_left">
                      <div className="client_img"><img src="images/client-img1.png" /></div>
                         </div>
                    <div className="client_right">
                      <h6 className="client_name">Jumini Kiri</h6>
                      <p className="customer_text">Customer</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
            <div className="seemore_bt_1"><a href="#">See More</a></div>
          </div>
       </div>

        <div className="contact_section layout_padding">
          <div className="container">
            <h1 className="watchs_taital">04<br />Get In Touch</h1>
          </div>
          <div className="contact_section_2">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">
                  <div className="mail_section_1">
                    <input type="text" className="mail_text" placeholder="Your Name" name="Your Name" />
                    <input type="text" className="mail_text" placeholder="Phone Number" name="Phone Number" />
                    <input type="text" className="mail_text" placeholder="Email" name="Email" />
                    <textarea className="massage-bt" placeholder="Message" rows="5" id="comment" name="Message"></textarea>
                    <div className="send_bt"><a href="#">SEND</a></div>
                      </div>
                   </div>
                <div className="col-md-6 padding_right_0">
                  <div className="map_section"><img src="images/map-img.png" /></div>
                   </div>
                </div>
             </div>
          </div>
       </div>

    </div>

      
    </>
  );
}

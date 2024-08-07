export const metadata = {
    title: "Testimonial Shop",
    description: "Mua đồng hồ nam đẹp, trẻ trung, đồng hồ chất lượng, thiết kế mới, thoải mái từ thương hiệu UNIQLO với nhiều kiểu dáng cùng chất lượng",
  };

export default function testimonial() {
    return(
        <div className="background_bg">
        <div className="testimonial_section layout_padding">
           <div className="container">
              <h1 className="watchs_taital">03<br/>Testimonial</h1>
              <div className="testimonial_section_2">
                 <div className="row">
                    <div className="col-md-6">
                       <div className="box_main">
                          <p className="testimonial_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia</p>
                       </div>
                       <div className="client_main">
                          <div className="client_left">
                             <div className="client_img"><img src="images/client-img.png"/></div>
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
                             <div className="client_img"><img src="images/client-img1.png"/></div>
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
     </div>
    );
}
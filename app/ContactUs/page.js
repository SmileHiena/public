export const metadata = {
    title: "Contact Us",
    description: "Mua đồng hồ nam đẹp, trẻ trung, đồng hồ chất lượng, thiết kế mới, thoải mái từ thương hiệu UNIQLO với nhiều kiểu dáng cùng chất lượng",
  };

export default function ContactUs() {
    return(
        <div className="background_bg">
        <div className="contact_section layout_padding">
          <div className="container">
            <h1 className="watchs_taital">04<br/>Get In Touch</h1>
          </div>
           <div className="contact_section_2">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">
                  <div className="mail_section_1">
                    <input type="text" className="mail_text" placeholder="Your Name" name="Your Name"/>
                     <input type="text" className="mail_text" placeholder="Phone Number" name="Phone Number"/>
                     <input type="text" className="mail_text" placeholder="Email" name="Email"/>
                     <textarea className="massage-bt" placeholder="Massage" rows="5" id="comment" name="Massage"></textarea>
                    <div className="send_bt"><a href="#">SEND</a></div>
                  </div>
                </div>
                <div className="col-md-6 padding_right_0">
                  <div className="map_section"><img src="images/map-img.png"/></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
import React from 'react';

export default function Footer() {
   return (
      <footer>
         <div className="footer_section layout_padding">
            <div className="container">
               <h3 className="follow_text">Follow Now</h3>
               <div className="social_icon">
                  <ul>
                     <li><a href="#"><img src="http://localhost:3000/images/fb-icon.png" alt="Facebook" /></a></li>
                     <li><a href="#"><img src="http://localhost:3000/images/twitter-icon.png" alt="Twitter" /></a></li>
                     <li><a href="#"><img src="http://localhost:3000/images/linkedin-icon.png" alt="LinkedIn" /></a></li>
                     <li><a href="#"><img src="http://localhost:3000/images/instagram-icon.png" alt="Instagram" /></a></li>
                     <li><a href="#"><img src="http://localhost:3000/images/youtub-icon.png" alt="YouTube" /></a></li>
                  </ul>
               </div>
            </div>
         </div>
      </footer>
   );
}

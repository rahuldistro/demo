import { ReactNode } from 'react';


interface ElementorWrapperProps {
  children: ReactNode;
}

export default function ElementorWrapper({ children }: ElementorWrapperProps) {
  return (
    <div
      data-elementor-type="wp-page"
      data-elementor-id="62"
      className="elementor elementor-62"
      data-elementor-post-type="page"
      
    >
      <main className="elementor-section-wrap">{children}</main>
   {/*   <footer className="elementor elementor-location-footer">
        <div className="elementor-container e-con e-parent e-lazyloaded">
          <h2 className="elementor-heading-title">Social Media Posts</h2>
          <p>This is a gallery to showcase images from your recent social posts</p>
          <div className="elementor-main-swiper swiper">
            <div className="swiper-wrapper">
              {Array(5).fill().map((_, index) => (
                <div key={index} className="swiper-slide">
                  <div
                    className="elementor-carousel-image"
                    style={{
                      backgroundImage: `url(https://mydemopage.wpenginepowered.com/wp-content/uploads/2025/09/Article-img_3-13122021-1.jpg)`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="elementor-container e-con e-parent e-lazyloaded">
            <h6 className="elementor-heading-title">Customer Service</h6>
            <nav className="elementor-nav-menu--main elementor-nav-menu--layout-vertical">
              <ul className="elementor-nav-menu sm-vertical">
                <li className="menu-item"><a href="/help-info" className="elementor-item">Help & Info</a></li>
                <li className="menu-item"><a href="/terms-privacy" className="elementor-item">Terms & Privacy</a></li>
              </ul>
            </nav>
          </div>
          <div className="elementor-container e-con e-parent e-lazyloaded">
            <h6 className="elementor-heading-title">Quick Links</h6>
            <nav className="elementor-nav-menu--main elementor-nav-menu--layout-vertical">
              <ul className="elementor-nav-menu sm-vertical">
                <li className="menu-item"><a href="/" className="elementor-item">Home</a></li>
                <li className="menu-item"><a href="/shop-2" className="elementor-item">Shop</a></li>
                <li className="menu-item"><a href="/sale-page" className="elementor-item">Sale</a></li>
                <li className="menu-item"><a href="/about-us" className="elementor-item">About Us</a></li>
                <li className="menu-item"><a href="/contact" className="elementor-item">Contact</a></li>
              </ul>
            </nav>
          </div>
          <div className="elementor-container e-con e-parent e-lazyloaded">
            <h6 className="elementor-heading-title">Get In Touch</h6>
            <ul className="elementor-icon-list-items">
              <li className="elementor-icon-list-item">
                <Link href="mailto:contact@mysite.com">Email: contact@mysite.com</Link>
              </li>
              <li className="elementor-icon-list-item">
                <Link href="tel:123-456-7890">Phone: 123-456-7890</Link>
              </li>
            </ul>
          </div>
          <p className="elementor-heading-title elementor-size-default">© All Rights Reserved.</p>
        </div>
      </footer>*/}
    </div>
  );
}
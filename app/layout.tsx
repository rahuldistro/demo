// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My Next.js App',
  description: 'Next.js with WordPress styles',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <head>
      <link rel="alternate" type="application/rss+xml" title="Bryan Garabrandt Site » Feed" href="https://mydemopage.wpenginepowered.com/feed/"/>
      <link rel="alternate" type="application/rss+xml" title="Bryan Garabrandt Site » Comments Feed" href="https://mydemopage.wpenginepowered.com/comments/feed/"/>
      <link rel="stylesheet" id="woocommerce-layout-css" href="https://mydemopage.wpenginepowered.com/wp-content/plugins/woocommerce/assets/css/woocommerce-layout.css?ver=10.2.1" media="all"/>
      <link rel="stylesheet" id="woocommerce-smallscreen-css" href="https://mydemopage.wpenginepowered.com/wp-content/plugins/woocommerce/assets/css/woocommerce-smallscreen.css?ver=10.2.1" media="only screen and (max-width: 768px)"/>
      <link rel='stylesheet' id='widget-image-css' href='https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/css/widget-image.min.css?ver=3.32.3' media='all' />
<link rel='stylesheet' id='widget-nav-menu-css' href='https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor-pro/assets/css/widget-nav-menu.min.css?ver=3.32.1' media='all' />
<link rel='stylesheet' id='widget-search-form-css' href='https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor-pro/assets/css/widget-search-form.min.css?ver=3.32.1' media='all' />
<link rel='stylesheet' id='widget-woocommerce-menu-cart-css' href='https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor-pro/assets/css/widget-woocommerce-menu-cart.min.css?ver=3.32.1' media='all' />
<link rel='stylesheet' id='e-sticky-css' href='https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor-pro/assets/css/modules/sticky.min.css?ver=3.32.1' media='all' />
<link rel='stylesheet' id='widget-heading-css' href='https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/css/widget-heading.min.css?ver=3.32.3' media='all' />
<link rel='stylesheet' id='swiper-css' href='https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/lib/swiper/v8/css/swiper.min.css?ver=8.4.5' media='all' />
<link rel='stylesheet' id='e-swiper-css' href='https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/css/conditionals/e-swiper.min.css?ver=3.32.3' media='all' />
<link rel='stylesheet' id='widget-media-carousel-css' href='https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor-pro/assets/css/widget-media-carousel.min.css?ver=3.32.1' media='all' />
<link rel='stylesheet' id='widget-carousel-module-base-css' href='https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor-pro/assets/css/widget-carousel-module-base.min.css?ver=3.32.1' media='all' />
<link rel='stylesheet' id='widget-image-box-css' href='https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/css/widget-image-box.min.css?ver=3.32.3' media='all' />
<link rel='stylesheet' id='widget-social-icons-css' href='https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/css/widget-social-icons.min.css?ver=3.32.3' media='all' />
<link rel='stylesheet' id='e-apple-webkit-css' href='https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/css/conditionals/apple-webkit.min.css?ver=3.32.3' media='all' />
<link rel='stylesheet' id='widget-icon-list-css' href='https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/css/widget-icon-list.min.css?ver=3.32.3' media='all' />
<link rel='stylesheet' id='e-animation-shrink-css' href='https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/lib/animations/styles/e-animation-shrink.min.css?ver=3.32.3' media='all' />
<link rel='stylesheet' id='widget-form-css' href='https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor-pro/assets/css/widget-form.min.css?ver=3.32.1' media='all' />
<link rel='stylesheet' id='widget-icon-box-css' href='https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/css/widget-icon-box.min.css?ver=3.32.3' media='all' />
<link rel='stylesheet' id='e-animation-grow-css' href='https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/lib/animations/styles/e-animation-grow.min.css?ver=3.32.3' media='all' />
<link rel='stylesheet' id='e-animation-fadeInUp-css' href='https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/lib/animations/styles/fadeInUp.min.css?ver=3.32.3' media='all' />
<link rel='stylesheet' id='e-popup-css' href='https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor-pro/assets/css/conditionals/popup.min.css?ver=3.32.1' media='all' />
<link rel='stylesheet' id='e-animation-fadeIn-css' href='https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/lib/animations/styles/fadeIn.min.css?ver=3.32.3' media='all' />
<link rel='stylesheet' id='e-animation-zoomIn-css' href='https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/lib/animations/styles/zoomIn.min.css?ver=3.32.3' media='all' />
<link rel='stylesheet' id='widget-call-to-action-css' href='https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor-pro/assets/css/widget-call-to-action.min.css?ver=3.32.1' media='all' />
<link rel='stylesheet' id='e-transitions-css' href='https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor-pro/assets/css/conditionals/transitions.min.css?ver=3.32.1' media='all' />
<link rel='stylesheet' id='widget-woocommerce-products-css' href='https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor-pro/assets/css/widget-woocommerce-products.min.css?ver=3.32.1' media='all' />
<link rel='stylesheet' id='widget-testimonial-css' href='https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/css/widget-testimonial.min.css?ver=3.32.3' media='all' />
<link rel='stylesheet' id='e-woocommerce-notices-css' href='https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor-pro/assets/css/woocommerce-notices.min.css?ver=3.32.1' media='all' />
<link rel='stylesheet' id='hello-elementor-child-style-css' href='https://mydemopage.wpenginepowered.com/wp-content/themes/hello-theme-child-master/style.css?ver=2.0.0' media='all' />
<link rel='stylesheet' id='elementor-gf-poppins-css' href='https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic&#038;display=swap' media='all' />
<script src="https://mydemopage.wpenginepowered.com/wp-includes/js/jquery/jquery.min.js?ver=3.7.1" id="jquery-core-js"></script>
<script src="https://mydemopage.wpenginepowered.com/wp-includes/js/jquery/jquery-migrate.min.js?ver=3.4.1" id="jquery-migrate-js"></script>
<script src="https://mydemopage.wpenginepowered.com/wp-content/plugins/woocommerce/assets/js/jquery-blockui/jquery.blockUI.min.js?ver=2.7.0-wc.10.2.1" id="jquery-blockui-js" defer data-wp-strategy="defer"></script>
 
<script src="https://mydemopage.wpenginepowered.com/wp-content/plugins/woocommerce/assets/js/frontend/add-to-cart.min.js?ver=10.2.1" id="wc-add-to-cart-js" defer data-wp-strategy="defer"></script>
<script src="https://mydemopage.wpenginepowered.com/wp-content/plugins/woocommerce/assets/js/js-cookie/js.cookie.min.js?ver=2.1.4-wc.10.2.1" id="js-cookie-js" defer data-wp-strategy="defer"></script>
 
<script src="https://mydemopage.wpenginepowered.com/wp-content/plugins/woocommerce/assets/js/frontend/woocommerce.min.js?ver=10.2.1" id="woocommerce-js" defer data-wp-strategy="defer"></script>
<link rel="https://api.w.org/" href="https://mydemopage.wpenginepowered.com/wp-json/" /><link rel="alternate" title="JSON" type="application/json" href="https://mydemopage.wpenginepowered.com/wp-json/wp/v2/pages/62" /><link rel="EditURI" type="application/rsd+xml" title="RSD" href="https://mydemopage.wpenginepowered.com/xmlrpc.php?rsd" />
<link rel="canonical" href="https://mydemopage.wpenginepowered.com/" />
<link rel='shortlink' href='https://mydemopage.wpenginepowered.com/' />
<link rel="alternate" title="oEmbed (JSON)" type="application/json+oembed" href="https://mydemopage.wpenginepowered.com/wp-json/oembed/1.0/embed?url=https%3A%2F%2Fmydemopage.wpenginepowered.com%2F" />
<link rel="alternate" title="oEmbed (XML)" type="text/xml+oembed" href="https://mydemopage.wpenginepowered.com/wp-json/oembed/1.0/embed?url=https%3A%2F%2Fmydemopage.wpenginepowered.com%2F&#038;format=xml" />



    </head>
      <body >
        {children}
        {/* WordPress Scripts */}
        <Script src="https://mydemopage.wpenginepowered.com/wp-includes/js/jquery/jquery.min.js" strategy="beforeInteractive" />
        <Script src="https://mydemopage.wpenginepowered.com/wp-includes/js/jquery/jquery-migrate.min.js" strategy="beforeInteractive" />
        <Script src="https://mydemopage.wpenginepowered.com/wp-content/plugins/woocommerce/assets/js/jquery-blockui/jquery.blockUI.min.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}

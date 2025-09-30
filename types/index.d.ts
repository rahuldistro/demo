export interface WordPressPage {
  id: string;
  slug: string;
  title: string;
  content: string;
}

export interface WooCommerceProduct {
  id: string;
  slug: string;
  name: string;
  price: string;
  image: {
    sourceUrl: string;
    srcSet?: string;
    sizes?: string;
  };
  addToCartUrl: string;
}

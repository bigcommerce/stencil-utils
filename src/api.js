import CountryApi from './api/countries';
import ProductApi from './api/product';
import ProductAttributesApi from './api/product-attributes';
import SearchApi from './api/search';
import CartApi from './api/cart';

export default {
    country: new CountryApi(),
    productAttributes: new ProductAttributesApi(),
    product: new ProductApi(),
    search: new SearchApi(),
    cart: new CartApi()
};

import Home from './components/Home.js';
import Help from './components/Help.js';
import Login from './components/Login.js';
import User from './components/User.js';
import Account from './components/Account.js';
import Highlights from './components/Highlights.js';
import UploadPage from './components/Upload.js';
import Product from './components/Product.js';
import { Ingredient, IngredientDetailed } from './components/Ingredient.js';

let routes = [ 
	{ path: '/', component: Home },
	{ path: '/help', component: Help }, 
	{ path: '/login', component: Login }, 
	{ path: '/user', component: User }, 
	{ path: '/account', component: Account }, 
	{ path: '/highlighting', component: Highlights },
	{ path: '/product', component: Product },
	{ path: '/upload', component: UploadPage }
]; 

export default routes; 

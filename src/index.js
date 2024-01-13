import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { Provider } from 'react-redux'
import store from './app/store'


import App from './App';
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import About from './features/headerNav/About'
import WineList from './features/wine/WineList';
import WineApp from './features/wine/WineApp';
import SingleWine from './features/wine/SIngleWine';
import Secure from './features/user/Secure';
import Cart from './features/cart/Cart';
import Test from './features/user/Test';
const router = createBrowserRouter([
  {
      path: "/",
      element: <App />,
      children: [
          {
              path: "/",
              element: <WineApp />,
              children: [
                  {
                    path: "/",
                    element: <WineList />,
                  },
                  {
                    path: "/wines",
                    element: <WineList />,
                  },
                  {
                    path: "wines/cat/:categoryId",
                    element: <WineList />,
                  },
                  {
                    path: "wines/:itemId",
                    element: <SingleWine />,
                  },
                  {
                    path: "/cart",
                    element: <Cart />
                  },
              ]
          },
          {
            path: '/test',
            element: <Test />
          },
          
          // {
          //     path: "/secure",
          //     element: <Secure />,
          //     children: [
          //       {
          //         path: "/secure/cart"
          //       }
          //     ]


          // },
          
          {
              path: "/about",
              element: <About />
          },

      ],
      
    }
  ])
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    
    <RouterProvider router={router} />
  </Provider>
)


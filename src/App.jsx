import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Tvshow from './Components/Tvshow/Tvshow';
import People from './Components/People/People';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './Components/NotFound/Notfound';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ItemDetails from './Components/ItemDetails/ItemDetails';





function App() {

  useEffect(()=>{
    if(localStorage.getItem("userToken") !== null){
      saveUserData();
    }
  },[])

  const [userData,setUserData]=useState(null);

  function saveUserData(){
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
    // console.log(userData);
  }

  let routers = createBrowserRouter([
      { path: "", element: <Layout setUserData={setUserData} userData={userData}/> , children: [
      {path:"home" , element: <ProtectedRoute> <Home/> </ProtectedRoute> },
      {path:"movies" , element:<ProtectedRoute>  <Movies/></ProtectedRoute>},
      {path:"tvshow" , element:<ProtectedRoute>  <Tvshow/></ProtectedRoute>},
      {path:"people" , element:<ProtectedRoute>  <People/></ProtectedRoute>},
      {path:"itemdetails/:id/:media_type",element:<ProtectedRoute> <ItemDetails/> </ProtectedRoute>},
      {path:"login" , element: <Login saveUserData={saveUserData}/>},
      {index:true , element: <Register/>},
      {path:"trending",element:<Register/>},
      {path:"*" , element: <Notfound/>},
    ]}
  ])


  return <RouterProvider router={routers}></RouterProvider>
}

export default App;

import axios from 'axios';
import jwt_decode from 'jwt-decode';
// import { decode } from 'punycode';



export const createOrGetUser = async (response: any, addUser:any) => {
  const decoded : {name:string, picture:string, sub:string} = jwt_decode(response.credential);
  const{name, picture, sub} = decoded;

  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture
  }

  try {
    addUser(user);
  
    await axios.post(`http://localhost:3000/api/auth`, user);
  } catch (error) {
    console.error('Error creating or getting user:', error);
    // You might want to handle this error, e.g., show a message to the user.
  }
  // try {
  //   const response = await fetch(`/api/auth`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       _type: 'user',
  //       userName: name,
  //       image: picture,
  //       _id:sub
  //     }),
  //   });
  
  //   if (response.ok) {
  //     const data = await response.json();
  //     console.log('User created:', data.user);
  //   } else {
  //     console.error('Error creating user:', response.statusText);
  //   }
  // } catch (error) {
  //   console.error(error);
  // }

};
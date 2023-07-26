import { privateApi, publicApi } from "./";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
// import { setCookie } from "./cookie";

interface LoginProps {
  email: string;
  password: string;
}

export const headerTest = () => {
  console.log("headerTest")
  let config = {
    method: 'get',
    url: '/auth/jwt-test',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  };

  privateApi.request(config)
    .then((response) => {
      console.log("headerTest");
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log("headerTest ERROR");
      console.log(error);
    });

}

// export const postLogin = (user: LoginProps) => {
//   console.log(user + JSON.stringify(user));
//   console.log("login");
//   axios.post("http://i9b106.p.ssafy.io:8080/member/login", user).
//   then(res=>{
//     if(res.status === 200 && res.data.accessToken){
//       localStorage.setItem('access-token', res.data.accessToken);
//       localStorage.setItem('refresh-token', res.data.refreshToken);
//       return true

//     }
//     return false
//   })
// }

export const postLogin = async (user: LoginProps) => {
  console.log("postLogin");
  const res = await publicApi.post("/member/login", user);
  if (res.status === 200) {
    console.log(res.data);
    console.log(res.headers);
    let accessToken = res.data.accessToken; // 응답헤더에서 토큰 받기
    let refreshToken = res.data.refreshToken; // 응답헤더에서 토큰 받기
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    console.log("access 토큰 :", accessToken);
    console.log("refresh 토큰 :", refreshToken);
    return true;
  }
  else return false;
}




export const testLogin = () => {
  console.log("testLogin");
  const response = privateApi.get("/auth/test");
  console.log(response);
};

export const postTest = async (user: LoginProps) => {
  const tmp = {
    name: user.email,
    age: 12,
  };
  const response = await privateApi.post("/auth/post-test", tmp);
  console.log(response);
};
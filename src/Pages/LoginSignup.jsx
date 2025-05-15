import React,{useState} from 'react'

const LoginSignup = () => {
    const [state,setState]= useState("Sign Up");
    const [formData, setFormData] = useState({
        username:"",
        password:"",
        email:""
    });

    const changeHandler = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }


    const login = async ()=>{
        let responseData = null;
       await  fetch('http://localhost:4000/login',{
            method:"POST",
            headers:{
                Accept:"application/form-data",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        })
        .then((response)=>response.json())
        .then((data)=>{responseData=data});


        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace('/');
        }
        else{
            alert(responseData.error);
        }
    }


    const signup = async ()=>{
    // console.log("signup funciton executeed",formData);
    let responseData=null;

    await fetch('http://localhost:4000/signup',{
      method:"POST",
      headers:{
        Accept:"application/form-data",
        "Content-Type":"application/json",
      },
      body:JSON.stringify(formData)
    }).then((response)=> response.json())
    .then((data)=> {responseData = data});

  if(responseData.success){
    localStorage.setItem('auth-token',responseData.token);
    window.location.replace('/');
  }else{
    alert(responseData.error);
  }

  }





  return (
   <div className="w-full min-h-[90vh] bg-[#fff] pt-10">
  <div className="w-[580px] border border-s-2 max-w-full h-[600px] bg-white mx-auto px-[60px] py-[5px]">
    <h1 className="my-5 text-2xl font-bold">{state}</h1>

    <div className="flex flex-col gap-[29px] mt-[30px]">
      {state === "Sign Up" && (
        <input
          name="username"
          value={formData.username}
          onChange={changeHandler}
          type="text"
          placeholder="Your Name"
          className="h-[72px] w-full pl-5 border border-[#c9c9c9] outline-none text-[#5c5c5c] text-lg"
        />
      )}

      <input
        name="email"
        value={formData.email}
        onChange={changeHandler}
        type="email"
        placeholder="Email Address"
        className="h-[72px] w-full pl-5 border border-[#c9c9c9] outline-none text-[#5c5c5c] text-lg"
      />
      <input
        name="password"
        value={formData.password}
        onChange={changeHandler}
        type="password"
        placeholder="Password"
        className="h-[72px] w-full pl-5 border border-[#c9c9c9] outline-none text-[#5c5c5c] text-lg"
      />
    </div>

    <button
      onClick={() => {
        state === "Login" ? login() : signup();
      }}
      className="w-full h-[75px] bg-[#ff4141] text-white mt-7 border-none text-2xl font-medium cursor-pointer"
    >
      Continue
    </button>

    {state === "Sign Up" ? (
      <p className="mt-5 text-[#5c5c5c] text-lg font-medium">
        Already have an account?{" "}
        <span
          onClick={() => setState("Login")}
          className="text-[#ff4141] font-semibold cursor-pointer"
        >
          Login here
        </span>
      </p>
    ) : (
      <p className="mt-5 text-[#5c5c5c] text-lg font-medium">
        Create an account?{" "}
        <span
          onClick={() => setState("Sign Up")}
          className="text-[#ff4141] font-semibold cursor-pointer"
        >
          Click here
        </span>
      </p>
    )}

    <div className="flex items-center mt-[25px] gap-5 text-[#5c5c5c] text-lg font-medium">
      {/* <input type="checkbox" /> */}
      {/* <p>By continuing, I agree to the terms of use & privacy policy</p> */}
    </div>
  </div>
</div>

  )
}

export default LoginSignup;

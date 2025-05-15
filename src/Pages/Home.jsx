import React,{useState,useEffect} from 'react'

const Home = () => {

    const [name,setName] = useState("");

     const getname = async ()=>{
        let newName = null;

        let token = localStorage.getItem('auth-token');
        if(!token){
            console.log("No token, no making request");
            return 
        }
        
           await fetch('http://localhost:4000/',{
            method:"GET",
            headers:{
                "auth-token":`${localStorage.getItem('auth-token')}`,
                "Content-Type":'application/json'
            },
           })
            .then((response)=>response.json())
            .then((data)=>{setName(data.username)})
            

            

            
        }

    useEffect(()=>{

        getname();
    },[]);
    

  return (
    <div className='h-screen  flex justify-center items-center '>
      <h1 className='font-bold text-2xl lg:text-9xl  ' >Welcome {name}</h1>
    </div>
  )
}

export default Home

import React,{useState,useEffect} from 'react'

const yourtask = () => {

    const [content,setContent] = useState("");
    const [allTodos,setAllTodos] = useState([]);

    useEffect(()=>{
        getAllTasks();
    },[]);

    const getAllTasks =async ()=>{
       try{
         let token = localStorage.getItem('auth-token');
         if(!token){
            console.log("not token");
            return ;
         }
       

       const response =  await fetch('http://localhost:4000/getallasks',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "auth-token":token,
            },
            
        });

        const data = await response.json();

       
        
        setAllTodos(data.allTasks);
        // console.log(allTodos);

       }catch(error){
        console.log(error);
       }

    };

    // console.log(allTodos);

    
    
    const changeHandler = (e)=>{
        setContent(e.target.value);
    }
    const submit = async ()=>{
        
        // console.log(content);

        if(content===""){
            alert("enter task first");
            return ;
        }

        const token = localStorage.getItem('auth-token');
        if(!token){
            alert("Please login first");
            return 
        }
        let responseData = null;
        await fetch('http://localhost:4000/uploadingtask',{
            method:"POST",
            headers:{
               
                "Content-Type":"application/json",
                "auth-token":token,
            },
            body:JSON.stringify({content:content}),
        })
        .then((response)=>response.json())
        .then((data)=>{responseData=data});

        if(responseData.success){
            console.log("task added successfuly");
        }else{
            console.log(responseData.error);
        }

        setContent("");
        await getAllTasks();
    }

    const deleteTask = async (taskId)=>{

        try{

            let token = localStorage.getItem('auth-token');
            if(!token){
                alert("token does exist");
                return;
            }

            const response  = await fetch('http://localhost:4000/deletetask',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "auth-token":token,
                },
                body:JSON.stringify({taskId:taskId})

            });
            

            

            const data = await response.json();
          

            setAllTodos(data.allTasks);

            getAllTasks();


        }catch(error){
            console.log(error);

        }

    }

  return (
     <div className="min-h-screen bg-gray-100 p-6">
    
    
    <div className="max-w-2xl mx-auto my-10 flex gap-4 items-center bg-white rounded-2xl shadow-md p-2 lg:p-4 border border-gray-300">
      <input
        placeholder="Enter task here..."
        className=" flex-grow outline-none lg:p-3 sm:p-1  rounded-lg border border-gray-200 "
        type="text"
        name="taskName"
        value={content}
        onChange={changeHandler}
        
      />
      <button
        onClick={submit}
        className="bg-black text-white p-1 lg:px-6 lg:py-2   rounded-xl hover:bg-gray-800 transition"
      >
        Submit
      </button>
    </div>

    {/* Task List Section */}
    <div className="max-w-2xl mx-auto space-y-3">
      {
        allTodos.length === 0 ? (
          <p className="text-center text-gray-500">No tasks yet.</p>
        ) : (
          allTodos.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-sm p-4 rounded-lg border border-gray-200 flex justify-between"
            >
              <p className="text-gray-800">{item.content}</p>
              <i onClick={()=>deleteTask(item.id)} className="fa fa-trash text-red-500 cursor-pointer " aria-hidden="true"></i>
            </div>
          ))
        )
      }
    </div>
    
  </div>
  )
}

export default yourtask

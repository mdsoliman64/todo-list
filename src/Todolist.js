import React from "react";
import { ReactDOM, useState,useEffect } from "react";
import { Box,Grid, Button, Typography,Paper,Link} from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';


export default function Todolist(){
const [inputtext, setInputtext] = useState({
    inputtime:"",
    text:""
});

const [time,setTime]=useState([]);
const [data,setData] = useState(()=>{
    return (JSON.parse(localStorage.getItem("todolist"))||[])
});


// const [localData,setLocaldata]=useState(()=>{
//     return (JSON.parse(localStorage.getItem("todolist")))
// });


useEffect(()=>{

localStorage.setItem("todolist",JSON.stringify(data));



},[data]);


function changeHandle(event){
const {value,name} = event.target;
setInputtext((prev)=>{
    return ({...prev,[name]:value}) ;
})

}
function clickHandle(event){
  
   setData((prev)=>{
    return [...prev, inputtext]
   });
   
   event.preventDefault();
  
}



const deleteItem = (index) => {
    // Create a copy of the current items array
    const updatedItems = [...data];
    
    // Remove the item at the specified index
    const deletedItem = updatedItems.splice(index, 1)[0]; // Splice returns an array, so we take the first element
    
    // Update the local storage and state
    localStorage.setItem("todolist", JSON.stringify(updatedItems)||[]);
    setData(updatedItems);
    
    // Optionally, you can do something with the deleted item
    console.log(`Deleted item: ${deletedItem}`);
  };
return(
<>
<Grid container spacing={0.5}>
    <Grid item xs={12}>
    <Typography variant="h4" sx={{textAlign:"center",color:"#fff",marginTop:5,fontFamily:"Alfa Slab One"}}> To-do List</Typography>
    <Typography sx={{color:"#fff",textAlign:"center"}}> All right reserve for <Link href="https://mdsoliman64.github.io/me/" sx={{color:"#FFDB4A"}}>Md Soliman </Link>  </Typography>
            <Box sx={{textAlign:"center" , maxWidth:"400px",margin:"auto",marginTop:15}}>
            <form> 
            <Box sx={{marginBottom:5}}>
                                <input 
                                type="date" 
                                    style={{padding:4,border:"none",outline:"none",fontSize:"1.2rem"}}
                                   name= "inputtime"
                                   value={inputtext.inputtime}
                                   onChange={changeHandle}
                                />

                    </Box>

                <Paper elevation={4} sx={{padding:2}}>
                       
                                <input 
                                type="text" name="text"
                                vlaue={inputtext.text}
                                    style={{padding:2,border:"none",outline:"none",fontSize:"1.2rem"}}
                                    placeholder="Enter your task lists"
                                    onChange={changeHandle}
                                   
                                />
                                <Button onClick={clickHandle}> <AddCircleIcon sx={{fontSize:"1.8rem",color:"#000"}} /> </Button>
                                
                     
                </Paper>
                   

              
                </form>

            </Box>



    </Grid>
   <Grid item xs={12}>
   <Box sx={{margin:"auto",marginTop:2,minWidth:"300px" ,maxWidth:"400px",height:"280px",overflowX:"hidden",overflowY:"auto",padding:5}}>
    {data?.map((item,index)=>{

return(
<Paper elevation={4} key={index} sx={{padding:2,maxWidth:"360px",marginTop:2,backgroundColor:"#2F2911",color:"#FFDB4A",height:"auto",overflowWrap:"anywhere",boxShadow:"inset 4px 1px 12px #FFDB4A","&:hover":{backgroundColor:"#000",transform:"rotate(1deg)"}}}>
<Box>
<Typography variant="h6"> 👉🏻 {item.text} </Typography>
</Box>
<Box sx={{display:"flex",justifyContent:"space-between",marginTop:1}}>
<Typography variant="subtitle1"><CalendarMonthRoundedIcon/> {item.inputtime} </Typography>
<Button onClick={()=>deleteItem(index)}  variant="outlined" sx={{fontSize:"2rem",borderRadius:"25px",height:"45px",width:"45px",border:"1px solid #FFDB4A"}}> <DeleteSweepRoundedIcon sx={{fontSize:"2rem",color:"#FFDB4A"}}/> </Button>
</Box>



</Paper>


)



    })}

    </Box>
   
   </Grid>



</Grid>



</>



);
};
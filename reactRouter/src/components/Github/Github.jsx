import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";

function Github(){

    const data = useLoaderData()

    // const [data, setData] = useState([]);

    // useEffect(()=>{
    //     fetch("https://api.github.com/users/hiteshchoudhary")
    //     .then(response => response.json())
    //     .then(data =>{
    //         console.log(data)
    //         setData(data)})
    // }, [])

    return (
        <>
            <h1 className="text-3xl bg-gray-600 text-white p-4 m-4 text-center">Github followers: {data.followers} </h1>
            <img src={data.avatar_url} alt="git profile pic" width={300}/>
        </>
        
    )
}

export default Github;

export async function getGitInfo(){
    const response = await fetch("https://api.github.com/users/hiteshchoudhary")
    return response.json()
}
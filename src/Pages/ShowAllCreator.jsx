import { useEffect, useState } from "react"
import { supabase } from "../client"
import Card from "../Components/Card";
import styles from "../Styles/showallcreator.module.css";

export default function ShowAllCreator(){

   const [creatorList, setCreatorList] = useState([]);
   const [error, setError] = useState("");

    useEffect(()=>{
        async function getCreatorDetails(){
            const { data, error } = await supabase.from("creators").select("*");

            if(error){
                setError("There was an error getting creator's details");
            } else {
                setCreatorList(data);
            }
        }
        getCreatorDetails();
    }, []);


    return(
        <>
        <div>
                <div className={styles.container}>
                    {
                        creatorList? creatorList.map((creator) => (
                            <Card key={creator.id} creatorId = {creator.id} creatorName={creator.name} creatorDescription={creator.description} urls={JSON.parse(creator.url)} imageUrl={creator.imageURL} errorMsg={error}/>
                        )): (<p>No creators Added</p>)
                    }
                </div>     
        </div>
        </>
    )
}
import {useState } from 'react';
import { PostParams } from '../scripts/peticionesApi';
export default function HomeView() {
    const [refPoint1,setRefPoint1] = useState([150,160])
    const [refPoint2,setRefPoint2] = useState([500,160])
    const [refPoint3,setRefPoint3] = useState([500,360])
    const [refPoint4,setRefPoint4] = useState([150,360])
    const [baseImage, setBaseImage] = useState("");

    const  enviarPuntos= async()=>{
        let data ={
         p1:refPoint1,
         p2:refPoint2,
         p3:refPoint3,
         p4:refPoint4
        }
         const imgBase64Result = await PostParams(data)
         setBaseImage(imgBase64Result);
     }
 
    function Base64Image(props) {
        return (
            <img src={`data:image/png;base64,${props.image}`} alt="Base64 Image" />
        );
    }
    

    return (
        <>
            <button className="btn  btn-primary" onClick={enviarPuntos}>Fijar Puntos</button>
            <Base64Image image={baseImage} />
        </>
    );
}
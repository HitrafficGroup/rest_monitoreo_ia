
import Grid from '@mui/material/Grid';
import { useEffect, useRef, useState } from 'react';
import { PostParams, DisconnectIA, ConnectIA } from '../scripts/peticionesApi';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import prueba from "../assets/prueba1.jpg"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
export default function HomeView() {
    const [refPoint1, setRefPoint1] = useState([29, 216])
    const [refPoint2, setRefPoint2] = useState([138, 222])
    const [refPoint3, setRefPoint3] = useState([132, 393])
    const [refPoint4, setRefPoint4] = useState([18, 393])
    // areas 2
    const [refPoint5, setRefPoint5] = useState([170, 221])
    const [refPoint6, setRefPoint6] = useState([265, 221])
    const [refPoint7, setRefPoint7] = useState([263, 391])
    const [refPoint8, setRefPoint8] = useState([153, 387])
    // areas 3
    // puntos2
    const [refPoint9, setRefPoint9] = useState([292, 221])
    const [refPoint10, setRefPoint10] = useState([425, 223])
    const [refPoint11, setRefPoint11] = useState([441, 400])
    const [refPoint12, setRefPoint12] = useState([297, 392])
    //
    const [checked, setChecked] = useState(true);
    const [checked2, setChecked2] = useState(true);
    const [checked3, setChecked3] = useState(true);
    const [checked4, setChecked4] = useState(true);
    const pointsAreas = useRef([])
    const [markerPos,setMarkerPos] = useState([0,0])
    

    function drawnPoints() {
        const canvas = document.querySelector("#canvas");
        let aux_area = pointsAreas.current
        // Context for the canvas for 2 dimensional operations
        const ctx = canvas.getContext('2d');    
        ctx.canvas.width = 640;
        ctx.canvas.height = 480;
        ctx.strokeStyle = '#F9E79F';
        ctx.fillStyle = '#F9E79F';
        ctx.lineWidth = 3;

        // ctx.beginPath();
        // ctx.arc(markerPos[0], markerPos[1], 2, 0, 2 * Math.PI);
        // ctx.stroke();
        // ctx.fill();
        // ctx.closePath();
        ctx.fillStyle = 'rgba(74, 35, 90, 0.5)';
        ctx.strokeStyle = 'rgba(74, 35, 90, 1)';
       
        ctx.beginPath();
        aux_area.forEach((item)=>{
            ctx.lineTo(item[0],item[1])
        })
        ctx.fill();
        // ctx.lineTo(29, 216)
        // ctx.lineTo(138, 222)
        // ctx.lineTo(132, 393)
        // ctx.lineTo(18, 393)
        // ctx.lineTo(29, 216)
        ctx.stroke();
     
        ctx.closePath();
        //
    }
    const enviarPuntos = async () => {
        let data = {
            p1: [refPoint1[0], refPoint1[1] - 35],
            p2: [refPoint2[0], refPoint2[1] - 35],
            p3: [refPoint3[0], refPoint3[1] - 90],
            p4: [refPoint4[0], refPoint4[1] - 90],
        }
        await PostParams(data)
        // console.log(result)
        // setBaseImage(result);
        // console.log(result)
        // const imgElement = document.getElementById('convert');
        // imgElement.src = `data:image/jpeg;base64, ${result}`;
    }
    const activarIA = async () => {
        let data = {
            p1: [refPoint1[0], refPoint1[1] - 35],
            p2: [refPoint2[0], refPoint2[1] - 35],
            p3: [refPoint3[0], refPoint3[1] - 90],
            p4: [refPoint4[0], refPoint4[1] - 90],
        }
        await PostParams(data)
        await ConnectIA()
    }
    const desactivarIA = async () => {

        await DisconnectIA()
    }
  
    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            /* if present, the header is where you move the DIV from:*/
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            /* otherwise, move the DIV from anywhere inside the DIV:*/
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            let posx = (elmnt.offsetTop - pos2) + "px";
            let y = (elmnt.offsetTop - pos2)
            let x = (elmnt.offsetLeft - pos1)
            let posy = (elmnt.offsetLeft - pos1) + "px";
            elmnt.style.top = posx
            elmnt.style.left = posy
            // variables actuales de los demas

            // if (elmnt.id === "mydiv") {
            //     drawnPoints([x + 3, y + 3], [point2.offsetLeft + 6, point2.offsetTop + 2], [point3.offsetLeft + 6, point3.offsetTop + 6], [point4.offsetLeft + 2, point4.offsetTop + 5])
            //     setRefPoint1([x, y])
            //     setRefPoint2([point2.offsetLeft, point2.offsetTop])
            //     setRefPoint3([point3.offsetLeft, point3.offsetTop])
            //     setRefPoint4([point4.offsetLeft, point4.offsetTop])
            // } else if (elmnt.id === "mydiv2") {
            //     drawnPoints([point1.offsetLeft + 3, point1.offsetTop + 3], [x + 6, y + 2], [point3.offsetLeft + 6, point3.offsetTop + 6], [point4.offsetLeft + 2, point4.offsetTop + 5])
            //     setRefPoint1([point1.offsetLeft, point1.offsetTop])
            //     setRefPoint2([x, y])
            //     setRefPoint3([point3.offsetLeft, point3.offsetTop])
            //     setRefPoint4([point4.offsetLeft, point4.offsetTop])
            // } else if (elmnt.id === "mydiv3") {
            //     drawnPoints([point1.offsetLeft + 3, point1.offsetTop + 3], [point2.offsetLeft + 6, point2.offsetTop + 2], [x + 6, y + 6], [point4.offsetLeft + 2, point4.offsetTop + 5])
            //     setRefPoint1([point1.offsetLeft, point1.offsetTop])
            //     setRefPoint2([point2.offsetLeft, point2.offsetTop])
            //     setRefPoint3([x, y])
            //     setRefPoint4([point4.offsetLeft, point4.offsetTop])
            // } else if (elmnt.id === "mydiv4") {
            //     drawnPoints([point1.offsetLeft + 3, point1.offsetTop + 3], [point2.offsetLeft + 6, point2.offsetTop + 2], [point3.offsetLeft + 6, point3.offsetTop + 6], [x + 2, y + 5])
            //     setRefPoint1([point1.offsetLeft, point1.offsetTop])
            //     setRefPoint2([point2.offsetLeft, point2.offsetTop])
            //     setRefPoint3([point3.offsetLeft, point3.offsetTop])
            //     setRefPoint4([x, y])
            // }


        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    const handleChange2 = (event) => {
        setChecked2(event.target.checked);
    };
    const handleChange3 = (event) => {
        setChecked3(event.target.checked);
    };
    const handleChange4 = (event) => {
        setChecked4(event.target.checked);
    };
    const borrarPuntos =()=>{
        pointsAreas.current = []
        drawnPoints()
    }
    const printMousePosition =(event)=>{
        let canvasElem = document.querySelector("canvas");
          
        canvasElem.addEventListener("mousedown", function(e)
        {
            getMousePosition(canvasElem, e);
        });
    
        let aux_marker = markerPos
        let aux_points = pointsAreas.current
       
        aux_points.push(aux_marker)
     
        if(aux_points.length >3){
            aux_points.push(aux_points[0])
        }
        pointsAreas.current = aux_points
        console.log(aux_points)
        drawnPoints();
    }
    function getMousePosition(canvas, event) {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        setMarkerPos([parseInt(x),parseInt(y)]);
    }

    function Base64Image(props) {
        return (
            <img src={`data:image/png;base64,${props.image}`} alt="Base64 Image" />
        );
    }
    useEffect(() => {
        
        drawnPoints();
        // drawnPoints(refPoint5,refPoint6,refPoint7,refPoint8,"#canvas2");
        // drawnPoints(refPoint9,refPoint10,refPoint11,refPoint12,"#canvas3");
        //dragElement(document.getElementById("mydiv"));
        // dragElement(document.getElementById("mydiv2"));
        // dragElement(document.getElementById("mydiv3"));
        // dragElement(document.getElementById("mydiv4"));
        // dragElement(document.getElementById("mydiv5"));
        // dragElement(document.getElementById("mydiv6"));
        // dragElement(document.getElementById("mydiv7"));
        // dragElement(document.getElementById("mydiv8"));
        // dragElement(document.getElementById("mydiv9"));
        // dragElement(document.getElementById("mydiv10"));
        // dragElement(document.getElementById("mydiv11"));
        // dragElement(document.getElementById("mydiv12"));
        // dragElement(document.getElementById("mydiv13"));
        // dragElement(document.getElementById("mydiv14"));
        // dragElement(document.getElementById("mydiv15"));
        // dragElement(document.getElementById("mydiv16"));


        // eslint-disable-next-line
    }, []);

   

    return (
        <>
            <Grid container className={"mt-4"} spacing={2}>
                <Grid item md={3}>
                    <button className="btn  btn-primary" onClick={desactivarIA}>Desconectar IA </button>
                </Grid>
                <Grid item md={3}>
                    <button className="btn  btn-primary" onClick={activarIA}>Conectar IA </button>
                </Grid>
                <Grid item md={3}>
                    <button className="btn  btn-primary" onClick={enviarPuntos}>Fijar Puntos</button>
                </Grid>
                <Grid item md={3}>
                    <button className="btn  btn-primary">Detectar</button>
                </Grid>
                <Grid item md={3}>
                <Stack spacing={2} direction="column">
                <Button variant="contained">EDITAR</Button>
                <Button variant="contained" onClick={borrarPuntos} >BORRAR PUNTOS</Button>
                <Button variant="contained">GUARDAR AREA</Button>
    </Stack>
                {/* <FormGroup>
                    <FormControlLabel control={<Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'area1' }}
                    />} label="Area 1" />
                    <FormControlLabel control={<Switch
                        checked={checked2}
                        onChange={handleChange2}
                        inputProps={{ 'aria-label': 'area2' }}
                    />} label="Area 2" />
                    <FormControlLabel control={<Switch
                        checked={checked3}
                        onChange={handleChange3}
                        inputProps={{ 'aria-label': 'area3' }}
                    />} label="Area 3" />
                     <FormControlLabel control={<Switch
                        checked={checked4}
                        onChange={handleChange4}
                        inputProps={{ 'aria-label': 'area3' }}
                    />} label="Area 3" />
                    </FormGroup> */}
                </Grid>



                <Grid item md={8}>
                    <div className="image-container justify-content-center">
                        <img src={"http://127.0.0.1:50100/video"} className='img-source' alt="pruebas" width={640} height={480} />
                        <canvas id="canvas" style={{visibility:checked? "visible":"hidden"}} onClick={(event)=>{printMousePosition(event)}} ></canvas>
                        {/* <div className="marker-1" id="mydiv"  ></div> */}
                        {/* <div className="marker-1" style={{visibility:checked? "visible":"hidden"}} id="mydiv"  ></div>
                        <div className="marker-2" style={{visibility:checked? "visible":"hidden"}}  id="mydiv2" ></div>
                        <div className="marker-3"  style={{visibility:checked? "visible":"hidden"}} id="mydiv3" ></div>
                        <div className="marker-4" style={{visibility:checked? "visible":"hidden"}} id="mydiv4" ></div>
                
                        <div className="marker-5" style={{visibility:checked2? "visible":"hidden"}} id="mydiv5"  ></div>
                        <div className="marker-6" style={{visibility:checked2? "visible":"hidden"}}  id="mydiv6" ></div>
                        <div className="marker-7"  style={{visibility:checked2? "visible":"hidden"}} id="mydiv7" ></div>
                        <div className="marker-8" style={{visibility:checked2? "visible":"hidden"}} id="mydiv8" ></div>
                  
                        <div className="marker-9" style={{visibility:checked3? "visible":"hidden"}}   id="mydiv9"  ></div>
                        <div className="marker-10" style={{visibility:checked3? "visible":"hidden"}}  id="mydiv10" ></div>
                        <div className="marker-11"  style={{visibility:checked3? "visible":"hidden"}} id="mydiv11" ></div>
                        <div className="marker-12" style={{visibility:checked3? "visible":"hidden"}}  id="mydiv12" ></div>
                      
                        <div className="marker-13" style={{visibility:checked4? "visible":"hidden"}}  id="mydiv13"  ></div>
                        <div className="marker-14" style={{visibility:checked4? "visible":"hidden"}}  id="mydiv14" ></div>
                        <div className="marker-15"  style={{visibility:checked4? "visible":"hidden"}} id="mydiv15" ></div>
                        <div className="marker-16" style={{visibility:checked4? "visible":"hidden"}}  id="mydiv16" ></div> */}
                    </div>
                </Grid>
                {/* <Grid item md={12}>
                <img src={"http://127.0.0.1:50100/setCameraActive"}  alt="pruebas" width={540} height={480} />
                </Grid> */}
            </Grid>

        </>
    )

}
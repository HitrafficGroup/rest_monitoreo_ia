import Grid from '@mui/material/Grid';
import { useEffect, useRef, useState } from 'react';
import { PostParams, DisconnectIA, ConnectIA, getValues,UpdateCounter } from '../scripts/peticionesApi';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { ColorPicker } from '../components/item-color';
import { CardZone } from '../components/card-zone';
import image2 from "../assets/camera.jpg";
import { v4 } from 'uuid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Snackbar from '@mui/material/Snackbar';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { CardCounter } from '../components/card-counter';
let colores = [
    { stroke: 'rgba(192, 57, 43, 1)', fill: 'rgba(192, 57, 43 , 0.5)', active: true, name: 'rojo' },
    { stroke: 'rgba(81, 46, 95, 1)', fill: 'rgba(142, 68, 173,  0.5)', active: false, name: 'morado' },
    { stroke: 'rgba(27, 79, 114 ,1)', fill: 'rgba(41, 128, 185,  0.5)', active: false, name: 'azul' },
    { stroke: 'rgba(14, 98, 81 ,  1)', fill: 'rgba(26, 188, 156 ,  0.5)', active: false, name: 'verde' },
    { stroke: 'rgba(186, 74, 0, 1)', fill: 'rgba(235, 152, 78,  0.5)', active: false, name: 'anaranjado' },
    { stroke: 'rgba(241, 196, 15,  1)', fill: 'rgba(183, 149, 11 , 0.5)', active: false, name: 'amarillo' },
]
export default function HomeView() {
    const [colorSelected, setColorSelected] = useState(colores[0]);
    const [coloresPicker, setColoresPicker] = useState(colores);
    // areas 2

    const pointsAreas = useRef([])
    const [areasDeclaradas, setAreasDeclaradas] = useState([])
    const areasTotales = useRef([]);
    const markerPos = useRef([])
    const [zonesInference, setZonesInference] = useState([{conteo:0}])
    const [checked, setChecked] = useState(false);
    const [open,  setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const flag = useRef(false);
    const refPoint1 = useRef([160,170])
    const refPoint2 = useRef([510,170])

    
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
      const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen2(false);
      };
    
    const handleChange = async(event) => {
        if(event.target.checked){
            console.log("se activa la ia")
            let aux_data = JSON.parse(JSON.stringify(areasTotales.current))
            let data_send = []
            for (let i = 0; i < aux_data.length; i++) {
                let puntos = aux_data[i].points
                puntos.forEach((item) => {
                    item[0] = parseInt(((640 * item[0]) / 960))
                    item[1] = parseInt(((360 * item[1]) / 540))
                })
                puntos.pop()
                let new_data = {
                    points: puntos,
                    name: `zone-${i}`,
                    color: aux_data[i].stroke,
                    line_position: [refPoint1.current,refPoint2.current]
                }
                data_send.push(new_data)
            }
            await PostParams(data_send)
            await ConnectIA()
            setOpen(true)
            setChecked(true);
            flag.current = true;
        }else{
            console.log("se desactiva la ia")
            await DisconnectIA();
            setOpen2(true);
            setChecked(false);
            flag.current = false;
        }
    };



    function drawnPoints() {
        const canvas = document.querySelector("#canvas");
        let aux_area = pointsAreas.current
        let areas = areasTotales.current


        // Context for the canvas for 2 dimensional operations
        const ctx = canvas.getContext('2d');
        ctx.canvas.width = 960;
        ctx.canvas.height = 540;
        ctx.lineWidth = 3;


        // ctx.beginPath();
        // ctx.arc(100, 75, 50, 0, 2 * Math.PI);
        // ctx.stroke();
        // ctx.closePath();
        if (aux_area.length > 1) {
            ctx.beginPath();
            ctx.fillStyle = 'rgba(93, 109, 126, 0.5)';
            ctx.strokeStyle = 'rgba(40, 55, 71 , 1)';
            aux_area.forEach((item) => {
                ctx.lineTo(item[0], item[1])
            })
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }

        areas.map((item) => {
            ctx.beginPath();
            ctx.fillStyle = item.fill;
            ctx.strokeStyle = item.stroke;
            item.points.forEach((item) => {
                ctx.lineTo(item[0], item[1])
            })
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        })

     
         
        areas.map((item) => {

            ctx.fillStyle = "yellow";
            item.points.forEach((item) => {
                ctx.beginPath();
                ctx.arc(item[0], item[1], 6, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
                ctx.closePath()
            })
                ;
        })
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.moveTo(refPoint1.current[0], refPoint1.current[1]);
        ctx.lineTo(refPoint2.current[0], refPoint2.current[1]);
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.closePath();

        

    


        //
    }

    const selectColor = (__data) => {
        let colores_aux = JSON.parse(JSON.stringify(coloresPicker))
        setColorSelected(__data)
        colores_aux.map((item) => {


            if (item.fill === __data.fill) {
                item.active = true
            } else {
                item.active = false
            }

            return item;
        })
        setColoresPicker(colores_aux)
    }

    const Demo = styled('div')(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        marginTop: "40px",
    }));

    const enviarPuntos = async () => {
        let aux_data = JSON.parse(JSON.stringify(areasTotales.current))
        let data_send = []
        for (let i = 0; i < aux_data.length; i++) {
            let puntos = aux_data[i].points
            puntos.forEach((item) => {
                item[0] = parseInt(((640 * item[0]) / 960))
                item[1] = parseInt(((360 * item[1]) / 540))
            })
            puntos.pop()
            let new_data = {
                points: puntos,
                name: v4(),
                color: aux_data[i].stroke
            }
            data_send.push(new_data)

        }

        await PostParams(data_send)

    }
   
  
    const getVideoPrediction = async () => {
        var newImage = new Image();
        newImage.src = "http://127.0.0.1:50100/predict?" + new Date().getTime();
        document.getElementById("camera-1").src = newImage.src;


    }
    const eliminarElemento = async (__data) => {
        setOpen3(true)
        let elementos_filtrados = areasDeclaradas.filter(item => item.name !== __data.name)
        setAreasDeclaradas(elementos_filtrados)
        areasTotales.current = elementos_filtrados
        await enviarPuntos()
        drawnPoints();
        setOpen3(false)
    }







    const borrarPuntos = () => {
        pointsAreas.current = []
        drawnPoints()
    }
    const printMousePosition = (event) => {
        let canvasElem = document.querySelector("canvas");

        canvasElem.addEventListener("mousedown", function (e) {
            getMousePosition(canvasElem, e);
        });

        let aux_marker = markerPos.current
        let aux_points = pointsAreas.current
        if (markerPos.current.length !== 0) {
            aux_points.push(aux_marker)


            pointsAreas.current = aux_points
            drawnPoints();
        }
    }
    function getMousePosition(canvas, event) {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        markerPos.current = [parseInt(x), parseInt(y)]

    }

    const guardarAreas = async () => {
        setOpen3(true)
        let aux_areas = JSON.parse(JSON.stringify(areasDeclaradas))
        let aux_color = JSON.parse(JSON.stringify(colorSelected))
        let aux_points = JSON.parse(JSON.stringify(pointsAreas.current))
        aux_points[aux_points.length - 1] = aux_points[0];
        let indice = aux_areas.length
        let new_area = {
            name: "zone-" + indice,
            points: aux_points,
            fill: aux_color.fill,
            stroke: aux_color.stroke,
        }
        aux_areas.push(new_area)
        areasTotales.current = aux_areas
        setAreasDeclaradas(aux_areas)
        pointsAreas.current = []
        drawnPoints()
        let aux_data = JSON.parse(JSON.stringify(areasTotales.current))
        let data_send = []
        for (let i = 0; i < aux_data.length; i++) {
            let puntos = aux_data[i].points
            puntos.forEach((item) => {
                item[0] = parseInt(((640 * item[0]) / 960))
                item[1] = parseInt(((360 * item[1]) / 540))
            })
            puntos.pop()
            let new_data = {
                points: puntos,
                name: `zone-${i}`,
                color: aux_data[i].stroke
            }
            data_send.push(new_data)

        }
       
        await PostParams(data_send)
        setOpen3(false)
    }
    const actualizarLinePos = async()=>{
        let aux_point1 =  JSON.parse(JSON.stringify(refPoint1.current))
        aux_point1[0] = parseInt(((640 * aux_point1[0]) / 960))
        aux_point1[1] = parseInt(((360 * aux_point1[1]) / 540))
        let aux_point2 =  JSON.parse(JSON.stringify(refPoint2.current))
        aux_point2[0] = parseInt(((640 * aux_point2[0]) / 960))
        aux_point2[1] = parseInt(((360 * aux_point2[1]) / 540))
        await UpdateCounter({line_position:[aux_point1,aux_point2]})
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
            if (elmnt.id === "mydiv") {
                refPoint1.current =[x+10,y+10]
            }else{
                refPoint2.current = [x+10,y+10]
            }
            drawnPoints();



        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }





    useEffect(() => {
        dragElement(document.getElementById("mydiv"));
        dragElement(document.getElementById("mydiv2"));
        drawnPoints();
        borrarPuntos();

    
            const interval = setInterval(async () => {
                if(flag.current){
                var data_ia = await getValues()
                setZonesInference(data_ia.data)
                }
            }, 500);
            return () => clearInterval(interval);
  

        //eslint disable next-line
    }, []);



    return (
        <>
            <Grid container className={"mt-4"} spacing={2}>
                <Grid item md={2}>
                    <Stack spacing={1} direction="column">
                        <FormGroup>
                            <FormControlLabel control={<Switch checked={checked} color='success' onChange={handleChange}  inputProps={{ 'aria-label': 'controlled' }}  />} label="ACTIVAR IA" />
                        </FormGroup>
                        <Button variant="contained" onClick={getVideoPrediction}>TRAER VIDEO</Button>
                    </Stack>
                </Grid>
                <Grid item md={2}>
                    <CardCounter value={zonesInference[0].conteo} color_icono={'rgba(26, 188, 156 ,  0.5)'}/>
                </Grid>
                <Grid item md={8}>
                    <Stack direction="row" spacing={2}>
                        {zonesInference.map((item, index) => {
                            return (
                                <CardZone value={item.detecciones} zona={index} color_icono={item.color} />
                            )
                        })}

                    </Stack>
                </Grid>

                <Grid item md={2}>
                    <Stack spacing={1} direction="column">

                        <h5>Seleccione el color: </h5>
                        <div className='color-container'>
                            {coloresPicker.map((item, index) => {
                                return (

                                    <ColorPicker key={index} fill={item.stroke} selected={item.active} onClick={() => { selectColor(item) }} />

                                );
                            })

                            }
                        </div>
                        <Button variant="contained" color='primary' onClick={actualizarLinePos} >ACTUALIZAR CONTADOR</Button>
                        <Button variant="contained" color='error' onClick={borrarPuntos} >BORRAR PUNTOS</Button>
                        <Button variant="contained" color='secondary' onClick={guardarAreas} >GUARDAR AREA</Button>
                        <h5>Zonas creadas: </h5>
                        <Demo>
                            <List>
                                {areasDeclaradas.map((item, index) => {
                                    return (

                                        <ListItem
                                            key={index}
                                            secondaryAction={
                                                <IconButton onClick={() => { eliminarElemento(item) }} edge="end" aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <FormGroup>


                                                    <ColorPicker key={index} fill={item.stroke} selected={false} />


                                                </FormGroup>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item.name}
                                            />
                                        </ListItem>
                                    );

                                }
                                )}
                            </List>
                        </Demo>
                    </Stack>
                </Grid>
                <Grid item md={10} sx={{ height: 540 }}>
                    <div className="image-container justify-content-center">
                        <img id='camera-1' src={image2} className='img-source' alt="pruebas" width={960} height={540} />
                        <canvas id="canvas" onClick={(event) => { printMousePosition(event) }}  >

                        </canvas>
                        <div className="marker-1"  id="mydiv"  >1</div>
                        <div className="marker-2"   id="mydiv2" >2</div>
                    </div>

                </Grid>
            </Grid>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert severity="success">La Inteligencia Artificial a sido Conectada!</Alert>
            </Snackbar>
            <Snackbar open={open2} autoHideDuration={2000} onClose={handleClose2}>
                <Alert severity="warning">La Inteligencia Artificial a sido Desactivada!</Alert>
            </Snackbar>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open3}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>

    )

}
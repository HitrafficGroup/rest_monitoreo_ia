import Grid from '@mui/material/Grid';
import { useEffect, useRef, useState } from 'react';
import { PostParams, DisconnectIA, ConnectIA, getValues } from '../scripts/peticionesApi';
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
    const [zonesInference, setZonesInference] = useState([{}])
    const [checked, setChecked] = useState(false);
    const [open,  setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    
    
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
                    color: aux_data[i].stroke
                }
                data_send.push(new_data)
            }
            await PostParams(data_send)
            await ConnectIA()
            setOpen(true)
            setChecked(true);
        }else{
            console.log("se desactiva la ia")
            await DisconnectIA();
            setOpen2(true);
            setChecked(false);
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


    useEffect(() => {

        const interval = setInterval(async () => {
            var data_ia = await getValues()
            setZonesInference(data_ia.data)
            console.log(data_ia)
        }, 500);
        drawnPoints();
        borrarPuntos();
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
                
                <Grid item md={10}>
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

import Grid from '@mui/material/Grid';
import { useEffect, useRef, useState, cloneElement } from 'react';
import { PostParams, DisconnectIA, ConnectIA,getPredictions } from '../scripts/peticionesApi';
import Switch from '@mui/material/Switch';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import prueba from "../assets/prueba1.jpg";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { ColorPicker } from '../components/item-color';
import Typography from '@mui/material/Typography';
import image2 from "../assets/camera.jpg";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

let colores = [
    {stroke:'rgba(192, 57, 43, 1)',fill:'rgba(192, 57, 43 , 0.5)',active:true , name:'rojo'},
    {stroke:'rgba(81, 46, 95, 1)',fill:'rgba(142, 68, 173,  0.5)',active:false, name:'morado'  } ,
    {stroke:'rgba(27, 79, 114 ,1)',fill:'rgba(41, 128, 185,  0.5)',active:false, name:'azul'},
    {stroke:'rgba(14, 98, 81 ,  1)',fill:'rgba(26, 188, 156 ,  0.5)',active:false, name:'verde'},
    {stroke:'rgba(186, 74, 0, 1)',fill:'rgba(235, 152, 78,  0.5)',active:false, name:'anaranjado'},
    {stroke:'rgba(241, 196, 15,  1)',fill:'rgba(183, 149, 11 , 0.5)',active:false, name:'amarillo'},
]
export default function HomeView() {
    const [dense, setDense] = useState(false);
    const [colorSelected, setColorSelected] = useState(colores[0]);
    const [coloresPicker,setColoresPicker] = useState(colores);
    // areas 2
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const pointsAreas = useRef([])
    const [areasDeclaradas, setAreasDeclaradas] = useState([])
    const areasTotales = useRef([]);
    const markerPos = useRef([])
    const [menupos,setMenupos] = useState(['190px','210px'])


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        let x = event.clientX  + 'px';
        let y = event.clientY  + 'px';
            console.log(x,y)
            setMenupos([x,y])  
        // window.oncontextmenu = (e) => {
        //     e.preventDefault();
              
        //   }
        
    };
    const handleClose = () => {
      setAnchorEl(null);
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
        if(aux_area.length > 1){
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

        areas.map((item)=>{
            ctx.beginPath();
            ctx.fillStyle = item.fill;
            ctx.strokeStyle = item.stroke;
            item.points.forEach((item)=>{
                ctx.lineTo(item[0],item[1])
            })
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        })

        areas.map((item)=>{
          
            ctx.fillStyle = "yellow";
            item.points.forEach((item)=>{
                ctx.beginPath();
                ctx.arc(item[0],item[1], 6, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
                ctx.closePath()
            })
          ;
        })


        //
    }

    const selectColor = (__data)=>{
        let colores_aux = JSON.parse(JSON.stringify(coloresPicker))
        setColorSelected(__data)
        colores_aux.map((item)=>{


            if(item.fill === __data.fill){
                item.active = true
            }else{
                item.active = false
            }

            return item;
        })
        setColoresPicker(colores_aux)
    }

    const Demo = styled('div')(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        marginTop:"40px",
    }));

    const enviarPuntos = async () => {
        let aux_data = JSON.parse(JSON.stringify(areasTotales.current))
        let data_send = []
        for(let i =0; i<aux_data.length;i++){
            let puntos = aux_data[i].points
            puntos.pop()
            let new_data ={
                points: puntos,
                name: `zone-${i}`
            }
            data_send.push(new_data)
        }

        await PostParams(data_send)

    }
    const activarIA = async () => {
        let aux_data = JSON.parse(JSON.stringify(areasTotales.current))
        let data_send = []
        for(let i =0; i<aux_data.length;i++){
            let puntos = aux_data[i].points
            puntos.pop()
            let new_data ={
                points: puntos,
                name: `zone-${i}`
            }
            data_send.push(new_data)
        }
        await PostParams(data_send)
        await ConnectIA()
    }
    const desactivarIA = async () => {

        await DisconnectIA()
    }
    const getVideoPrediction =async()=>{
        var newImage = new Image();
        newImage.src = "http://127.0.0.1:50100/predict?" + new Date().getTime();
        document.getElementById("camera-1").src = newImage.src;
       

    }
    const eliminarElemento = (__data) => {
        let elementos_filtrados = areasDeclaradas.filter(item=> item.name !== __data.name)
        setAreasDeclaradas(elementos_filtrados)
        areasTotales.current = elementos_filtrados
        drawnPoints();
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
        if(markerPos.current.length !== 0){
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

    const guardarAreas = () => {
        let aux_areas =  JSON.parse(JSON.stringify(areasDeclaradas))
        let aux_color =  JSON.parse(JSON.stringify(colorSelected))
        let aux_points =  JSON.parse(JSON.stringify(pointsAreas.current))
        aux_points[aux_points.length - 1] = aux_points[0];
        let indice = aux_areas.length
        let new_area = {
            name: "zone-"+indice,
            points: aux_points,
            fill: aux_color.fill,
            stroke:aux_color.stroke,
        }
        aux_areas.push(new_area)
        areasTotales.current = aux_areas
        setAreasDeclaradas(aux_areas)
        pointsAreas.current = []
        drawnPoints()
    }
    useEffect(() => {
        drawnPoints();
        borrarPuntos();
        //eslint disable next-line
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
                    <button className="btn  btn-primary" onClick={getVideoPrediction}>TRAER VIDEO</button>
                </Grid>
                <Grid item md={2}>
                    <Stack spacing={2} direction="column">
                        <Button variant="contained">EDITAR</Button>
                        <Button variant="contained" onClick={borrarPuntos} >BORRAR PUNTOS</Button>
                        <h5>Seleccione el color: </h5>
                        {coloresPicker.map((item,index)=>{
                            return(
                                <div className='color-container'>
                               <ColorPicker key={index} fill={item.stroke} selected={item.active} onClick={()=>{selectColor(item)}}/>
                               <h5>{item.name}</h5>
                                </div>
                               
                            );
                        })
                        }
                        <Button variant="contained" onClick={guardarAreas} >GUARDAR AREA</Button>
                    </Stack>
                </Grid>
                <Grid item md={10}>
                    <div className="image-container justify-content-center">
                    <img id='camera-1'  src={image2} className='img-source' alt="pruebas" width={960} height={540}/>
                        <canvas id="canvas" onClick={(event) => { printMousePosition(event) }}  >
                      
                        </canvas>
                    </div>
            
                </Grid>
                <Grid item xs={12} md={3}>
                    <Demo>
                        <List dense={dense}>
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
                                          
                                            <FormControlLabel  control={<Checkbox />}  />
                                        
                                        </FormGroup>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={item.name}
                                            secondary={ 'Secondary text'}
                                        />
                                    </ListItem>
                                );

                            }
                            )}
                        </List>
                    </Demo>
                </Grid>

            </Grid>
            
        </>
        
    )

}
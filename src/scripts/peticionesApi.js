import axios from 'axios';
import Swal from 'sweetalert2';
// const BASE_HT200 = 'https://www.hitraffic-group.com';
const BASE_HT200 = 'http://127.0.0.1:50100';


async function PostParams(jsonData) {
    var res;
	await axios.post(`${BASE_HT200}/setParams`,jsonData)
		.then(response => {

          
	
            
           res = response.data;
		})
		.catch(function (error) {
			console.error(error);
			Swal.fire({
				icon: 'error',
				title: 'Error de Conexión',
				text: `${error}`,
			  })
		});
    return res
}


async function ConnectCamera() {
  
	await axios.get(`${BASE_HT200}/setCameraActive`)
		.then(response => {

          
			Swal.fire({
				title: "Completado!",
				text: "Cambios Cargados Con Éxito",
				icon: "success",
			});
            
 
		})
		.catch(function (error) {
			console.error(error);
			Swal.fire({
				icon: 'error',
				title: 'Error de Conexión',
				text: `${error}`,
			  })
		});

}

async function DisconnectCamera(jsonData) {
   
	await axios.post(`${BASE_HT200}/setCameraInactive`,jsonData)
		.then(response => {

          
			Swal.fire({
				title: "Completado!",
				text: "Cambios Cargados Con Éxito",
				icon: "success",
			});
            console.log(response.data)
       
		})
		.catch(function (error) {
			console.error(error);
			Swal.fire({
				icon: 'error',
				title: 'Error de Conexión',
				text: `${error}`,
			  })
		});
 
}


async function DisconnectIA(jsonData) {
   
	await axios.post(`${BASE_HT200}/desactivateIA`,jsonData)
		.then(response => {

        
            console.log(response.data)
       
		})
		.catch(function (error) {
			console.error(error);
			Swal.fire({
				icon: 'error',
				title: 'Error de Conexión',
				text: `${error}`,
			  })
		});
 
}

async function ConnectIA(jsonData) {
   
	await axios.post(`${BASE_HT200}/activateIA`,jsonData)
		.then(response => {

        
            console.log(response.data)
       
		})
		.catch(function (error) {
			console.error(error);
			Swal.fire({
				icon: 'error',
				title: 'Error de Conexión',
				text: `${error}`,
			  })
		});
 
}



export {PostParams,ConnectCamera,DisconnectCamera,DisconnectIA,ConnectIA}
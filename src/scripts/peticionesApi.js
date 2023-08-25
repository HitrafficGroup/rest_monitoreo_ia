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

async function getPredictions() {
	var res;
	await axios.get(`${BASE_HT200}/predict`).then(response => {
		res = response.data
		
	}).catch(function (error) {
		console.log(res);
	})
	return res
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


async function UpdateCounter(jsonData) {
   
	await axios.post(`${BASE_HT200}/setLinePos`,jsonData)
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

async function getValues() {
	var res;
	await axios.get(`${BASE_HT200}/values`).then(response => {
		res = response.data
	}).catch(function (error) {
		console.log(error);
	})
	return res
}
async function getConfig() {
	var res;
	await axios.get(`${BASE_HT200}/config`).then(response => {
		res = response.data 
		
	}).catch(function (error) {
		console.log(error);
	})
	return res
}





export {PostParams,DisconnectIA,ConnectIA,getPredictions,getValues,UpdateCounter,getConfig}
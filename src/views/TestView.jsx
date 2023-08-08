
import React from "react";
import Grid from '@mui/material/Grid';
import { Button } from "@mui/material";
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
export default function TestView(){


return(
    <>
    <Grid container className={"mt-4"} spacing={2}>
        <Grid item md={12}>
            <h1>Test View</h1>
        </Grid>
        <Grid item md={12}>
        <div>

            </div>
        </Grid>
    </Grid>
    
    
    </>
);



}
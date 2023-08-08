import React from 'react';

export default function ImageDisplay(props){
  return (
    <div>
      {props.image ? <img src={`data:image/jpg;base64,${props.image}`}/>: ''}
    </div>
  );
}


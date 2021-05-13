import React from 'react';
import ReactDOM from 'react-dom';


let text="первый<br>второй<br/>третий<br />последний";

ReactDOM.render (
    <BR2JSX text={text} />,document.getElementById("container")
); 


import React from 'react';

const SimpleFunc = ( { y } ) =>{

 	return (
		<div className="container p-5 m-5 bg-light">
		  <h1>
		     Hello World !
		  </h1>
		  <h2>
		    the value that received as argument is :  { y }
		  </h2>
	   </div>
	);
}

export default SimpleFunc;
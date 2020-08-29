import React, {  } from 'react';

const Component = ({ className }) => {
	const handleClick =() =>{
		const div = document.getElementById('test');
		if (div) {
			const h1 = document.createElement("h1");
			h1.innerHTML = className;
			h1.classList.add('test');
			h1.id= 'test'; 
			div.append(h1);
		}
	}
    return (
           <div>
             <h1> Hello, World ! </h1> 
            
                <label> username : </label>
                <input type="text" id="username" />
                <button onClick={handleClick}>
                      login !
                </button>
            
           </div>
    );
};


export default Component;

import React from 'react';

const Container = ({ props }) => {
    return ( 
            <main role="main" class="container">

            <div class="starter-template">
                {props.children}
            </div>
      
            </main>
        );
}
 
export default Container;
import React from 'react';

const Container = ( props ) => {
    return ( 
        <div className="row page">
            <div className="col-md-4 col-md-offset-4">
                {props.children}
            </div>
        </div>
        );
}
 
export default Container;
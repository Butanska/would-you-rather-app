import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className='errorPage'>
            <div>Sorry, something went wrong....</div>
            <p>Go back to the 
                <Link to='/'> home </Link> page 
            </p>
        </div>
    );
};

export default Error;

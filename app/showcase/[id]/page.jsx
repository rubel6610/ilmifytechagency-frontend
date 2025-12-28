import React from 'react';
import { projectsData } from '../components/Cards';

const CardDetails = ({params}) => {
      const project = projectsData.find((item) => item.id === params.id);
    

    return (
        <div>
            
        </div>
    );
};

export default CardDetails;
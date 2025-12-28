"use client";
import React from 'react';
import { useParams } from 'next/navigation';

const CardDetails = () => {
      const params = useParams();
      const {id}=params;
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Project Details for ID: {id}</h1>
        </div>
    );
};

export default CardDetails;
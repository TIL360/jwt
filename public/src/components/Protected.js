import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Protected = (props) => {
    const { Component } = props;
    const navigate = useNavigate();

    useEffect(() => {
        const verifyUser = async () => {
            try {
                // Check authorization by calling your backend endpoint
                const response = await axios.get('http://localhost:5127/dashboard', { withCredentials: true });

                // If response is valid, user is authorized to view the `Component`
                if (!response.data.Valid) {
                    navigate('/');
                }
            } catch (error) {
                // If any error occurs or the verification fails, redirect to the login page
                navigate('/');
            }
        };

        verifyUser();

    }, [navigate]);

    return (
        <div>
            <Component />
        </div>
    );
};

export default Protected;

import { getDescription } from './utils';
import React, { useState } from 'react';
import { getImageByKey } from './utils';

const MenuPage = () => {

    const [currentImage, setCurrentImage] = useState(null);

    const handlePlusButtonClick = () => {
        window.location.href = '/picture';
    }

    const names = getDescription().map(item => item.split(':')[0]);

    const handleItemClick = (index) => {
        const key = getDescription()[1][index];
        
        const image = getImageByKey(key);
        setCurrentImage(image);
    }

    const handleCloseImage = () => {
        setCurrentImage(null);
    }

    return (
        <div style={{ padding: '20px', width: '96vw', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

            <div style={{
                border: '2px solid black',
                width: '100%',
                height: 'calc(33vh)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '20px',
                marginBottom: '20px',
                boxSizing: 'border-box'
            }}>
                <h1 style={{ margin: '0 0 10px 0', boxSizing: 'border-box' }}>Hi [username],</h1>
                <h3 style={{ margin: 0, boxSizing: 'border-box' }}>Welcome back!</h3>
            </div>

            <div style={{ flex: 1, boxSizing: 'border-box' }}>
                <h2>Your Records</h2>
                <ul style={{ fontSize: '18px', listStyleType: 'square', paddingLeft: '40px' }}>
                    {names.map((name, index) => (
                        <li key={index} onClick={() => handleItemClick(index)}>{name}</li>
                    ))}
                </ul>
            </div>

            {currentImage && 
                <div onClick={handleCloseImage} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={currentImage} alt="Selected" style={{ maxWidth: '90%', maxHeight: '80%' }} />
                </div>
            }

            <hr style={{ margin: '20px 0', borderTop: '2px solid black' }} /> 

            <footer style={{ textAlign: 'center', padding: '20px' }}>
                <button onClick={handlePlusButtonClick} style={{
                    backgroundColor: 'white',
                    border: 'solid 3px black',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    fontSize: '24px',
                    boxSizing: 'border-box'
                }}>
                    +
                </button>
            </footer>
        </div>
    );
}

export default MenuPage;

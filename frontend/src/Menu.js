import React from 'react';
import { getDescription } from './utils';

const MenuPage = () => {

    const handlePlusButtonClick = () => {
        window.location.href = '/picture'
    }

    
    const names = getDescription().map(item => item.split(':')[0]);

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
                        <li key={index}>{name}</li>
                    ))}
                </ul>
            </div>

            <hr style={{ margin: '20px 0', borderTop: '2px solid black' }} /> {/* Breaker Line */}

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

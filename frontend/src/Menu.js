import React from 'react';
import { useHistory } from 'react-router-dom';

const MenuPage = () => {
    const history = useHistory();

    const handlePlusButtonClick = () => {
        history.push('/picture');
    }

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ 
                border: 'solid 3px black', 
                borderRadius: '5px', 
                padding: '10px', 
                marginBottom: '20px' 
            }}>
                Hi [username], <br></br>welcome back!
            </div>
            
            <div>
                <h2>Your Records</h2>
                <ul>
                    <li>Record 1</li>
                    <li>Record 2</li>
                    <li>Record 3</li>
                </ul>
            </div>

            <div style={{ position: 'fixed', bottom: '20px', left: '20px' }}>
                <button onClick={handlePlusButtonClick} style={{ 
                    backgroundColor: 'white', 
                    border: 'solid 3px black', 
                    borderRadius: '50%', 
                    width: '50px', 
                    height: '50px', 
                    fontSize: '24px' 
                }}>
                    +
                </button>
            </div>
        </div>
    );
}

export default MenuPage;

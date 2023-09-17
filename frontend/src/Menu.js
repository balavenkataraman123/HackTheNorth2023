import { Base64Image, getDescription } from './utils';
import React, { useState } from 'react';
import { getImageByKey, userName, getImageKeys } from './utils';
import bg from './bg.jpg'

const MenuPage = () => {
    document.body.style.backgroundImage = `url(${bg})`
    document.body.style.backgroundSize = 'cover'

    const [currentImage, setCurrentImage] = useState(null);

    const handlePlusButtonClick = () => {
        window.location.href = '/picture';
    }

    const names = getDescription().map(item => item.split(':')[0]);

    const handleItemClick = (index) => {
        const updateImage = async () => {
            const key = getImageKeys()[index];
            const image = await getImageByKey(key);
            setCurrentImage(image);
        }
        updateImage()
    }

    const handleCloseImage = () => {
        setCurrentImage(null);
    }

    return (
        <div style={{ padding: '20px', width: '96vw', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

            <div style={{
                width: '100%',
                height: 'calc(20vh)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '20px',
                marginBottom: '20px',
                boxSizing: 'border-box',
                paddingBottom: '0'
            }}>
                <h1 style={{ margin: '0 0 10px 0', boxSizing: 'border-box' }}>Hi {userName()},</h1>
                <h3 style={{ margin: 0, boxSizing: 'border-box' }}>Welcome back <span style={{fontSize: '2em'}}>👋</span>!</h3>
            </div>

            <div style={{ 
                    flex: 1, 
                    boxSizing: 'border-box',
                    border: '2px solid black',
                    borderRadius: '10px',
                    padding: '20px',
                    backgroundColor: 'white',
                    marginTop: '0'
                }}>
                <h2>Your Records</h2>
                <div style={{ fontSize: '18px', listStyleType: 'square'}}>
                    {names.map((name, index) => (
                        <>
                            <div style={{display: 'flex', flexDirection: 'row', alignContent: 'stretch', justifyContent: 'space-between'}}>
                                <div style={{display: 'flex', flexDirection: 'column', alignContent: 'center'}}>
                                    <div style={{width: '2em', height: '2em', backgroundColor: 'gray', display: 'block'}}></div>
                                </div>
                                <p key={index} className='monospaced-font' onClick={() => handleItemClick(index)} style={{margin: '0'}}>{name}</p>
                            </div>
                            {index < names.length - 1 && <hr />}
                        </>
                    ))}
                </div>
            </div>

            {currentImage && 
                <div onClick={handleCloseImage} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Base64Image b64={currentImage} />
                </div>
            }

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

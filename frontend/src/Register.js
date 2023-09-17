import React, {useState, useEffect} from 'react'
import logo from './logo.png'
import bg from './bg.jpg'

const RegisterPage = () => {
    const [name, setName] = useState("")
    document.body.classList.add('full-height')
    document.documentElement.classList.add('full-height')
    document.getElementById('root').classList.add('full-height')
    document.body.style.backgroundImage = `url(${bg})`
    document.body.style.backgroundSize = 'cover'
    const createAccount = () => {

    }
    return <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignContent: 'stretch', justifyContent: 'center'}}>
        <div style={{textAlign: 'center', width: 'fit-content', margin: 'auto'}}>
            <img src={logo} alt="" width='200px' style={{marginBottom: '5px'}}/>
            <div style={{border: 'solid 3px black', backgroundColor: 'white', padding: '2em', borderRadius: '8px'}}>
                <h2>Login</h2>
                <input type="text" placeholder="Name" className='themed-textbox' value={name} onChange={(e) => setName(e.target.value)} />
                <br />
                <input type="submit" value="Create Account" className='themed-button' onClick={createAccount} />
            </div>
        </div>
    </div>
}

export default RegisterPage
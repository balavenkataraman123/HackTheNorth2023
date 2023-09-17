import React, {useState, useEffect} from 'react'

const RegisterPage = () => {
    const [name, setName] = useState("")
    document.body.classList.add('full-height')
    document.body.style.backgroundColor = 'lightgray'
    document.documentElement.classList.add('full-height')
    document.getElementById('root').classList.add('full-height')
    const createAccount = () => {

    }
    return <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignContent: 'stretch', justifyContent: 'center'}}>
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="submit" value="Create Account" onClick={createAccount} />
        </div>
    </div>
}

export default RegisterPage
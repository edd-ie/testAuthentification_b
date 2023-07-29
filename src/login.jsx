import React from 'react';

export default function Login({verify, user}) {

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        let data = {
            email: formData.get('email'),
            password: formData.get('password')
        }

        fetch('http://127.0.0.1:3000/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            withCredentials: true
        })
        .then(res=>{
            if (res.ok){
                return res.json().then( data => {
                    console.log(data)
                    user(data.user)
                    verify(true)
            })
            }
        })

        
        //form.reset();
    }

    return (
        <div>
            <form action="submit" onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
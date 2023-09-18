const form = document.getElementById('myform').addEventListener('submit', login);

async function login(e) {
    e.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    const loginCredentials = {
        email: email,
        password: password
    }
    console.log(loginCredentials)
    try {
        const response = await axios.post('http://localhost:3000/user/login', loginCredentials);
    }
    catch(err){
        console.log(err);
    }
}
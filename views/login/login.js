const form = document.getElementById('myform').addEventListener('submit', login);

async function login(e) {
    e.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    const loginCredentials = {
        email: email,
        password: password
    }
    // console.log(loginCredentials)
    try {
        const response = await axios.post('http://localhost:3000/user/login', loginCredentials);

        console.log("token",response.data.token);
        localStorage.setItem('token',(response.data.token));
        localStorage.setItem('id',(response.data.id));

        if(response.status === 200){
             window.alert('Login Success');
             window.location.href ='../ui/chatUi.html'
        }
        else if(201){
            window.alert('invalid password');
        }
    }
    catch(err){
        window.alert('user does not exist please sign up first');
        console.log(err);
    }
}
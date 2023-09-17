const form = document.getElementById('myform');

form.addEventListener('submit', submitdata);


async function submitdata(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email= document.getElementById('email').value;
    const number = document.getElementById('number').value;
    const password = document.getElementById('password').value;
    const userData = {
        name: name,
        email: email,
        number: number,
        password: password
    }
    try {
        const response = axios.post('http://localhost:3000/user/signup', userData)

    }
    catch(error){
        console.log("failed to send userdata to server",error)
    }
}
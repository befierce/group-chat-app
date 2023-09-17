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
        const response = await axios.post('http://localhost:3000/user/signup', userData)
        if(response.status === 202){
            window.alert("user already exists")
        }
        else if(response.status === 201){
            window.alert("signup success");
        }

    }
    catch(error){
        console.log("failed to send userdata to server",error)
    }
}
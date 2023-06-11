function validateAll(){
    var username = document.getElementById("id_username").value;
    var password = document.getElementById("id_password").value;


    if(username == ""){
        form.classList.add('was-validated')
        return false;
    }

    if(password == ""){ 
        form.classList.add('was-validated')
        return false;
    }
}


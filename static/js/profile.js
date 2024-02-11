
function getProfile() {
    let url = `${base_url}admin/get_profile/?api_token=${localStorage.api_key}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
        console.log(data)
        if(data['status'] == 'success') {
            p = data.data
            $('#fname').val(p.first_name)
            $('#lname').val(p.last_name)
            $('#email').val(p.email)
            $('#username').val(p.user.username)
            if(p.image) {
                $('.comp_image').attr('src', `${base_image_url}${p.image}`)
            }
        }
        else if(data['status'] == 'error') {
            swal('Error', data['message'], 'error')
        }
    })
    .catch(err => {console.log(err)})
}

getProfile()

function readFile() {
    let reader = new FileReader();
    let file = document.querySelector('#comp_image_in').files[0];
    reader.onload = function(e) {
        document.querySelector('.comp_image').src = e.target.result;
    }
    reader.readAsDataURL(file);
}
function saveProfile() {
    let url = `${base_url}admin/edit_profile/`;

    let fname = $('#fname').val()
    let lname = $('#lname').val()
    let email = $('#email').val()
    let image = $('.comp-im')[0].files[0]
    if(fname.trim() === '' || email.trim() === '' || lname.trim() === '') {
        swal("OOps", "Names or Email cannot be empty", "warning");
        return;
    }
    const formData = new FormData();
    formData.append('api_token', localStorage.api_key);
    formData.append('fname', fname)
    formData.append('lname', lname)
    formData.append('email', email)
    if(image) {
        formData.append('image', image)
    }
    $('.comp-btn').html('Saving Profile...').attr('disabled', true)
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'Application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        //console.log(data);
        if(data['status'] == 'success') {
            swal("Success", data.message, 'success')
            if(data.data.image) {
                localStorage.dp = data.data.image
            }
            getProfile();
        }
        else if(data['status'] == 'error') {
            swal("Error", data.message, 'error')
            getProfile();
        }
        $('.comp-btn').html('Save Profile').attr('disabled', false)
    })
    .catch(err => {
        console.log(err);
        $('.comp-btn').html('Save Profile').attr('disabled', false)
    })
}


function copyText(message) {
    const textArea = document.createElement('textarea');
    textArea.value = message;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea)
    swal('Success', 'copied!', 'success')
}


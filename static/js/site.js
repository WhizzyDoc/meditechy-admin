function getSiteInfo() {
    let url = `${base_url}site/get_site_info/`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
        //console.log(data)
        
        if(data['status'] == 'success') {
            p = data.data
            $('#title').val(p.title)
            $('#tagline').val(p.tagline)
            $('#email').val(p.email)
            $('#number').val(p.phone)
            $('#address').val(p.address)
            $('#github').val(p.github)
            $('#linkedin').val(p.linkedin)
            $('#twitter').val(p.twitter)
            $('#facebook').val(p.facebook)
            $('#instagram').val(p.instagram)
            tinymce.activeEditor.setContent(p.about)
            if(p.image) {
                $('#site-img').attr('src', `${base_image_url}${p.image}`)
            }
            if(p.logo) {
                $('#site-logo').attr('src', `${base_image_url}${p.logo}`)
            }
            if(p.icon) {
                $('#site-icon').attr('src', `${base_image_url}${p.icon}`)
            }
        }
        else if(data['status'] == 'error') {
            swal('Error', data['message'], 'error')
        }
    })
    .catch(err => {console.log(err)})
}

getSiteInfo()

function saveSite() {
    let url = `${base_url}site/edit_site/`;

    let title = $('#title').val()
    let tagline = $('#tagline').val()
    let email = $('#email').val()
    let phone = $('#number').val()
    let address = $('#address').val()
    let github = $('#github').val()
    let facebook = $('#facebook').val()
    let linkedin = $('#linkedin').val()
    let twitter = $('#twitter').val()
    let insta = $('#instagram').val()
    //let about = $('#about-site').val()
    let about = tinymce.activeEditor.getContent({format: 'html'})
    console.log(about)

    let image = $('#comp_image_in')[0].files[0]
    let logo = $('#comp_logo_in')[0].files[0]
    let icon = $('#comp_icon_in')[0].files[0]
    if(title.trim() === '') {
        swal("OOps", "Title cannot be empty", "warning");
        return;
    }
    const formData = new FormData();
    formData.append('api_token', localStorage.api_key);
    formData.append('title', title)
    formData.append('tagline', tagline)
    formData.append('phone', phone)
    formData.append('email', email)
    formData.append('address', address)
    formData.append('github', github)
    formData.append('facebook', facebook)
    formData.append('instagram', insta)
    formData.append('about', about)
    formData.append('linkedin', linkedin)
    formData.append('twitter', twitter)
    if(image) {
        formData.append('image', image)
    }
    if(logo) {
        formData.append('logo', logo)
    }
    if(icon) {
        formData.append('icon', icon)
    }
    $('.comp-btn').html('Saving Update...').attr('disabled', true)
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
            getSiteInfo();
        }
        else if(data['status'] == 'error') {
            swal("Error", data.message, 'error')
            getSiteInfo();
        }
        $('.comp-btn').html('Save Site Info').attr('disabled', false)
    })
    .catch(err => {
        console.log(err);
        $('.comp-btn').html('Save Site Info').attr('disabled', false)
    })
}

function initiateTiny() {
    tinymce.init({
        selector: '.html-text',
        plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker linkchecker a11ychecker tinycomments autocorrect typography inlinecss',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | tinycomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Admin',
        mergetags_list: [
            {value: 'First.Name', title: 'First Name'},
            {value: 'Email', title: 'Email'},
        ],
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
    });
}
initiateTiny();
function readFile(elem, type) {
    let reader = new FileReader();
    let file = elem.files[0];
    reader.onload = function(e) {
        if(type == "image") {
            document.querySelector('#site-img').src = e.target.result;
        }
        if(type == "logo") {
            document.querySelector('#site-logo').src = e.target.result;
        }
        if(type == "icon") {
            document.querySelector('#site-icon').src = e.target.result;
        }
    }
    reader.readAsDataURL(file);
}
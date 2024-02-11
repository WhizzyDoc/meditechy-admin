function getSkills() {
    let url = `${base_url}skills/get_skills/?api_token=${localStorage.api_key}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
    $('.skill-tab').empty()
      //console.log(data);
      if(data['status'] == 'success') {
        if(data.data) {
            let p = data.data;
            for(let i in p) {
                let temp = `<tr>
                <td>${p[i].title}</td>
                <td>${p[i].description}</td>
                <td>
                    <a class="w-large edit-skill"><i class="fa fa-edit w-text-blue"></i></a>&nbsp;&nbsp;&nbsp;
                    <a class="w-large del-skill" data-id="${p[i].id}" data-name="skill"><i class="fa fa-trash w-text-red"></i></a>
                </td>
                </tr>`;
              $('.skill-tab').append(temp)
            }
            $('.del-skill').click(function(e) {
                e.preventDefault();
                let id = $(this).data('id')
                let title = $(this).data('name')
                $('.msg-go-btn').data('id', id)
                $('.msg-go-btn').data('name', title)
                $('.message-content').html(`Are you sure you want to delete this '${title}'?<br>This action is permanent`)
                //console.log('done')
                $('.message-con').addClass('active')            
            })
        }
        else {
            let temp = `<tr>
                <td colspan="3">No skills added</td>
                </tr>`;
              $('.skill-tab').append(temp)
        }
      }
      else if(data['status'] == 'error') {
        
      }
    })
    .catch(err => {console.log(err)})
}

function getInterests() {
    let url = `${base_url}interests/get_interests/?api_token=${localStorage.api_key}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
    $('.interest-tab').empty()
      //console.log(data);
      if(data['status'] == 'success') {
        if(data.data) {
            let p = data.data;
            for(let i in p) {
                let temp = `<tr>
                <td>${p[i].title}</td>
                <td>
                    <a class="w-large edit-int"><i class="fa fa-edit w-text-blue"></i></a>&nbsp;&nbsp;&nbsp;
                    <a class="w-large del-int" data-id="${p[i].id}"><i class="fa fa-trash w-text-red"></i></a>
                </td>
                </tr>`;
              $('.interest-tab').append(temp)
            }
            $('.del-int').click(function(e) {
                e.preventDefault();
                let id = $(this).data('id')
                let title = "interest"
                $('.msg-go-btn').data('id', id)
                $('.msg-go-btn').data('name', title)
                $('.message-content').html(`Are you sure you want to delete this '${title}'?<br>This action is permanent`)
                //console.log('done')
                $('.message-con').addClass('active')            
            })
        }
        else {
            let temp = `<tr>
                <td colspan="3">No interests added</td>
                </tr>`;
              $('.interest-tab').append(temp)
        }
      }
      else if(data['status'] == 'error') {
        
      }
    })
    .catch(err => {console.log(err)})
}

function getEducation() {
    let url = `${base_url}education/get_education/?api_token=${localStorage.api_key}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
    $('.edu-tab').empty()
      //console.log(data);
      if(data['status'] == 'success') {
        if(data.data) {
            let p = data.data;
            for(let i in p) {
                let start = new Date(p[i].start_date).toLocaleDateString()
                let end = new Date(p[i].end_date).toLocaleDateString()
                let temp = `<tr>
                <td>${p[i].institution}</td>
                <td>${p[i].qualification}</td>
                <td>${start} - ${end}</td>
                <td>
                    <a class="w-large edit-edu"><i class="fa fa-edit w-text-blue"></i></a>&nbsp;&nbsp;&nbsp;
                    <a class="w-large del-edu" data-id="${p[i].id}"><i class="fa fa-trash w-text-red"></i></a>
                </td>
                </tr>`;
              $('.edu-tab').append(temp)
            }
            $('.del-edu').click(function(e) {
                e.preventDefault();
                let id = $(this).data('id')
                let title = "education"
                $('.msg-go-btn').data('id', id)
                $('.msg-go-btn').data('name', title)
                $('.message-content').html(`Are you sure you want to delete this '${title}'?<br>This action is permanent`)
                //console.log('done')
                $('.message-con').addClass('active')            
            })
        }
        else {
            let temp = `<tr>
                <td colspan="4">No education added</td>
                </tr>`;
              $('.edu-tab').append(temp)
        }
      }
      else if(data['status'] == 'error') {
        
      }
    })
    .catch(err => {console.log(err)})
}

function getExperience() {
    let url = `${base_url}experience/get_experience/?api_token=${localStorage.api_key}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
    $('.exp-tab').empty()
      //console.log(data);
      if(data['status'] == 'success') {
        if(data.data) {
            let p = data.data;
            for(let i in p) {
                let start = new Date(p[i].start_date).toLocaleDateString()
                let end = new Date(p[i].end_date).toLocaleDateString()
                let temp = `<tr>
                <td>${p[i].company}</td>
                <td>${p[i].job_title}</td>
                <td>${start} - ${end}</td>
                <td>
                    <a class="w-large edit-exp"><i class="fa fa-edit w-text-blue"></i></a>&nbsp;&nbsp;&nbsp;
                    <a class="w-large del-exp" data-id="${p[i].id}"><i class="fa fa-trash w-text-red"></i></a>
                </td>
                </tr>`;
              $('.exp-tab').append(temp)
            }
            $('.del-exp').click(function(e) {
                e.preventDefault();
                let id = $(this).data('id')
                let title = "experience"
                $('.msg-go-btn').data('id', id)
                $('.msg-go-btn').data('name', title)
                $('.message-content').html(`Are you sure you want to delete this '${title}'?<br>This action is permanent`)
                //console.log('done')
                $('.message-con').addClass('active')            
            })
        }
        else {
            let temp = `<tr>
                <td colspan="4">No experience added</td>
                </tr>`;
              $('.exp-tab').append(temp)
        }
      }
      else if(data['status'] == 'error') {
        
      }
    })
    .catch(err => {console.log(err)})
}
function getReference() {
    let url = `${base_url}reference/get_reference/?api_token=${localStorage.api_key}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
    $('.ref-tab').empty()
      //console.log(data);
      if(data['status'] == 'success') {
        if(data.data) {
            let p = data.data;
            for(let i in p) {
                let temp = `<tr>
                <td>${p[i].name}</td>
                <td>${p[i].job_title}</td>
                <td>${p[i].email}</td>
                <td>${p[i].phone_number}</td>
                <td>
                    <a class="w-large edit-ref"><i class="fa fa-edit w-text-blue"></i></a>&nbsp;&nbsp;&nbsp;
                    <a class="w-large del-ref" data-id="${p[i].id}"><i class="fa fa-trash w-text-red"></i></a>
                </td>
                </tr>`;
              $('.ref-tab').append(temp)
            }
            $('.del-ref').click(function(e) {
                e.preventDefault();
                let id = $(this).data('id')
                let title = "reference"
                $('.msg-go-btn').data('id', id)
                $('.msg-go-btn').data('name', title)
                $('.message-content').html(`Are you sure you want to delete this '${title}'?<br>This action is permanent`)
                //console.log('done')
                $('.message-con').addClass('active')            
            })
        }
        else {
            let temp = `<tr>
                <td colspan="5">No reference added</td>
                </tr>`;
              $('.ref-tab').append(temp)
        }
      }
      else if(data['status'] == 'error') {
        
      }
    })
    .catch(err => {console.log(err)})
}

getSkills();
getInterests();
getEducation();
getExperience();
getReference();

function addSkill() {
    let url = `${base_url}skills/add_skill/`;
    let title = $('#skill-title').val()
    let des = $('#skill-des').val()
    let image = $('.skill-image')[0].files[0]

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', des)
    formData.append('image', image)
    formData.append('api_token', localStorage.api_key)
    $('.add-skill-btn').html('Submitting...').attr('disabled', true);
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        console.log(data);
        if(data['status'] == 'success') {
            $('.add-skill-btn').html('Submit').attr('disabled', false);
            swal('Success', data['message'], 'success');
            $('#add-skill-form')[0].reset();
            getSkills()
        }
        else if(data['status'] == 'error') {
            $('.add-skill-btn').html('Submit').attr('disabled', false);
            swal('Error', data['message'], 'error');
        }
    })
    .catch(err => {
        console.log(err);
        $('.add-skill-btn').html('Submit').attr('disabled', false);
    })
}
function addInterest() {
    let url = `${base_url}interests/add_interest/`;
    let title = $('#interest-title').val()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('api_token', localStorage.api_key)
    $('.add-interest-btn').html('Submitting...').attr('disabled', true);
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        console.log(data);
        if(data['status'] == 'success') {
            $('.add-interest-btn').html('Submit').attr('disabled', false);
            swal('Success', data['message'], 'success');
            $('#add-interest-form')[0].reset();
            getInterests()
        }
        else if(data['status'] == 'error') {
            $('.add-interest-btn').html('Submit').attr('disabled', false);
            swal('Error', data['message'], 'error');
        }
    })
    .catch(err => {
        console.log(err);
        $('.add-interest-btn').html('Submit').attr('disabled', false);
    })
}
function addEducation() {
    let url = `${base_url}education/add_education/`;
    let inst = $('#edu-ins').val()
    let qua = $('#edu-qua').val()
    let grade = $('#edu-grade').val()
    let start = $('#edu-start').val()
    let end = $('#edu-end').val()

    const formData = new FormData()
    formData.append('institution', inst)
    formData.append('qualification', qua)
    formData.append('grade', grade)
    formData.append('start', start)
    formData.append('end', end)
    formData.append('api_token', localStorage.api_key)
    $('.add-edu-btn').html('Submitting...').attr('disabled', true);
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        console.log(data);
        if(data['status'] == 'success') {
            $('.add-edu-btn').html('Submit').attr('disabled', false);
            swal('Success', data['message'], 'success');
            $('#add-edu-form')[0].reset();
            getEducation()
        }
        else if(data['status'] == 'error') {
            $('.add-edu-btn').html('Submit').attr('disabled', false);
            swal('Error', data['message'], 'error');
        }
    })
    .catch(err => {
        console.log(err);
        $('.add-edu-btn').html('Submit').attr('disabled', false);
    })
}
function addExperience() {
    let url = `${base_url}experience/add_experience/`;
    let comp = $('#exp-comp').val()
    let title = $('#exp-title').val()
    let loc = $('#exp-loc').val()
    let des = $('#exp-des').val()
    let start = $('#exp-start').val()
    let end = $('#exp-end').val()

    const formData = new FormData()
    formData.append('company', comp)
    formData.append('job_title', title)
    formData.append('location', loc)
    formData.append('description', des)
    formData.append('start', start)
    formData.append('end', end)
    formData.append('api_token', localStorage.api_key)
    $('.add-exp-btn').html('Submitting...').attr('disabled', true);
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        console.log(data);
        if(data['status'] == 'success') {
            $('.add-exp-btn').html('Submit').attr('disabled', false);
            swal('Success', data['message'], 'success');
            $('#add-exp-form')[0].reset();
            getExperience()
        }
        else if(data['status'] == 'error') {
            $('.add-exp-btn').html('Submit').attr('disabled', false);
            swal('Error', data['message'], 'error');
        }
    })
    .catch(err => {
        console.log(err);
        $('.add-exp-btn').html('Submit').attr('disabled', false);
    })
}
function addReference() {
    let url = `${base_url}reference/add_reference/`;
    let comp = $('#ref-comp').val()
    let name = $('#ref-name').val()
    let title = $('#ref-title').val()
    let email = $('#ref-email').val()
    let phone = $('#ref-phone').val()

    const formData = new FormData()
    formData.append('company', comp)
    formData.append('job_title', title)
    formData.append('name', name)
    formData.append('phone', phone)
    formData.append('email', email)
    formData.append('api_token', localStorage.api_key)
    $('.add-ref-btn').html('Submitting...').attr('disabled', true);
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        console.log(data);
        if(data['status'] == 'success') {
            $('.add-ref-btn').html('Submit').attr('disabled', false);
            swal('Success', data['message'], 'success');
            $('#add-ref-form')[0].reset();
            getReference()
        }
        else if(data['status'] == 'error') {
            $('.add-ref-btn').html('Submit').attr('disabled', false);
            swal('Error', data['message'], 'error');
        }
    })
    .catch(err => {
        console.log(err);
        $('.add-ref-btn').html('Submit').attr('disabled', false);
    })
}

function deleteSkill(id) {
    let url = `${base_url}skills/delete_skill/`;
    const formData = new FormData();
    formData.append('api_token', localStorage.api_key);
    formData.append('skill_id', id);
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        //console.log(data);
        if(data['status'] == 'success') {
            swal("Success", data.message, 'success')
            getSkills()
        }
        else if(data['status'] == 'error') {
            swal("Error", data.message, 'error')
        }
    })
    .catch(err => {
        console.log(err);
    })
}
function deleteInterest(id) {
    let url = `${base_url}interests/delete_interest/`;
    const formData = new FormData();
    formData.append('api_token', localStorage.api_key);
    formData.append('interest_id', id);
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        //console.log(data);
        if(data['status'] == 'success') {
            swal("Success", data.message, 'success')
            getInterests()
        }
        else if(data['status'] == 'error') {
            swal("Error", data.message, 'error')
        }
    })
    .catch(err => {
        console.log(err);
    })
}
function deleteEducation(id) {
    let url = `${base_url}education/delete_education/`;
    const formData = new FormData();
    formData.append('api_token', localStorage.api_key);
    formData.append('education_id', id);
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        //console.log(data);
        if(data['status'] == 'success') {
            swal("Success", data.message, 'success')
            getEducation();
        }
        else if(data['status'] == 'error') {
            swal("Error", data.message, 'error')
        }
    })
    .catch(err => {
        console.log(err);
    })
}
function deleteExperience(id) {
    let url = `${base_url}experience/delete_experience/`;
    const formData = new FormData();
    formData.append('api_token', localStorage.api_key);
    formData.append('experience_id', id);
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        //console.log(data);
        if(data['status'] == 'success') {
            swal("Success", data.message, 'success')
            getExperience()
        }
        else if(data['status'] == 'error') {
            swal("Error", data.message, 'error')
        }
    })
    .catch(err => {
        console.log(err);
    })
}
function deleteReference(id) {
    let url = `${base_url}reference/delete_reference/`;
    const formData = new FormData();
    formData.append('api_token', localStorage.api_key);
    formData.append('reference_id', id);
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        //console.log(data);
        if(data['status'] == 'success') {
            swal("Success", data.message, 'success')
            getReference()
        }
        else if(data['status'] == 'error') {
            swal("Error", data.message, 'error')
        }
    })
    .catch(err => {
        console.log(err);
    })
}
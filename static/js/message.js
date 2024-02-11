function getMessages() {
    let page = $('#mess_page').val();
    let per_page = 10;
    let search = $('#mess_search').val();
    let url = `${base_url}messages/get_messages/?api_token=${localStorage.api_key}&page=${page}&per_page=${per_page}&search=${search}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.mess-list').empty()
      if(data['status'] == 'success') {
        let pages = data.total_pages
        $('.com_page_nos').empty();
        for(var i=0; i<pages; i++) {
            let classN = "";
            if((i+1) == data.page_number) {
                classN = "active"
            }
            if((i+1) > (data.page_number + 1) || (i+1) < (data.page_number - 1)) {
                continue
            }
            var temp = `<a href="#" class="com_page_no ${classN}" data-id="${i+1}">${i+1}</a>`;
            $('.com_page_nos').append(temp);
        }
        let current_p = $('.com_page_no.active').data('id')
        //console.log(current_p + ":" + typeof(current_p))
        if((current_p - 1) > 0) {
            let prev = `<a href="#" class="com_page_no" data-id="${current_p - 1}"><i class="fa fa-angle-left"></i></a>`
            $('.com_page_nos').prepend(prev);
        }
        if((current_p + 1) <= data.total_pages) {
            let next = `<a href="#" class="com_page_no" data-id="${current_p + 1}"><i class="fa fa-angle-right"></i></a>`
            $('.com_page_nos').append(next);
        }
        $('.com_page_no').click(function(e) {
            e.preventDefault();
            let page = $(this).data('id');
            $('#mess_page').val(page);
            getMessages();
        })
        if(data.data) {
            let e = data.data;
            for(var i in e) {
                date = new Date(e[i].date).toLocaleDateString();
                let reply = ''
                if(e[i].reply === undefined || (e[i].reply).trim() === '') {
                    reply = `<a href="#" data-toggle="modal" data-target="#replyMessageModal" class="mess-rep-link" data-id="${e[i].id}"><i class="fa fa-reply"></i> Reply</a>&nbsp;&nbsp;&nbsp;&nbsp;`
                }
                else {
                    reply = `<a href="#" data-toggle="modal" data-target="#replyMessageModal" class="mess-rep-edit" data-id="${e[i].id}">
                    <i class="fa fa-reply"></i> Edit Reply<span class="d-rep w-hide">${e[i].reply}</span>
                    </a>&nbsp;&nbsp;&nbsp;&nbsp;`
                }
                let temp = `<tr>
                <td>
                <div class="w-bold-xx w-text-indigo">${e[i].name}</div>
                <p>
                    ${reply}
                    <a href="#" class="mess-del-link" data-id="${e[i].id}"><i class="fa fa-trash"></i> Delete</a>
                </p>
                </td>
                <td>${e[i].email}</td>
                <td>${e[i].message}</td>
                <td>${date}</td>
              </tr>`;
              $('.mess-list').append(temp)
            }
            $('.mess-rep-link').click(function() {
                let id = $(this).data('id');
                $('#message_id').val(id)
                $('#mess-reply').val('')
            })
            $('.mess-rep-edit').click(function() {
                let id = $(this).data('id');
                let rep = $(this).children('.d-rep').text();
                //console.log(rep)
                $('#message_id').val(id)
                $('#mess-reply').val(rep)
            })
            $('.mess-del-link').click(function(e) {
                e.preventDefault();
                let id = $(this).data('id');
                $('.msg-go-btn').data('id', id)
                $('.message-content').html(`Are you sure you want to delete this message?<br>This action is permanent`)
                //console.log('done')
                $('.message-con').addClass('active') 
            })
        }
        else {
            let temp = `<tr>
            <td colspan="4">No messages found.</td>
            </tr>`;
            $('.mess-list').append(temp)
        }
      }
      else if(data['status'] == 'error') {
        //$('.emp-no').html('0');
        let temp = `<tr>
            <td colspan="4">${data['message']}</td>
            </tr>`;
            $('.mess-list').append(temp)
      }
    })
    .catch(err => {console.log(err)})
}
getMessages();

function deleteMessage(id) {
    let url = `${base_url}messages/delete_message/`;
    const formData = new FormData();
    formData.append('api_token', localStorage.api_key);
    formData.append('message_id', id);
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
            getMessages()
        }
        else if(data['status'] == 'error') {
            swal("Error", data.message, 'error')
        }
    })
    .catch(err => {
        console.log(err);
    })
}

function replyMessage(id) {
    let url = `${base_url}messages/reply_message/`;
    const formData = new FormData();
    formData.append('api_token', localStorage.api_key);
    formData.append('message_id', id);
    formData.append('reply', $('#mess-reply').val());
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
            $('#rep-message-form')[0].reset()
            getMessages()
        }
        else if(data['status'] == 'error') {
            swal("Error", data.message, 'error')
        }
    })
    .catch(err => {
        console.log(err);
    })
}

tinymce.init({
    selector: '.html-text',
    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Admin',
    mergetags_list: [
        {value: 'First.Name', title: 'First Name'},
        {value: 'Email', title: 'Email'},
    ],
});
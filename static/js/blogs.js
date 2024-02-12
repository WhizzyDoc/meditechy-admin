
function getCategories() {
    let url = `${base_url}blogs/get_blog_categories/`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.cats').empty()
      $('.cat-filter').empty()
      if(data['status'] == 'success') {
        if(data.data) {
            d = data.data
            for(var i in d) {
                var temp = `<option value="${d[i].id}">${d[i].title}</option>`;
                $('.cats').append(temp)
                $('.cat-filter').append(temp)
                //$('.depts2').append(temp)
            }
            $('.cat-filter').prepend(`<option value="" selected>All Categories</option>`)
        }
        else {
            $('.depts').append(data.message)
        }
      }
      else if(data['status'] == 'error') {
        //$('.depts').append(data.message)
      }
      //$('.depts').prepend(`<option selected>Select Department</option>`)
    })
    .catch(err => {console.log(err)})
  }
  getCategories();

  function getBlogTags() {
    let url = `${base_url}blogs/get_blog_tags/`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.frame-list').empty()
      $('.frame-list2').empty()
      if(data['status'] == 'success') {
        if(data.data) {
            f = data.data
            for(var i in f) {
                var temp = `<div class="custom-control custom-checkbox w-margin-right w-margin-bottom">
                <input type="checkbox" class="custom-control-input pro-frames" id="frame_${f[i].id}" value="${f[i].id}" name="">
                <label class="custom-control-label" for="frame_${f[i].id}">${f[i].title}</label>
              </div>`;
                $('.frame-list').append(temp)
                var temp2 = `<div class="custom-control custom-checkbox w-margin-right w-margin-bottom">
                <input type="checkbox" class="custom-control-input pro-frames2" id="frame_${f[i].id}2" value="${f[i].id}" name="">
                <label class="custom-control-label" for="frame_${f[i].id}2">${f[i].title}</label>
              </div>`;
                $('.frame-list2').append(temp2)
            }
        }
        else {
            $('.frame-list').append(data.message)
            $('.frame-list2').append(data.message)
        }
      }
      else if(data['status'] == 'error') {
        $('.frame-list').append(data.message)
        $('.frame-list2').append(data.message)
      }
    })
    .catch(err => {console.log(err)})
  }
getBlogTags()
  function getTotalEmp() {
    let url = `${base_url}employees/get_employees/?api_token=${localStorage.api_key}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      if(data['status'] == 'success') {
        $('.emp_no').html(data['total_items'])
      }
      else if(data['status'] == 'error') {
        $('.emp_no').html('0')
      }
    })
    .catch(err => {console.log(err)})
  }

function getBlogs() {
    let page = $('#emp_page').val();
    let per_page = $('#emp_per_page').val();
    if(per_page < 5) {
        swal("Oops!", "List per page cannot be less than 5", "warning")
        per_page = 5
    }
    let search = $('#emp_search').val();
    let sort_by = $('.sort-filter').val();
    let cat_id = ""
    let cat = $('.cat-filter').val();
    if(cat.trim() !== "") {
        cat_id = `&category_id=${cat}`
    }
    let url = `${base_url}blogs/get_blogs/?page=${page}&per_page=${per_page}&sort_by=${sort_by}&search=${search}${cat_id}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.blog-list').empty()
      if(data['status'] == 'success') {
        let pages = data.total_pages
        $('.emp-no').html(data['total_items'])
        $('.page_nos').empty();
        for(var i=0; i<pages; i++) {
            let classN = "";
            if((i+1) == data.page_number) {
                classN = "active"
            }
            if((i+1) > (data.page_number + 1) || (i+1) < (data.page_number - 1)) {
                continue
            }
            var temp = `<a href="#" class="page_no ${classN}" data-id="${i+1}">${i+1}</a>`;
            $('.page_nos').append(temp);
        }
        let current_p = $('.page_no.active').data('id')
        //console.log(current_p + ":" + typeof(current_p))
        if((current_p - 1) > 0) {
            let prev = `<a href="#" class="page_no" data-id="${current_p - 1}"><i class="fa fa-angle-left"></i></a>`
            $('.page_nos').prepend(prev);
        }
        if((current_p + 1) <= data.total_pages) {
            let next = `<a href="#" class="page_no" data-id="${current_p + 1}"><i class="fa fa-angle-right"></i></a>`
            $('.page_nos').append(next);
        }
        $('.page_no').click(function(e) {
            e.preventDefault();
            let page = $(this).data('id');
            $('#emp_page').val(page);
            getBlogs();
        })
        if(data.data) {
            let e = data.data;
            
            for(var i in e) {
                let date = `${new Date(e[i].created).toDateString()} ${new Date(e[i].created).toLocaleTimeString()}`;
                let pub = ''
                if(e[i].status == 'Published') {pub = 'Unpublish'}
                else if(e[i].status == 'Draft') {pub = 'Publish'}
                let temp = `<tr>
                <td>
                <div class="w-bold-xx w-text-indigo">${e[i].title}</div>
                <p><a class="w-small w-text-red">${pub}</a></p>
                </td>
                <td>${e[i].author}</td>
                <td>${e[i].category.title}</td>
                <td><small>${date}</small></td>
                <td>
                <a href="#" class="emp-det-link" data-id="${e[i].id}"><i class="fa fa-eye"></i> View</a>&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="#" class="emp-com-link" data-id="${e[i].id}"><i class="fa fa-bar-chart"></i> Comments</a>
                </td>
              </tr>`;
              $('.blog-list').append(temp)
            }
            $('.emp-det-link').click(function(e) {
                e.preventDefault();
                let id = $(this).data('id');
                $('.emp_det_con').addClass('active')
                getBlogDetails(id);
                initiateTiny();
            })
            $('.emp-com-link').click(function(e) {
                e.preventDefault();
                let id = $(this).data('id');
                $('.emp_rep_con').addClass('active')
                getBlogComments(id);
            })
        }
        else {
            let temp = `<tr>
            <td colspan="5">No blogs found.</td>
            </tr>`;
            $('.blog-list').append(temp)
        }
      }
      else if(data['status'] == 'error') {
        $('.emp-no').html('0');
        let temp = `<tr>
            <td colspan="5">${data['message']}. <a class="w-text-red" onclick="getBlogs();">click to retry</a></td>
            </tr>`;
            $('.blog-list').append(temp)
      }
    })
    .catch(err => {
        console.log(err);
        $('.blog-list').empty()
        let temp = `<tr>
            <td colspan="5">Error occured. <a class="w-text-red" onclick="getBlogs();">click to retry</a></td>
            </tr>`;
            $('.blog-list').append(temp)

    })
}
getBlogs()

function addBlog() {
    let url = `${base_url}blogs/add_blog/`;

    let title = $('#blog-title').val()
    let author = $('#blog-author').val()
    let stat = $('#blog-stat').val()
    let cat = $('#blog-cat').val()
    let key = $('#blog-key').val()
    let allow = $('#blog-allow').val()
    //let post = $('#blog-post').val()
    let post = tinymce.get('blog-post').getContent({format: 'html'})
    let image = $('.blog-img')[0].files[0]
    let thumb = $('.blog-thumb')[0].files[0]
    
    if(title.trim() === '' || author.trim() === '' || cat.trim() === '' || post.trim() === '') {
        swal("OOps", "Title, Author, Post or Category cannot be empty", "warning");
        return;
    }
    const formData = new FormData();
    formData.append('api_token', localStorage.api_key);
    formData.append('title', title)
    formData.append('author', author)
    formData.append('category_id', cat)
    formData.append('status', stat)
    formData.append('keywords', key)
    formData.append('allow', allow)
    formData.append('post', post)
    if(image) {
        formData.append('image', image)
    }
    if(thumb) {
        formData.append('thumbnail', thumb)
    }
    $('.pro-frames:checked').each(function() {
        formData.append('tag_ids', $(this).val())
    })

    $('.emp-add-btn').html('Adding Blog...').attr('disabled', true)
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
            getBlogs();
            $('#add-emp-form')[0].reset()
        }
        else if(data['status'] == 'error') {
            swal("Error", data.message, 'error')
        }
        $('.emp-add-btn').html('Add Blog').attr('disabled', false)
    })
    .catch(err => {
        console.log(err);
        swal("Error", "error occured", 'error')
        $('.emp-add-btn').html('Add Blog').attr('disabled', false)
    })
}

function getBlogDetails(id) {
    let url = `${base_url}blogs/get_blog/?blog_id=${id}`
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
        console.log(data)
        if(data['status'] == 'success') {
            e = data.data;
            $('#edit-emp-form').data('id', e.id)
            $('#edit-emp-form').data('name', e.title)
            $('#blog-title2').val(e.title)
            $('#blog-author2').val(e.author)
            $('#blog-stat2').val(e.status)
            $('#blog-cat2').val(e.category.id)
            $('#blog-key2').val(e.keywords)
            let allow = ''
            if(e.allow_comments === true) {allow='true'}
            else if(e.allow_comments === false) {allow='false'}
            $('#blog-allow2').val(allow)
            $('#blog-post2').val(e.post)
            tinymce.get('blog-post2').setContent(p.about)
            sessionStorage.setItem('blog_post', e.post)
            if(e.image) {
                $('#b-img').attr('src', `${base_image_url}${e.image}`)
            }
            else {
                $('#b-img').attr('src', `./static/image/logo.png`)
            }
            if(e.thumbnail) {
                $('#b-thumb').attr('src', `${base_image_url}${e.thumbnail}`)
            }
            else {
                $('#b-thumb').attr('src', `./static/image/logo.png`)
            }
            let frames = document.getElementsByClassName('pro-frames2');
            for(var i=0; i<frames.length; i++) {
                f = e.tags;
                for(var j in f) {
                    if(f[j].id == frames[i].value) {
                        //console.log(`${frames[i].value} matched`)
                        frames[i].setAttribute('checked', 'checked');
                    }
                }
            }
        }
    })
    .catch(err => {
        console.log(err)
    })
}
function readFile(elem, type) {
    let reader = new FileReader();
    let file = elem.files[0];
    reader.onload = function(e) {
        if(type == "image") {
            document.querySelector('#b-img').src = e.target.result;
        }
        if(type == "thumb") {
            document.querySelector('#b-thumb').src = e.target.result;
        }
    }
    reader.readAsDataURL(file);
}

function getBlogComments(id) {
    $('#com_id').val(id)
    let page = $('#com_page').val();
    let per_page = 10;
    let search = $('#com_search').val();
    let sort_by = $('.star-filter').val();
    let url = `${base_url}blogs/get_comments/?blog_id=${id}&page=${page}&per_page=${per_page}&search=${search}&sort_by=${sort_by}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.comm-list').empty()
      if(data['status'] == 'success') {
        let pages = data.total_pages
        $('#blog-comm-title').html(data.blog.title)
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
            $('#com_page').val(page);
            getBlogComments(id);
        })
        if(data.data) {
            let e = data.data;
            for(var i in e) {
                date = `${new Date(e[i].date).toDateString()} ${new Date(e[i].date).toLocaleTimeString()}`;
                let reply = ''
                if(e[i].reply === undefined || (e[i].reply).trim() === '') {
                    reply = `<a href="#" data-toggle="modal" data-target="#replyCommentModal" class="com-rep-link" data-id="${e[i].id}"><i class="fa fa-reply"></i> Reply</a>&nbsp;&nbsp;&nbsp;&nbsp;`
                }
                else {
                    reply = `<a href="#" data-toggle="modal" data-target="#replyCommentModal" class="com-rep-edit" data-id="${e[i].id}">
                    <i class="fa fa-reply"></i> Edit Reply
                    </a>&nbsp;&nbsp;&nbsp;&nbsp;`
                }
                let temp = `<tr>
                <td>
                <div class="w-bold-xx w-text-indigo">${e[i].name}</div>
                <p>
                    ${reply}
                    <a href="#" class="com-del-link" data-id="${e[i].id}"><i class="fa fa-trash"></i> Delete</a>
                </p>
                </td>
                <td>${e[i].comment}</td>
                <td>${date}</td>
              </tr>`;
              $('.comm-list').append(temp)
            }
            $('.com-rep-link').click(function() {
                let id = $(this).data('id');
                getComment(id)
            })
            $('.com-rep-edit').click(function() {
                let id = $(this).data('id');
                getComment(id)
            })
            $('.com-del-link').click(function(e) {
                e.preventDefault();
                let id = $(this).data('id');
                $('.msg-go-btn').data('id', id)
                $('.msg-go-btn').data('name', 'comment')
                $('.message-content').html(`Are you sure you want to delete this comment?<br>This action is permanent`)
                //console.log('done')
                $('.message-con').addClass('active') 
            })
        }
        else {
            let temp = `<tr>
            <td colspan="3">No comments found.</td>
            </tr>`;
            $('.comm-list').append(temp)
        }
      }
      else if(data['status'] == 'error') {
        //$('.emp-no').html('0');
        let temp = `<tr>
            <td colspan="3">${data['message']}</td>
            </tr>`;
            $('.comm-list').append(temp)
      }
    })
    .catch(err => {
        console.log(err)
        let temp = `<tr>
            <td colspan="3">Error occured. <a class="w-text-red" onclick="getBlogComments(id);">click to retry</a></td>
            </tr>`;
            $('.comm-list').append(temp)
    })
}

function editBlog(id) {
    let url = `${base_url}blogs/edit_blog/`;
    //console.log(id)
    let title = $('#blog-title2').val()
    let author = $('#blog-author2').val()
    let stat = $('#blog-stat2').val()
    let cat = $('#blog-cat2').val()
    let key = $('#blog-key2').val()
    let allow = $('#blog-allow2').val()
    let post = $('#blog-post2').val()
    //let post = tinymce.get('blog-post2').getContent({format: 'html'})
    let image = $('.blog-img2')[0].files[0]
    let thumb = $('.blog-thumb2')[0].files[0]
    
    if(title.trim() === '' || author.trim() === '' || cat.trim() === '' || post.trim() === '') {
        swal("OOps", "Title, Author, Post or Category cannot be empty", "warning");
        return;
    }
    const formData = new FormData();
    formData.append('api_token', localStorage.api_key);
    formData.append('blog_id', id)
    formData.append('title', title)
    formData.append('author', author)
    formData.append('category_id', cat)
    formData.append('status', stat)
    formData.append('keywords', key)
    formData.append('allow', allow)
    formData.append('post', post)
    if(image) {
        formData.append('image', image)
    }
    if(thumb) {
        formData.append('thumbnail', thumb)
    }
    $('.pro-frames2:checked').each(function() {
        formData.append('tag_ids', $(this).val())
    })

    $('.emp-edit-btn').html('Saving...').attr('disabled', true)
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
            getBlogDetails(id)
            getBlogs();
        }
        else if(data['status'] == 'error') {
            swal("Error", data.message, 'error')
        }
        $('.emp-edit-btn').html(`<i class="fa fa-check-circle"></i> Save Blog`).attr('disabled', false)
    })
    .catch(err => {
        console.log(err);
        $('.emp-edit-btn').html(`<i class="fa fa-check-circle"></i> Save Blog`).attr('disabled', false)
    })
}

function deleteBlog(id) {
    let url = `${base_url}blogs/delete_blog/`;
    const formData = new FormData();
    formData.append('api_token', localStorage.api_key);
    formData.append('blog_id', id);
    $('.emp-del-btn').html('Deleting...').attr('disabled', true)
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
            $('.emp_det_con').removeClass('active')
            getBlogs();
        }
        else if(data['status'] == 'error') {
            swal("Error", data.message, 'error')
        }
        $('.emp-del-btn').html(`<i class="fa fa-trash"></i> Delete Blog`).attr('disabled', false)
    })
    .catch(err => {
        console.log(err);
        swal("Error", 'Error occured', 'error')
        $('.emp-del-btn').html(`<i class="fa fa-trash"></i> Delete Blog`).attr('disabled', false)
    })
}

function getComment(id) {
    let url = `${base_url}blogs/get_comment/?comment_id=${id}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
        //console.log(data);
        if(data['status'] == 'success') {
            p = data.data
            $('#commenti').val(p.comment)
            $('#reply').val(p.reply)
            $('#comment_id').val(p.id)
        }
        else if(data['status'] == 'error') {
            swal("Error", data.message, 'error')
        }
    })
    .catch(err => {
        console.log(err);
    })
}
function deleteComment(id) {
    let url = `${base_url}blogs/delete_comment/`;
    const formData = new FormData();
    formData.append('api_token', localStorage.api_key);
    formData.append('comment_id', id);
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
            let p_id = data.data.id
            getBlogComments(p_id)
        }
        else if(data['status'] == 'error') {
            swal("Error", data.message, 'error')
        }
    })
    .catch(err => {
        console.log(err);
    })
}

function replyComment(id) {
    let url = `${base_url}blogs/reply_comment/`;
    const formData = new FormData();
    formData.append('api_token', localStorage.api_key);
    formData.append('comment_id', id);
    formData.append('reply', $('#reply').val());
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
            $('#rep-comment-form')[0].reset()
            let p_id = data.data.id
            getBlogComments(p_id)
        }
        else if(data['status'] == 'error') {
            swal("Error", data.message, 'error')
        }
    })
    .catch(err => {
        console.log(err);
    })
}

function initiateTiny() {
    tinymce.init({
        selector: '.html-text',
        setup: function(editor) {
            editor.on('init', function(e) {
                if(sessionStorage.blog_post) {
                    editor.setContent(sessionStorage.blog_post)
                    sessionStorage.removeItem('blog_post')
                }
            })
        },
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

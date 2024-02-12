
var base_url2 = `https://meditechy.pythonanywhere.com/api/v1/`
var admin = [
    // For site API
    {
        title: "Get Site Information",
        value: "get_site_info",
        method: "GET",
        url: `${base_url2}site/get_site_info/`,
        request: `
        const url = "${base_url2}site/get_site_info/"
        
        fetch(url)
        .then(res => {return res.json()})
        .then(data => {console.log(data)})
        .catch(err => {console.log(err)})
        `,
        success_response: `
        {
          "status": "success",
          "message": "data fetched successfully",
          "data": {
              "title": "Meditechy",
              "tagline": "",
              "about": "",
              "logo": null,
              "icon": null,
              "image": null,
              "email": "",
              "phone": "",
              "address": "",
              "github": "",
              "linkedin": "",
              "twitter": "",
              "facebook": "",
              "instagram": ""
          }
        }`,
        error_response: `
        {
          "status": "error",
          "message": "Error while getting site info"
        }`
    },
  /* =========================== Blogs ========================= */
  
  {
    title: "Get Blogs",
    value: "get_blogs",
    method: "GET",
    url: `${base_url2}blogs/get_published_blogs/?page={page_number}&per_page={item_per_page}&sort_by{list_sorting}&search={search_query}&category_id={id_of_filtered_category}`,
    request: `
    const url = '${base_url2}blogs/get_published_blogs/';
    // the following are the available parameters for sorting and filtering (all optional)
    // page: an integer to call a page number (based on item per page and total list retrievable); default = 1
    // per_page: an integer; number of list items to be retrieved at a time; default = 10
    // sort_by: sorting/arrangement list. available sorting are: (default = title)
    //  1. title: arrange by title in ascending order
    //  2. -title: arrange by title in descending order
    //  3. created: arrange by date from old to new
    //  4. -created: arrange by date from new to old
    // search: a string; searches are matched against title, description, post, author and keywords
    // category_id: an integer; id of category if filtering blogs by category
    
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})`,
    success_response: `
    // when a list is found
    {
      "status": "success",
      "data": [
          {
              "id": 1,
              "title": "Will Artificial Intelligence Take Over The World",
              "category": {
                  "id": 1,
                  "title": "Technology"
              },
              "post": "${escapeHtml("<h2>This is abou you</h2>\r\n<p>lfghdf;gfdgd</p>")}",
              "image": "/media/blogs/images/physio.png",
              "thumbnail": "/media/blogs/thumbnails/path.png",
              "allow_comments": true,
              "tags": [
                  {
                      "id": 2,
                      "title": "Artificial Intelligence"
                  },
                  {
                      "id": 1,
                      "title": "technology"
                  }
              ],
              "status": "Published",
              "keywords": "artificial intelligence, robots, technology",
              "description": "ththrthghgfhf",
              "created": "2024-02-12T07:10:17Z",
              "comments": 0
          }
      ],
      "message": "blog list retrieved",
      "page_number": 1,
      "list_per_page": 10,
      "total_pages": 1,
      "total_items": 1,
      "search_query": ""
    }
    
    // when requested list is empty
    {
      "status": "success",
      "message": "no blog found",
      "page_number": 1,
      "list_per_page": 10,
      "total_pages": 1,
      "total_items": 0,
      "search_query": ""
    }`,
    error_response: `
    // error due to
        {
          "status": "error",
          "message": "Error getting blog list"
        }`,
  },
  {
    title: "Get Blog Categories",
    value: "get_blog_categories",
    method: "GET",
    url: `${base_url2}blogs/get_blog_categories/`,
    request: `
    const url = '${base_url2}blogs/get_blog_categories/';
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})`,
    success_response: `
    // when a list is found
    {
      "status": "success",
      "data": [
          {
              "id": 2,
              "title": "Finance"
          },
          {
              "id": 1,
              "title": "Technology"
          }
      ],
      "message": "category list retrieved"
    }
    
    // when requested list is empty
    {
      "status": "success",
      "message": "no category found"
    }`,
    error_response: `
    // error due to
        {
          "status": "error",
          "message": "Error getting category list"
        }`,
  },
  {
    title: "Get Blog Tags",
    value: "get_blog_tags",
    method: "GET",
    url: `${base_url2}blogs/get_blog_tags/`,
    request: `
    const url = '${base_url2}blogs/get_blog_tags/';
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})`,
    success_response: `
    // when a list is found
    {
      "status": "success",
      "data": [
          {
              "id": 2,
              "title": "Artificial Intelligence"
          },
          {
              "id": 1,
              "title": "technology"
          }
      ],
      "message": "tag list retrieved"
    }
    
    // when requested list is empty
    {
      "status": "success",
      "message": "no tag found"
    }`,
    error_response: `
    // error due to
        {
          "status": "error",
          "message": "Error getting tag list"
        }`,
  },
  {
    title: "Get Specific Blog",
    value: "get_single_blog",
    method: "GET",
    url: `${base_url2}blogs/get_blog/?blog_id={id_of_blog}`,
    request: `
    const url = 'blogs/get_blog/?blog_id=1';
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})`,
    success_response: `
    {
      "status": "success",
      "data": {
          "id": 1,
          "title": "Will Artificial Intelligence Take Over The World",
          "author": "Hassan WhizzyDoc",
          "category": {
            "id": 1,
            "title": "Technology"
          },
          "post": "<h2>This is abou you</h2>\r\n<p>lfghdf;gfdgd</p>",
          "image": "/media/blogs/images/physio.png",
          "thumbnail": "/media/blogs/thumbnails/path.png",
          "allow_comments": true,
          "tags": [
              {
                  "id": 2,
                  "title": "Artificial Intelligence"
              },
              {
                  "id": 1,
                  "title": "technology"
              }
          ],
          "status": "Published",
          "keywords": "artificial intelligence, robots, technology",
          "description": "ththrthghgfhf",
          "created": "2024-02-12T07:10:17Z",
          "comments": 0
      },
      "message": "blog details retrieved"
    }`,
    error_response: `
    // error due to
        {
          "status": "error",
          "message": "Invalid blog ID"
        }`,
  },
  {
    title: "Get Blog Comments",
    value: "get_blog_comments",
    method: "GET",
    url: `${base_url2}blogs/get_comments/?blog_id={id_of_blog}page={page_number}&per_page={item_per_page}`,
    request: `
    const url = '${base_url2}blogs/get_comments/?blog_id=1';
    // the following are the available parameters for sorting and filtering (all optional)
    // page: an integer to call a page number (based on item per page and total list retrievable); default = 1
    // per_page: an integer; number of list items to be retrieved at a time; default = 10
    //  1. date: arrange by date from old to new
    //  2. -date: arrange by date from new to old
    
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})`,
    success_response: `
    // when a list is found
    {
      "status": "success",
      "data": [
          {
              "id": 2,
              "name": "Kate Maddy",
              "comment": "This is good. i really enjoy it",
              "reply": "${escapeHtml("<p>ppptrtyryt</p>")}",
              "active": true,
              "date": "2024-02-12T11:29:44Z"
          },
          {
              "id": 1,
              "name": "Peter Parker",
              "comment": "This is very informative and educative. kudos to the author",
              "reply": "",
              "active": true,
              "date": "2024-02-12T11:29:04Z"
          }
      ],
      "message": "comment list retrieved",
      "page_number": 1,
      "list_per_page": 10,
      "total_pages": 1,
      "total_items": 2,
      "search_query": ""
    }
    
    // when requested list is empty
    {
      "status": "success",
      "message": "no comment found",
      "page_number": 1,
      "list_per_page": 10,
      "total_pages": 1,
      "total_items": 0,
      "search_query": ""
    }`,
    error_response: `
    // error due to
        {
          "status": "error",
          "message": "Error getting comment list"
        }`,
  },
  /*
  {
    title: "Get Specific Project",
    value: "get_project",
    method: "GET",
    url: `${base_url2}projects/get_project/?project_id={id_of_project}&api_token={api_key}`,
    request: `
    const url = '${base_url2}projects/get_project/?project_id={id_of_project}&api_token={api_key}';
    
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})`,
    success_response: `{
      "status": "success",
      "data": {
          "id": 1,
          "title": "Rigan API",
          "category": {
              "id": 3,
              "title": "API"
          },
          "database": {
              "id": 3,
              "title": "MongoDB"
          },
          "frameworks": [
              {
                  "id": 1,
                  "title": "Django"
              },
              {
                  "id": 2,
                  "title": "Restful API"
              },
              {
                  "id": 8,
                  "title": "Vanilla JS"
              }
          ],
          "description": "<p>An API Hub</p>",
          "image": null,
          "short_description": "A Platform that provides various API integrations",
          "live_url": "https://riganapi.pythonanywhere.com/",
          "github_url": "https://github.com/riganapi",
          "views": 2,
          "created": "2023-12-18T07:12:47Z"
      },
      "message": "project details retrieved"
  }`,
    error_response: `
    // error due to
        {
          "status": "error",
          "message": "Invalid project ID or API Token"
        }`,
  },
  {
    title: "Get Project Comments",
    value: "get_project_comments",
    method: "GET",
    url: `${base_url2}comments/get_comments/?project_id={id_of_project}&api_token={api_key}`,
    request: `
    const url = '${base_url2}comments/get_comments/?project_id={id_of_project}&api_token={api_key}';
    
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})`,
    success_response: `
    {
      "status": "success",
      "project": {
          "id": 1,
          "title": "Rigan API",
          "category": {
              "id": 3,
              "title": "API"
          },
          "database": {
              "id": 3,
              "title": "MongoDB"
          },
          "frameworks": [
              {
                  "id": 1,
                  "title": "Django"
              },
              {
                  "id": 2,
                  "title": "Restful API"
              },
              {
                  "id": 8,
                  "title": "Vanilla JS"
              }
          ],
          "description": "<p>An API Hub</p>",
          "image": null,
          "short_description": "A Platform that provides various API integrations",
          "live_url": "https://riganapi.pythonanywhere.com/",
          "github_url": "https://github.com/riganapi",
          "views": 4,
          "created": "2023-12-18T07:12:47Z"
      },
      "data": [
          {
              "id": 2,
              "name": "Jane Doe",
              "email": "johndoe@gmail.com",
              "comment": "dsfdgfgfg g dgdfhfdfhdfhdh",
              "reply": "We dont understand",
              "star": 4,
              "active": true,
              "date": "2023-12-21T20:12:18Z"
          },
          {
              "id": 1,
              "name": "Peter Parker",
              "email": "peterparker@gmail.com",
              "comment": "This is an awesome project, i've used the server functionalities for my portfolio site. kudos",
              "reply": "Thank you",
              "star": 5,
              "active": true,
              "date": "2023-12-18T07:14:52Z"
          }
      ],
      "message": "comment list retrieved",
      "page_number": 1,
      "list_per_page": 10,
      "total_pages": 1,
      "total_items": 2,
      "search_query": ""
  }`,
    error_response: `
    // error due to
        {
          "status": "error",
          "message": "Invalid project ID or API Token"
        }`,
  },
  {
    title: "Add Comment",
    value: "add_comment",
    method: "POST",
    url: `${base_url2}comments/add_comment/`,
    request: `
    const url = '${base_url2}comments/add_comment/';
    const formData = new FormData();
    formData.append('api_token', your-api-key)
    formData.append('project_id', id-of-project-to-be-commented) // integer
    formData.append('name', 'John')
    formData.append('email', 'john@gmail.com')
    formData.append('comment', 'user-comment')
    formData.append('star', 4) // integer value for project rating (default is 5)
    
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    })
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})`,
    success_response: `
    {
      "status": "success",
      "message": "comment added sucessfully",
      "data": {
        "id": 7,
        "name": "John",
        "email": "john@gmail.com",
        "comment": "user-comment",
        "reply": "",
        "star": 4,
        "active": true,
        "date": "2023-12-21T20:12:18Z"
      }
    }`,
    error_response: `
    // error due to
        {
          "status": "error",
          "message": "Invalid project ID or API Token"
        }`,
  },
  */
  /* =========================== Messages ========================= 
  {
    title: "Send Message",
    value: "send_message",
    method: "POST",
    url: `${base_url2}messages/add_message/`,
    request: `
    const url = '${base_url2}messages/add_message/';
    const formData = new FormData();
    formData.append('api_token', your-api-key)
    formData.append('name', 'John')
    formData.append('email', 'john@gmail.com')
    formData.append('message', 'user-message')
    
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    })
    .then(res => {return res.json()})
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})`,
    success_response: `
    {
      "status": "success",
      "message": "message sent sucessfully"
    }`,
    error_response: `
    // error due to
        {
          "status": "error",
          "message": "error sending message"
        }`,
  },
  // template
  {
    title: "Admin Resume URL",
    value: "",
    method: "",
    url: `https://riganapi.pythonanywhere.com/resume/{admin_username}/`,
    request: ``,
    success_response: ``,
    error_response: ``,
  },
  */
]



function loadApi() {
  var x = admin
  $('.api-main').empty();
  for (var i in x) {
      var temp = `
      <section id="${x[i].value}" class="w-card w-padding">
          <h3 class="w-bold-xx mt-3">${x[i].title}</h3>
          <div class="table-responsive">
            <table class="table">
              <tbody>
                <tr>
                  <td>Method</td>
                  <td>${x[i].method}</td>
                </tr>
                <tr>
                  <td>URL</td>
                  <td>${x[i].url}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <section>
              <div class="code-header">
                  <div>Request</div>
                  <select class="lang-sel">
                      <option selected value="axios">Fetch</option>
                  </select>
              </div>
<pre aria-hidden="true">
<code class="language-javascript highlighting-content axios">
${x[i].request}
</code>
</pre>
</section>

<section>
<div class="code-header">
  <div>Response</div>
  <select class="res-sel">
    <option selected value="success">success</option>
    <option value="error">error</option>
  </select>
</div>            
<pre aria-hidden="true">
<code class="language-javascript highlighting-content success">
${x[i].success_response}
</code>
<code class="language-javascript highlighting-content error">
${x[i].error_response}
</code>
</pre>
</section>

</section>
      `;
      $('.api-main').append(temp);
  }
  $('.res-sel').on('change', function() {
    $(this).parent('.code-header').siblings('pre').children('code').hide();
    var val = $(this).val();
    val = '.' + val;
    //alert(val)
    $(this).parent('.code-header').siblings('pre').children(val).show();
})
$('.lang-sel').on('change', function() {
  $(this).parent('.code-header').siblings('pre').children('code').hide();
  var val = $(this).val();
  val = '.' + val;
  //alert(val)
  $(this).parent('.code-header').siblings('pre').children(val).show();
})
}

loadApi();
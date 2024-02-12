//const base_image_url = `http://127.0.0.1:8000`;
const base_image_url = `https://meditechyafrica.pythonanywhere.com`;
const base_url = `${base_image_url}/api/v1/`;

$(document).ready(function() {
    if(!localStorage.site_name) {
      let url = `${base_url}site/get_site_info/`;
      fetch(url)
      .then(res => {return res.json()})
      .then(data => {
        console.log(data);
        if(data['status'] == 'success') {
          let t = data.data;
          localStorage.setItem('site_name', t.title)
          $('.site-title').html(t.title)
          $('title').html(t.title)
        }
      })
      .catch(err => {console.log(err)})
    }
    else {
      $('title').html(localStorage.site_name)
    }
})

/* Navigation bar */
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
//localStorage.removeItem('api_key')
function openNav() {
    $(".sidenav").toggleClass('active');
    $("main").toggleClass('active');
  }


function showDP() {
  if(localStorage.dp) {
    //console.log(localStorage.dp)
    $('.admin-img').attr('src', `${base_image_url}${localStorage.dp}`)
  }
}
showDP();

function escapeHtml(text) {
  var escapedText = $('<code>').text(text).html();
  return escapedText.replace(/\n/g, '&lt;br&gt;')
}
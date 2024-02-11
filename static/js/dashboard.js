// For Admin
function getNewNotes() {
    let url = `${base_url}notifications/get_new_notifications/?api_token=${localStorage.api_key}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.dash-task').empty()
      if(data['status'] == 'success') {
        if(data.data) {
            let t = data.data;
            for(var i in t) {
                let date = new Date(t[i].date).toLocaleString();
                let temp = `<tr>
                <td><b>${t[i].note}</b></td>
                <td>${date}</td>
                <td><a href="#" class="note-del" data-id="${t[i].id}">Delete</a></td>
              </tr>`;
              $('.dash-task').append(temp)
            }
        }
        else {
            let temp = `<tr>
            <td colspan="3">${data['message']}</td>
            </tr>`;
            $('.dash-task').append(temp)
        }
      }
      else if(data['status'] == 'error') {
        let temp = `<tr>
            <td colspan="3">${data['message']}</td>
            </tr>`;
            $('.dash-task').append(temp)
      }
    })
    .catch(err => {console.log(err)})
  }

  function getTotalPro() {
    let url = `${base_url}projects/get_projects/?api_token=${localStorage.api_key}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      if(data['status'] == 'success') {
        $('.pro_no').html(data['total_items'])
        
      }
      else if(data['status'] == 'error') {
        $('.dept_no').html('0')
      }
      drawViewChart(data)
    })
    .catch(err => {console.log(err)})
  }

  function getPendMess() {
    let url = `${base_url}messages/get_messages/?api_token=${localStorage.api_key}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      if(data['status'] == 'success') {
        $('.mess_no').html(data['pending_messages'])
      }
      else if(data['status'] == 'error') {
        $('.mess_no').html('0')
      }
      drawPendChart(data['pending_messages'], data['total_items'])
    })
    .catch(err => {console.log(err)})
  }
  getTotalPro()
  getPendMess()
  getNewNotes()
  //getTotalUsers()

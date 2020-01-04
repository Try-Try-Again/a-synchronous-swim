setInterval(() => {$.ajax({
  type: 'GET',
  data: false,
  url: 'http://127.0.0.1:3000',
  cache: false,
  contentType: false,
  processData: false,
  success: (result) => {
    console.log(result);
    SwimTeam.move(result);
  }
})}, 500);
//setInterval(() => {console.log('REEEEEE')}, 500);
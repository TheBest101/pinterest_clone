$('document').ready(() => {
  $('#submit').on('click', () => {
    var title = $('#title').val()
    var link = $('#link').val()
    ajaxFunctions.ajaxRequest('GET', `${appUrl}/api/createLink?title=${title}&link=${link}`, docs => {

    })
  })
})

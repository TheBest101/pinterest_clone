$('document').ready(() => {
  ajaxFunctions.ajaxRequest('GET', appUrl + '/api/getUserLinks', docs => {
    docs = JSON.parse(docs)
    docs.forEach((item) => {
      var html = `<div class="grid-item">
                    <img src="${item.link}"/>
                    <h4>${item.title}</h4>
                    <button class="btn btn-danger" id="${item.title}">Delete</button>
                  </div>`
      $('#article').append(html)
    })
    var $grid = $('#article').masonry({
      itemSelector: '.grid-item',
      columnWidth: 160
    });
    $grid.imagesLoaded().progress( function() {
      $grid.masonry('layout');
    });
    setTimeout(function(){ $('img').each(function(){
        var height = $(this).height();
        console.log(height)
        if(height === 25) {
            $(this).attr('src', '/public/img/error.png');
        }
    }); }, 5000);
    $('button').on('click', (e) => {
      ajaxFunctions.ajaxRequest('GET', `${appUrl}/api/deleteLink?title=${e.target.id}`, docs => {})
    })
  })

})

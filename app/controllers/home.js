$('document').ready(() => {
  ajaxFunctions.ajaxRequest('GET', appUrl + '/api/getLinks', docs => {
    docs = JSON.parse(docs)
    docs.forEach((item) => {
      var html = `<div class="grid-item">
                    <img src="${item.link}"/>
                    <h4>${item.title}</h4>
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
  })
})

let bg = $('.bg-background'),
  p = $('#picked'),
  book = $('#book'),
  crayons = $('#crayons'),
  colors = [
    '#FFFF00',
    '#ffa500',
    '#ff0000',
    '#ff1493',
    '#00FF00',
    '#0000ff',
    '#ba55d3',
    '#8b4513',
    '#ffffff',
    '#000000'
  ];

(function($) {
  crayons.on('click', 'a', function(e) {
    e.preventDefault();
    let elem = $(this);
    if(!elem.hasClass('active')) {
      crayons.find('.active').removeClass('active');
      elem.addClass('active');
    }
  });

  $('#book').on('click', '.fillable', function(e) {
    let elem = $(this),
        p = crayons.find('.active');
    elem.attr('fill', p.data('color'));
  });

  // init
  let goPage = function(p) {
    bg.removeClass('blur');
    $('.cb-container').addClass('loading');
    $('body').removeClass('coloring');

    setTimeout(function() {
      bg.addClass('blur');
      $(p).removeClass('loading');

      if(p === '#coloringbook') {
        $('body').addClass('coloring');
      }
    }, 150);
  };

  $('#select_design').on('click', '.select-design', function(e) {
    e.preventDefault();
    let sd = $(this),
        d = $(sd.attr('href'));
    book.html('');
    d.clone().appendTo(book);
    goPage('#coloringbook');
  });

  $('.select-new-design').on('click', function(e) {
    e.preventDefault();
    goPage('#menu');
    setTimeout(function() {
      book.html('');
    }, 200);
  });

  // first load
  setTimeout(function() {
    let sd = $('#select_design'),
        ph = $('#pen-holder');
    $('body').removeClass('not-ready');

    for(i=0; i < colors.length; i++) {
      let pen = ph.find('.pen-wrapper').clone();
      pen.attr('data-color', colors[i]);
      pen.find('.color').attr('fill', colors[i]);
      pen.appendTo(crayons);
    }

    crayons.find('.pen-wrapper:last-child').addClass('active');

    $('#designs .book').each(function() {
      let b = $(this);
      sd.append('<div class="col-md-6 col-lg-4"><a href="#'+ b.attr('id') +'" class="select-design">'+b.html()+'<br>'+ b.data('title') +'</a></div>');
    });

    goPage('#menu');
  }, 200);
})(jQuery);

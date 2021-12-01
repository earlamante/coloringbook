let colorpicked = '#f00',
  p = $('#picked'),
  book = $('#book'),
  crayons = $('#crayons'),
  bookW = book.outerWidth(),
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
    colorpicked = elem.data('color');
    p.css('backgroundColor', colorpicked);
    p.data('color', colorpicked);
  });

  $('.book').on('click', '.fillable', function(e) {
    let elem = $(this);
    elem.attr('fill', p.data('color'));
  });

  $('.nextCB').on('click', function(e) {
    e.preventDefault();
    nextCB();
  });

  $('.prevCB').on('click', function(e) {
    e.preventDefault();
    prevCB();
  });

  // init
  let c = 0,
    d = $('<div></div>');

  let initCB = function() {
    book.find('.book').each(function(e) {
      let elem = $(this);
      c++;
      elem.appendTo(d);
    });

    d.css({
      width: bookW*c+'px',
      height: bookW+'px',
      transition: 'all 300ms ease-in-out'
    });
    d.data('active', 0);
    d.appendTo(book);

    for(i=0; i < colors.length; i++) {
      crayons.append('<a href="#" data-color="'+ colors[i] +'" style="background: '+ colors[i] +';"></a>');
    }

    book.show();
  };

  let nextCB = function() {
    let a = parseInt(d.data('active'));
    a++;
    if(a === d.find('.book').length) {
      a = 0;
    }
    goCD(a);
  };

  let prevCB = function() {
    let a = parseInt(d.data('active'));
    a--;
    if(a < 0) {
      a = d.find('.book').length - 1;
    }
    goCD(a);
  };

  let goCD = function(p) {
    d.data('active', p);
    d.css('transform', 'translateX(-'+ p*bookW +'px)');
    $('h3').text('Design ' + (parseInt(p)+1));
  };

  initCB();
})(jQuery);

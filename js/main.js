let colorpicked = '#f00',
  p = $('#picked');

(function($) {

  $('#crayons').on('click', 'a', function(e) {
    e.preventDefault();
    let elem = $(this);
    colorpicked = elem.data('color');
    p.css('backgroundColor', colorpicked);
    p.data('color', colorpicked);
  });

  $('#book').on('click', 'svg > *', function(e) {
    let elem = $(this);
    elem.attr('fill', p.data('color'));
  });
})(jQuery);

//After loading
$(window).on('load', function(){
  $('#name').focus();
  $('#other').hide();
  $('#color').hide();
  $('#payment option').eq(1).attr('selected');
  $('p').hide();
})

//Hide and show "Other Job Role input"
$('#title').on('change',function(){
  if ($('#title :selected').text() !== 'Other'){
    $('#other').hide();
    console.log(1)
  } else {
    $('#other').show();
    console.log(2);
  }
})

//Hide and show color drop-down
$('#design').change(function(){
  if ($('#design:selected').text() !== 'Select Theme') {
    $('#color').show();
  }else {
    $('#color').hide();
  }
})

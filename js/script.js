//After loading
$(window).on('load', function(){
  $('#name').focus();
  $('#other').hide();
  $('#color').hide();
  $('#payment option').eq(1).attr('selected', true);
  $('#credit-card ~ div').hide();
})

//Hide and show "Other Job Role input"
$('#title').on('change',function(){
  if ($('#title :selected').text() !== 'Other'){
    $('#other').hide();
  } else {
    $('#other').show();
  }
})

//Hide and show color drop-down
$('#design').on('change', function(){
  if ($('#design :selected').text() !== 'Select Theme') {
    $('#color').show();
    if ($('#design :selected').val() === 'js puns') {
      $('#color option').each(function() {
        $(this).show()
      });
      $('#color option').eq(3).attr('selected', false);
      $('#color option').eq(0).attr('selected', true);
      $('#color option').eq(3).hide();
      $('#color option').eq(4).hide();
      $('#color option').eq(5).hide();
    } else if ($('#design :selected').val() === 'heart js') {
      $('#color option').each(function() {
        $(this).show()
      });
      $('#color option').eq(0).attr('selected', false);
      $('#color option').eq(3).attr('selected', true);
      $('#color option').eq(0).hide();
      $('#color option').eq(1).hide();
      $('#color option').eq(2).hide();
    }
  }else {
    $('#color').hide();
  }
})
//----------------------------------------------------------------
function hideConflictActivities (selectedCourse, conflictCourse) {
  if ($(event.target).attr('name') === selectedCourse) {
    $(`[name=${conflictCourse}]`).attr('disabled', true);
    $(`[name=${conflictCourse}]`).parent().addClass('disabled')
  }
}
function showConflictActivities (selectedCourse, conflictCourse) {
  if ($(event.target).attr('name') === selectedCourse) {
    $(`[name=${conflictCourse}]`).attr('disabled', false);
    $(`[name=${conflictCourse}]`).parent().removeClass('disabled')
  }
}
//--------------------------------------------------------------------
let totalCost = 0;
const $showCost = $('<p></p>');
function additionAndSubtraction (sign) {
  if ($(event.target).attr('name') === 'all') {
    totalCost = totalCost + sign*200;
  } else {
    totalCost = totalCost + sign*100;
  }
}
function hideAndShowInfor (type, index1, index2, index3) {
  if ($(event.target).val() === type ) {
    $('.information > div').show()
    $('.information > div').eq(index1).show()
    $('.information > div').eq(index2).hide()
    $('.information > div').eq(index3).hide()
  }
}
$('.activities').on('change', function(event){
  if  ($(event.target).prop('checked')) {
    hideConflictActivities ("js-frameworks", "express")
    hideConflictActivities ("express", "js-frameworks")
    hideConflictActivities ("js-libs", "node")
    hideConflictActivities ("node", "js-libs")
    additionAndSubtraction(1)
  } else {
    showConflictActivities ("js-frameworks", "express")
    showConflictActivities ("express", "js-frameworks")
    showConflictActivities ("js-libs", "node")
    showConflictActivities ("node", "js-libs")
    additionAndSubtraction(-1)
  }
  if (totalCost !== 0) {
    $showCost.text('Total: $' + totalCost);
    $('.activities').append($showCost);
    $('.activities p').show()
  } else {
    $('.activities p').hide()
  }
})
$('fieldset').eq(3).addClass('information');
$('#payment').on('change', function(event) {
  hideAndShowInfor ("credit card", 0, 1, 2);
  hideAndShowInfor ("paypal", 1, 0, 2);
  hideAndShowInfor ("bitcoin", 2, 0, 1);
})
//----------------------------------------------------------------------



function checkEmptyInput (input) {
  return input !== ""
}
function checkValidEmail(email) {
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}
function checkActivities (checked) {
  return checked !== 0;
}
function checkCardInforIsANumber (cardInfor) {
  return !isNaN(cardInfor)
}
function checkCardNum (cardNum) {
  return /^[0-9]{13,16}$/.test(cardNum)
}
function checkZip (cardZip) {
  return /$[0-9]{5}^/.test(cardZip)
}
function checkCvv (cardCvv) {
  return /$[0-9]{3}^/.test(cardCvv)
}

// $("[type='text'], [type='email']").on('focusout', function(e){
//   const $input = $(event.target).val()
//   if (checkEmptyInput($input)) {
//
//   }else
// })
//
// $('#mail').on('keyup', function(e){
//   const $email = $(event.target).val()
//   if (checkValidEmail($email)) {
//
//   }else {
//
//   }
// })
//
// $('.credit-card input').on('keyup', function(e){
//   const $cardInfor = $(event.target).val()
//   if (checkCardInforIsANumber ($cardInfor)) {
//
//   }else {
//
//   }
// })
//
// $('#cc-num').on('keyup', function(e){
//   const $cardNum = $(event.target).val()
//   if (checkCardNum($cardNum)) {
//
//   }else {
//
//   }
// })
//
// $('#zip').on('keyup', function(e){
//   const $zip = $(event.target).val()
//   if (checkZip($zip) {
//
//   }else {
//
//   }
// })
//
// $('#cvv').on('keyup', function(e){
//   const $cvv = $(event.target).val()
//   if (checkCvv($cvv)) {
//
//   }else {
//
//   }
// })

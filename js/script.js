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
  return checked > 0;
}
function checkCardInforIsANumber (cardInfor) {
  return !isNaN(cardInfor)
}
function checkCardNum (cardNum) {
  return /^[0-9]{13,16}$/.test(cardNum)
}
function checkZip (cardZip) {
  return /^[0-9]{5}$/.test(cardZip)
}
function checkCvv (cardCvv) {
  return /^[0-9]{3}$/.test(cardCvv)
}
//---------------------------------------------
const $emptyMessage = $('<p></p>');
$emptyMessage.html('This feild may not be blank')

const $emailFormatMessage = $('<p></p>');
$emailFormatMessage.html('Please enter correct fommated emaiL. For example: <strong>dave@teamtreehouse.com</strong>.')

const $NaNMessage =$('<p></p>');
$NaNMessage.html('This feild accpect number only')

const $cardNumMessage = $('<p></p>');
$cardNumMessage.html('A 13 to 16-digit credit card number')

const $zipMessage = $('<p></p>');
$zipMessage.html('A 5-digit zip code')

const $cvvMessage = $('<p></p>');
$cvvMessage.html('3-number CVV value.')

$("[type='text'], [type='email']").on('focusout', function(e){
  // $('span').hide()
  const $input = $(event.target).val()
  $emptyMessage.insertAfter(event.target)
  if (checkEmptyInput($input)) {
    $emptyMessage.hide()
  }else{
    $('span').hide()
    $emptyMessage.show()
  }
})


$('#mail').on('keyup', function(e){
  const $email = $(event.target).val()
  $emailFormatMessage.insertAfter(event.target)
  if (checkValidEmail($email)) {
    $emailFormatMessage.hide()
  }else {
    $('p').hide()
    $emailFormatMessage.show()
  }
})


$('#cc-num').on('keyup', function(e){
  const $cardInfor = $(event.target).val()
  $NaNMessage.insertAfter(event.target)
  if (checkCardInforIsANumber ($cardInfor)) {
    $NaNMessage.hide()
    const $cardNum = $(event.target).val()
    $cardNumMessage.insertAfter(event.target)
    if (checkCardNum($cardNum)) {
      $cardNumMessage.hide()
    }else {
      $('p').hide()
      $cardNumMessage.show()
    }
  }else {
    $('p').hide()
    $NaNMessage.show()
  }
})

$('#zip').on('keyup', function(e){
  const $cardInfor = $(event.target).val()
  $NaNMessage.insertAfter(event.target)
  if (checkCardInforIsANumber ($cardInfor)) {
    $NaNMessage.hide()
    const $zip = $(event.target).val()
    $zipMessage.insertAfter(event.target)
    if (checkZip($zip)) {
      $zipMessage.hide()
    }else {
      $('p').hide()
      $zipMessage.show()
    }
  }else {
    $('p').hide()
    $NaNMessage.show()
  }
})

$('#cvv').on('keyup', function(e){
  const $cardInfor = $(event.target).val()
  $NaNMessage.insertAfter(event.target)
  if (checkCardInforIsANumber ($cardInfor)) {
    $NaNMessage.hide()
    const $cvv = $(event.target).val()
    $cvvMessage.insertAfter(event.target)
    if (checkCvv($cvv)) {
      $cvvMessage.hide()
    }else {
      $('p').hide()
      $cvvMessage.show()
    }
  }else {
    $('p').hide()
    $NaNMessage.show()
  }
})

// $("[type='text'], [type='email']").trigger('focusout')
// $('button').on('click', function() {
//   if ()
// })

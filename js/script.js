
/* INITIAL FORM SETTING-------------------------------------------------------------------------------
*/
let totalCost = 0;
const $showCost = $('<span></span>');
$('fieldset').eq(3).addClass('information'); // Add class to fieldset of payment method

    //After loading
    $(window).on('load', function(){
      $('#name').focus();  // Automatically put crusor on Name field
      $('#other').hide();  // Hide other-job input field
      $('#color').hide();  // Hide color drop-down
      $('#color').prev().hide(); // Hide "Color" label
      $('#payment option').eq(0).hide() // Hide "Select payment method" option
      $('#payment option').eq(1).attr('selected', true);  //Pre-select creadit-card payment method
      $('#credit-card ~ div').hide();  // Hide other payment method
    })
    //Hide and show "Other Job Role input"
    $('#title').on('change',function(){
      if ($('#title :selected').text() !== 'Other'){
        $('#other').hide();
      } else {
        $('#other').show();
      }
    })
    //Hide and show diffrent color shirt based one theme
    $('#design').on('change', function(){
      if ($('#design :selected').text() !== 'Select Theme') {
        $('#design option').eq(0).hide() // Hide "Select Theme" option
        $('#color').show(); // Show color drop-down
        $('#color').prev().show(); // Show "Color" label
        if ($('#design :selected').val() === 'js puns') {
          $('#color option').show()  //Show all option
          $('#color option').eq(3).attr('selected', false);
          $('#color option').eq(0).attr('selected', true);
          $('#color option').eq(3).hide();
          $('#color option').eq(4).hide();
          $('#color option').eq(5).hide();
        } else if ($('#design :selected').val() === 'heart js') {
          $('#color option').show()  //Show all option
          $('#color option').eq(0).attr('selected', false);
          $('#color option').eq(3).attr('selected', true);
          $('#color option').eq(0).hide();
          $('#color option').eq(1).hide();
          $('#color option').eq(2).hide();
        }
      }
    })


/* FUNCTIONS DECLERATIONS-------------------------------------------------------------------------------
*/
    // Hide conflicting course when another checked
    function hideConflictActivities (selectedCourse, conflictCourse) {
      if ($(event.target).attr('name') === selectedCourse) {
        $(`[name=${conflictCourse}]`).attr('disabled', true); // Disable checkox
        $(`[name=${conflictCourse}]`).parent().addClass('is-hidden') // Grey-out label
      }
    }
    // Show conflicting course when another checked
    function showConflictActivities (selectedCourse, conflictCourse) {
      if ($(event.target).attr('name') === selectedCourse) {
        $(`[name=${conflictCourse}]`).attr('disabled', false); // Enable checkbox
        $(`[name=${conflictCourse}]`).parent().removeClass('is-hidden') // Normal label
      }
    }
    // Add and subtract total cost
    function additionAndSubtraction (sign) {
      if ($(event.target).attr('name') === 'all') {
        totalCost = totalCost + sign*200;   // sign == +1
      } else {
        totalCost = totalCost + sign*100;  // sign = -1
      }
    }
    /*---------------------------------------------------------------*/

    // Hide different payment's method  information
    function hideAndShowInfor (type, index1, index2, index3) {
      if ($(event.target).val() === type ) {
        $('.information > div').show()   // Show all payment's methods information
        $('.information > div').eq(index1).show()
        $('.information > div').eq(index2).hide()
        $('.information > div').eq(index3).hide()
      }
    }
    /*---------------------------------------------------------------*/

    // Create error messsage and append it to HTML
    function createErrorMessageElement (variable, message, insertAfterElement, classes) {
      variable = $('<p></p>');
      variable.html(message)
      variable.addClass(classes)
      variable.css('color', '#FF4F00')
      variable.insertAfter(insertAfterElement);
    }
    /*---------------------------------------------------------------*/

    // Show and hide error message (empty-feild and invalid-email error)
    function showAndHideErrorMessage(checkMode, idSelector, erorClassSelector) {
      const element = $(idSelector).val()
      if (checkMode === 'checkEmptyInput' ) {
        if (checkEmptyInput (element)) {
          $(erorClassSelector).hide()  // Hide erroe message
          $(idSelector).removeClass('redBorder') //Hide red border
        }else {
          $('.error').hide() // Hide all error message
          $(erorClassSelector).show() //Show erroe message
          $(idSelector).addClass('redBorder') //Show red border
        }
      }else if (checkMode === 'checkValidEmail') {
        if (checkValidEmail (element)) {
          $(erorClassSelector).hide()  // Hide erroe message
          $(idSelector).removeClass('redBorder') //Hide red border
        }else {
          $('.error').hide() // Hide all error message
          $(erorClassSelector).show()  //Show error message
          $(idSelector).addClass('redBorder')  //Show red border
        }
      }
    }
    // Show and hide error message (different types of error's message for each Creadir card fields)
    function nestedShowAndHideErrorMessage(checkMode, idSelector, erorClassSelector1, erorClassSelector2) {
      const $cardInfor = $(idSelector).val()
      if (checkCardInforIsANumber($cardInfor)) { // Check NaN
        $(erorClassSelector1).hide()
        $(idSelector).removeClass('redBorder')
        //-----------------------------------
        if (checkMode === 'checkCardNum') {  // Check for Card Number field
          const $cardNum = $(idSelector).val()
          if (checkCardNum($cardNum)) {
            $(erorClassSelector2).hide()
            $(idSelector).removeClass('redBorder')
          }else {
            $('.error').hide()  // Hide all error message
            $(erorClassSelector2).show()
            $(idSelector).addClass('redBorder')
          }
        }else if (checkMode === 'checkZip') {  // Check for Zip field
          const $cardZip = $(idSelector).val()
          if (checkZip($cardZip)) {
            $(erorClassSelector2).hide()
            $(idSelector).removeClass('redBorder')
          }else {
            $('.error').hide()  // Hide all error message
            $(erorClassSelector2).show()
            $(idSelector).addClass('redBorder')
          }
        }else if (checkMode === 'checkCvv') { // Check for CVV field
          const $cardCvv = $(idSelector).val()
          if (checkCvv($cardCvv)) {
            $(erorClassSelector2).hide()
            $(idSelector).removeClass('redBorder')
          }else {
            $('.error').hide()  // Hide all error message
            $(erorClassSelector2).show()
            $(idSelector).addClass('redBorder')
          }
        }
        //-----------------------------------
      }else {
        $('.error').hide() // Hide all error message
        $(erorClassSelector1).show()
        $(idSelector).addClass('redBorder')
      }
    }
    /*---------------------------------------------------------------*/

    // Check empty field
    function checkEmptyInput (input) {
      return input !== ""
    }
    // Check email format
    function checkValidEmail(email) {
      return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);}
    //  Check checked course
    function checkActivities (checked) {
      return checked > 0;
    }
    // Check creadit-card information is number or not
    function checkCardInforIsANumber (cardInfor) {
      return !isNaN(cardInfor)
    }
    // Check Card Number format
    function checkCardNum (cardNum) {
      return /^[0-9]{13,16}$/.test(cardNum)
    }
    // Check Zip format
    function checkZip (cardZip) {
      return /^[0-9]{5}$/.test(cardZip)
    }
    // Check CVV format
    function checkCvv (cardCvv) {
      return /^[0-9]{3}$/.test(cardCvv)
    }
    /*---------------------------------------------------------------*/

    // Check error of Name, Email and Activity when submit
    function submitName_Email_Act_Error () {
      if (checkEmptyInput ($('#name').val()) === false) {
        $('.emptyName').show()
        $('#name').addClass('redBorder')
      }
      if (checkEmptyInput ($('#mail').val()) === false) {
        $('.emptyEmail').show()
        $('#mail').addClass('redBorder')
      }else {
        if (checkValidEmail($('#mail').val()) === false) {
          $('.emailFormat').show()
          $('#mail').addClass('redBorder')
        }
      }
      if (checkActivities ($('.activities :checked').length) === false) {
        $('.checkedAct').show()
      }
    }
    // Check error of creadit card information when submit
    function submitCardError (checkMode, idSelector, erorClassSelector1, erorClassSelector2, erorClassSelector3){
      if (checkEmptyInput ($(idSelector).val()) === false) {
        $( erorClassSelector1).show()
        $(idSelector).addClass('redBorder')
      }else {
        if (checkCardInforIsANumber ($(idSelector).val()) === false) {
          $( erorClassSelector2).show()
          $(idSelector).addClass('redBorder')
        }else {
          if (checkMode === 'checkCardNum') { // Check for Card Number field
            if (checkCardNum ($(idSelector).val()) === false) {
              $( erorClassSelector3).show()
              $(idSelector).addClass('redBorder')
            }
          }else if (checkMode === 'checkZip') { // Check for Zip field
            if (checkZip ($(idSelector).val()) === false) {
              $( erorClassSelector3).show()
              $(idSelector).addClass('redBorder')
            }
          }else if (checkMode === 'checkCvv') { // Check for CVV field
            if (checkCvv ($(idSelector).val()) === false) {
              $( erorClassSelector3).show()
              $(idSelector).addClass('redBorder')
            }
          }
        }
      }
    }
    /*---------------------------------------------------------------*/

/* FUNCTION CALL---------------------------------------------------------------------------------------
*/
    createErrorMessageElement('$emptyName',
                              "Please enter your name",
                              $('#name'),
                              "emptyName error")
    createErrorMessageElement("$emptyEmail",
                              "Please enter your email",
                              $('#mail'),
                              "emptyEmail error")
    createErrorMessageElement("$emptyCardNum",
                              "Please enter your credit card number",
                              $('#cc-num'),
                              "emptyCardNum error")
    createErrorMessageElement("$emptyZip",
                              "Please enter ZIP number",
                              $('#zip'),
                              "emptyZip error")
    createErrorMessageElement("$emptyCvv",
                              "Please enter CVV value",
                              $('#cvv'),
                              "emptyCvv error")
    createErrorMessageElement("$emailFormat",
                              "Please enter correct fommated emaiL. For example: <strong>dave@teamtreehouse.com</strong>",
                              $('#mail'),
                              "emailFormat error")
    createErrorMessageElement("$checkedAct",
                              "Please select at least 1 course",
                              $('.activities'),
                              "checkedAct error")
    createErrorMessageElement("$NaNCardNum",
                              "Please enter number only",
                              $('#cc-num'),
                              "NaNCardNum error")
    createErrorMessageElement("$NaNZip",
                              "Please enter number only",
                              $('#zip'),
                              "NaNZip error")
    createErrorMessageElement("$NaNCvv",
                              "Please enter number only",
                              $('#cvv'),
                              "NaNCvv error")
    createErrorMessageElement("$incorrectCardNum",
                              "Card number must be a 13 to 16-digit number",
                              $('#cc-num'),
                              "incorrectCardNum error")
    createErrorMessageElement("$incorrectZip",
                              "Zip number must be a 5-digit number",
                              $('#zip'),
                              "incorrectZip error")
    createErrorMessageElement("$incorrectCvv",
                              "CVV value must be a 3-digit number",
                              $('#cvv'),
                              "incorrectCvv error");

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
        $('.activities span').show()
      } else {
        $('.activities span').hide()
      }
    })
    $('#payment').on('change', function(event){
      hideAndShowInfor ("credit card", 0, 1, 2);
      hideAndShowInfor ("paypal", 1, 0, 2);
      hideAndShowInfor ("bitcoin", 2, 0, 1);
    })

    $('.error').hide()
    $('#name').on('focusout', function(){showAndHideErrorMessage('checkEmptyInput', '#name', '.emptyName')})
    $('#mail').on('focusout', function(){showAndHideErrorMessage('checkEmptyInput','#mail', '.emptyEmail')})
    $('#cc-num').on('focusout', function(){showAndHideErrorMessage('checkEmptyInput', '#cc-num', '.emptyCardNum')})
    $('#zip').on('focusout', function(){showAndHideErrorMessage('checkEmptyInput', '#zip', '.emptyZip')})
    $('#cvv').on('focusout', function(){showAndHideErrorMessage('checkEmptyInput', '#cvv', '.emptyCvv')})
    $('#mail').on('keyup', function(){showAndHideErrorMessage('checkValidEmail','#mail', '.emailFormat')})
    $('#cc-num').on('keyup', function(){nestedShowAndHideErrorMessage('checkCardNum','#cc-num','.NaNCardNum', '.incorrectCardNum')})
    $('#zip').on('keyup', function(){nestedShowAndHideErrorMessage('checkZip','#zip','.NaNZip', '.incorrectZip')})
    $('#cvv').on('keyup', function(){nestedShowAndHideErrorMessage('checkCvv','#cvv','.NaNCvv', '.incorrectCvv')})

    /*---------------------------------------------------------------*/
    //Checking error when submmit
    $('button').on('click', function(event) {
      if ($('#payment').val() === 'credit card') {
        if (checkEmptyInput ($('#name').val()) === false ||
            checkEmptyInput ($('#mail').val()) === false ||
            checkEmptyInput ($('#cc-num').val()) === false ||
            checkEmptyInput ($('#zip').val()) === false ||
            checkEmptyInput ($('#cvv').val()) === false ||
            checkValidEmail($('#mail').val()) === false ||
            checkActivities ($('input:checked').length) === false ||
            checkCardInforIsANumber ($('#cc-num').val()) === false ||
            checkCardInforIsANumber ($('#zip').val()) === false ||
            checkCardInforIsANumber ($('#cvv').val()) === false ||
            checkCardNum ($('#cc-num').val()) === false ||
            checkZip ($('#zip').val()) === false ||
            checkCvv ($('#cvv').val()) === false
          ){
            event.preventDefault()
            $('.error').hide()  // Hide all existing error message
            $('.redBorder').removeClass('redBorder') // Hide all existing red-border input
            submitName_Email_Act_Error ()
            submitCardError ('checkCardNum', '#cc-num', '.emptyCardNum', '.NaNCardNum', '.incorrectCardNum')
            submitCardError ('checkZip', '#zip', '.emptyZip', '.NaNZip', '.incorrectZip')
            submitCardError ('checkCvv', '#cvv', '.emptyCvv', '.NaNCvv', '.incorrectCvv')
          }
      }else {
        if (checkEmptyInput ($('#name').val()) === false ||
            checkEmptyInput ($('#mail').val()) === false ||
            checkEmptyInput ($('#cc-num').val()) === false ||
            checkValidEmail($('#mail').val()) === false ||
            checkActivities ($('input:checked').length) === false
          ){
            event.preventDefault()
            $('.error').hide()  // Hide all existing error message
            $('.redBorder').removeClass('redBorder') // Hide all existing red-border input
            submitName_Email_Act_Error ()
        }
      }
    })

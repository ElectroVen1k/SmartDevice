(function() {
  var sectionsList = document.querySelector('.footer-sections');
  var sectionsButton = document.querySelector('.footer-sections p');
  var contactsList = document.querySelector('.footer-contacts');
  var contactsButton = document.querySelector('.footer-contacts p');
  var popupOpenButton = document.querySelector('.top-header__btn');
  var popupCloseButton = document.querySelector('.feedback-popup > button');
  var feedbackPopup = document.querySelector('.feedback-popup');
  var overlay = document.querySelector('.body__overlay');

  // Accordion

  window.onload = function() {
    sectionsList.classList.remove('footer-sections--opened');
    contactsList.classList.remove('footer-contacts--opened');
  };

  var closeSections = function () {
    sectionsList.classList.remove('footer-sections--opened');
    sectionsButton.removeEventListener('click', closeSections);
  };

  var closeContacts = function () {
    contactsList.classList.remove('footer-contacts--opened');
    contactsButton.removeEventListener('click', closeContacts);
  };

  sectionsButton.addEventListener('click', function() {
    sectionsList.classList.add('footer-sections--opened');
    sectionsButton.addEventListener('click', closeSections);
    if (contactsList.classList.contains('footer-contacts--opened')) {
      contactsList.classList.remove('footer-contacts--opened');
      contactsButton.removeEventListener('click', closeContacts);
    }
  });

  contactsButton.addEventListener('click', function() {
    contactsList.classList.add('footer-contacts--opened');
    contactsButton.addEventListener('click', closeContacts);
    if (sectionsList.classList.contains('footer-sections--opened')) {
      sectionsList.classList.remove('footer-sections--opened');
      sectionsButton.removeEventListener('click', closeSections);
    }
  });

  // Popup

  var openPopup = function() {
    feedbackPopup.classList.add('feedback-popup--opened');
    overlay.classList.add('body__overlay--opened');
    document.addEventListener("keydown", onESCPress);
    overlay.addEventListener('click', closePopup);
  };

  var closePopup = function() {
    feedbackPopup.classList.remove('feedback-popup--opened');
    overlay.classList.remove('body__overlay--opened');
    document.removeEventListener("keydown", onESCPress);
    overlay.removeEventListener('click', closePopup);
  };

  var onESCPress = function (evt) {
    if (evt.key === "Escape") {
      closePopup();
    }
  };

  popupCloseButton.addEventListener('click', closePopup);
  popupOpenButton.addEventListener('click', openPopup);

  // phoneMask

  var phoneInputs = document.querySelectorAll('input[type=tel]');

  var getPhoneMask = function () {
    var getInputNumbersValue = function (input) {
      // Return stripped input value — just numbers
      return input.value.replace(/\D/g, '');
    };

    var onPhonePaste = function (e) {
      var input = e.target,
        inputNumbersValue = getInputNumbersValue(input);
      var pasted = e.clipboardData || window.clipboardData;
      if (pasted) {
        var pastedText = pasted.getData('Text');
        if (/\D/g.test(pastedText)) {
          // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
          // formatting will be in onPhoneInput handler
          input.value = inputNumbersValue;
          return;
        }
      }
    };

    var onPhoneInput = function (e) {
      var input = e.target,
        inputNumbersValue = getInputNumbersValue(input),
        selectionStart = input.selectionStart,
        formattedInputValue = '';

      if (!inputNumbersValue) {
        return input.value = '';
      }

      if (input.value.length != selectionStart) {
        // Editing in the middle of input, not last symbol
        if (e.data && /\D/g.test(e.data)) {
          // Attempt to input non-numeric symbol
          input.value = inputNumbersValue;
        }
        return;
      }

      if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
        if (inputNumbersValue[0] == '9') inputNumbersValue = '7' + inputNumbersValue;

        if (inputNumbersValue[0] == '8') {
          var firstSymbols = '8';
          input.setAttribute('pattern', '.{17,17}');
          input.setAttribute('maxlength', '17');
        } else {
          var firstSymbols = '+7';
          input.setAttribute('pattern', '.{18,18}');
          input.setAttribute('maxlength', '18');
        }

        formattedInputValue = input.value = firstSymbols + ' ';
        if (inputNumbersValue.length > 1) {
          formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
        }
        if (inputNumbersValue.length >= 5) {
          formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
        }
        if (inputNumbersValue.length >= 8) {
          formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
        }
        if (inputNumbersValue.length >= 10) {
          formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
        }
      } else {
        formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
      }
      input.value = formattedInputValue;
    };

    var onPhoneKeyDown = function (e) {
      // Clear input after remove last symbol
      var inputValue = e.target.value.replace(/\D/g, '');
      if (e.keyCode == 8 && inputValue.length == 1) {
        e.target.value = '';
      }
    };

    var onPhoneInputFocus = function (e) {
      var input = e.target;

      if ( input.value == '') {
        input.value = '+7 (';
        input.setAttribute('pattern', '.{18,18}');
        input.setAttribute('maxlength', '18');
      }
    }

    var onPhoneInputBlur = function (e) {
      var input = e.target;

      if ( input.value == '+7 (' ) {
        input.value = '';
      }
    }

    for (phoneInput of phoneInputs) {
      phoneInput.addEventListener('keydown', onPhoneKeyDown);
      phoneInput.addEventListener('input', onPhoneInput, false);
      phoneInput.addEventListener('paste', onPhonePaste, false);
      phoneInput.addEventListener('focus', onPhoneInputFocus);
      phoneInput.addEventListener('blur', onPhoneInputBlur);
    }

  };

  getPhoneMask();

}());

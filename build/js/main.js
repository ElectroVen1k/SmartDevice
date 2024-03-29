(function() {
  var sectionsList = document.querySelector('.footer-sections');
  var sectionsButton = document.querySelector('.footer-sections p');
  var sectionsBlock = document.querySelector('.footer-sections');
  var contactsList = document.querySelector('.footer-contacts');
  var contactsButton = document.querySelector('.footer-contacts p');
  var contactsBlock = document.querySelector('.footer-contacts');
  var popupOpenButton = document.querySelector('.top-header__btn');
  var popupCloseButton = document.querySelector('.feedback-popup > button');
  var feedbackPopup = document.querySelector('.feedback-popup');
  var bodyElement = document.querySelector('.body');
  var overlay = document.querySelector('.body__overlay');
  var nameInput = document.querySelector('.feedback-popup__form #popup-name');

  // Accordion

  window.onload = function() {
    sectionsList.classList.remove('footer-sections--opened');
    contactsList.classList.remove('footer-contacts--opened');
    sectionsBlock.classList.remove('footer-sections--no-js');
    contactsBlock.classList.remove('footer-contacts--no-js');
  };

  var closeSections = function () {
    sectionsList.classList.remove('footer-sections--opened');
    sectionsButton.removeEventListener('click', closeSections);
  };

  var closeContacts = function () {
    contactsList.classList.remove('footer-contacts--opened');
    contactsButton.removeEventListener('click', closeContacts);
  };

  sectionsButton.addEventListener('click', () => {
    sectionsList.classList.add('footer-sections--opened');
    sectionsButton.addEventListener('click', closeSections);
    if (contactsList.classList.contains('footer-contacts--opened')) {
      contactsList.classList.remove('footer-contacts--opened');
      contactsButton.removeEventListener('click', closeContacts);
    }
  });

  contactsButton.addEventListener('click', () =>  {
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
    bodyElement.classList.add('body--noscroll');
    document.addEventListener('keydown', onESCPress);
    overlay.addEventListener('click', closePopup);
    nameInput.focus();
  };

  var closePopup = function() {
    feedbackPopup.classList.remove('feedback-popup--opened');
    overlay.classList.remove('body__overlay--opened');
    bodyElement.classList.remove('body--noscroll');
    document.removeEventListener('keydown', onESCPress);
    overlay.removeEventListener('click', closePopup);
  };

  var onESCPress = function (evt) {
    if (evt.key === 'Escape') {
      closePopup();
    }
  };

  popupCloseButton.addEventListener('click', closePopup);
  popupOpenButton.addEventListener('click', openPopup);

  // phoneMask

  var phoneInputs = document.querySelectorAll('input[type=tel]');

  var getPhoneMask = function () {
    var getInputNumbersValue = function (input) {
      return input.value.replace(/\D/g, '');
    };

    var onPhonePaste = function (e) {
      var input = e.target,
        inputNumbersValue = getInputNumbersValue(input);
      var pasted = e.clipboardData || window.clipboardData;
      if (pasted) {
        var pastedText = pasted.getData('Text');
        if (/\D/g.test(pastedText)) {
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

      if (inputNumbersValue[0] > -1) {
        var firstSymbols = '+7 (';

        formattedInputValue = input.value = firstSymbols;
        if (inputNumbersValue.length > 1) {
          formattedInputValue += inputNumbersValue.substring(1, 4);
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
      }
      input.value = formattedInputValue;
    };

    var onPhoneInputFocus = function (e) {
      var input = e.target;

      if ( input.value == '') {
        input.value = '+7 (';
        input.setAttribute('pattern', '.{18,18}');
        input.setAttribute('maxlength', '18');
      }
    };

    var onPhoneInputBlur = function (e) {
      var input = e.target;

      if ( input.value == '+7 (' ) {
        input.value = '';
      }
    };

    for (var phoneInput of phoneInputs) {
      phoneInput.addEventListener('input', onPhoneInput, false);
      phoneInput.addEventListener('paste', onPhonePaste, false);
      phoneInput.addEventListener('focus', onPhoneInputFocus);
      phoneInput.addEventListener('blur', onPhoneInputBlur);
    }
  };

  getPhoneMask();
}());

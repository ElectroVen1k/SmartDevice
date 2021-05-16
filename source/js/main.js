(function() {
  var sectionsList = document.querySelector('.footer-sections')
  var sectionsButton = document.querySelector('.footer-sections p')
  var contactsList = document.querySelector('.footer-contacts')
  var contactsButton = document.querySelector('.footer-contacts p')

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
}());

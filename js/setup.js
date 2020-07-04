'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var TOTAL_WIZARDS = 4;
var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
.content.querySelector('.setup-similar-item');

var arrayRandomElement = function (array) {
  var random = Math.floor(Math.random() * array.length);
  return array[random];
};

var createWizard = function (person) {
  person = {
    name: arrayRandomElement(WIZARD_NAMES) + ' ' + arrayRandomElement(WIZARD_SURNAMES),
    coatColor: arrayRandomElement(WIZARD_COAT_COLORS),
    eyesColor: arrayRandomElement(WIZARD_EYES_COLORS)
  };
  return person;
};

var getRandomWizards = function () {
  var wizards = [];
  for (var i = 0; i < TOTAL_WIZARDS; i++) {
    wizards[i] = createWizard(wizards[i]);
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var getFragment = function () {
  var randomWizards = getRandomWizards();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < randomWizards.length; i++) {
    fragment.appendChild(renderWizard(randomWizards[i]));
  }
  similarListElement.appendChild(fragment);
};

getFragment();

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
setup.classList.add('hidden');
var setupClose = setup.querySelector('.setup-close');
var setupSubmit = setup.querySelector('.setup-submit');
setupClose.setAttribute('tabindex', 0);
var userIcon = document.querySelector('.setup-open-icon');
userIcon.setAttribute('tabindex', 0);
var userNameInput = setup.querySelector('.setup-user-name');
var setupWizardForm = userDialog.querySelector('.setup-wizard-form');
var coatsColorValue = setupWizardForm.querySelector('.coats-color-input');
var eyesColorValue = setupWizardForm.querySelector('.eyes-color-input');
var fireballColorValue = setupWizardForm.querySelector('.fireball-color-input');
var wizardCoat = setupWizardForm.querySelector('.wizard-coat');
var wizardEyes = setupWizardForm.querySelector('.wizard-eyes');
var fireBall = setupWizardForm.querySelector('.setup-fireball-wrap');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' || evt.key === 'Enter') {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  wizardCoat.addEventListener('click', randomCoatsColor);
  wizardEyes.addEventListener('click', randomEyesColor);
  fireBall.addEventListener('click', randomFireballColor);
  setupSubmit.addEventListener('click', submitForm);

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape' && userNameInput !== document.activeElement) {
      evt.preventDefault();
      setup.classList.add('hidden');
    }
  });

  document.addEventListener('mouseup', function (evt) {
    if (evt.target.closest('.setup') === null) {
      evt.preventDefault();
      setup.classList.add('hidden');
    }
  });
};

userIcon.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

var closePopup = function () {
  setup.classList.add('hidden');
  wizardCoat.removeEventListener('click', randomCoatsColor);
  wizardEyes.removeEventListener('click', randomEyesColor);
  fireBall.removeEventListener('click', randomFireballColor);
  setupSubmit.removeEventListener('click', submitForm);
  setupClose.removeEventListener('keydown', onPopupEscPress);
};

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    setup.classList.add('hidden');
  }
});

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupClose.addEventListener('click', function () {
  closePopup();
});

userNameInput.addEventListener('input', function () {
  var valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Имя персонажа не может содержать менее 2 символов');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Максимальная длина имени персонажа — 25 символов');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var randomCoatsColor = function () {
  var color = arrayRandomElement(WIZARD_COAT_COLORS);
  setupWizardForm.querySelector('.wizard-coat').style.fill = color;
  coatsColorValue.value = color;
};

var randomEyesColor = function () {
  var color = arrayRandomElement(WIZARD_EYES_COLORS);
  setupWizardForm.querySelector('.wizard-eyes').style.fill = color;
  eyesColorValue.value = color;
};

var randomFireballColor = function () {
  var color = arrayRandomElement(WIZARD_FIREBALL_COLORS);
  setupWizardForm.querySelector('.setup-fireball-wrap').style.background = color;
  fireballColorValue.value = color;
};

var submitForm = function () {
  if (userNameInput.checkValidity()) {
    setupWizardForm.submit();
  }
};

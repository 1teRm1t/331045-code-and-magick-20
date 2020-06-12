'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var TOTAL_WIZARDS = 4;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

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

userDialog.querySelector('.setup-similar').classList.remove('hidden');

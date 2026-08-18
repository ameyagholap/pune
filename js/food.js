(function () {
  "use strict";

  var JOINTS = window.FOOD_JOINTS || [];
  var list = document.getElementById("foodList");

  function card(joint, i) {
    var li = document.createElement("li");
    li.className = "food-card";
    li.id = joint.id;

    var established = joint.established
      ? '<span class="food-card-est">Est. ' + joint.established + '</span>'
      : '';
    var mustTry = joint.mustTry
      ? '<p class="food-card-musttry"><strong>Must try:</strong> ' + joint.mustTry + '</p>'
      : '';
    var credit = joint.credit
      ? '<span class="photo-credit">' + joint.credit + '</span>'
      : '';

    li.innerHTML =
      '<div class="food-card-photo">' +
        '<img src="' + joint.image + '" alt="' + joint.name + '" loading="lazy" ' +
          'onerror="this.style.display=\'none\';this.parentElement.classList.add(\'no-photo\');">' +
        '<span class="food-card-num">' + (i + 1) + '</span>' +
        credit +
      '</div>' +
      '<div class="food-card-body">' +
        '<h2>' + joint.name + '</h2>' +
        established +
        mustTry +
        '<a class="food-card-maps" target="_blank" rel="noopener" href="' + joint.mapUrl + '">' +
          '<span class="maps-pin">📍</span> Open in Google Maps' +
        '</a>' +
      '</div>';

    return li;
  }

  function render() {
    list.innerHTML = "";
    if (!JOINTS.length) {
      list.innerHTML = '<li class="food-loading">No joints listed yet.</li>';
      return;
    }
    var frag = document.createDocumentFragment();
    JOINTS.forEach(function (joint, i) {
      frag.appendChild(card(joint, i));
    });
    list.appendChild(frag);
  }

  render();
})();

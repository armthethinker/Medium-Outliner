//
// Medium Outliner
// Creates an outline based on your Medium document
//

var headersArray = document.querySelectorAll('h3.graf--h3, h4.graf--h4');

headers = {};

console.log(headersArray);

buildTextArray(headersArray, headers);
insertEl({
   'insertInto': document.body,
   'type': 'div',
   'class': 'mo mo-container',
   'innerHTML': '<div class="mo-inner"></div>',
   'TK': ""
});

for(i = 0; i < headersArray.length; i++){
   insertEl({
      'insertInto': document.querySelector('.mo-inner'),
      'type': 'div',
      'class': 'mo-item mo-h' + headers[i].headerLevel,
      'innerHTML': headers[i].text,
      'TK': headers[i].TK
   });
}

// Hmmm - should probably make an object, not array
function buildTextArray(givenArray, outputArray){
   for(i = 0; i < givenArray.length; i++){
      var headerElement = givenArray[i].nodeName.substring(1,2);
      console.log(headerElement);

      var insertedText = givenArray[i].textContent;

      var regTK = new RegExp('TK');
      var TK = regTK.test(insertedText);
      // debugger;
      console.log(TK);
      outputArray[i] = {
         "headerLevel": headerElement,
         "text": insertedText,
         "TK": TK
      };
   }
}
console.log(headers);

function insertEl(el){
   var newEl = document.createElement(el.type);

   newEl.setAttribute('class', el.class);
   newEl.setAttribute('domFlag', true);
   console.log(el.TK);

   if(el.TK == true){
      var tkHTML = '<strong>' + el.innerHTML + '</strong>';
      el.innerHTML = tkHTML;
   }

   newEl.innerHTML = el.innerHTML;

   el.insertInto.appendChild(newEl);
}

console.log('Document is in ' + document.querySelector('.mo'));

//
// Medium Outliner
// Creates an outline based on your Medium document
//

/*

Main logic

*/
// Collect all headers
var content = getContent();
var oldText = getText();


// Create a headers and globals object
headers = {};
globals = {
   countTK: 0
};
function mainLogic(){



   // console.log(content);

   // Create the headers text array
   buildTextArray(content, headers);

   // Insert the base element into the page
   insertEl({
      'insertInto': document.body,
      'type': 'div',
      'class': 'mo mo-container',
      'innerHTML': '<div class="mo-counts"></div><div class="mo-inner"></div>'
   });

   // Insert each header element into the base element
   insertHeaders();

   // Insert TK count
   insertCounts();
}
mainLogic();

// console.log(headers);
// console.log('Document is in ', document.querySelector('.mo-container'));




/*

Updating logic

*/
// add event thing
// console.log(document.querySelector('main'));
// maybe use
document.onscroll = function(){update()};

setEventListenerOnItems();



/*

Functions

*/

function update(){
   var newText = getText();
   if(newText != oldText){
      globals.countTK = 0;
      headers = {};
      content = getContent();

      setEventListenerOnItems();

      var mo = document.querySelectorAll('.mo');

      // console.log('onscroll')
      for(i = 0; i < mo.length; i++)
         mo[i].parentNode.removeChild(mo[i]);
      mainLogic();
      oldText = newText;
   }
}

function setEventListenerOnItems(){
   var moItems = document.querySelector('.mo-inner');

   console.log('hello');

   moItems.addEventListener('onClick', function(){
      console.log(this);
      console.log('click');
      window.scroll(0, this.getAttribute('offsettop'));
   });
}

function getContent(){
   var elements = document.querySelectorAll('h3.graf--h3, h4.graf--h4, p.graf--p');
   return elements;
};

function getText(){
   var article = document.querySelector('main')
   return article.textContent;
}

// Insert headers
function insertHeaders(){
   // For everything in the headers array
   for(i = 0; i < content.length; i++){

      var el = headers[i];
      var containsTK = '';

      if(el.TK == true){
         containsTK = ' mo-containsTK';
         globals.countTK += 1;
      }

      // Only add elements who are not P level
      if(el.name != 'P'){
         insertEl({
            'insertInto': document.querySelector('.mo-inner'),
            'type': 'div',
            'class': 'mo-item mo-' + el.name + containsTK,
            'innerHTML': el.text,
            'yLocation': el.yLocation
         });
      }
   }
}

// Hmmm - should probably make an object, not array
function buildTextArray(givenArray, outputArray){
   for(i = 0; i < givenArray.length; i++){
      var elName = givenArray[i].nodeName;

      // console.log(elName);

      var insertedText = givenArray[i].textContent;

      var regTK = new RegExp('TK');
      var TK = regTK.test(insertedText);
      // debugger;
      // console.log(TK);
      outputArray[i] = {
         "name": elName,
         "text": insertedText,
         "TK": TK,
         "yLocation": givenArray[i].offsetTop
      };
   }
}

// Insert an arbitrary element based on given object
function insertEl(el){
   var newEl = document.createElement(el.type);

   if(el.class != undefined){
      newEl.setAttribute('class', el.class);
   }
   // console.log(el);
   if(el.yLocation != undefined){
      console.log(el.yLocation)
      newEl.setAttribute('onClick', 'scroll(0,' + el.yLocation + ')');
   }

   newEl.innerHTML = el.innerHTML;

   el.insertInto.appendChild(newEl);
}

function insertCounts(){

   var existence = document.querySelector('.mo-metabar-message');
   // console.log(existence);

   if(existence == null){
      insertEl({
         'insertInto': document.querySelector('.metabar-block.metabar-block--left.u-floatLeft.u-height65.u-xs-height56'),
         'type': 'div',
         'class': 'mo metabar-text',
         'innerHTML': '<div class="metabar-message is-active mo mo-metabar-message"><span class="mo-countTK">' + globals.countTK + '</span> TKs remaining</div>',
      });
   }
   else{
      var spanTK = existence.querySelector('span.mo-countTK');
      spanTK.innerHTML = globals.countTK;
   }


}



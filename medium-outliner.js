//
// Medium Outliner
// Creates an outline based on your Medium document
//

var headers3Array = document.querySelectorAll('h3');
var headers4Array = document.querySelectorAll('h4');

headers3 = [];
headers4 = [];

buildTextArray(headers3Array, headers3);
buildTextArray(headers4Array, headers4);

// Hmmm - should probably make an object, not array
function buildTextArray(givenArray, outputArray){
   for(i = 0; i < givenArray.length; i++){
      var insertedText = givenArray[i].textContent;
      outputArray.push(insertedText);
   }
}

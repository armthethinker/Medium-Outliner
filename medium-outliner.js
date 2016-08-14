//
// Medium Outliner
// Creates an outline based on your Medium document
//

var headersArray = document.querySelectorAll('h3.graf--h3, h4.graf--h4');

headers = {};

console.log(headersArray);


// Hmmm - should probably make an object, not array
function buildTextArray(givenArray, outputArray){
   for(i = 0; i < givenArray.length; i++){
      var insertedText = givenArray[i].textContent;
      outputArray.push(insertedText);
   }
}

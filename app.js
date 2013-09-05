
function print(output) {
  console.log(output);
}

print('Welcome to xquiz. How high?'); 
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', takeInput);

// as expressed in 2 + range
var range = NaN;

var factorX;
var factorY;

var facts = [];
var correct = 0;
var total;

function takeInput(chunk) {
  var value = Number(chunk);
  if (isNaN(range)) {
    if (isNaN(value)) {
      print('Get serious!');
      process.exit(0);
    }
    range = value;
    for (var i=0; i < range; i++) {
      for (var j=0; j < range; j++) {
        facts.push([i, j]);
      }
    }

    total = facts.length;
    print('✓ Ok, multiplication facts ranging from 0 to ' + range + '.');
    nextFact();
  } else {
    if(value == factorX * factorY) {
      if (firstTry) {
        print('★  Good job ★');
        print( ++correct + ' correct,  ' + facts.length + ' remaining');
      } else {
        print('(•ω•) Finally');
        facts.push([factorX, factorY]);
      }
      nextFact();
    } else {
      firstTry = false;
      print('Terrible ب_ب ');
      print(factorX +' x ' + factorY + ' GUESS again!');
    }
  }
}

var firstTry;
function nextFact() {
  if (!facts.length) {
      print('You did them all!');
      process.exit(0);
  }

  var choose = facts.splice(Math.floor(facts.length*Math.random()),1)[0];

  factorX = choose[0];
  factorY = choose[1];

  print('What is '+factorX+' x '+factorY+'?');
  firstTry = true;
}

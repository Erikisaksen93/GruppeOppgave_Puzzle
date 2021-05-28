let grid = document.getElementsByClassName("box");
const VictoryFanfare = new Audio("fanfare.mp3");
var PuzzleComplete = false;
// //controller

document.addEventListener('DOMContentLoaded', (event) => {

  var dragSrcEl = null;
  
  function handleDragStart(e) {
  //   this.style.opacity = '0.4';
    
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';
    
    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over');
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    } if (dragSrcEl != this && PuzzleComplete === false) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
      test();
    } else {
      return false;
    }
  }

  function handleDragEnd(e) {
  //   this.style.opacity = '1';
    
    items.forEach(function (item) {
      item.classList.remove('over');
    });
  }
  
  
  let items = document.querySelectorAll('.container .box');
  items.forEach(function(item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false);
  });
});




  function checkSolution() {
    //grid.forEach(checkTile);
  }

  function checkTile(item, index) {
    console.log(item + index);
  }

  function puzzleComplete() {
    VictoryFanfare.play();
    PuzzleComplete = true;
    document.getElementById("victxt").innerHTML = `You did the thing!`;
    console.log(PuzzleComplete);
  }

  function test() {
      var solutionArray = [];
      Array.from(grid).forEach(tile => {
        //solutionArray.push(tile.id == tile.firstChild.id);
        if (tile.firstElementChild === null) {
            console.log(tile.id + " Doesn't have a puzzle piece")
            solutionArray.push(false);
            return;            
        }
        
        let picid = tile.firstElementChild.id.replace("pict-", "");
        if (picid === tile.id) {
          console.log(tile.id + " has the correct piece")
          solutionArray.push(true);
        } else {
          console.log(tile.id + " has the wrong piece");
          solutionArray.push(false);
        }
        
    });
    console.log(solutionArray);
    if (solutionArray.includes(false) || solutionArray.length == null) {
      console.log("Puzzle not yet completed");
      return;
    }
    puzzleComplete();
  }


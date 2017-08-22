function draw_board(x,y){
    $('.gameBoard').append('<tr id="header"></tr>');
        
    //first draw the background
     var header=$('.gameBoard').find("#header");
    header.append('<tr><td><img id="tableBorder" src="http://www.chezpoor.com/minesweeper/images/bordertl.gif"></td>');
    for (var i=0; i<x; i++){
        //this adds in the border
        header.append('<td><img id="tableBorder" src="http://www.chezpoor.com/minesweeper/images/bordertb.gif"></td>');
    }
       header.append('<td><img id="tableBorder" src="http://www.chezpoor.com/minesweeper/images/bordertr.gif"></td></tr>');
    
    //header row finished above. Now draw the actual cells
    
     header.parent().last().append('<tr class="left" id ="cell"><td><img id="leftRightBorder" src="http://www.chezpoor.com/minesweeper/images/borderlr.gif"></td>');
    for(i=0; i<x;i++){
        header.parent().find("#cell").last().append('<td class="cell blank" id='+(i+1)+'><img src="http://www.chezpoor.com/minesweeper/images/blank.gif"</td>');
    }
    header.parent().find("#cell").last().append('<td class="right" id="cell"><img id="leftRightBorder" src="http://www.chezpoor.com/minesweeper/images/borderlr.gif"></td></tr>');

    //draw body
    var counter=y+1;
    for(var j=0;j<y-1;j++){
        
         header.parent().last().append('<tr class="left" id ="cell"><td><img id="leftRightBorder" src="http://www.chezpoor.com/minesweeper/images/borderlr.gif"></td>');
        for( i=0; i<x;i++){
            var newCount=i+counter;
            header.parent().last().find(".left").last().append('<td class="cell blank" id='+newCount+'><img src="http://www.chezpoor.com/minesweeper/images/blank.gif"></td>');
        }
        counter+=y;
        header.parent().last().find(".left").last().append('<td id="right"><img id="leftRightBorder" src="http://www.chezpoor.com/minesweeper/images/borderlr.gif"></td></tr>');    
    }
    
    //draw bottom border
        header.parent().last().append('<tr class="left" id ="cell"><td><img id="leftRightBorder" src="http://www.chezpoor.com/minesweeper/images/borderbl.gif"></td>'); 
        for ( i=0; i<x; i++){
            //this adds in the border
            header.parent().last().find(".left").last().append('<td><img id="bottomBorder" src="http://www.chezpoor.com/minesweeper/images/bordertb.gif"></td>');
        }
       header.parent().last().find(".left").last().append('<td><img id="leftRightBorder" src="http://www.chezpoor.com/minesweeper/images/borderbr.gif"></td></tr>');   
    
    makeBombs(x,y);
}

function makeBombs(x,y){
    //after the board is generated, randomly place bombs onto the board
    var numBombs = (x*y)/10;
    (function makeBomb(){
        $('.bomb').each(function(){
            $(this).removeClass('bomb');
        });
        var rand=0;
        for (var i=1;i<numBombs+1;i++){
            rand=Math.floor(Math.random() * (x*y)) + 1;
            var cell = $('.gameBoard').find('#'+rand);
            if (cell.hasClass('bomb')){
               $('.gameBoard').find('#'+rand+1)
               // makeBomb();
            } else {
                cell.addClass('bomb');   
            }
            rand=0;
            
            
        }
    })();
}


function checkCell(id){
    //this function checks whether a box that was clicked contains a bomb or not
    cell = $('.gameBoard').find('#'+id);
    if (cell.hasClass('bomb')){
        //show all bombs if one is clicked
        $('.bomb').each(function() {
          $(this).text('');
          $(this).append('<img src="http://www.chezpoor.com/minesweeper/images/bombrevealed.gif">'); 
          endGame();
        });
           
    } else if (cell.hasClass('blank')){
        //check the number of bombs around the clicked square
        var bombCount=0;
        id=parseInt(id,10);
        var adjacent=[];
        
        //check if cell clicked was on the far right of the board
        if (id % numCols === 0){
            adjacent=[(id - 1 - numCols),(id - numCols),(id-1),(id-1+numCols),(id+numCols)];           
        } else if (((id-1) % numCols === 0) || id == 1){ //left side of board
            adjacent=[(id - numCols),((id+1)-numCols),(id+1),(id+numCols),(id+1+numCols)];            
        } else if (id < numCols){ //top row of board
           adjacent=[(id-1),(id+1),(id-1+numCols),(id+numCols),(id+1+numCols)];             
        } else if ((((numCols*numRows)-numCols) < id) && id < (numCols*numRows)) { //bottom row of board
           adjacent=[(id - 1 - numCols),(id - numCols),((id+1)-numCols),(id-1),(id+1)];             
        } else { //not on top row, bottom row, left or right
           adjacent=[(id - 1 - numCols),(id - numCols),((id+1)-numCols),(id-1),(id+1),(id-1+numCols),(id+numCols),(id+1+numCols)]; 
        } 
        
        
        adjacent.forEach(function(entry){
            if($('.gameBoard').find('#'+entry).hasClass('bomb')){
             bombCount++; 
            }
        });
       
        if (bombCount === 0){ //need to make the connected zeroes 'stick' together and open at once
            $(cell).removeClass('blank');
            $(cell).text(''); 
            $(cell).addClass('clicked'); 
            
            adjacent.forEach(function(entry){
                checkCell(entry);             
            });      

        } else {
            $(cell).removeClass('blank');
            $(cell).text(bombCount); 
            $(cell).addClass('clicked');    
        }

    }
}

function endGame(){
 //this function makes the game unplayable after a bomb is clicked
    $('.cell').each(function(){
     $(this).removeClass('blank');   
    });
}




$(document).ready(function(){

    document.oncontextmenu = function() {return false;}; // disable right click menu
     numRows=10;
     numCols=10;
   
    //make new game on button clicks
    $('#headerBar').find('#easy').on('click',function(){
        numRows=10;
        numCols=10;
        $('.gameBoard').text('');
        draw_board(numRows,numCols);

    });
    $('#headerBar').find('#intermediate').on('click',function(){
        numRows=20;
        numCols=20;
        $('.gameBoard').text('');
        draw_board(numRows,numCols);
    });
    $('#headerBar').find('#expert').on('click',function(){
        numRows=40;
        numCols=40;
        $('.gameBoard').text('');
        draw_board(numRows,numCols);
    });

    draw_board(numRows,numCols); 

    
    //play game
    //right click check
    $(document).on('mousedown','.left td',function(e){
      if( e.button == 2 ) {
          if($(this).hasClass('blank')){
              $(this).removeClass('blank');
              $(this).addClass('flag');
              $(this).text('');
              $(this).append('<img src="http://www.chezpoor.com/minesweeper/images/bombflagged.gif">'); //add flag if it's blank
          } else if($(this).hasClass('flag')) {
              $(this).removeClass('flag');
              $(this).addClass('blank');
              $(this).text('');
              $(this).append('<img src="http://www.chezpoor.com/minesweeper/images/blank.gif">'); //back to blank
          }
      }
    });
    
    //left click check
     $(document).on('mousedown','.left td',function(e){
          if( e.button === 0 ) {
              checkCell($(this).attr('id'));
          }
     });
    
    

   
    
    
});
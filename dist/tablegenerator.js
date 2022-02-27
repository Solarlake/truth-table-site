// no idea if this even works lmao i spent forever just trying to figure out
// what javascript was i wasnt abt to figure out how to test it on top of that

// just figured id push the for loop logic to generate the constituent statements
// so if nothing else that logic can be recycled

const statements = new Array();
// TODO: make actual user input. 3 lines below are for testing purposes
statements[0] = "p";
statements[1] = "q";
statements[2] = "r";

const tableRows = new Array();
const colsHeader = new Array();

initArray(); // initiate 3 statements possible truth sets

/**
 * Initiates a 2d array with all possible truth values for the given statements array
 * ex. one row for p, q, r could be T, F, F
 */
function initArray(){
    // create a 2d array based on the number of statements. should be 2^x rows + 1
    // set up header row ----------------------------------------------------------
    for(let i = 0; i < statements.length; i++){
        colsHeader[i] = statements[i];
    }
    tableRows[0] = colsHeader;

    // set up statement rows ------------------------------------------------------
    numRows = Math.pow(2, statements.length)

    for(let i = 1; i < numRows + 1; i++){ // iterate through all rows
        tableRows[i] = new Array(); // init new array for each row

        // iterate through all cols for this row
        for(let j = 0; j < tableRows[0].length; j++){
            halfstep = numRows / (Math.pow(2, j + 1));
            step = halfstep * 2;

            // assign true/false
            if((i-1) % step < halfstep){ // assign true
                tableRows[i][j] = "T";
            }
            else{
                tableRows[i][j] = "F";
            }
        }

    }

}


/**
 * Adds a given parantheses-closed solvable statement relationship (ex: p V q) to
 * the next open column in the array
 * TODO: actually do this lmao
 */
function addSolvable(){

}
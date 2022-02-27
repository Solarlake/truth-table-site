
    /**
     * Finds the number of parentheses-closed solvable statements and puts them in an array, 
     * starting from the inner-most set of parentheses
     * 
     * yo help im not adding the inner-most statement cause idk how?????? tbh not sure if the recursions even right either hehe
     * 
     * @param {string} statement 
     * @returns 
     */
    function findStatements(statement) {
        let statements = [];
        //Finds the index of the set of parentheses in the middle
        let openParentheses = -1;
        let closeParentheses = -1;
        for(let i = 0; i < statement.length; i++){
            if(statement[i] === "(") {
                openParentheses = i;
            }
        }
        for (let i = statement.length; i > 0; i--) {
            if (statement[i] === ")") {
                closeParentheses = i;
            }
        }
        if (openParentheses === -1 || closeParentheses === -1) {
            return statements;
        }
        else {
            let subStatement = statement.substring(openParentheses + 1, closeParentheses - 1);
            //the _ is used to identify the place where the previous statement in parentheses was supposed to be
            //so i can keep getting rid of parentheses
            //at least, i think i am
            let newStatement = statement.substring(0, openParentheses - 1) + "_" + statement.substring(closeParentheses + 1);
            return statements.push(findStatements(newStatement));
        }
    }

    /**
     * Finds the indexes of the operators in a statement
     * @param {array} statements i guess it'll be the array that findStatements hopefully returns
     * @returns 
     */
    function findOperators(statements) {
        let indexes = [];
        for (let i = 0; i < statements.length; i++) {
            let operators = [];
            for (let j = 0; j < statements[i].length(); j++) {
                if (s[j] === "&&" || s[j] === "||" || s[j] === "xor" || s[j] === ">" || s[j] === "<>") {
                    operators.push(j)
                }
            indexes[i] = operators;
        }
        return indexes;
        }
    }

    /**
     * If a sub-statement has x operators in it, separates it into x + 1 subs-statements
     * 100% does not work lol
     * @param {array} statements 
     */
    function separateOperators(statements) {
        let separatedStatements = [];
        //index of each operator in each statement
        let operatorIndexes = findOperand(statements);
        for (let i = 0; i < statements.length; i++) {
            let j = 0;
            if (operatorIndexes[i].length() > 1) {
                let newStatement = statements[i].substring(0, operatorIndexes[i][j + 1]);
                separatedStatements.push(newStatement);
            }
            while (operatorIndexes[i][j + 2] !== null) {
                let shorterStatement = "_" + statements[i].substring(operatorIndexes[i][j + 1], operatorIndexes[i][j + 2]);
                separatedStatements.push(shorterStatement);
                j++;
            }
        }
        return separatedStatements;
    }

    /**
     * Separates each sub-statement into an array with 3 parts: left, operator, right
     * Assuming there is only 1 operator in each sub-statement
     */
    function separateStatement(statements) {
        let separatedStatements = [];
        operators = findOperators(statements);
        for (let i = 0; i < statements.length; i++) {
            let left = statements[i].substring(0, operators[i][j]);
            let operator = statements[i].substring(operators[i][j], operators[i][j]);
            let right = statements[i].substring(operators[i][j + 1], statements[i].length());
            sub = [left, operator, right];
            separatedStatement[i] = sub;
        }
        return separatedStatement;
    }

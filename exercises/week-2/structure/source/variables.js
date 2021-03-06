console.log( '================= JavaScript Exercises: Variables and Values =================' );

// Complete the following javascript exercises

// Recall that we log to the console using the `console.log()` function.
// Here's how we log the number `1` to the console:

console.log( 1 );

// We can pass any expression to the console.log function, i.e. place it between the parenthesis
// Recall that simple values like numbers and strings are expressions.
// 1. Log the string 'Hello World' to the console:
console.log('Hello World');

// We can log more complex expressions to the console
// 2. Log the result of checking to see if 5 is less than 10. You should see `true` in the console:
console.log(5 < 10);

// We'll often deal with Boolean values in our programs, and we'll operate on them with Boolean operations
// Boolean operations have truth tables the define the result of the operation on two Boolean values
// We learned about the AND operation `&&` and OR operation `||` in class.
// 3. Complete the description of the AND truth table below by logging the remaining three posibilities to the console

console.log( 'Boolean AND Truth Table:' );
console.log( 'true && true is true' );
console.log( 'true && false is false');
console.log( 'false && true is false');
console.log( 'false && false is false');

// 4. Complete the description of the OR truth table similarly:

console.log( 'Boolean OR Truth Table:' );
console.log( 'true || true is true' );
console.log( 'true || false is true' );
console.log( 'false || true is true' );
console.log( 'false || false is false');

// Normally we're not going to log expressions directly to the console
// Usually we'll save the result of our expressions to variables and log those to the console
// Recall that a variables is defined with the `var` keyword, like so:

var foo = "bar";

// And that we can log the value of a variable to the console just like we do any other expression:
// console.log( foo )

// 5. Declare a new variable called `bar` and log it to the console: What is it's value?
var bar = "foo";
console.log(bar);
// We assign values to variables with the equals sign `=`
// 6. Declare a new variable called `hometown` and simultaneously assign the value of your hometown to it.
// -  Log the result to the console.
var hometown = "OKC";
console.log(hometown);

// We'll often assign the result of a more complex expression to a variable
// 7. Declare the variable `arithmetic` and assign the result of the expression `(5+4) * (3-9) / 2` to it
var arithmetic = ((5+4) * (3-9) / 2);
      
// 8. Declare two variables `firstName` and `lastName` and assign your name to them.
// -  Concatenate the two variables with a space between them and assign the result to a third variable, `name`
// -  Log the result to the console:
var firstName = "Kimberly";
var lastName = "Ughamadu"

// We can change the value of a variable after we've assigned a value to it.
// 9. Declare a variable called `bar` and assign the number `42` to it. Log the variable
// -  Then reassign the number `99` to it and log the variable again:

bar = 42
console.log(bar);
bar = 99;
console.log(bar);
// Although JavaScript values have types underneath the hood, javascript variables do not have fixed types
// This means we can assign one type of value to a variable and then assign another type to the same variable
// 10. Declare a variable called `changes` and assign the number `56` to it. Log the variable
// -   Then reassign the string 'Now it's a string' to the variable and log it again:
var changes = 56;
console.log(changes);
changes = 'Now it\'s a string';
console.log(changes)


// If statements let us branch our code depending on the Boolean result of an expression.
// I've declared a `check` variable below:

var check 

// 11. Assign the value `true` to check and see what the if statement below logs:

 check = true

// 12. Assign the value `false` to check and see what the if statement logs:

// check =

// How does this if statment behave? Why is it necessary to first see if check is undefined?
// What happens if I comment out the outer if statement and don't see if check is undefined?
// What happens if we assign a number or a string to check instead?

if ( check !== undefined ) {

  if ( check == true ) {
    console.log('check is true!')
  } else {
    console.log('check is false. sad face')
  }

}

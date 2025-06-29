function add(a, b) {
    // Convert to numbers to handle string inputs
    const num1 = Number(a);
    const num2 = Number(b);
    
    // Check if inputs are valid numbers
    if (isNaN(num1) || isNaN(num2)) {
        throw new Error('Both inputs must be valid numbers');
    }
    
    return num1 + num2;
}

module.exports = add;

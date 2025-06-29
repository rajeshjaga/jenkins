// addition.test.js
const add = require('./addition');

// Simple test runner
function runTests() {
    let passed = 0;
    let failed = 0;

    function test(description, testFn) {
        try {
            testFn();
            console.log(`✅ ${description}`);
            passed++;
        } catch (error) {
            console.log(`❌ ${description}: ${error.message}`);
            failed++;
        }
    }

    function assertEqual(actual, expected, message) {
        if (actual !== expected) {
            throw new Error(`${message}: expected ${expected}, got ${actual}`);
        }
    }

    function assertThrows(fn, message) {
        try {
            fn();
            throw new Error(`${message}: expected function to throw`);
        } catch (error) {
            if (error.message.includes('expected function to throw')) {
                throw error;
            }
            // Function threw as expected
        }
    }

    // Test cases
    test('adds two positive numbers', () => {
        assertEqual(add(2, 3), 5, 'Adding 2 + 3');
    });

    test('adds two negative numbers', () => {
        assertEqual(add(-2, -3), -5, 'Adding -2 + -3');
    });

    test('adds positive and negative numbers', () => {
        assertEqual(add(5, -3), 2, 'Adding 5 + -3');
    });

    test('adds zero to a number', () => {
        assertEqual(add(5, 0), 5, 'Adding 5 + 0');
    });

    test('adds decimal numbers', () => {
        assertEqual(add(2.5, 3.7), 6.2, 'Adding 2.5 + 3.7');
    });

    test('converts string numbers', () => {
        assertEqual(add('2', '3'), 5, 'Adding "2" + "3"');
    });

    test('throws error for invalid input', () => {
        assertThrows(() => add('abc', 2), 'Invalid string input');
    });

    test('throws error for null input', () => {
        assertThrows(() => add(null, 2), 'Null input');
    });

    // Summary
    console.log('\n--- Test Results ---');
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log(`Total: ${passed + failed}`);
    
    if (failed === 0) {
        console.log('🎉 All tests passed!');
        process.exit(0);
    } else {
        console.log('💥 Some tests failed!');
        process.exit(1);
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    runTests();
}

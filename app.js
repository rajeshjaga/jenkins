const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware for JSON parsing
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Jenkins Demo Application',
        status: 'running',
        timestamp: new Date().toISOString(),
        build: process.env.BUILD_NUMBER || 'local',
        environment: process.env.NODE_ENV || 'development'
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: require('./package.json').version
    });
});

app.get('/api/users', (req, res) => {
    // Simulate user data
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ];
    res.json(users);
});

app.post('/api/calculate', (req, res) => {
    const { a, b, operation } = req.body;
    
    // Input validation for demo purposes
    if (typeof a !== 'number' || typeof b !== 'number') {
        return res.status(400).json({ error: 'Invalid input: a and b must be numbers' });
    }
    
    let result;
    switch (operation) {
        case 'add':
            result = a + b;
            break;
        case 'subtract':
            result = a - b;
            break;
        case 'multiply':
            result = a * b;
            break;
        case 'divide':
            if (b === 0) {
                return res.status(400).json({ error: 'Division by zero' });
            }
            result = a / b;
            break;
        default:
            return res.status(400).json({ error: 'Invalid operation' });
    }
    
    res.json({ result, operation, inputs: { a, b } });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`Build: ${process.env.BUILD_NUMBER || 'local'}`);
    });
}

module.exports = app;

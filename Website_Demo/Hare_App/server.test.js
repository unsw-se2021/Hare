const server = require('./server.js'); 

test('Server booted correctly', () => { 
	expect(server.backport).toBe(8081);
	expect(server.frontport).toBe(8080); 
	expect(server.deployport).toBe(80); 
}); 

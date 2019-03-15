const bootlog = require('./server.js'); 
test('Server booted correctly', () => { 
	expect(bootlog.backport).toBe(8081);
	expect(bootlog.frontport).toBe(8080); 
	expect(bootlog.deployport).toBe(80); 
}); 

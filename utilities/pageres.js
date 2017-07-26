const Pageres = require('pageres');

const pageres = new Pageres({delay: 2})
	.src('127.0.0.1:3000/project', ['480x320', '1024x768', '1920x1080', '1366x768', 'iphone 5s'], {crop: true})
	.dest(__dirname)
	.run()
	.then(() => console.log('done'));
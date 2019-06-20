var referrals = {};

const fs = require('fs');
const express = require('express')
const cors = require('cors')
const app = express()
const port = 80

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

app.use(cors())
app.use(express.static('public'))

app.get('/refer', (req, res) => {
	if(referrals[req.query.ref] != null) {
		referrals[req.query.ref] ++;
	}
	
	res.send('1');
});

app.get('/getrefer', (req, res) => {
	var reff = randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
	referrals[reff] = 0;
	res.send(reff);
});

app.get('/checkrefer', (req, res) => {
	if(req.query.ref != null && referrals[req.query.ref] == null) {
		referrals[req.query.ref] = 0;
	}
	
	res.send('' + referrals[req.query.ref]);
});

const earnPage = fs.readFileSync('earn.html').toString();
app.get('/earn.html', (req, res) => {
	if(fs.existsSync('skrrt'))
		res.send(earnPage.replace('yeetum = false', 'yeetum = true'));
	else
		res.send(earnPage);
});

const genPage = fs.readFileSync('gen.html').toString();
app.get('/gen', (req, res) => {
	if(fs.existsSync('skrrt'))
		res.send(genPage.replace('yeetum = false', 'yeetum = true'));
	else
		res.send(genPage);
});

app.get('/yeet123', (req, res) => {
	fs.writeFileSync('skrrt', 'nice');
	res.send('0');
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
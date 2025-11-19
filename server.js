const express = require('express')
const { readFile, writeFile } = require('./utils.js')


const app = express()
app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello world')
})

app.get('/users', (req, res) => {
	let users = readFile('./users.json')
	res.json(users)
})

app.post('/users', (req, res) => {
	let users = readFile('./users.json')
	let body = req.body
	if (!(body.lastName && body.firstName && body.phone && body.age))
		res.json({
			message: "Ma'lumot to'liq kiritilmagan",
	})
	let user = users.find(el => el.phone == body.phone)
	if(user) return res.json({message: "Bu telefon raqam mavjud"})
	body.id = users[users.length - 1].id + 1
	users.push(body)
	writeFile('./users.json', users)
	res.json({
		message: 'OK',
		status: 200,
		users,
	})
})


app.get('/users/:id', (req, res)=> {
	let userId = req.params.id

	let users = readFile('./users.json')
	let user = users.find(el => el.id == userId)
	if(!user) return res.json({
		message: "User not found",
		status: 404,
	})
	res.json({
		message: "Success",
		user
	})
})

app.listen(8080, () =>
	console.log('Server is working on http://localhost:8080'),
)

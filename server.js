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


app.put('/users/:id', (req,res) => {
	let users = readFile('./users.json')
	const body = req.body
	let user = users.find(el => el.id == req.params.id)
	console.log(user, body)
	user.firstName = body.firstName ? body.firstName : user.firstName
	user.lastName = body.lastName ? body.lastName : user.lastName
	user.phone = body.phone ? body.phone : user.phone
	user.age = body.age ? body.age : user.age
	writeFile('./users.json', users)

	res.json({
		message: "Success",
		user
	})
})

app.delete('/users/:id', (req,res) => {
	let users = readFile('./users.json')
	let data = users.filter(el => el.id != req.params.id)
	writeFile('./users.json', data)
	res.json({
		message: "Success",
		data
	})
})
app.listen(8080, () =>
	console.log('Server is working on http://localhost:8080'),
)

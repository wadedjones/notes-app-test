const mongoose = require('mongoose')

const url = 'mongodb+srv://wadedjones:Kr7yhXshla8kkVf5@cluster0.x99knrx.mongodb.net/testNoteApp?retryWrites=true&w=majority'

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'Browser can execute only JavaScript',
  important: true,
})

note.save().then(result => {
  console.log('note saved.')
  mongoose.connection.close()
})
const mongoose= require('mongoose')
const Schema = mongoose.Schema


const coursesSchema= new mongoose.Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
    name: String,
    description:String,
    costo: Number,
    imageURL: String,
    fecha:Date,
    duration:Number,
    rating:{
        type:Number,
        min:1,
        max:5
    }
},
{
    timestamps: true,
    versionKey: false
})

module.exports= mongoose.model('Courses',coursesSchema)
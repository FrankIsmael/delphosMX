const mongoose= require('mongoose')

const coursesSchema= new mongoose.Schema({
    name: String,
    description:String,
    costo: Number,
    image: '',
    fecha:Number,
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
}
)

module.exports= mongoose.model('Courses',coursesSchema)
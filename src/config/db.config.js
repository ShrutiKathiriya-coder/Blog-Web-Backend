// const mongoose= require('mongoose');

// mongoose.connect(process.env.MONGOOSE_URL)
// .then(()=>{
//     console.log("DB is conncted...");
// }).catch(err => {
//     console.log("db is disconnected",err);  
// })

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((err) => {
    console.log("MongoDB Connection Failed:", err);
});

module.exports = mongoose;

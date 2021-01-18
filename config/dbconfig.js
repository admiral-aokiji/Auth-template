const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/authentication',{
    // mongodb+srv://<username?>:<pwd>@<ClusterName>.imxuh.mongodb.net/<dbName>
    // mongodb+srv://aokiji:aokiji@personaldictionary.imxuh.mongodb.net/PersonalDictionary
    // mongodb://localhost:27017/authentication
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(() => console.log('Database Connected'))
.catch(err => console.log(err));
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-crud', { useNewUrlParser: true })
 .then(() => console.log('Connected to MongoDB'))
 .catch(err =>  console.error('Could Not Connect to MongoDB...',err));
 mongoose.set('useCreateIndex', true);

 const courseSchema = new mongoose.Schema({
    name: String,
    author: String, 
    tags: [ String ],
    date: Date, 
    isPublished: Boolean,
    price: Number
  });
  
  const Course = mongoose.model('courses', courseSchema);
  
  async function getCourses() {
    return await Course
    .find({ isPublished: true, tags: 'backend' })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
  }

  async function getCourses2() {
    return await Course
    .find({ isPublished: true, tags: {$in: ['frontend','backend']} })
    .sort({ price: -1 })
    .select({ name: 1, author: 1 });
  }

  async function getCourses3() {
      return await Course
      .find({ isPublished: true })
      .or([ { name: /.*by.*/ }, {price: {$gte: 15}}])
      .select({ name: 1, author: 1 });
  }
  
  async function run() {
    //const courses = await getCourses();
    //const courses = await getCourses2();
    const courses = await getCourses3();
    console.log(courses);
  }
  
  run();


  
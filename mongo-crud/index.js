const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/courses', { useNewUrlParser: true })
 .then(() => console.log('Connected to MongoDB'))
 .catch(err =>  console.error('Could Not Connect to MongoDB...',err));
 mongoose.set('useCreateIndex', true);


 async function createCourse(){
    const courseSchema = new mongoose.Schema({
        name: String,
        author: String,
        tags: [ String ],
        date: { type: Date, default: Date.now },
        isPublished: Boolean
     });
    
     const Course = mongoose.model('t_course', courseSchema);//class
     
     const course = new Course({
        name: 'Test Course2',
        author: 'Test Author2',
        tags: ['node2', 'backend2'],
        isPublished: true
     });//object
    
     const result = await course.save();
    
     console.log(result);
 }

 async function getCourses() {
    const courseSchema = new mongoose.Schema({
        name: String,
        author: String,
        tags: [ String ],
        date: { type: Date, default: Date.now },
        isPublished: Boolean
     });
    
     const Course = mongoose.model('t_course', courseSchema);//class

     /* To find all data from collection (Begin) */
    
     const courses = await Course.find();
    console.log(courses);

    /* To find all data from collection (End) */

    /* To find specific data from collection with multiple filters (Begin)*/

    //const course = await Course
    //.find({ author: 'Test Author', isPublished: true})
    //.find({ price: {$gte: 10, $lte: 20 } })
    //.find({ price: { $in: [10, 15, 20]} })
    /*.find()
    .or([ { author: 'Test Author'}, { isPublished: true }])
    .and([ { author: 'Test Author'}, { isPublished: true }])
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1});
     .count()
    console.log(course);*/

    /* To find specific data from collection with multiple filters (End)*/

    /* Regular expression (Begin) */

    //.find({ author: /^Abu/ }) // AUthors starts with name Abu
    //.find({ author: /Raihan$/i }) //Authors ends with name Raihan.... i indicates case insensitive
    //.find({ author: /.*Abu.*/ }) //Authors have Abu in their name in any position

    /* Regular expression (end) */
 }


 async function removeCourse(id){
   //const result = await Course.deleteOne( { _id:id } );
   //const result = await Course.deleteMany( { _id:id } );
   const course = await Course.findById(id);
   console.log(course);

 }

 async function updateCourse(id){
    const result = await Course.update({ _id:id }, {
       $set: {
          author: 'Rohan',
          isPublished: false
       }
    });


    const course = await Course.findByIdAndUpdate(id, {
      $set: {
         author: "Rohan",
         isPublished: true
      }
    }, { new: true });

    console.log(course);
 }



 //createCourse();
getCourses();
 
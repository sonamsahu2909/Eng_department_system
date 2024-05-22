const CourseModal = require("../modals/Course");

class CourseController {
  static course_insert = async (req, res) => {
    try {
      // console.log(req.body)

      const result = new CourseModal({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address,
        gender: req.body.gender,
        qualification: req.body.qualification,
        course: req.body.course,
        user_id:req.user.id
      })
      await result.save();
      req.flash('success', 'Course registration Successfully ') 
      res.redirect("/course_display"); //path is given
    } catch (error) {
      console.log(error);
    }
  };

  static course_display = async (req, res) => {
    try {
      const{name,email,id,image} = req.user
      const data = await CourseModal.find({user_id:id});
      // console.log(data)
      res.render("courses/display", { d: data,message:req.flash('success'),n:name,image:image});
    } catch (error) {
      console.log(error);
    }
  };

  static course_view = async (req, res) => {
    try {
      // console.log(req.params.id)
      const{name,email,id,image} = req.user
      const data = await CourseModal.findById(req.params.id);
      // console.log(data)
      res.render("courses/views", { d: data,n:name,e:email,image:image });
    } catch (error) {
      console.log(error);
    }
  };

  static course_edit = async (req, res) => {
    try {
      // console.log(req.params.id)
      const{name,email,id,image} = req.user
      const data = await CourseModal.findById(req.params.id);
      // console.log(data)
      res.render("courses/edit", { d: data ,n:name,e:email,image:image });
    } catch (error) {
      console.log(error);
    }
  };

  static course_update = async (req, res) => {
    try {
      // console.log(req.body)
      // console.log(req.params.id)
      const{name,email,id,image} = req.user
      const update = await CourseModal.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address,
        gender: req.body.gender,
        qualification: req.body.qualification,
        course: req.body.course
      })
      req.flash('success', 'Updated Successfully') 
      res.redirect('/course_display')

    } catch (error) {
      console.log(error);
    }
  }

  static course_delete = async (req, res) => {
    try {
      // console.log(req.body)
      // console.log(req.params.id)
      const{name,email,id,image} = req.user
      const update = await CourseModal.findByIdAndDelete(req.params.id)
      req.flash('success', 'Delete Successfully ') 
      res.redirect('/course_display')
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = CourseController;

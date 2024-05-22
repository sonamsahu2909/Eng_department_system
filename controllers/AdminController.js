const { name } = require("ejs");
const CourseModal = require("../modals/Course");

class AdminController {
  static dashbord = async (req, res) => {
    try {
      const { name, email, id, image } = req.user;
      const course = await CourseModal.find();
    //   console.log(course)
      res.render("admin/dashbord",{ d:course,n:name,e:email,image:image});
    } catch (error) {
      console.log("error");
    }
  };

  static admin_view = async (req, res) => {
    try {
      // console.log(req.params.id)
      const { name, email, id, image } = req.user;
      const course = await CourseModal.findById(req.params.id);
    //   console.log(course)
      res.render("admin/view", { d: course,n:name,e:email,image:image});
    } catch (error) {
      console.log(error);
    }
  };

  static admin_edit = async (req, res) => {
    try {
      // console.log(req.params.id)
      const { name, email, id, image } = req.user;
      const course = await CourseModal.findById(req.params.id);
      // console.log(data)
      res.render("admin/edit", { d: course,n:name,e:email,image:image });
    } catch (error) {
      console.log(error);
    }
  };

  static admin_update = async (req, res) => {
    try {
    //   console.log(req.body)
    //   console.log(req.params.id)
      const update = await CourseModal.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address,
        gender: req.body.gender,
        qualification: req.body.qualification,
        course: req.body.course,
      });
      req.flash("success", "Updated Successfully");
      res.redirect("/admin/dashbord");
    } catch (error) {
      console.log(error);
    }
  };
  static admin_delete = async (req, res) => {
    try {
      // console.log(req.body)
      // console.log(req.params.id)
      const { name, email, id, image } = req.user;
      const course = await CourseModal.findByIdAndDelete(req.params.id)
      req.flash('success', 'Delete Successfully ') 
      res.redirect('/admin/dashbord')
    } catch (error) {
      console.log(error);
    }
  }
  static update_approve = async (req, res) => {
    try {
      // console.log(req.body)
      const result = await CourseModal.findByIdAndUpdate(req.params.id,{
        comment : req.body.comment,
        status: req.body.status
      })
      res.redirect('/admin/dashbord')
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = AdminController;

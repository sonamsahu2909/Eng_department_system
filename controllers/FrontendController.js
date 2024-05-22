const UserModal = require("../modals/User");
const CourseModal = require("../modals/Course");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

cloudinary.config({
  cloud_name: "dxhsy70tz",
  api_key: "743486792624739",
  api_secret: "MjvRwDuDpBUH4X6CKUx0wMFLCuE",
});

class FrontController {
  static dashbord = async (req, res) => {
    try {
      // console.log(req.user)
      const { name, email, id, image } = req.user;
      const btech = await CourseModal.findOne({ user_id: id, course: "btech" });
      const bca = await CourseModal.findOne({ user_id: id, course: "bca" });
      const mca = await CourseModal.findOne({ user_id: id, course: "mca" });
      res.render("dashbord", {n: name,e:email,image: image,b: btech,bc: bca,mc: mca,});
    } catch (error) {
      console.log(error);
    }
  };
  static login = (req, res) => {
    res.render("login", {
      message: req.flash("success"),
      error: req.flash("error"),
    });
  };
  static register = async (req, res) => {
    try {
      res.render("registration", { message: req.flash("error") });
    } catch (error) {
      console.log(error);
    }
  };
  static insert = async (req, res) => {
    // console.log(req.files.image)
    const file = req.files.image;
    const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "studentimage",
    });
    // console.log(imageUpload)
    const { name, email, password, cpassword } = req.body;
    const User = await UserModal.findOne({ email: email });
    //  console.log(User)
    if (User) {
      req.flash("error", "Email already exist");
      res.redirect("/register"); //path is given
    } else {
      if (name && email && password && cpassword) {
        if (password == cpassword) {
          try {
            const hashpassword = await bcrypt.hash(password, 10);
            const result = new UserModal({
              name: name,
              email: email,
              password: hashpassword,
              image: {
                public_id: imageUpload.public_id,
                url: imageUpload.secure_url,
              },
            });
            await result.save();
            req.flash(
              "success",
              "Registration Successfully please login here "
            );
            res.redirect("/"); //path is given
          } catch (error) {
            console.log(error);
          }
        } else {
          req.flash("error", "password and confirm password does not match.");
          res.redirect("/register"); //path is given
        }
      } else {
        req.flash("error", "All field are required.");
        res.redirect("/register"); //path is given
      }
    }
  };

  static verify_login = async (req, res) => {
    try {
      // console.log(req.body)
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModal.findOne({ email: email });
        // console.log(user)
        if (user != null) {
          const ismatch = await bcrypt.compare(password, user.password);
          if (ismatch) {
            // multiple login
            if (user.role == "student") {
              // generate token
              const token = jwt.sign({ ID: user._id }, "sonamsahu@123456789");
              // console.log(token)
              res.cookie("token", token);
              res.redirect("/dashbord");
            }
            if (user.role == "admin") {
              // generate token
              const token = jwt.sign({ ID: user._id }, "sonamsahu@123456789");
              // console.log(token)
              res.cookie("token", token);
              res.redirect("admin/dashbord");
            }
          } else {
            req.flash("error", "email or password is not valid");
            res.redirect("/"); //path is given
          }
        } else {
          req.flash("error", "you are not register in email.");
          res.redirect("/"); //path is given
        }
      } else {
        req.flash("error", "All field are required.");
        res.redirect("/"); //path is given
      }
    } catch (error) {
      console.log(error);
    }
  };

  static logout = async (req, res) => {
    try {
      res.clearCookie("token");
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  static profile = async (req, res) => {
    try {
      const { name, email, id, image } = req.user;
      res.render("profile", {
        n: name,
        e: email,
        image: image,
        message: req.flash("success"),
        error: req.flash("error"),
      });
    } catch (error) {
      console.log(error);
    }
  };

  static change_password = async (req, res) => {
    try {
      const { name, email, id, image } = req.user;
      // console.log(req.body)
      const { oldpassword, newpassword, cpassword } = req.body;
      if (oldpassword && newpassword && cpassword) {
        const user = await UserModal.findById(id);
        const ismatch = await bcrypt.compare(oldpassword, user.password);
        if (!ismatch) {
          req.flash("error", "old password is incorrect.");
          res.redirect("/profile"); //path is given
        } else {
          if (newpassword !== cpassword) {
            req.flash("error", "password does not match.");
            res.redirect("/profile"); //path is given
          } else {
            const newHashpassword = await bcrypt.hash(newpassword, 10);
            await UserModal.findByIdAndUpdate(id, {
              $set: { password: newHashpassword },
            });
            req.flash("message", "password change successfully.");
            res.redirect("/logout"); //path is given
          }
        }
      } else {
        req.flash("error", "All field are required.");
        res.redirect("/profile"); //path is given
      }
    } catch (error) {
      console.log(error);
    }
  };

  static profile_update = async (req, res) => {
    try {
      //console.log(req.files.image)
      if (req.files) {
        const user = await UserModal.findById(req.user.id);
        const image_id = user.image.public_id;
        await cloudinary.uploader.destroy(image_id);

        const file = req.files.image;
        const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "studentimage",
        });
        var data = {
          name: req.body.name,
          email: req.body.email,
          image: {
            public_id: myimage.public_id,
            url: myimage.secure_url,
          },
        };
      } else {
        var data = {
          name: req.body.name,
          email: req.body.email,
        };
      }
      const update_profile = await UserModal.findByIdAndUpdate(req.user.id,data);
      res.redirect("/profile");
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = FrontController;

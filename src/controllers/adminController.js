
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");


const uploadProfile = require("../models/uploadProfileFirebase");
const userLocation = require("../models/userLocation")


const db = admin.database();
const refAdmin = db.ref("Admin");
const refUser = db.ref("Users");
const refGuidelines = db.ref("Guidelines");

function generateToken(userId) {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: "2h" });
  return token;
}

exports.getLoginPage = async (req, res, next) => {
  res.render("login");
};

exports.checkLogin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const pass = req.body.pass;

    // Getting Data from the firebase database
    refAdmin.once("value", async (snapshot) => {
      var data = snapshot.val();
      let found = false; // Variable to track if a valid email is found
      for (let i in data) {
        if (data[i].email === email) {
          const adminPass = data[i].password;

          // Check firebase admin password with user login enter password
          if (adminPass === pass) {
            const token = generateToken(email); // Generate token

            // Store the token in a cookie
            res.cookie("token", token, { maxAge: 3600000, httpOnly: true });
            res.redirect("/");
            found = true; // Mark as found
            break; // Exit the loop since a valid email is found
          }
        }
      }

      if (!found) { 
        res.status(201).render("login", {
          Error: "Please enter valid email/password",
        });
      }
    }, (error) => {
      res.render("error", { Error: error });
    });
  } catch (error) {
    res.render("error", { Error: error });
  }
};

exports.getRegisterPage = async (req, res, next) => {
  res.render("register");
};

exports.registerAdmin = async (req, res, next) => {
  try {

    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.pass;
    const cpassword = req.body.cpass;

    if (password === cpassword) {

      // Save data in Firebase Realtime Database
      await refAdmin.child(phone).set({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
      }, async (error) => {
        if (error) {
          console.log('Data could not be saved' + error);
        } else {
          console.log('Data saved successfully to Realtime Database');

          // Upload File into the firebase
          uploadProfile(firstname, lastname, req.file);

        }
      });

      res.status(201).redirect("/login");
    }
    else {
      res.render("register", { Error: "Please enter same password" });
    }

  } catch (e) {
    res.render("error", { Error: error });
  }
};

exports.getLogoPage = async (req, res, next) => {
  res.render("logo");
};


exports.getDashboardPage = async (req, res, next) => {
  res.render("dashboard");
};

exports.getMapPage = async (req, res, next) => {
  userLocation();
  res.render("map");
};
exports.getMessagesPage = async (req, res, next) => {
  res.render("messages");
};

exports.getGuidelinesPage = async (req, res, next) => {
  res.render("guidelines");
};

exports.setGuidelinesPage = async (req, res, next) => {
  try {
    const guidelines = req.body.guidelines;

    // Function to check if a guideline already exists in the database
    function doesGuidelineExist(guideline, existingGuidelines) {
      for (var i = 0; i < existingGuidelines.length; i++) {
        if (existingGuidelines[i] === guideline) {
          return true;
        }
      }
      return false;
    }

    refGuidelines.once('value').then(async function (snapshot) {
      var existingGuidelines = snapshot.val() || [];

      if (!doesGuidelineExist(guidelines, existingGuidelines)) {
        existingGuidelines.push(guidelines);
        await refGuidelines.set(existingGuidelines);
        res.render("guidelines", { successMessage: "Guidelines saved successfully." });
      }
      else{
        res.render("guidelines", { errorMessage:"Guideline already exists!"});
      }
    })

  } catch (error) {
    res.render("guidelines", { errorMessage: "Error: " + error });
  }
};

exports.logoutAdmin = async (req, res, next) => {
  // Clear the user's session or token
  res.clearCookie("token");
  res.redirect("/login");
};

exports.errorPage = async (req, res, next) => {
  res.render("error");
};

exports.getUserData = async (req, res, next) => {
  refUser.once("value", (snapshot) => {
    res.send(snapshot.val());
  }, (error) => {
    res.render("error", { Error: error });
  });
};


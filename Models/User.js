import Sequelize from "sequelize";
import sequelize from "../utils/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import secret from "../utils/config";

const User = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "Email address already in use!"
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
const validPassword = (password, dbPassword) => {
  return bcrypt.compare(password, dbPassword);
};

const login = async (email, password) => {
  let response = {};
  const user = await User.findOne({
    where: {
      email: email
    }
  });
  if (!user) {
    response["isSuccess"] = false;
    response["data"] = "Invalid Email/Password";
  } else {
    await validPassword(password, user.password)
      .then(res => {
        if (res) {
          const token = jwt.sign(user.email, secret);
          response["isSuccess"] = true;
          response["data"] = user;
          response["token"] = token;
        } else {
          response["isSuccess"] = false;
          response["data"] = "Invalid Email/Password";
        }
      })
      .catch(error => {
        throw new Error(error);
      });
  }
  return response;
};

const registerUser = async data => {
  const { firstName, lastName, email, password } = data;
  let response = {};
  await User.create({
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: generateHash(password)
  })
    .then(res => {
      response["isSuccess"] = true;
      response["data"] = res;
      console.log("res>>", response);
    })
    .catch(error => {
      throw new Error(error);
    });
  return response;
};
const emailAlreadyExist = async email => {
  let isvalidEmail = false;
  await User.findOne({
    where: {
      email: email
    }
  })
    .then(res => {
      if (res) {
        isvalidEmail = true;
      }
    })
    .catch(error => {
      throw new Error(error);
    });
  return isvalidEmail;
};
const updateUser = async (email, newPassword) => {
  let response = {};
  await User.findOne({
    where: {
      email: email
    }
  })
    .then(res => {
      if (!res) {
        response["isSuccess"] = false;
        response["data"] = "No User Found!!"
      }
      else {
        res.password = generateHash(newPassword)
        res.save();
        response["isSuccess"] = true;
        response["data"] = "Reset Password Successful!!"
      }

    })
    .catch(error => {
      throw new Error(error);
    });
  return response
}
export { User, login, registerUser, emailAlreadyExist, updateUser };

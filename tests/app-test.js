const request = require("supertest");
const app = require("../app");
const expect = require("chai").expect;

describe("Username validation", () => {
  it("shows username must be at least 4 characters long alert", (done) => {
    const newUser = {
      username: "lor",
      email: "lorem@gmail.com",
      password: "randompassword24sS",
      confirmPassword: "randompassword24sS"
    };

    request(app)
      .post("/users")
      .set("Content-Type", "application/json")
      .send(newUser)
      .expect("Content-Type", "text/html; charset=utf-8")
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include("Username must be at least 4 characters long");
        done();
      });
  });

  it("shows username should not include spaces alert", (done) => {
    const newUser = {
      username: "lor em",
      email: "lorem@gmail.com",
      password: "randompassword24sS",
      confirmPassword: "randompassword24sS"
    };

    request(app)
      .post("/users")
      .set("Content-Type", "application/json")
      .send(newUser)
      .expect("Content-Type", "text/html; charset=utf-8")
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include("Username should not include space");
        done();
      });
  });

  it("shows username should not be empty", (done) => {
    const newUser = {
      username: "",
      email: "lorem@gmail.com",
      password: "randompassword24sS",
      confirmPassword: "randompassword24sS"
    };

    request(app)
      .post("/users")
      .set("Content-Type", "application/json")
      .send(newUser)
      .expect("Content-Type", "text/html; charset=utf-8")
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include("Username should not be empty");
        done();
      });
  });
});

describe("Email validation", () => {
  it("shows email already exists alert", (done) => {
    const newUser = {
      username: "lorem",
      email: "halit@re-coded.com",
      password: "randompassword24sS",
      confirmPassword: "randompassword24sS"
    };

    request(app)
      .post("/users")
      .set("Content-Type", "application/json")
      .send(newUser)
      .expect("Content-Type", "text/html; charset=utf-8")
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include("Email already exists");
        done();
      });
  });

  it("shows invalid email alert", (done) => {
    const newUser = {
      username: "lorem",
      email: "loremgmail.com",
      password: "randompassword24sS",
      confirmPassword: "randompassword24sS"
    };

    request(app)
      .post("/users")
      .set("Content-Type", "application/json")
      .send(newUser)
      .expect("Content-Type", "text/html; charset=utf-8")
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include("Invalid email");
        done();
      });
  });

  it("shows email should not be empty alert", (done) => {
    const newUser = {
      username: "lorem",
      email: "",
      password: "randompassword24sS",
      confirmPassword: "randompassword24sS"
    };

    request(app)
      .post("/users")
      .set("Content-Type", "application/json")
      .send(newUser)
      .expect("Content-Type", "text/html; charset=utf-8")
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include("Email should not be empty");
        done();
      });
  });
});

describe("Password validation", () => {
  it("shows password must be at least 5 characters long alert", (done) => {
    const newUser = {
      username: "lorem",
      email: "lorem@gmail.com",
      password: "r24S",
      confirmPassword: "r24S"
    };

    request(app)
      .post("/users")
      .set("Content-Type", "application/json")
      .send(newUser)
      .expect("Content-Type", "text/html; charset=utf-8")
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include("Password must be at least 5 characters long");
        done();
      });
  });

  it("shows password character requirements alert", (done) => {
    const newUser = {
      username: "lorem",
      email: "loremgmail.com",
      password: "randompassword",
      confirmPassword: "randompassword"
    };

    request(app)
      .post("/users")
      .set("Content-Type", "application/json")
      .send(newUser)
      .expect("Content-Type", "text/html; charset=utf-8")
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include("Password must contain a number, uppercase and lowercase");
        done();
      });
  });

  it("shows password are not matching alert", (done) => {
    const newUser = {
      username: "lorem",
      email: "loremgmail.com",
      password: "randompassword24sS",
      confirmPassword: "randompassword24s"
    };

    request(app)
      .post("/users")
      .set("Content-Type", "application/json")
      .send(newUser)
      .expect("Content-Type", "text/html; charset=utf-8")
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include("Passwords are not matching");
        done();
      });
  });

  it("shows password should not be empty", (done) => {
    const newUser = {
      username: "lorem",
      email: "lorem@gmail.com",
      password: "",
      confirmPassword: ""
    };

    request(app)
      .post("/users")
      .set("Content-Type", "application/json")
      .send(newUser)
      .expect("Content-Type", "text/html; charset=utf-8")
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include("Password should not be empty");
        done();
      });
  });
});

describe("Successful registration", () => {
  it("shows success alert", (done) => {
    const newUser = {
      username: "lorem",
      email: "lorem@gmail.com",
      password: "randompasswordssS24",
      confirmPassword: "randompasswordssS24"
    };

    request(app)
      .post("/users")
      .set("Content-Type", "application/json")
      .send(newUser)
      .expect("Content-Type", "text/html; charset=utf-8")
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include("Congratulations, your account has been successfully created!");
        done();
      });
  });
});

describe("After successful registration", () => {
  it("shows email already used for previous email", (done) => {
    const newUser = {
      username: "lorem",
      email: "lorem@gmail.com",
      password: "randompasswordssS24",
      confirmPassword: "randompasswordssS24"
    };

    request(app)
      .post("/users")
      .set("Content-Type", "application/json")
      .send(newUser)
      .expect("Content-Type", "text/html; charset=utf-8")
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include("Email already exists");
        done();
      });
  });
});
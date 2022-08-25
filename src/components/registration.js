import React from "react";
import bgImg1 from "../assets/img2.jpg";
import { useForm } from "react-hook-form";
//import { getAllRegisterUsers } from "../services/getService";
import axios from "axios";

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log(watch("role")); //watch input value by passing the name of it

  const onSubmit = (data) => {
    console.log(data);
    const temp = {
      userName: data.username,
      f_name: data.first_name,
      l_name: data.last_name,
      pswd: data.password,
      role: data.role,
      age: data.age,
      gender: data.gender,
      mob_number: data.mobile,
      classId: data.classId,
      classSec: data.classSec,
      roll_no: data.rollNo,
    };

    axios.post("/register", temp).then((res) => {
      console.log(res);
    });
    // getAllRegisterUsers().then((res) => {
    //   if (res) {
    //     console.log(res);
    //   }
    // });
  };
  onchange = (e) => {
    if (e.target.value === "student") {
      document.getElementsByName("classId")[0].hidden = false;
      document.getElementsByName("classSec")[0].hidden = false;
      document.getElementsByName("rollNo")[0].hidden = false;
    } else {
      document.getElementsByName("classId")[0].hidden = true;
      document.getElementsByName("classSec")[0].hidden = true;
      document.getElementsByName("rollNo")[0].hidden = true;
    }
  };

  return (
    <section>
      <div className="register">
        <div className="col-1">
          <h2>Register</h2>
          <a href="/">Sign In and enjoy the service</a>

          <form
            id="form"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div
              id="form"
              className="flex flex-col"
              style={{ overflowY: "scroll", height: "350px" }}
            >
              <select {...register("role")} name="role" onChange={onchange}>
                <option value="student">Student</option>{" "}
                <option value="teacher">Teacher</option>
                <option value="principal">Principal</option>
              </select>
              <input
                type="text"
                {...register("username")}
                placeholder="Username"
              />
              <input
                type="text"
                {...register("first_name")}
                placeholder="First Name"
              />
              <input
                type="text"
                {...register("last_name")}
                placeholder="Last Name"
              />
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
              />

              <input
                type="text"
                {...register("classId")}
                name="classId"
                placeholder="Class"
              />
              <input
                type="text"
                name="classSec"
                {...register("classSec")}
                placeholder="Section"
              />
              <input
                type="text"
                name="rollNo"
                {...register("rollNo")}
                placeholder="Roll Number"
              />

              <input type="text" {...register("age")} placeholder="Age" />
              <input
                type="text"
                {...register("mobile", { required: true, maxLength: 10 })}
                placeholder="Mobile number"
              />
              <select {...register("gender")}>
                <option value="other">other</option>{" "}
                <option value="female">female</option>
                <option value="male">male</option>
              </select>
            </div>
            {errors.mobile?.type === "required" && "Mobile Number is required"}
            {errors.mobile?.type === "maxLength" && "Max Length Exceed"}

            <button className="btn">Register</button>
          </form>
        </div>
        <div className="col-2">
          <img src={bgImg1} alt="" />
        </div>
      </div>
    </section>
  );
}

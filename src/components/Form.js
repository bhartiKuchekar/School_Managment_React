import React from "react";
import bgImg1 from "../assets/img2.jpg";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export default function Form() {
  let history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const temp = {
      userName: data.username,
      pswd: data.password,
    };
    console.log(temp);
    axios.post("register/login", temp).then((res) => {
      console.log(res);
      if (res.data.status === 200) {
        const userInfo = {
          name: res.data.data.userName,
          pswd: res.data.data.pswd,
          role: res.data.data.role,
        };
        localStorage.setItem("user-info", JSON.stringify(userInfo));
        history.push("/dashboard");
        toast.success(res.data.msg, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        toast.error(res.data.msg, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    });
  };

  return (
    <section>
      <div className=" register">
        <div className="col-1">
          <h2>Sign In</h2>
          <a href="/register">Register and enjoy the service</a>

          <form
            id="form"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              {...register("username")}
              placeholder="username"
            />
            <input
              type="password"
              {...register("password")}
              placeholder="password"
            />
            {/* <input
              type="text"
              {...register("confirmpwd")}
              placeholder="confirm password"
            />
            <input
              type="text"
              {...register("mobile", { required: true, maxLength: 10 })}
              placeholder="mobile number"
            />
            {errors.mobile?.type === "required" && "Mobile Number is required"}
            {errors.mobile?.type === "maxLength" && "Max Length Exceed"} */}
            <button className="btn">Sign In</button>
          </form>
        </div>
        <div className="col-2">
          <img src={bgImg1} alt="" />
        </div>
      </div>
    </section>
  );
}

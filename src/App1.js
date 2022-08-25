import "./App1.css";
import SideMenu, { menuItems } from "./components/SideMenu";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Student from "./components/Student/student";
import AddStudent from "./components/Student/addStudent";
import EditStudent from "./components/Student/editStudent";
import Teacher from "./components/Teacher/teacherList";
import AddTeacher from "./components/Teacher/addTeacher";
//import Editteachent from "./components/Teacher/editTeacher";
import EditTeacher from "./components/Teacher/editTeacher";
import ClassList from "./components/Configuration/Class/ClassList";
import SubjectList from "./components/Configuration/Subject/SubjectList";
import AddCls from "./components/Configuration/Class/addCls";
import AddSubject from "./components/Configuration/Subject/addSub";
import EditCls from "./components/Configuration/Class/editCls";
import EditSub from "./components/Configuration/Subject/editSub";

let user = JSON.parse(localStorage.getItem("user-info"));
const Dashboard = () => (
  <h1 style={{ color: "white" }}>
    Welcome... {user == undefined ? "" : user.name}
  </h1>
);
// const Content = () => <h1>Content</h1>;
// const Courses = () => <h1>Content/Courses</h1>;
//const Videos = () => <h1>Content/Videos</h1>;
//const Design = () => <h1>Design</h1>;
//const Content2 = () => <h1>Content2</h1>;
const Courses2 = () => <h1>Content/Courses 2</h1>;
const Videos2 = () => <h1>Content/Videos 2</h1>;
const Design2 = () => <h1>Design 2</h1>;

function App1() {
  const [inactive, setInactive] = useState(false);

  return (
    <div className="App1">
      <Router>
        <SideMenu
          onCollapse={(inactive) => {
            console.log(inactive);
            setInactive(inactive);
          }}
        />

        <div className={`container ${inactive ? "inactive" : ""}`}>
          {/* improvememt, not recorded in video, its just looping through menuItems
          instead of hard coding all the routes */}
          {/* {menuItems.map((menu, index) => (
            <>
              <Route key={menu.name} exact={menu.exact} path={menu.to}>
                <h1>{menu.name}</h1>
              </Route>
              {menu.subMenus && menu.subMenus.length > 0
                ? menu.subMenus.map((subMenu, i) => (
                    <Route key={subMenu.name} path={subMenu.to}>
                      <h1>{subMenu.name}</h1>
                    </Route>
                  ))
                : null}
            </>
          ))} */}

          <Switch>
            <Route exact path={"/dashboard"}>
              <Dashboard />
            </Route>
            <Route exact path={"/student"}>
              <Student />
            </Route>
            <Route path={"/student/addStudent"}>
              <AddStudent />
            </Route>
            <Route path={"/student/editStudent"}>
              <EditStudent />
            </Route>
            <Route path={"/teacher"}>
              <Teacher />
            </Route>
            <Route path={"/addTeacher"}>
              <AddTeacher />
            </Route>
            <Route path={"/editTeacher"}>
              <EditTeacher />
            </Route>
            <Route path={"/classList"}>
              <ClassList />
            </Route>
            <Route path={"/addClass"}>
              <AddCls />
            </Route>
            <Route path={"/editClass"}>
              <EditCls />
            </Route>
            <Route path={"/subjectList"}>
              <SubjectList />
            </Route>
            <Route path={"/addSub"}>
              <AddSubject />
            </Route>
            <Route path={"/editSubject"}>
              <EditSub />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App1;

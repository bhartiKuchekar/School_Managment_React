import React, { useEffect, useState } from "react";
import "../../components/font-awesome/css/font-awesome.min.css";
import { Button, CardBody, Card, CardHeader, Table } from "reactstrap";
import axios from "axios";
import AddStudent from "./addStudent";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
function Student() {
  const [dataList, setDataList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  let history = useHistory();
  useEffect(() => {
    axios.get("/student").then((res) => {
      //  console.log(res);
      if (res.status === 200) {
        setDataList(res.data);
      }
    });
  }, [dataList]);

  const handleDelete = (studId) => {
    var id = studId;
    axios.delete("/student/delete_student/" + id).then((res) => {
      //console.log(res);
      if (res.status === 200) {
        toast.success("Deleted Successfully..!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        toast.error("Something went wrong..!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    });
  };
  const handleEdit = (stud) => {
    console.log(stud);
    history.push({
      pathname: "student/editStudent",
      state: { stud },
    });
    // history.push("student/editStudent", stud);
  };

  const tabledata = dataList.map((stud) => {
    return (
      <tr
        key={stud.id}
        className="borderBottomTable"
        style={{ textAlign: "center" }}
      >
        <td>{stud.name}</td>
        <td>{stud.middle_name}</td>
        <td>{stud.last_name}</td>
        <td>{stud.classId}</td>
        <td>{stud.age}</td>
        <td>{stud.gender}</td>
        <td>{stud.roll_no}</td>
        <td>
          <span>
            <i
              className="fa fa-edit"
              style={{ fontSize: "x-large" }}
              onClick={() => handleEdit(stud)}
            />
          </span>
          <span>
            <i
              className="fa fa-trash"
              style={{ fontSize: "x-large", marginLeft: "15%" }}
              onClick={() => handleDelete(stud._id)}
            />
          </span>
        </td>
      </tr>
    );
  });
  return (
    <Card
      style={{
        maxWidth: "1120px",
        height: "560px",
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "12px",
      }}
    >
      <CardHeader
        style={{
          color: "white",
          padding: "1%",
          backgroundColor: "#5864ed",
          textAlign: "center",
        }}
      >
        <b>Student List</b>
        <span style={{ float: "right", width: "5%", fontSize: "x-large" }}>
          <i
            className="fa fa-plus"
            onClick={() => {
              history.push("student/addStudent");
            }}
          />
        </span>
      </CardHeader>

      <CardBody>
        <Table responsive striped style={{ marginTop: "2%" }}>
          <thead>
            <tr>
              <th style={{ width: "13%" }}>First Name</th>
              <th style={{ width: "13%" }}>Middle Name</th>
              <th style={{ width: "13%" }}>Last Name</th>
              <th style={{ width: "8%" }}>Class</th>
              <th style={{ width: "8%" }}>Age</th>
              <th style={{ width: "10%" }}>Gender</th>
              <th style={{ width: "10%" }}>Roll No.</th>
              <th style={{ width: "10%" }}></th>
            </tr>
          </thead>
          <tbody>{tabledata}</tbody>
        </Table>
        {/* {modalOpen && <AddStudent setOpenModal={setModalOpen} />} */}
        {/* <Table responsive striped style={{ marginTop: "2%" }}>
          <tbody>{tabledata}</tbody>
        </Table> */}
      </CardBody>
    </Card>
  );
}

export default Student;

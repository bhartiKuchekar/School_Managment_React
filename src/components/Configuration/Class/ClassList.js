import React, { useEffect, useState } from "react";
//import "./font-awesome/css/font-awesome.min.css";
import { CardBody, Card, CardHeader, Table, Input } from "reactstrap";
import axios from "axios";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
toast.configure();
function ClassList() {
  const [dataList, setDataList] = useState([]);
  let history = useHistory();
  useEffect(() => {
    axios.get("/cls").then((res) => {
      if (res.status === 200) {
        setDataList(res.data);
      }
    });
  }, [dataList]);
  const handleEdit = (cls) => {
    history.push({
      pathname: "/editClass",
      state: { cls },
    });
  };
  const handleDelete = (clsId) => {
    var id = clsId;
    axios.delete("/cls/delete_class/" + id).then((res) => {
      console.log(res);
      if (res.data.status === 200) {
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
  const tabledata = dataList.map((cls) => {
    return (
      <tr
        key={cls.id}
        className="borderBottomTable"
        style={{ textAlign: "center" }}
      >
        <td>{cls.classId}</td>
        <td>{cls.classSec}</td>
        <td>{cls.classTeacher}</td>
        <td>
          <span>
            <i
              className="fa fa-edit"
              style={{ fontSize: "x-large" }}
              onClick={() => handleEdit(cls)}
            />
          </span>
          <span>
            <i
              className="fa fa-trash"
              style={{ fontSize: "x-large", marginLeft: "15%" }}
              onClick={() => handleDelete(cls._id)}
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
        <b>Class List</b>
        <span style={{ float: "right", width: "5%", fontSize: "x-large" }}>
          <i
            className="fa fa-plus"
            onClick={() => {
              history.push("/addClass");
            }}
          />
        </span>
      </CardHeader>

      <CardBody>
        <Table responsive striped style={{ marginTop: "2%" }}>
          <thead>
            <tr>
              <th style={{ width: "13%" }}>Class</th>
              <th style={{ width: "13%" }}>Class Section</th>
              <th style={{ width: "10%" }}>Class Teacher</th>
              <th style={{ width: "10%" }}></th>
            </tr>
          </thead>
          <tbody>{tabledata}</tbody>
        </Table>
      </CardBody>
    </Card>
  );
}

export default ClassList;

import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Layout from "../layout/Layout";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import callApi from "./../common/apiCaller";
import { green, purple } from "@material-ui/core/colors";
import { useHistory } from "react-router-dom";
import { OutlinedInput } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { DataGrid } from '@material-ui/data-grid';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const useStyles = makeStyles({
  table: {
    width: "870px",
  },
  padding: {
    margin: "74px 240px 0px 0px",
  },
  buttom: {
    marginLeft: "8px !impotant",
  },
});

export default function Staff() {
  const classes = useStyles();
  const [itemsList, setItemsList] = useState([]);
  const [itemAdd, setItemAdd] = useState({});
  const [x, setX] = useState("");

  useEffect(() => {
    initPage();
    setX("");
  }, [itemsList]); 

  const formatPrice = (x) => {
    return x.toLocaleString("it-IT", { style: "currency", currency: "VND" });
  };

  const initPage = () => {
    callApi("users", "GET", null).then((res) => {
      if (res.status === 200) {
        var result = [];
        res.data.map((item) => {
          result.push({
            id: item.id,
            names: item.names,
            email: item.email,
            position: handlePosition(item.roles),
            salary: formatPrice(item.salary)
          })
        })
        setItemsList(result)
      }
    });

  };

  const handlePosition = (x) => {
    if (x.length === 2 ) {
      return "Manager";
    }

    else {
      return "Employee"
    }
  }


  const onFormAdd = () => {
    console.log(itemAdd);
    setItemAdd({
      username: "",
      email: "",
      names: "",
      salary: "",
      password: "", 
      roles: ""
    });
  };

  const handleAdd = (x) => {
    if (x === "employee") {
      return [
        {
        "id": 1
      }
    ]
    } 
    if (x === "manager") {
      return [
        {
        "id": 1
        },
        {
          "id":2
        }
    ]
    }
  }

  const onSave = () => {
    console.log(itemAdd);
    callApi(`sign_up`, "POST", itemAdd);
    setX(1);
  };

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'names', headerName: 'Name', width: 220 },
  { field: 'email', headerName: 'Email', width: 230 },
  {
    field: 'position',
    headerName: 'Position',
    width: 130,
  },
  {
    field: 'salary',
    headerName: 'Salary',
    type: 'number',
    width: 150,
  },
];

  console.log(itemsList);
  return (
    <Layout>
      <Grid className={classes.padding}>
        <h1 className="text-center">Employee Manager</h1>
        <Grid container>
          <Grid container>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onFormAdd()}
              data-toggle="modal"
              data-target="#1"
              className="mb-2"
            >
              <AddIcon />
              <span>Add Item</span>
            </Button>
          </Grid>
        </Grid>

        {/* <!-- Modal --> */}
        <div
          style={{ margin: "74px 0px 0px 0px" }}
          class="modal fade"
          id="1"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Please enter staff information !
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div class="modal-body">
                <from>
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">
                      Username:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="itemAdd.username"
                      value={itemAdd.username}
                      onChange={(e) =>
                        setItemAdd({
                          username: e.target.value,
                          email: itemAdd.email,
                          names: itemAdd.name,
                          salary: itemAdd.salary,
                          password: itemAdd.password,
                          roles: itemAdd.roles,
                        })
                      }
                    ></input>
                  </div>
                                    <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">
                      Password:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="itemAdd.password"
                      value={itemAdd.password}
                      onChange={(e) =>
                        setItemAdd({
                          username: itemAdd.username,
                          email: itemAdd.email,
                          names: itemAdd.names,
                          salary: itemAdd.salary,
                          password: e.target.value,
                          roles: itemAdd.roles,
                        })
                      }
                    ></input>
                  </div>
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">
                      Email:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="itemAdd.email"
                      value={itemAdd.email}
                      onChange={(e) =>
                        setItemAdd({
                          username: itemAdd.username,
                          email: e.target.value,
                          names: itemAdd.name,
                          salary: itemAdd.salary,
                          password: itemAdd.password,
                          roles: itemAdd.roles,
                        })
                      }
                    ></input>
                  </div>
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">
                      Name:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="itemAdd.names"
                      value={itemAdd.names}
                      onChange={(e) =>
                        setItemAdd({
                          username: itemAdd.username,
                          email: itemAdd.email,
                          names: e.target.value,
                          salary: itemAdd.salary,
                          password: itemAdd.password,
                          roles: itemAdd.roles,
                        })
                      }
                    ></input>
                  </div>
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">
                      Salary:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="itemAdd.salary"
                      value={itemAdd.salary}
                      onChange={(e) =>
                        setItemAdd({
                          username: itemAdd.username,
                          email: itemAdd.email,
                          names: itemAdd.names,
                          salary: e.target.value,
                          password: itemAdd.password,
                          roles: itemAdd.roles,
                        })
                      }
                    ></input>
                  </div>
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">
                      Roles:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="itemAdd.roles"
                      value={itemAdd.roles}
                      onChange={(e) =>
                        setItemAdd({
                          username: itemAdd.username,
                          email: itemAdd.email,
                          names: itemAdd.names,
                          salary: itemAdd.salary,
                          password: itemAdd.password,
                          roles: handleAdd(e.target.value),
                        })
                      }
                    ></input>
                  </div>
                </from>
              </div>
              <div class="modal-footer">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                  data-dismiss="modal"
                  onClick={() => onSave()}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  size="small"
                  className={classes.button}
                  startIcon={<CancelIcon />}
                  data-dismiss="modal"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* ------end----Modal */}
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            aria-label="customized table"
          >

          </Table>
        </TableContainer>
      <div style={{ height: 400, width: '100%' }}>

        <DataGrid rows={itemsList} columns={columns} pageSize={5} checkboxSelection />
    </div>

      </Grid>
    </Layout>
  );
}

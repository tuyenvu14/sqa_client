import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Layout from "../../layout/Layout";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import callApi from "./../../common/apiCaller";
import { green, purple } from "@material-ui/core/colors";
import { useHistory } from "react-router-dom";
import { OutlinedInput } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

export default function Item() {
  const classes = useStyles();
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [itemsList, setItemsList] = useState([]); 
  const [itemShow, setItemShow] = useState([]);
  const [itemAdd, setItemAdd] = useState({
    id: "",
    name: "",
    type: "",
    price: "",
    status: "",
  });
  const [itemUpdate, setItemUpdate] = useState({});
  const [name, setName] = useState("");

  useEffect(() => {
    initPage();
  }, [itemsList, itemUpdate, itemAdd, name]);

  const formatPrice = (x) => {
    return x.toLocaleString("it-IT", { style: "currency", currency: "VND" });
  };

  const initPage = () => {
    callApi("items", "GET", null).then((res) => {
      if (res.status === 200) {
        setItemsList(res.data);
      }
    });
    // setItemShow(itemsList);
  };

  const onDelete = (id) => {
    var listItem = itemsList;
    callApi(`items/${id}`, "DELETE", null).then((res) => {
      
      if (res.status === 200) {
        setOpen1(true)
        var index = findIndex(listItem, id);
        if (index !== -1) {
          listItem.splice(index, 1);
          setItemsList(listItem);
        }
        setOpen1(true)
      }
    });
  };

  const onSaveEdit = (id) => {
    callApi(`items/${id}`, "PUT", itemUpdate).then((res) => {
      if (res.status === 200) {
        setOpen1(true)
      } else {
        setOpen2(true)
      }
    });
    console.log(itemUpdate);
  };

  const onEdit = (id) => {
    callApi(`items/${id}`, "GET", null).then((res) => {
      if (res.status === 200) {
        setItemUpdate({
          id: res.data.id,
          name: res.data.name,
          type: res.data.type,
          price: res.data.price,
          status: res.data.status,
        });
      }
    });
    console.log(itemUpdate);
  };
console.log(itemUpdate);
  
  const onFormAdd = () => {
    console.log(itemAdd);
    setItemAdd({
      name: "",
      type: "",
      price: "",
    });
    console.log(itemAdd);
  };

  const onSave = () => {
    callApi(`items`, "POST", itemAdd).then((res) => {
      if (res.status === 200) {
        setOpen1(true)
      }
     else {
          setOpen2(true)
      }
    })
  };

  const onSearch = () => {
    // setItemShow(itemsList)
    if (name) {
      var list = [];
      itemsList.map((item) => {
        if (item.name.indexOf(name) !== -1) {
          list.push(item);
        }
      });
      // console.log(name);
      // console.log(list);
      setItemShow(list);
    }
  };

  const changed = (e) => {
    setName(e.target.value);
    var list = [];
    itemsList.map((item) => {
      if (item.name.indexOf(name) !== -1) {
        list.push(item);
      }
    });
    setItemShow(list);
  };

  const findIndex = (listItems, id) => {
    var result = -1;
    listItems.forEach((item, index) => {
      if (item.id === id) {
        result = index;
      }
    });
    return result;
  };

    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen2(false);
    setOpen1(false);
  };

  // console.log(123);
  return (
    <Layout>
      <Grid className={classes.padding}>
      <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
            Success!
        </Alert>
      </Snackbar>
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
         Fail!
        </Alert>
      </Snackbar>
        <h1 className="text-center">Product Manager</h1>
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

          <Grid container>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                className="mb-2"
                onClick={() => onSearch()}
              >
                Search
              </Button>
            </Grid>
            <Grid item xs={2}>
              <input type="text" name="name" onChange={changed}></input>
            </Grid>
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
                  Please enter product information !
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
                      Name:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="name"
                      value={itemAdd.name}
                      onChange={(e) =>
                        setItemAdd({
                          // id: itemUpdate.id,
                          stauts: itemUpdate.status,
                          name: e.target.value,
                          type: itemAdd.type,
                          price: itemAdd.price,
                        })
                      }
                    ></input>
                  </div>
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">
                      Tpye:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      value={itemAdd.type}
                      onChange={(e) =>
                        setItemAdd({
                          // id: itemUpdate.id,
                          stauts: itemUpdate.status,
                          name: itemAdd.name,
                          type: e.target.value,
                          price: itemAdd.price,
                        })
                      }
                    ></input>
                  </div>
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">
                      Price:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      value={itemAdd.price}
                      onChange={(e) =>
                        setItemAdd({
                          // id: itemUpdate.id,
                          // stauts: itemUpdate.status,
                          name: itemAdd.name,
                          type: itemAdd.type,
                          price: e.target.value,
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
            pageSize={2}
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">STT</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Type</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody pageSize={2}>
              {!name &&
                itemsList.map((item) => (
                  <StyledTableRow key={item.id} pageSize={2}>
                    <StyledTableCell align="right">{item.id}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{item.type}</StyledTableCell>
                    <StyledTableCell align="right">
                      {formatPrice(item.price)}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                    {item?.status > 0 &&  (<div>{item.status}</div>) }
                      {item?.status <= 0 &&  (<div>Hết hàng</div>) }
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <ColorButton
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.marginRight}
                        onClick={() => onEdit(item.id)}
                        data-toggle="modal"
                        data-target="#2"
                      >
                        <EditIcon />
                      </ColorButton>
                      {/* <!-- Modal --> */}
                      <div
                        style={{ margin: "74px 0px 0px 0px" }}
                        class="modal fade"
                        id="2"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">
                                Please edit product information !
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
                                  <label
                                    for="recipient-name"
                                    class="col-form-label"
                                  >
                                    Name:
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    name="name"
                                    value={itemUpdate.name}
                                    onChange={(e) =>
                                      setItemUpdate({
                                        id: itemUpdate.id,
                                        stauts: itemUpdate.status,
                                        name: e.target.value,
                                        type: itemUpdate.type,
                                        price: itemUpdate.price,
                                      })
                                    }
                                  ></input>
                                </div>
                                <div class="mb-3">
                                  <label
                                    for="recipient-name"
                                    class="col-form-label"
                                  >
                                    Tpye:
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    value={itemUpdate.type}
                                    onChange={(e) =>
                                      setItemUpdate({
                                        id: itemUpdate.id,
                                        stauts: itemUpdate.status,
                                        name: itemUpdate.name,
                                        type: e.target.value,
                                        price: itemUpdate.price,
                                      })
                                    }
                                  ></input>
                                </div>
                                <div class="mb-3">
                                  <label
                                    for="recipient-name"
                                    class="col-form-label"
                                  >
                                    Price:
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    value={itemUpdate.price}
                                    onChange={(e) =>
                                      setItemUpdate({
                                        id: itemUpdate.id,
                                        stauts: itemUpdate.status,
                                        name: itemUpdate.name,
                                        type: itemUpdate.type,
                                        price: e.target.value,
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
                                onClick={() => onSaveEdit(itemUpdate.id)}
                              >
                                Save Edit
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
                      {/* -----end Modal----- */}
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={classes.button}
                        onClick={() => onDelete(item.id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              {name &&
                itemShow.map((item) => (
                  <StyledTableRow key={item.id} pageSize={2}>
                    <StyledTableCell align="right">{item.id}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{item.type}</StyledTableCell>
                    <StyledTableCell align="right">
                      {formatPrice(item.price)}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.status > 0 &&  (<div>{item.status}</div>) }
                      {item.status <= 0 &&  (<div>Hết hàng</div>) }
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <ColorButton
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.marginRight}
                        onClick={() => onEdit(item.id)}
                        data-toggle="modal"
                        data-target="#2"
                      >
                        <EditIcon />
                      </ColorButton>
                      {/* <!-- Modal --> */}
                      <div
                        style={{ margin: "74px 0px 0px 0px" }}
                        class="modal fade"
                        id="2"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">
                                Please edit product information !
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
                                  <label
                                    for="recipient-name"
                                    class="col-form-label"
                                  >
                                    Name:
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    name="name"
                                    value={itemUpdate.name}
                                    onChange={(e) =>
                                      setItemUpdate({
                                        id: itemUpdate.id,
                                        stauts: itemUpdate.status,
                                        name: e.target.value,
                                        type: itemUpdate.type,
                                        price: itemUpdate.price,
                                      })
                                    }
                                  ></input>
                                </div>
                                <div class="mb-3">
                                  <label
                                    for="recipient-name"
                                    class="col-form-label"
                                  >
                                    Tpye:
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    value={itemUpdate.type}
                                    onChange={(e) =>
                                      setItemUpdate({
                                        id: itemUpdate.id,
                                        stauts: itemUpdate.status,
                                        name: itemUpdate.name,
                                        type: e.target.value,
                                        price: itemUpdate.price,
                                      })
                                    }
                                  ></input>
                                </div>
                                <div class="mb-3">
                                  <label
                                    for="recipient-name"
                                    class="col-form-label"
                                  >
                                    Price:
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    value={itemUpdate.price}
                                    onChange={(e) =>
                                      setItemUpdate({
                                        id: itemUpdate.id,
                                        stauts: itemUpdate.status,
                                        name: itemUpdate.name,
                                        type: itemUpdate.type,
                                        price: e.target.value,
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
                                onClick={() => onSaveEdit(itemUpdate.id)}
                              >
                                Save Edit
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

                      {/* -----end Modal----- */}
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={classes.button}
                        onClick={() => onDelete(item.id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Layout>
  );
}

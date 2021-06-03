import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Grid from "@material-ui/core/Grid";
import callApi from "../common/apiCaller";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { green, purple } from "@material-ui/core/colors";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

export default function Supplier() {
  const classes = useRowStyles();
  const [x, setX] = useState("");
  const [dataRow, setDataRow] = useState([]);
  const [supAdd, setSupAdd] = useState([]);
  const [name, setName] = useState("");
  const [supShow, setSupShow] = useState([]);


  useEffect(() => {
    initPage();
    setX("");
  }, [x]);

  const initPage = () => {
    callApi("suppliers", "GET", null).then((res) => {
      if (res.status === 200) {
        var list = [];
        // console.log(res.data);
        res.data.map((sup) => {
          list.push(
            createData(
              sup.id,
              sup.name,
              sup.phone,
              sup.money,
              converTimeToTimestamp(sup.creatDate)
            )
          );
        });
        setDataRow(list);
      }
    });
  };

  function createData(id, name, phone, money, createDate) {
    var history = [];
    callApi(`import_bill/${id}`, "GET", null).then((res) => {
      if (res.status === 200) {
        res.data.map((his) => {
          his.itemInImportBillList.map((res) => {
            var ob1 = {
              date: converTimeToTimestamp(his.date),
              quantity: res.quantity,
              price: res.inputPrice,
              item: res.item.name,
            };
            history.push(ob1);
          });
        });
      }
    });
    return {
      id,
      name,
      phone,
      money,
      createDate,
      history: history,
    };
  }

  const converTimeToTimestamp = (value) => {
    return new Date(value).getTime();
  };

  const onFormAdd = () => {
    setSupAdd({
      id: "",
      name: "",
      phone: "",
      money: "",
      creatDate: "",
    });
  };

  const onSave = () => {
    callApi(`suppliers`, "POST", supAdd);
    setX(1);
  };

  const onSearch = () => {
    if (name) {
      var list = [];
      dataRow.map((item) => {
        if (item.name.indexOf(name) !== -1) {
          list.push(item);
        }
      });

      setSupShow(list);
    }
  };

  const changed = (e) => {
    setName(e.target.value);
    var list = [];
    dataRow.map((item) => {
      if (item.name.indexOf(name) !== -1) {
        list.push(item);
      }
    });
    setSupShow(list);
  };

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [y, setY] = React.useState("");
    const classes = useRowStyles();
    const [supEdit, setSupEdit] = useState({});
    const [id, setId] = useState("");

    useEffect(() => {
    }, [supEdit]);


    const onEdit = (id) => {
      console.log(id);
      setId(id);
      callApi(`suppliers/${id}`, "GET", null).then((res) => {
        if (res.status === 200) {
          console.log("success");
          setSupEdit(res.data);
        }
      });
    };

    console.log(supEdit);

    const onSaveEdit = (id) => {
      console.log(id);
      callApi(`suppliers/${id}`, "PUT", supEdit)
      setX(1);
      setY(id);
    }

    const onDelete = (id) => {
      callApi(`suppliers/${id}`, "DELETE", null);
      setX(-1);
    };

    const formatPrice = (x) => {
      return x.toLocaleString("it-IT", { style: "currency", currency: "VND" });
    };

    const formatDate = (x) => {
      var year = new Date(x).getFullYear();
      var month = new Date(x).getMonth() + 1;
      var day = new Date(x).getDate();
      return day + "-" + month + "-" + year;
    };

    // console.log(y);

    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.id}
          </TableCell>
          <TableCell>{row.name}</TableCell>
          <TableCell align="right">{row.phone}</TableCell>
          <TableCell align="right">{formatPrice(row.money)}</TableCell>
          <TableCell align="right">{formatDate(row.createDate)}</TableCell>
          <TableCell align="right">
            <ColorButton
              variant="contained"
              color="primary"
              size="small"
              onClick={() => onEdit(row.id)}
              data-toggle="modal"
              data-target="#myModa"
            >
              <EditIcon />
            </ColorButton>
            {/* <!-- Modal --> */}
            <div
              style={{ margin: "74px 0px 0px 0px" }}
              className="modal fade"
              id="myModa"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Please edit supplier information !
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <from>
                      <div className="mb-3">
                        <label for="recipient-name" className="col-form-label">
                          Name:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={supEdit.name}
                          onChange={(e) =>
                            setSupEdit({
                              id: supEdit.id,
                              name: e.target.value,
                              phone: supEdit.phone,
                              money: supEdit.money,
                              creatDate: supEdit.creatDate,
                            })
                          }
                        ></input>
                      </div>
                      <div className="mb-3">
                        <label for="recipient-name" className="col-form-label">
                          Phone:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={supEdit.phone}
                          onChange={(e) =>
                            setSupEdit({
                              id: supEdit.id,
                              name: supEdit.name,
                              creatDate: supEdit.creatDate,
                              phone: e.target.value,
                              money: supEdit.money
                            })
                          }
                        ></input>
                      </div>
                      <div className="mb-3">
                        <label for="recipient-name" className="col-form-label">
                          Birthday
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={formatDate(converTimeToTimestamp(supEdit.creatDate))}
                          onChange={(e) =>
                            setSupEdit({
                              id: supEdit.id,
                              name: supEdit.name,
                              creatDate: e.target.value,
                              phone: supEdit.phone,
                              money: supEdit.money
                            })
                          }
                        ></input>
                      </div>
                    </from>
                  </div>
                  <div className="modal-footer">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      // className={classes.button}
                      startIcon={<SaveIcon />}
                      data-dismiss="modal"
                      onClick={() => onSaveEdit(supEdit.id)}
                    >
                      Save Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="default"
                      size="small"
                      // className={classes.button}
                      startIcon={<CancelIcon />}
                      data-dismiss="modal"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
             
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => onDelete(row.id)}
            >
              <DeleteIcon />
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ minWidth: "150px" }}>Date</TableCell>
                      <TableCell style={{ minWidth: "150px" }}>Item</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right" style={{ minWidth: "150px" }}>
                        Price
                      </TableCell>
                      <TableCell align="right" style={{ minWidth: "150px" }}>
                        Total Price ($)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {formatDate(historyRow.date)}
                        </TableCell>
                        <TableCell>{historyRow.item}</TableCell>
                        <TableCell align="right">
                          {historyRow.quantity}
                        </TableCell>
                        <TableCell align="right">
                          {formatPrice(historyRow.price)}
                        </TableCell>
                        <TableCell align="right">
                          {formatPrice(
                            Math.round(
                              historyRow.quantity * historyRow.price * 100
                            ) / 100
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }



  return (
    <Layout>
      <Grid coitainer style={{ padding: "74px 240px 0px 0px" }}>
        <Grid container>
          <Grid item xs={12}>
            <h1 className="text-center">Manager Provider</h1>
          </Grid>
        </Grid>
        
        <Grid container>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onFormAdd()}
            data-toggle="modal"
            data-target="#3"
            className="mb-4"
          >
            <AddIcon />
            <span>Add Supplier</span>
          </Button>

                    {/* --form add-- */}
                    <div
            style={{ margin: "74px 0px 0px 0px" }}
            className="modal fade"
            id="3"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Please enter supplier information !
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <from>
                    <div className="mb-3">
                      <label for="recipient-name" className="col-form-label">
                        Name:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={supAdd.name}
                        onChange={(e) =>
                          setSupAdd({
                            name: e.target.value,
                            phone: supAdd.phone,
                            creatDate: supAdd.creatDate,
                          })
                        }
                      ></input>
                    </div>
                    <div className="mb-3">
                      <label for="recipient-name" className="col-form-label">
                        Phone:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={supAdd.phone}
                        onChange={(e) =>
                          setSupAdd({
                            name: supAdd.name,
                            creatDate: supAdd.creatDate,
                            phone: e.target.value,
                          })
                        }
                      ></input>
                    </div>
                    <div className="mb-3">
                      <label for="recipient-name" className="col-form-label">
                      Cooperation Day
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={supAdd.creatDate}
                        onChange={(e) =>
                          setSupAdd({
                            name: supAdd.name,
                            creatDate: e.target.value,
                            phone: supAdd.phone,
                          })
                        }
                      ></input>
                    </div>
                  </from>
                </div>
                <div className="modal-footer">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    // className={classes.button}
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
                    // className={classes.button}
                    startIcon={<CancelIcon />}
                    data-dismiss="modal"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* --end form-- */}

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
              <input type="text" name="name"
              onChange={changed}
              ></input>
            </Grid>
          </Grid>
        </Grid>
        
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: "67px" }} />
                <TableCell align="right" style={{ minWidth: "53px" }}>
                  Id
                </TableCell>
                <TableCell style={{ minWidth: "187px" }}>Name</TableCell>
                <TableCell align="right" style={{ minWidth: "143px" }}>
                  Phone
                </TableCell>
                <TableCell align="right" style={{ minWidth: "143px" }}>
                  Money
                </TableCell>
                <TableCell align="right" style={{ minWidth: "146px" }}>
                Cooperation Day
                </TableCell>
                <TableCell align="right" style={{ minWidth: "160px" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!name && dataRow?.map((row) => (
                <Row key={row.name} row={row} />
              ))}
              {name && supShow?.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid> 
    </Layout>
  );
};

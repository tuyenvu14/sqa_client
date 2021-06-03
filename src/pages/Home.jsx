import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../layout/Layout";
import checkPermission from "../layout/permission";
import "./Home.css";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    maxWidth: 265,
    margin: "10px"
  },
  padding: {
    padding: "64px 240px 0px 0px"
  } 
});

const Home = () => {
  const classes = useStyles();
  const [roles, setRoles] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setRoles(window.localStorage.getItem("role").split(","));
  }, []);

  return (
    <div>
      <Layout>
        <Grid className={classes.padding} >
          <Grid container>
            <Grid item>
            {/* product */}
            <Card className={classes.root} onClick={() => history.push("/items")}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image="https://img.lovepik.com/original_origin_pic/18/12/11/f6eb7c0d6d2cb0cd7aa7d9cc6e5b4372.png_wh860.png"
              title="Contemplative Reptile"
            />
            <CardContent >
              <Typography gutterBottom variant="h5" component="h2">
                Manager Product
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              Help employees manage goods in the warehouse. Add, edit, delete, store products !
              </Typography>
            </CardContent>
          </CardActionArea>
          </Card>

            </Grid>
            <Grid item>
          {/* supplier */}
          <Card className={classes.root} onClick={() => history.push("/suppliers")}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image="https://img.lovepik.com/photo/50028/1905.jpg_wh860.jpg"
              title="Contemplative Reptile"
            />
            <CardContent >
              <Typography gutterBottom variant="h5" component="h2">
                Manager Provider
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              Help employees manage goods in the warehouse. Add, edit, delete, store products !
              </Typography>
            </CardContent>
          </CardActionArea>
          </Card>

            </Grid>
            <Grid item>
          {/* customer */}
          <Card className={classes.root} onClick={() => history.push("/customers")}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image="https://gemdigital.vn/wp-content/uploads/2019/10/moi-quan-he-giua-customer-va-consumer-533x400.jpg"
              title="Contemplative Reptile"
            />
            <CardContent >
              <Typography gutterBottom variant="h5" component="h2">
                Manager Customer
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              Help employees manage customers who have purchased products at the store !
              </Typography>
            </CardContent>
          </CardActionArea>
          </Card>

            </Grid>
          </Grid>
          
          <Grid container>
            <Grid item>
              {/* immport */}
            <Card className={classes.root} onClick={() => history.push("/imports")}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image="https://img.lovepik.com/original_origin_pic/18/05/01/ba961dad0fe6fb173166315844d58f0c.png_wh860.png"
              title="Contemplative Reptile"
            />
            <CardContent >
              <Typography gutterBottom variant="h5" component="h2">
                Manager Import
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              Help employees manage the import of goods into the shop when, see the statistics of the times of import !
              </Typography>
            </CardContent>
          </CardActionArea>
          </Card>
            </Grid>
            <Grid item> 
              {/* sale */}
              <Card className={classes.root} onClick={() => history.push("/sales")}>
              <CardActionArea>
              <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image="data:image/jpeg;base64,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"
              title="Contemplative Reptile"
            />
            <CardContent >
              <Typography gutterBottom variant="h5" component="h2">
                Manager Sale
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              Help employees to process payments and manage invoices for customers !
              </Typography>
            </CardContent>
          </CardActionArea>
          </Card>
          </Grid>
            {roles[0] && checkPermission(["ROLE_ADMIN"], roles) && (
            <Grid item>
                {/* staff */}
                <Card className={classes.root} onClick={() => history.push("/staffs")}>
                <CardActionArea>
                <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="https://png.pngtree.com/png-clipart/20190116/ourmid/pngtree-career-salesperson-cashier-supermarket-png-image_380988.jpg"
                title="Contemplative Reptile"
              />
              <CardContent >
                <Typography gutterBottom variant="h5" component="h2">
                  Manager Staff
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                Help admins can manage their employees. Add, edit, delete employee information  !
                </Typography>
              </CardContent>
            </CardActionArea>
            </Card>
              </Grid> 
          )};
          </Grid>
        </Grid>      
      </Layout>
    </div>
  );
};

export default Home;

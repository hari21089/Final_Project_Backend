const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


dotenv.config();

const app = express();



/* -----------------------
Middlewares
------------------------ */

app.use(cors());

app.use(
    express.json()
);



/* -----------------------
Mongo Connection
------------------------ */

mongoose.connect(
    process.env.MONGO_URI
)

    .then(() =>
        console.log(
            "MongoDB Connected"
        )
    )

    .catch((err) =>
        console.log(err)
    );




/* -----------------------
Routes
------------------------ */

app.use(
    "/api/auth",
    require(
        "./routes/authRoutes"
    )
);


app.use(
    "/api/orders",
    require(
        "./routes/orderRoutes"
    )
);


app.use(
    "/api/help",
    require(
        "./routes/helpRoutes"
    )
);


app.use(
    "/api/reviews",
    require(
        "./routes/reviewRoutes"
    )
);


app.use(
    "/api/foods",
    require(
        "./routes/foodRoutes"
    )
);

app.use(
    "/api/user",
    require("./routes/userRoutes")
);



/* -----------------------
Default Test Route
------------------------ */

app.get(
    "/",
    (req, res) => {
        res.send(
            "API Running..."
        )
    }
);




/* -----------------------
Port
------------------------ */

const PORT =
    process.env.PORT || 5000;

app.listen(
    PORT,
    () => {
        console.log(
            `Server running on ${PORT}`
        )
    }
);
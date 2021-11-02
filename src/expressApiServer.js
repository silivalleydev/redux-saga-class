const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;

app.use(cors({origin: true, credentials: true}));

app.get("/", (req, res) => {
    res.send("Hello Express");
});

app.get("/users", (req, res) => {

    const userList = [
        {
            userSeq: 1,
            name: "홍길동",
            phone: "01022223333",
            email: "abc@gmail.com"
        },
        {
            userSeq: 2,
            name: "홍반장",
            phone: "01055552233",
            email: "hong@gmail.com"
        },
        {
            userSeq: 3,
            name: "김기한",
            phone: "01066664444",
            email: "kim@gmail.com"
        },
        {
            userSeq: 4,
            name: "김이수",
            phone: "01098997554",
            email: "issu@gmail.com"
        },
        {
            userSeq: 5,
            name: "장기호",
            phone: "01053555444",
            email: "jang@gmail.com"
        }
    ]

    const filter = userList.filter(u => u.name.includes(req.query.name || ""))

    res.send(filter);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const JWT_ANAHTARI = process.env.JWT_ANAHTARI;
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:2701/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Kullanici = mongoose.model("Kullanici", {
    kullaniciadi: String,
    sifre: String,
});

app.post("/register", (req, res) => {
    const { username, password } = req.body;
    // Buraya giriş yapılacak kullanıcı adı ve şifre kontrolü yapılabilir.
    const user = new Kullanici({ kullaniciadi: username, sifre: password });
    user.save()
        .then(() => res.status(201).json({ message: "Kullanıcı kaydı başarıyla yapıldı" }))
        .catch((err) => res.status(500).json({ error: "Kullanıcı kaydı sırasında bir hata oluştu" }));
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await Kullanici.findOne({ kullaniciadi: username });
        if (!user) {
            return res.status(400).json({ error: "Kullanıcı bulunamadı" });
        }
        if (user.sifre !== password) {
            return res.status(401).json({ error: "Yanlış şifre" });
        }
        const token = jwt.sign(
            { userId: user._id, username: user.kullaniciadi },
            JWT_ANAHTARI,
            { expiresIn: '1h' }
        );
        res.status(200).json({
            message: "Giriş başarılı",
            token: token
        });
    } catch (error) {
        res.status(500).json({ error: "Giriş sırasında bir hata oluştu" });
    }
});


app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor...`)
})
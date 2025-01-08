const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();
const port = 3000;
const JWT_ANAHTARI = process.env.JWT_ANAHTARI;

if (!JWT_ANAHTARI) {
    throw new Error("JWT_ANAHTARI tanımlı değil! Lütfen .env dosyanıza ekleyin.");
}

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch(err => console.error("MongoDB bağlantı hatası:", err));

const Kullanici = mongoose.model("Kullanici", {
    kullaniciadi: String,
    sifre: String,
});

const saltRounds = 10;

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new Kullanici({ kullaniciadi: username, sifre: hashedPassword });
        await user.save();
        res.status(201).json({ message: "Kullanıcı kaydı başarıyla yapıldı" });
    } catch (err) {
        res.status(500).json({ error: "Kayıt sırasında hata oluştu" });
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await Kullanici.findOne({ kullaniciadi: username });
        if (!user) {
            return res.status(400).json({ error: "Kullanıcı bulunamadı" });
        }
        if (!(await bcrypt.compare(password, user.sifre))) {
            return res.status(401).json({ error: "Yanlış şifre" });
        }
        const token = jwt.sign(
            { userId: user._id, username: user.kullaniciadi },
            JWT_ANAHTARI,
            { expiresIn: "1h" }
        );
        res.status(200).json({
            message: "Giriş başarılı",
            token: token,
        });
    } catch (error) {
        res.status(500).json({ error: "Giriş sırasında bir hata oluştu" });
    }
});

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor...`);
});
const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");
const config = require("../config/config");


const databaseDir = path.dirname(config.databasePath);
if (!fs.existsSync(databaseDir)) {
  fs.mkdirSync(databaseDir, { recursive: true });
}

const publicDir = path.join(__dirname, '../../public');
const imagesDir = path.join(publicDir, 'images');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

const db = new Database(config.databasePath);


db.exec("DROP TABLE IF EXISTS campaigns");
db.exec("DROP TABLE IF EXISTS slider");
db.exec("DROP TABLE IF EXISTS electronics");
db.exec("DROP TABLE IF EXISTS recommendations");


db.exec(`CREATE TABLE campaigns (id INTEGER PRIMARY KEY, url TEXT, image TEXT)`);
db.exec(`CREATE TABLE slider (id INTEGER PRIMARY KEY, title TEXT, image TEXT,url TEXT)`);
db.exec(`CREATE TABLE electronics (id INTEGER PRIMARY KEY, name TEXT, price REAL, image TEXT, url TEXT, redirectUrl TEXT)`);
db.exec(`CREATE TABLE recommendations (id INTEGER PRIMARY KEY, name TEXT, price REAL, rating INTEGER, image TEXT, url TEXT,redirectUrl TEXT)`);


const campaignImages = [
  "elektronik.jpeg",
  "aliverise-basla.jpeg", 
  "hepsipay.jpeg", 
  "hepsipay1.jpeg", 
  "karaca.jpeg", 
  "klima-sogutucu.jpeg", 
  "sevilen-urunler.jpeg", 
  "kagit-urunler.jpeg"
];




const insertCampaign = db.prepare("INSERT INTO campaigns (url, image) VALUES (?, ?)");
for (let i = 0; i < campaignImages.length; i++) {
  insertCampaign.run(`/campaign${i+1}`, campaignImages[i]);
}


const insertSlider =db.prepare("INSERT INTO slider (image, url) VALUES (?,?)");
insertSlider.run("slider1.jpg","/images/sliders/slider1.jpg");
insertSlider.run("slider2.jpg","/images/sliders/slider2.jpg");
insertSlider.run("slider3.jpg","/images/sliders/slider3.jpg");
insertSlider.run("slider4.jpg","/images/sliders/slider4.jpg");
insertSlider.run("slider5.jpg","/images/sliders/slider5.jpg");
insertSlider.run("slider6.jpg","/images/sliders/slider6.jpg");
insertSlider.run("slider7.jpg","/images/sliders/slider7.jpg");
insertSlider.run("slider8.jpg","/images/sliders/slider8.jpg");
insertSlider.run("slider9.jpg","/images/sliders/slider9.jpg");
insertSlider.run("slider10.jpg","/images/sliders/slider10.jpg");


const insertElectronics = db.prepare("INSERT INTO electronics (name, price, image, url, redirectUrl) VALUES (?, ?, ?, ?, ?)");
insertElectronics.run("Laptop", 12999.99, "laptop.jpg", "/images/electronics/laptop.jpg", "https://www.hepsiburada.com/msi-thin-15-b13uc-2868xtr-intel-core-i5-13420h-16-gb-512gb-ssd-rtx3050-freedos-15-6-fhd-144hz-tasinabilir-bilgisayar-p-HBCV00008C3AGA?magaza=İnce%20hesap");
insertElectronics.run("Telefon", 99999.99, "telefon.jpg", "/images/electronics/telefon.jpg", "https://www.hepsiburada.com/iphone-16-pro-max-256gb-col-titanyum-p-HBCV00006Y4HC5");
insertElectronics.run("Tablet", 5999.99, "tablet.jpg", "/images/electronics/tablet.jpg", "https://www.hepsiburada.com/apple-ipad-a16-11-128gb-wi-fi-tablet-mavi-md4a4tu-a-p-HBCV0000870CYE");


const insertRecommendations = db.prepare("INSERT INTO recommendations (name, price, rating, image, url,redirectUrl) VALUES (?, ?, ?, ?, ?,?)");
insertRecommendations.run("Akıllı Saat", 2499.99, 4, "akilli-saat.jpg", "/images/tavsiye/akilli-saat.jpg","https://www.hepsiburada.com/xiaomi-redmi-watch-5-active-silver-akilli-saat-sesli-gorusme-ozellikli-p-HBCV000072MPMW");
insertRecommendations.run("Bluetooth Kulaklık", 899.99, 5, "bluetooth-kulaklik.jpg", "/images/tavsiye/bluetooth-kulaklik.jpg","https://www.hepsiburada.com/shaza-air7-gurultu-azaltma-enc-4-mikrofonlu-bluetooth-5-3-tws-kulaklik-beyaz-p-HBCV00003FKY30");
insertRecommendations.run("Powerbank", 349.99, 3, "powerbank.jpg", "/images/tavsiye/powerbank.jpg","https://www.hepsiburada.com/acl-pw-99-10000mah-powerbank-siyah-led-gostergeli-cift-usb-type-c-cikisli-akilli-guvenlik-sistemli-tasinabilir-sarj-cihazi-p-HBCV00008LFJ7L?magaza=7go");
insertRecommendations.run("Mouse", 199.99, 4, "mouse.jpg", "/images/tavsiye/mouse.jpg","https://www.hepsiburada.com/lenovo-400-wireless-kablosuz-mouse-siyah-gy50r91293-pm-HB00000NBN6Y");
insertRecommendations.run("Klavye", 459.99, 5, "klavye.jpg", "/images/tavsiye/klavye.jpg","https://www.hepsiburada.com/logitech-g213-prodigy-rgb-turkce-gaming-klavye-920-008094-pm-HB00000247UD");

console.log("✅ Veritabanı başarıyla oluşturuldu!");
db.close();
//CARPISMA KONTROL FONKSIYONU------------------------------------------------------------------------------------------
function carpisma({
    object1,
    object2
}){
    //karakter solunda, saginda, ustunde ve asaginda bir carpisma blogu var mi diye kontrol eder
    //butun hepsi ayni anda saglanirsa su anda karakter bir blokla carpisiyor anlamina gelir.
    return (object1.pozisyon.y + object1.height >= object2.pozisyon.y &&
        object1.pozisyon.y <= object2.pozisyon.y + object2.height &&
        object1.pozisyon.x <= object2.pozisyon.x + object2.width &&
        object1.pozisyon.x + object1.width >= object2.pozisyon.x
    )
}

//index.html sayfasinda olusturulan dugmelerin ve menulerin id'sinin alinmasi
const menu = document.getElementById("menu");
const durdurma = document.getElementById("durdurma");
const bastanBaslat = document.getElementById("bastanBaslat");

const bolum1 = document.getElementById("bolum1");
const bolum2 = document.getElementById("bolum2");

//bolum1 tusuna eventlistener eklenmesi
bolum1.addEventListener("click", function(){
    //sahne1'e gore menulerde ve oyunda degisimlerin yapimasi.
    if(oyuncu.sahne != 1){
        arkaplan.image.src = "./img/Bolum1.png";
        carpismaBloklari = carpismaBloklariHesapla(zeminCarpismalari, kazanmaCarpismalari, olumCarpismalari, blokCarpismalari);
        oyuncu.zeminCarpismaBloklari = zeminCarpismaBloklari;
        oyuncu.kazanmaBloklari = kazanmaBloklari;
        oyuncu.olumCarpismaBloklari = olumCarpismaBloklari;
        oyuncu.bloklar = bloklar;
        oyuncu.pozisyon.x = 128;
        oyuncu.pozisyon.y = 480;
        oyuncu.sahne = 1;
        menu.style.visibility = "hidden";
        keys.esc.basildi = false;
        durdurma.style.visibility = "visible";
        bastanBaslat.style.visibility = "visible";
        bolum1.style.color = "#8c1d04";
        bolum2.style.color = "#5efc03";
        bolum1.style.cursor = "default";
        bolum2.style.cursor = "pointer";
        animate(true);
    }
})
//bolum2 tusuna eventlistener eklenmesi
bolum2.addEventListener("click", function(){
    //sahne2'ye gore menulerde ve oyunda degisimlerin yapilmasi
    if(oyuncu.sahne != 2){
        arkaplan.image.src = "./img/Bolum2.png";
        carpismaBloklari = carpismaBloklariHesapla(zeminCarpismalari2, kazanmaCarpismalari2, olumCarpismalari2, blokCarpismalari2);
        oyuncu.zeminCarpismaBloklari = zeminCarpismaBloklari;
        oyuncu.kazanmaBloklari = kazanmaBloklari;
        oyuncu.olumCarpismaBloklari = olumCarpismaBloklari;
        oyuncu.bloklar = bloklar;
        oyuncu.pozisyon.x = 64;
        oyuncu.pozisyon.y = 640;
        oyuncu.sahne = 2;
        menu.style.visibility = "hidden";
        keys.esc.basildi = false;
        durdurma.style.visibility = "visible";
        bastanBaslat.style.visibility = "visible";
        bolum1.style.color = "#5efc03";
        bolum2.style.color = "#8c1d04";
        bolum1.style.cursor = "pointer";
        bolum2.style.cursor = "default";
        animate(true);
    }
})

//ekranin solundaki durdurma tusu icin eventlistener ekleme
durdurma.addEventListener("click", function(){
    if(oyuncu.sahne != 0){
        if(keys.esc.basildi){
            keys.esc.basildi = false;
            menu.style.visibility = "hidden";
            animate(true);
        }
        else{
            keys.esc.basildi = true;
            menu.style.visibility = "visible";
            animate(false);
        }
    }
})

//bastan baslatma tusu icin eventlistener ekleme
bastanBaslat.addEventListener("click", function(){
    if(oyuncu.sahne == 1){
        oyuncu.pozisyon.x = 128;
        oyuncu.pozisyon.y = 480;
        //bastan basladiginda koyulan bloklarin silinmesi
        for(let i=zeminCarpismaBloklari.length; i>9 ;i--)
            zeminCarpismaBloklari.pop();
    }
    else if(oyuncu.sahne == 2){
        oyuncu.pozisyon.x = 64;
        oyuncu.pozisyon.y = 640;
        //bastan basladiginde koyulan bloklarin silinmesi
        for(let i=zeminCarpismaBloklari.length; i>17 ;i--)
            zeminCarpismaBloklari.pop();
    }
})

//KLAVYEDEN BASMA OLAYINA EVENTLISTENER EKLEME-------------------------------------------------------------------------------------------------
window.addEventListener("keydown", (event) => {
    switch(event.key){
        case "d":
            keys.d.basildi = true;
            sonBasilan = "d";
        break;
        case "a":
            keys.a.basildi = true;
            sonBasilan = "a";
        break;
        case "w":
            oyuncu.hiz.y = -4;
        break;
        //ESC tusunda oyunun durmasi
        case"Escape":
            if(oyuncu.sahne != 0){
                if(keys.esc.basildi){
                    keys.esc.basildi = false;
                    menu.style.visibility = "hidden";
                    animate(true);
                }
                else{
                    keys.esc.basildi = true;
                    menu.style.visibility = "visible";
                    animate(false);
                }
            }
        break;
        //R tusunda oyunun bastan baslamasi
        case"r":
            if(oyuncu.sahne == 1){
                oyuncu.pozisyon.x = 128;
                oyuncu.pozisyon.y = 480;
                for(let i=zeminCarpismaBloklari.length; i>9 ;i--)
                    zeminCarpismaBloklari.pop();
            }
            else if(oyuncu.sahne == 2){
                oyuncu.pozisyon.x = 64;
                oyuncu.pozisyon.y = 640;
                for(let i=zeminCarpismaBloklari.length; i>17 ;i--)
                    zeminCarpismaBloklari.pop();
            }
        break;       
    }
    console.log(event.key);
})

//TUSTAN ELINI CEKME OLAYINA EVENTLISTENER EKLEME----------------------------------------------------------------------
window.addEventListener("keyup", (event) => {
    switch(event.key){
        case "d":
            keys.d.basildi = false;
        break;
        case "a":
            keys.a.basildi = false;
        break;
        case "esc":
            keys.esc.basildi = false;
        break;
        case "r":
            keys.r.basildi = false;
        break;
        
    }
    console.log(event.key);
})

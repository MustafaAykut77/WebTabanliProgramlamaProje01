const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

//canvas boyutunu ayarlama
canvas.width = 1280;
canvas.height = 768;

//bolumler icin carpisma bloklarinin tanimlanmasi
var bloklar = [];
var zeminCarpismaBloklari = []; 
var olumCarpismaBloklari = [];
var kazanmaBloklari = [];

//carpisma bloklarinin hesaplanip yerlerine konmasi
//CARPISMA BLOKLARINI HESAPLAMA FONKSIYONU---------------------------------------------------------------------------------
function carpismaBloklariHesapla(zeminCarpismalari, kazanmaCarpismalari, olumCarpismalari, blokCarpismalari){

    this.zeminCarpismalari = zeminCarpismalari;
    this.kazanmaCarpismalari = kazanmaCarpismalari;
    this.olumCarpismalari = olumCarpismalari;
    this.blokCarpismalari = blokCarpismalari;

    //ZEMIN CARPISMA BLOKLARI----------------------------------------------------------------------------------------------
    const zeminCarpismalar2D = [];
    //erkan dikey olarak 40 tane bloga bolundugu icin i'yi her seferinde 40 arttiririz.
    for(let i=0 ; i < this.zeminCarpismalari.length ; i+=40){
        //2D dizi olarak farkli bir diziye saklanir.
        zeminCarpismalar2D.push(this.zeminCarpismalari.slice(i, i+40));
    }

    //dizi icine konulan bloklarin 32x32 piksel olmasini saglar
    //ayni zamanda "bolumler" dosyasindan alinan verilere gore yerlerine koyar.
    const zeminCarpismaBloklari_function = [];
    zeminCarpismalar2D.forEach((satir, y) => {
        satir.forEach((kontrol, x) => {
            if(kontrol == 19){
                zeminCarpismaBloklari_function.push(
                    new CarpismaBlogu({
                        pozisyon: {
                            x: x * 32,
                            y: y * 32,
                        },
                    })
                )
            }
        })
    })

    //OLUM CARPISMA BLOKLARI-----------------------------------------------------------------------------------------------
    const olumCarpismalar2D = [];
    for(let i=0 ; i < this.olumCarpismalari.length ; i+=40){
        olumCarpismalar2D.push(this.olumCarpismalari.slice(i, i+40));
    }

    const olumCarpismaBloklari_function = [];
    olumCarpismalar2D.forEach((satir, y) => {
        satir.forEach((kontrol, x) => {
            if(kontrol == 1){
                olumCarpismaBloklari_function.push(
                    new CarpismaBlogu({
                        pozisyon: {
                            x: x * 32,
                            y: y * 32,
                        },
                    })
                )
            }
        })
    })

    //CARPISMA BLOKLARI----------------------------------------------------------------------------------------------
    const blokCarpisma2D = [];
    for(let i=0 ; i < this.blokCarpismalari.length ; i+=40){
        blokCarpisma2D.push(this.blokCarpismalari.slice(i, i+40));
    }

    const bloklar_function = [];
    blokCarpisma2D.forEach((satir, y) => {
        satir.forEach((kontrol, x) => {
            if(kontrol == 5){
                bloklar_function.push(
                    new CarpismaBlogu({
                        pozisyon: {
                            x: x * 32,
                            y: y * 32,
                        },
                    })
                )
            }
        })
    })

    //KAZANMA CARPISMA BLOKLARI----------------------------------------------------------------------------------------------
    const kazanmaCarpisma2D = [];
    for(let i=0 ; i < this.kazanmaCarpismalari.length ; i+=40){
        kazanmaCarpisma2D.push(this.kazanmaCarpismalari.slice(i, i+40));
    }

    const kazanmaBloklari_function = [];
    kazanmaCarpisma2D.forEach((satir, y) => {
        satir.forEach((kontrol, x) => {
            if(kontrol == 18){
                kazanmaBloklari_function.push(
                    new CarpismaBlogu({
                        pozisyon: {
                            x: x * 32,
                            y: y * 32,
                        },
                    })
                )
            }
        })
    })

    //islem duzgun yapildi mi kontrolu icin konsola yazdirir.
    console.log(bloklar_function);
    console.log(zeminCarpismaBloklari_function);
    console.log(olumCarpismaBloklari_function);
    console.log(kazanmaBloklari_function);

    bloklar = bloklar_function;
    zeminCarpismaBloklari = zeminCarpismaBloklari_function;
    olumCarpismaBloklari = olumCarpismaBloklari_function;
    kazanmaBloklari = kazanmaBloklari_function;
}

//YERCEKIMI SABITI-----------------------------------------------------------------------------------------------------
const yercekimi = 0.2;
  
//OYUNCU NESNESI OLUSTURMA---------------------------------------------------------------------------------------------
const oyuncu = new Cisim({
    pozisyon:{
        x: 128,
        y: 480,
    },

    hiz:{
        x: 0,
        y: 0
    },
    zeminCarpismaBloklari: zeminCarpismaBloklari,
    olumCarpismaBloklari: olumCarpismaBloklari,
    kazanmaBloklari: kazanmaBloklari,
    bloklar: bloklar,
    resimYolu: './img/character/Idle (32x32).png',
    sahne: 0,
})

//TUS KONTROLLERI------------------------------------------------------------------------------------------------------
const keys = {
    a: {
        basildi: false
    },
    d: {
        basildi: false
    },
    w: {
        basildi: false
    },
    r: {
        basildi: false
    },
    esc: {
        basildi: false
    }
}

let sonBasilan;

//ARKAPLAN RESMI-------------------------------------------------------------------------------------------------------
const arkaplan = new Arkaplan({
    pozisyon:{
        x: 0,
        y: 0,
    },
    resimYolu: "./img/Bolum1.png",
});

var tiklanan_satir = 0;
var tiklanan_sutun = 0;

//TIKLANAN YERLE CARPISMA AYARLAMA-------------------------------------------------------------------------------------
canvas.addEventListener('click', function(event) {
    //Tiklanan yerin kordinatini alma
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    
    //Tiklanan yerin kordinatini 32'ye bolup yukari yuvarlama
    tiklanan_satir = Math.ceil(y / 32);
    tiklanan_sutun = Math.ceil(x / 32);
    
    var tiklananCarpismaBlogu = new CarpismaBlogu({
        pozisyon: {
            x: 0,
            y: 0,
        }
    });

    tiklananCarpismaBlogu.pozisyon.x = tiklanan_sutun*32-32;
    tiklananCarpismaBlogu.pozisyon.y = tiklanan_satir*32-32;

    let flag = false;

    //tiklanan yerde herhangi turde bir carpisma blogu var mi yok mu kontrolleri.
    for(let i=0; i<zeminCarpismaBloklari.length;i++){
        if(tiklananCarpismaBlogu.pozisyon.x == zeminCarpismaBloklari[i].pozisyon.x && tiklananCarpismaBlogu.pozisyon.y == zeminCarpismaBloklari[i].pozisyon.y){
            console.log("Aynı Çarpışma Bloğu!");
            flag = true;
        }
        else{
        }
    }

    for(let i=0; i<olumCarpismaBloklari.length;i++){
        if(tiklananCarpismaBlogu.pozisyon.x == olumCarpismaBloklari[i].pozisyon.x && tiklananCarpismaBlogu.pozisyon.y == olumCarpismaBloklari[i].pozisyon.y){
            console.log("Aynı Çarpışma Bloğu!");
            flag = true;
        }
        else{
        }
    }

    for(let i=0; i<bloklar.length;i++){
        if(tiklananCarpismaBlogu.pozisyon.x == bloklar[i].pozisyon.x && tiklananCarpismaBlogu.pozisyon.y == bloklar[i].pozisyon.y){
            console.log("Aynı Çarpışma Bloğu!");
            flag = true;
        }
        else{
        }
    }

    for(let i=0; i<kazanmaBloklari.length;i++){
        if(tiklananCarpismaBlogu.pozisyon.x == kazanmaBloklari[i].pozisyon.x && tiklananCarpismaBlogu.pozisyon.y == kazanmaBloklari[i].pozisyon.y){
            console.log("Aynı Çarpışma Bloğu!");
            flag = true;
        }
        else{
        }
    }

    //tiklanan yerde bir carpisma blogu yoksa tiklanan yerde bir carpisma blogu olusturur.
    if(!flag){
        zeminCarpismaBloklari.push(tiklananCarpismaBlogu);
    }
    else{
        flag = false;
    }
    
});

var animationID;

//EKRANDA GOSTERME FONKSIYONU------------------------------------------------------------------------------------------
function animate(true_false){
    if(true_false){
        animationID = window.requestAnimationFrame(animate)
        c.fillStyle = "black";
        c.fillRect(0, 0, canvas.width, canvas.height);

        arkaplan.guncelle();

        zeminCarpismaBloklari.forEach(zeminCarpismalari => {
            zeminCarpismalari.guncelle();
        })
 
        oyuncu.guncelle();
        oyuncu.hiz.x = 0;

        //oyuncu haritadan asagi duserse olmesini saglar.
        if(oyuncu.pozisyon.y > 800){
            oyuncu.pozisyon.x = 64;
            oyuncu.pozisyon.y = 640;
        }

        //oyuncu a veya d harflerine basarda yurumesini saglar.
        if(keys.a.basildi && sonBasilan == "a"){
            oyuncu.hiz.x = -1;
        }
        else if(keys.d.basildi && sonBasilan == "d"){
            oyuncu.hiz.x = 1;
        }
    }
    else{
        window.cancelAnimationFrame(animationID);
        menu.style.visibility = "visible";
    }
}

animate(false);


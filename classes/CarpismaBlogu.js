//CARPISMA BLOGU SINIFI
class CarpismaBlogu {
    //constructor
    constructor({pozisyon}){
        this.pozisyon = pozisyon;
        this.width = 32;
        this.height = 32;
        this.image = new Image();
        this.image.src = "./img/cobblestone.png";
    }   
    //cizme fonksiyonu
    ciz(){
        c.drawImage(this.image, this.pozisyon.x, this.pozisyon.y);
    }
    //guncelleme fonksiyonu
    guncelle(){
        this.ciz();
    }
}

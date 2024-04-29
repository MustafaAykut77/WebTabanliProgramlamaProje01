//ARKAPLAN SINIFI
class Arkaplan {
    //constructor
    constructor({pozisyon, resimYolu}){
        this.pozisyon = pozisyon;
        this.image = new Image();
        this.image.src = resimYolu;
    }
    //cizme fonksiyonu
    ciz(){
        if(!this.image){
            return;
        }
        c.drawImage(this.image, this.pozisyon.x, this.pozisyon.y)
    }
    //guncelleme fonksiyonu
    guncelle(){
        this.ciz();
    }
}

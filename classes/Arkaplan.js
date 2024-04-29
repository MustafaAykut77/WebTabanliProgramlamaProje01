class Arkaplan {
    constructor({pozisyon, resimYolu}){
        this.pozisyon = pozisyon;
        this.image = new Image();
        this.image.src = resimYolu;
    }
    ciz(){
        if(!this.image){
            return;
        }
        c.drawImage(this.image, this.pozisyon.x, this.pozisyon.y)
    }

    guncelle(){
        this.ciz();
    }
}
class CarpismaBlogu {
    constructor({pozisyon}){
        this.pozisyon = pozisyon;
        this.width = 32;
        this.height = 32;
        this.image = new Image();
        this.image.src = "./img/cobblestone.png"
        
    }   

    ciz(){
        c.drawImage(this.image, this.pozisyon.x, this.pozisyon.y);
    }

    guncelle(){
        this.ciz();
    }
}
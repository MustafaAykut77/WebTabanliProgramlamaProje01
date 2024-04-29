//CISIM SINIFI
class Cisim {
    //constructor
    constructor({ pozisyon, hiz, zeminCarpismaBloklari, olumCarpismaBloklari, kazanmaBloklari, bloklar, resimYolu, sahne}){
        this.pozisyon = pozisyon;
        this.hiz = hiz;  
        this.image = new Image();
        this.image.src = resimYolu;
        this.mevcutKare = 0;
        this.gecenKare = 0;
        this.kareSayac = 7;
        this.width = 31.5;
        this.height = 31.5; 
        this.zeminCarpismaBloklari = zeminCarpismaBloklari;
        this.olumCarpismaBloklari = olumCarpismaBloklari;
        this.kazanmaBloklari = kazanmaBloklari;
        this.bloklar = bloklar
        this.sahne = sahne;
    }   
    //cizme fonksiyonu
    ciz(){
        if(!this.image){
            return;
        }
        //oyuncunun goruntusunun animasyonu olabilmesi icin frame by frame goruntuyu kirpma
        const kirpilmis = {
            pozisyon:{
                x: this.mevcutKare*32,
                y: 0,
            },
            width: 32,
            height: 32,
        }
        //kirpilan goruntuyu ekrana yazdirma
        c.drawImage(
            this.image, 
            kirpilmis.pozisyon.x, 
            kirpilmis.pozisyon.y, 
            kirpilmis.width, 
            kirpilmis.height, 
            this.pozisyon.x, 
            this.pozisyon.y,
            32,
            32,
        )
    }
    //guncelleme fonksiyonu
    guncelle(){
        //karakter animasyonu kare sayisi oyunun kare sayisindan cok daha kucuk oldugu icin
        //karakter animasyonunun geciktirilerek yapilmasi
        this.gecenKare++;
        if(this.gecenKare % this.kareSayac == 0){
            if(this.mevcutKare < 11-1){
                this.mevcutKare++;
            }
            else{
                this.mevcutKare = 0;
            }
        }
        //ekrana yazdirma
        this.ciz(); 
        this.pozisyon.x += this.hiz.x;
        this.yatayCarpismaKontrolEt();
        this.yercekimiUygula();
        this.dikeyCarpismaKontrolEt(); 
    }

    //olusturulan cisimin yatay eksende carpisma kontrolu
    yatayCarpismaKontrolEt(){
        //ZEMIN CARPISMA BLOKLARI--------------------------------------------------------------------------------------
        for(let i=0; i<this.zeminCarpismaBloklari.length; i++){
            const zeminCarpismaBlogu = this.zeminCarpismaBloklari[i];

            if(carpisma({
                object1: this,
                object2: zeminCarpismaBlogu,
            })
            ){
                //zemin ile carpisiliyorsa karakterin durmasini saglar
                if(this.hiz.x > 0){
                    this.hiz.x = 0;
                    this.pozisyon.x = zeminCarpismaBlogu.pozisyon.x - this.width - 0.01;
                    break;
                }

                if(this.hiz.x < 0){
                    this.hiz.x = 0;
                    this.pozisyon.x = zeminCarpismaBlogu.pozisyon.x + zeminCarpismaBlogu.width + 0.01;
                    break;
                }
            }
        }

        //CARPISMA BLOKLARI--------------------------------------------------------------------------------------
        for(let i=0; i<this.bloklar.length; i++){
            const carpismaBlogu = this.bloklar[i];

            if(carpisma({
                object1: this,
                object2: carpismaBlogu,
            })
            ){
                //herhangi bir blok ile karakter carpisiyorsa durmasini saglar
                if(this.hiz.x > 0){
                    this.hiz.x = 0;
                    this.pozisyon.x = carpismaBlogu.pozisyon.x - this.width - 0.01;
                    break;
                }

                if(this.hiz.x < 0){
                    this.hiz.x = 0;
                    this.pozisyon.x = carpismaBlogu.pozisyon.x + carpismaBlogu.width + 0.01;
                    break;
                }
            }
        }

        //OLUM CARPISMA BLOKLARI---------------------------------------------------------------------------------------
        for(let i=0; i<this.olumCarpismaBloklari.length; i++){
            const olumCarpismaBlogu = this.olumCarpismaBloklari[i];

            if(carpisma({
                object1: this,
                object2: olumCarpismaBlogu,
            })
            ){
                //karakter bir olum bloguna carparsa sahneye gore konumunu sifirlar
                if(this.sahne == 1){
                    this.pozisyon.x = 96;
                    this.pozisyon.y = 480;
                }
                else if(this.sahne == 2){
                    this.pozisyon.x = 64;
                    this.pozisyon.y = 640;
                }
            }
        }

        //KAZANMA CARPISMA BLOKLARI------------------------------------------------------------------------------------
        for(let i=0; i<this.kazanmaBloklari.length; i++){
            const kazanmaBlogu = this.kazanmaBloklari[i];

            if(carpisma({
                object1: this,
                object2: kazanmaBlogu,
            })
            ){
                //karakter kazanma bloguna ulastıgında alert olarak bildirir ve konumunu sifirlar
                alert("Tebrikler Kazandınız!");
                if(this.sahne == 1){
                    this.pozisyon.x = 96;
                    this.pozisyon.y = 480;
                }
                else if(this.sahne == 2){
                    this.pozisyon.x = 64;
                    this.pozisyon.y = 640;
                }
            }
        }
    }

    //cisime yercekimini uygulama
    yercekimiUygula(){
        this.pozisyon.y += this.hiz.y;
        this.hiz.y += yercekimi;
    }

    //dikeyde carpismalari kontrol etme
    dikeyCarpismaKontrolEt(){
        //ZEMIN CARPISMA BLOKLARI------------------------------------------------------------------------------------
        for(let i=0; i<this.zeminCarpismaBloklari.length; i++){
            const zeminCarpismaBlogu = this.zeminCarpismaBloklari[i];

            if(carpisma({
                object1: this,
                object2: zeminCarpismaBlogu,
            })
            ){
                //zemin blogu ile carpistiysa hizini sifirlar
                if(this.hiz.y > 0){
                    this.hiz.y = 0;
                    this.pozisyon.y = zeminCarpismaBlogu.pozisyon.y - this.height - 0.01;
                    break;
                }

                if(this.hiz.y < 0){
                    this.hiz.y = 0;
                    this.pozisyon.y = zeminCarpismaBlogu.pozisyon.y + zeminCarpismaBlogu.height + 0.01;
                    break;
                }
            }
        }

        //CARPISMA BLOKLARI------------------------------------------------------------------------------------
        for(let i=0; i<this.bloklar.length; i++){
            const CarpismaBlogu = this.bloklar[i];

            if(carpisma({
                object1: this,
                object2: CarpismaBlogu,
            })
            ){
                //herhangi bir blok ile carpisirsa hizini sifirlar
                if(this.hiz.y > 0){
                    this.hiz.y = 0;
                    this.pozisyon.y = CarpismaBlogu.pozisyon.y - this.height - 0.01;
                    break;
                }

                if(this.hiz.y < 0){
                    this.hiz.y = 0;
                    this.pozisyon.y = CarpismaBlogu.pozisyon.y + CarpismaBlogu.height + 0.01;
                    break;
                }
            }
        }

        //OLUM CARPISMA BLOKLARI------------------------------------------------------------------------------------
        for(let i=0; i<this.olumCarpismaBloklari.length; i++){
            const olumCarpismaBlogu = this.olumCarpismaBloklari[i];

            if(carpisma({
                object1: this,
                object2: olumCarpismaBlogu,
            })
            ){
                //olum bloguna carparsa sahneye gore konumunu sifirlar
                if(this.sahne == 1){
                    this.pozisyon.x = 96;
                    this.pozisyon.y = 480;
                }
                else if(this.sahne == 2){
                    this.pozisyon.x = 64;
                    this.pozisyon.y = 640;
                }
            }
        }

        //KAZANMA CARPISMA BLOKLARI------------------------------------------------------------------------------------
        for(let i=0; i<this.kazanmaBloklari.length; i++){
            const kazanmaBlogu = this.kazanmaBloklari[i];

            if(carpisma({
                object1: this,
                object2: kazanmaBlogu,
            })
            ){
                //kazanma bloguna degerse alert olarak kullaniciya bildirir ve pozisyonu sifirlar
                alert("Tebrikler Kazandınız!");
                if(this.sahne == 1){
                    this.pozisyon.x = 96;
                    this.pozisyon.y = 480;
                }
                else if(this.sahne == 2){
                    this.pozisyon.x = 64;
                    this.pozisyon.y = 640;
                }
            }
        }
    }
}

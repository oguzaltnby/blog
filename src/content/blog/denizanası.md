---
title: Turritopsis dohrnii
description: Kendi internet sitemde kullandığım Nuxt'un temeli Vue nedir, ikisi arasındaki farklılıklar nelerdir, bunlarla ne tür şeyler yapılır?
tags:
  - science
createdAt: 2023-29-09T22:28:39.798Z
---

"Ölümsüz denizanası" olarak da bilinen **_Turritopsis dohrnii_**, dünya çapında ılıman ve tropik sularda bulunan, küçük ve biyolojik olarak ölümsüz bir denizanası türüdür. Bu tür, "biyolojik olarak ölümsüz canlılar" kategorisinde yer almaktadır. Bu kategorideki canlılar, fiziksel bir şiddete maruz kalmadıkları müddetçe asla ölmezler ve teknik olarak soylarını sonsuza kadar sürdürebilirler.

Turritopsis dohrnii, bunu yapabilmek için, tek başına yaşayan bir birey olarak cinsel olgunluğa ulaştıktan sonra, cinsel olarak olgunlaşmamış koloni aşamasına tamamen geri dönebilir.

Turritopsis dohrnii'nin medusası çan şeklindedir, maksimum çapı yaklaşık **4,5 milimetredir** ve genellikle genişliği ile uzunluğu aynı boyuttadır. Çanın duvarlarındaki **mezoglea**, apekste bir miktar kalınlaşma dışında, büyük oranda eşit miktarda incedir. Nispeten büyük olan midesi parlak kırmızıdır ve enine kesiti bir haç şeklindedir. 1 milimetre çapındaki genç numunelerde kenar boyunca eşit aralıklarla yerleştirilmiş yalnızca **8** dokunaç bulunurken, yetişkin numunelerde **80-90** dokunaç bulunur. **Medusa** (denizanası formu), kafa kısmındaki epidermiste yoğun sinir ağı hücrelerine sahiptir. Bu sinir ağı, knidlilerde yaygın olarak bulunan radyal kanalın üzerinde halka benzeri büyük bir yapı oluşturur

### Evrimsel Tarih

Turritopsis'in **Pasifik'te** evrimleştiği düşünülmektedir; ancak Arktik-ötesi göçler yoluyla tüm dünyaya yayılmıştır. Ölümsüz denizanası, morfolojik olarak ayırt edilmesi kolay olan türlere evrimleşmiştir. Bu ayrı türlerin oluşturdukları popülasyonlar, yakın zamanda mitokondriyal ribozomal gen dizileri karşılaştırması yoluyla doğrulanmıştır.

<img style="border-radius: 10px; width: 75%;" src="https://i.imgur.com/DQ0Arid.png"></img>



### Ölümsüzlük ve Evrim

Ölüm, bir türe ait bir bireyin hayatını yitirerek genetik soy hattının sonuna ermesi demektir. Üreme, ölüme karşı evrimleşen yöntemlerden bir tanesi olarak görülebilir. Eşeyli olarak üreyen canlılar, gelecek nesillere kendilerinin yarısını aktarırlar. Eşeysiz olarak üreyen canlılarsa, çoğu zaman kendilerinin tam bir kopyasını gelecek nesillere aktarırlar. Böylelikle kendi bedenleri ölse bile, genleri ve o genlerden inşa edilen birebir kopyaları yaşamayı sürdüreceği için biyolojik ve evrimsel açıdan **"ölümsüz"** olmuş olurlar. Bu açıdan bakılacak olduğunda, tek hücreli canlıların neredeyse tamamı ile yassısolucanlar gibi eşeysiz olarak kendilerini kopyalayabilen canlılar, bazı bitkiler ve hatta bazı hayvanlar "biyolojik olarak ölümsüz" canlılardır. Çünkü bunlar, kendilerinin kopyalarını üretebilirler ve bir parçaları ölse bile, o kopyaları hayatta kalacağı için bireyin kendisi yaşamayı sürdürecektir.

Buradaki kritik nokta, **"biyolojik olarak ölümsüz"** canlıların, insanların hayal ettiği gibi **"ölümsüz"** olmadığıdır. Yani bu canlıların üzerine basacak, üzerlerine silahla ateş edecek veya herhangi bir diğer fiziksel şiddete başvuracak olursanız elbette vücut bütünlüklerini yitirerek ölürler. Bir diğer deyişle, "biyolojik olarak ölümsüz" olan canlılar, ölüme karşı mutlak dirençli canlılar değildirler; elbette ölebilirler. Fakat örneğin biz insanlar, üzerimizde hiçbir fiziksel şiddet olmasa bile nihayetinde mutlaka öleceğiz. Bundan kaçmamız (şimdilik) mümkün değildir. Fakat biyolojik olarak ölümsüz olan canlılar, söz konusu fiziksel şiddetin yokluğunda sonsuza kadar varlıklarını sürdürebilirler. Dediğimiz gibi, çoğu bunu kendi kopyalarını yaratarak, bir kısmı ise hızlı yenilenme yöntemleriyle bunu yaparlar.

### Neden bir JavaScript arayüzü kullanmalıyım?

İsterseniz Vue'nun fonksiyonlarını elinizle de yazabilirsiniz. Ancak asla tek başınıza böyle bir iş ortaya çıkartamazsınız. Diğerlerinin yardımını bile alsanız, böyle bir sistem çıkartmanız ömrünüzün birkaç yılını harcayabilir. İşte bunun için birçok geliştirici, yıllarını harcayarak başkaları kullansın diye geliştirdikleri göz bebekleri JavaScript arayüzlerini kullanmamıza olanak sağlıyor. Bu sistemleri kullanmanın çok büyük artıları var, hatta eğer orta/büyük çaplı bir projeye girişecekseniz (buna kişisel bir internet sitesi değil, bot kontrol panelleri gibi projeler giriyor) kesinlikle bir JavaScript arayüzü kullanmak isteyebilirsiniz. Artıları, normal bir HTML (EJS, Handlebars vs.) ile yapabileceklerinizden ÇOK daha fazla. İşte neden Vue'yu kullanmaya başlamanızı gerektirecek birkaç örnek:

### Her şey olması gerektiği gibi

Dosyaları istediğiniz kadar yanıltmaya, yanlış yazmaya çalışın. Vue'nun derleyicisi, bir hata gördüğünde çalışmayacağından sizi olabilecek birçok yanlıştan kurtarıyor. Vue'nun kendi sistemi bile birçok HTML dosyasından daha az yer kaplıyor. Verilere göre Vue'nun çalışması için gerekli dosyaların boyutu sadece ~25 KB civarında. Bu denli büyük iş gerçekleştiren bir araç için oldukça küçük bir boyut. Bu sayede sayfalar çok daha hızlı yükleniyor ve işleniyor, başınızın ağrımasını önlüyor.

### Anlaşılması kolay

Vue'nun dokümanları, diğerlerine göre çok daha temiz yazılmış, anlaşılabilir ve kolay olarak değerlendiriliyor. Örnekler ve çalışma biçimi de JavaScript'e aşina olan birine yabancı gelmeyeceğinden dolayı kullanımı ve anlaşılması kolay oluyor.

Diğerleriyle karşılaştırıldığında, daha hızlı ve daha az yer kaplıyor!
Vue (2014'den bu yana yayında, stabil sürümü 2019'da yayınlandı ve şimdiden GitHub'daki en çok yıldız alan arayüz),React (2013'den bu yana yayında) ve Angular (2016'dan bu yana yayında) gibi dev markaların geliştirdiği arayüzlerle karşılaştırdığında, derleme sonucu ortaya çıkardığı dosyalar çok daha ufak boyutlara sahip olduğu ve fonksiyonlarının sistemlere daha hızlı işlendiği için bu konuda da yarışı kazanıyor. Arada elbette 10 saniyelik bir fark yok ancak böyle durumlarda milisaniyeler bile hayat kurtarabiliyor. Derlenen dosya ne kadar küçük olursa, kullanıcıya ulaştırılması o kadar hızlı olur; işleyicinin fonksiyonları da ne kadar kaliteli olursa, işleme işleminin hızı da o kadar iyi olur. Vue her iki konuda da güzel bir iş çıkartmış.

### Uyumluluğu geniş

Projelerini Vue'nun rakiplerinden Vue'ya taşımak isteyenler neredeyse hiç zorlanmadan, projenin büyüklüğüne göre birkaç dakika içinde bile taşıyıp dönüştürebilir! Vue'nun çalışma tarzı, diğerlerine ne kadar benzemese de diğerlerinden gelenler içinde bir o kadar konuksever. Sizi geri çevirmeyecektir 😉

Herhangi bir veri değiştiğinde, sayfadaki verinin de otomatik olarak güncellenmesi;
Oldukça uzun bir başlık oldu ancak JavaScript arayüzlerinin bu özelliği de kesinlikle göz ardı edemeyecek kadar yararlı ve inanılmaz bir özellik. Bu sayede siz dosyanızda, modül kodlarınızdan bir veri çektiğinizde, daha sonra o değeri kod ile tekrar değiştirirseniz, bu veri sitede yeniden işleniyor ve tüm güncellemeler gerçekleşiyor. Bu işlemi normal bir HTML ile gerçekleştirmek size uzun ve kalitesiz uğraşlara neden olabilir. Birçoğumuz da bunu böyle yapmadan kullanıyoruz, sayfalar yenilenene kadar oraya bir veri eklense bile değişmiyor. Eğer ne demek istediğimi merak ediyorsanız, bu gönderinin altına bir yorum bırakın. Yorumunuzun otomatik olarak oluşacağını göreceksiniz. Oradaki alanın kodu aslında her zaman aynı. Ancak siz yorum yazdığınızda yeni bir giriş oluyor ve sizi otomatik olarak verinin içerisine kaydediyor, Vue'da bu veriyi tekrar işliyor ve size görülür bir biçime getiriyor. Muhteşem!

### İnanılmaz geniş modül olanağı

JavaScript arayüzleri kullanarak, neredeyse tüm NPM modüllerini internet sitelerinizde kullanabilirsiniz. Bu elbette botta kullandığınız gibi hepsini kullanabileceğiniz anlamına gelmiyor. Sitelerde çalışmayı destekleyen modüller olmak zorundalar. Bunlar içinde Vue için özel olarak geliştirilmiş binlerce modül bulunuyor. Örneğin internet sitelerinizde "moment" modülünü kullanmak istemez misiniz? Bunu elbette bir Express sunucunuz var ve EJS gibi bir dil kullanıyorsanız yapabilirsiniz ancak öyle bir durumda veriyi arka planda, sunucunuza işletmeniz gerekecektir. Vue'da ise bunu tamamen kullanıcının tarayıcısına, işlemcisine ve bilgisayarına yaptıracaksınız. Hem sunucunuz yorulmayacak, hem işlemler toplu istek gelen bir sitede işleneceğine, tek ve tamamiyle bütün bir bilgisayarda işleneceği için daha hızlı sonuç verecektir.

Anlayacağınız, her işlemi aslında Express ve diğerleriyle de yapabilirsiniz, ancak verileri sunucunun işlemesi, işlemlerin gecikmesine, sunucunun işlemci ve hafıza kullanımının artmasına neden olacaktır. Bu artışlar ufak veya büyük olabilir, aldığınız istek sayısına bağlı. Ancak Vue gibi bir sistem kullanıyorsanız, bilgiler kullanıcı tarafına iletilecek ve tamamen o makine içerisinde işlenecektir. Çok iyi değil mi?

### Geniş çap

Vue'nun genişliği, diğer arayüzlerin önüne geçmesine neden olan en önemli özelliklerinden birisidir. Vue ile birkaç belirli ayar yaparak (çoğu zaten internette başkaları tarafından yapılmış, kolayca ayarları yapabilirsiniz), sistemi isteğinize göre ayarlayabilirsiniz. Örneğin, Vue içerisinde bir TypeScript derleyicisi ile gelmiyor. Ancak bir ek modül ve ayar ile Vue'ya, "ben TypeScript kullanacağım, sen bunu JavaScript'e dönüştüreceksin, kullanıcılara ulaştıracaksın, anlaştık mı?" diyor, Vue'da bunu gerçekleştiriyor.

Bu durum CSS için de geçerli. Bugünlerde kimsenin CSS yazdığını mı sanıyorsunuz? Size görünen kısmı CSS olabilir ancak CSS'in sahip olmadığı birçok özelliğe sahip CSS kullanıcı arayüzleri (SCSS, SASS gibi), CSS yazmayı daha kolaylaştırdığı ve ek özelliklerle geldiği için tercih ediliyor. Vue'ya bunların ayarlamasını da yapabiliyorsunuz. Eğer CSS'inizi SCSS'de yazmak istiyorsanız yapacağınız şey çok basit. Vue sayfanızın içerisindeki `<style>` etiketine, bir lang niteliği ekleyip, devamına kullanmak istediğiniz dili yazmanız (örnek sonuç: `<style lang="scss">`). Bunu gerçekleştirdiğinizde. Vue derleyicisi, bu dilin nasıl CSS'e dönüştüğünü, ayarladığınız şekilde kararlaştırıp, derleme sırasında bunu da CSS'e dönüştürecek ve tarayıcıların okuyabileceği bir hale getirecektir. Ne kadar muhteşem? Bunu normal bir HTML dosyasında yapmanın ne kadar "kanser" olduğunu hayal edebilir misiniz 🤣

Bu kadarla bitti mi? Hayır, eğer isterseniz yazacağınız HTML dilini bile değiştirebiliyorsunuz! Evet, HTML içinde farklı sistemler bulunuyor. Bunlardan en popülerleri arasında [Handlebars](https://handlebarsjs.com/guide/#what-is-handlebars) ve [Pug](https://pugjs.org/api/getting-started.html) bulunuyor. Bunlar da aslında JavaScript kullanarak JavaScript'in kendisinde kullandığımız "çarpraz tırnak" (\`) işaretinin içinde kullanabildiğimiz JavaScript operatörü \${veri} gibi Handlebars ve Pug'da da farklı operatörler bulunuyor. Bunları direkt olarak sayfalarınızda belirttiğinizde bu sistemlerin JavaScript'i dokümanı oluşmadan önce tarıyor ve bulduğu bu verileri JavaScript'e göre işleyerek HTML'e dönüştürüyor. Vue, kendi içerisinde Handlebars kullanıyor. Vue `<script>` etiketlerinde belirttiğiniz verilerine Handlebars'ın handlebar'ları ile erişebiliyorsunuz. Yani, JavaScript'teki `${"1 + 1 = " + (1+1)}` (bunun çıktısı 1+1 = 2 olacaktır) verisinin karşılığı, Vue'da varsayılan olarak `{{ "1 + 1 = " + (1+1) }}` oluyor. JavaScript'in sistemi aynı olduğu için sadece operatörler değişiklik gösteriyor ancak bunlar veriyi EJS gibi sunucu tarafında işlenen sistemlerin operatörlerinden daha kolay olmasını sağlıyor. Eğer EJS dilinde yukarıdaki işlemi gerçekleştirmek istiyorsanız, `<%= "1 + 1 = " + (1+1) %>` yapmanız gerekecektir. Bu her ne kadar çok uzun gelmese de, sık kullanımda can sıkıcı dereceye geliyor.

### Peki, Nuxt nedir?

Bu sitenin de yazıldığı dil olan Nuxt, syntax (biçimlendirme) olarak birebir Vue ile aynı ancak aralarında önemli birçok fark da bulunuyor. Vue'yu çalışır hale getirmek ilk başta zor gelebilir ancak Nuxt'u çalıştırmak, neredeyse normal bir HTML sitesi yapmaktan daha kolay. Hatta eğer isterseniz tamamiyle gelişmiş bir dosya sistemine sahip, her şeyi içinde, tüm ayarları yapılmış bir Nuxt projesine, [create-nuxt-app](https://www.npmjs.com/package/create-nuxt-app) adı verilen NPX modülüyle otomatik olarak oluşturabilirsiniz. Bu modülü Windows üzerinden kuramayabilirsiniz, WSL veya Linux üzerinden kurulumu gerçekleştirecekler içinde modül, oluşturma sırasında sizlere projenin ismini, açıklamasını, yapımcısını, devamında da kullanmak istiyorsanız ek bir arayüz framework'u seçmenize olanak sağlıyor. Bunların içerisinde Google'ın materyal tasarımı olan, bu sitenin de kullandığı [Vuetify](https://vuetifyjs.com/), DBL ve DBL'den çok daha popüler sitelerin de kullandığı [Bulma](https://bulma.io/) gibi birkaç tane daha seçenek bulunuyor. Nuxt uygulaması oluşturmanın en güzel yanlarından birisi de, bunları isteğinize göre seçebiliyor olmanız. Bunları seçmeniz durumunda modül, otomatik olarak gerekli ayarları ve dosyaları yükleyerek size çalışır bir sistem verecektir. Hatta devamında eğer isterseniz hangi sunucuyu kullanacağını (kendi sunucusu, Express gibi) dahi seçme olanağı sağlıyor. Eğer Express seçip gelişmiş yönlendirici kodlarını düzenlemeyi düşünmüyorsanız bu ayarı varsayılan ayarda bırakın derim. Devamında birkaç soru daha sorduktan sonra, sizin sadece bir terminal komutu ile çalıştırabileceğiniz bir Nuxt uygulaması oluşturacaktır.

Nuxt'un çapı, Vue'dan da geniştir. Vue'yu ve birçok profesyonel derleme araçları (webpack, PostCSS gibi) kullandığı için Vue ile yapabileceğiniz web uygulamalarından daha da gelişmişlerini yapabileceksiniz. Eğer isterseniz PWA, Google'ın AMP projesi gibi ayarları da internet sitenize sadece tek modül ile entegre edebileceksiniz. Nuxt'un klasör sistemi de oldukça temiz ve otomatik olarak ayarlanmaktadır. Yani, Nuxt'un oluşturduğu `pages/` klasörüne siz bir Vue dosyası attığınızda, Nuxt, o dosyayı görüp içeriğini işleyerek hemen bir `www.siteniz.com/dosya` yönlendirmesini oluşturuyor. Buraya klasörü oluşturup içerisine başka bir dosya attığınızda ise de `www.siteniz.com/klasor/baskaDosya` biçiminde başka bir yönlendirme oluşturuyor. Bu işlemi tamamen otomatik ve saniyeler içerisinde yapması gerçekten çok etkileyici. Yukarıda Vue'yu yeterince övdüğüme göre, sıra Nuxt'u, Vue'dan farklı kılan kısımları övmeye geldi. Başlayalım:

### Sunucu Taraflı İşleme (Server-Side Rendering / SSR) ve asyncData

Bu, sizin Nuxt kullanmanız için, benim gibi en büyük nedeniniz olabilir. Çünkü bu demek, Nuxt ile muhteşem işler çıkarabilirsiniz demek. Bunun yanında asyncData ile de gelen Nuxt, bu sayede sizlerin sayfa kullanıcıya ulaşmadan işlenecek verileri belirtmenize olanak tanıyor. Bu sayede bu sitede olduğu gibi, veritabanından veriyi çekip o veriyi kullanarak güzel önizlemeler oluşturabilir, sayfa yerleşmeden önce yapılacak işlemlerinizi gerçekleştirebilirsiniz. Bu konuda fazla denilecek bir şey olmasa da Nuxt'u kullanmanızın en büyük nedenlerinden birisinin bu olacağının garantisini verebilirim.

### HEAD etiketlerini düzenleyebilme olanağı

Nuxt kullanarak, her sayfaya özel `<head>` etiketleri (`<meta>`, `<style>` gibi) oluşturabilme. Bu sayede bahsettiğim önizlemeleri oluşturabilir, internet sitenizin arama motoru dostu hale getirebilir ve benzeri şeyleri yapabilirsiniz.

### Statik dosyalar

Nuxt'un klasör sisteminin bir güzel yanı da, statik dosyaların da otomatik olarak herkesin ulaşabileceği bir biçimde olmasıdır. Birçok diğer dilde bu klasörleri belirtecekken, Nuxt sizin için bu klasörü de oluşturup, içine attığınız şeyleri otomatik olarak ulaşılabilir hale getiriyor. Örneğin, logonuz ve sitenizin küçük resmini (favicon) bu klasörde barındırmalısınız, herkesin ulaşıp bunları görmesi gerekir değil mi? Diğer dosyalar işlendikten sonra ulaşılamaz olacaktır, bu klasörde bulunan dosyalar ve alt klasörler ise işlenen verinin içerisine aynen aktarılacak ve herkes tarafından ulaşılabilecektir.

### JS & CSS'yi otomatik olarak küçültme

"Minify" denilen bu özellik, JavaScript ve CSS dosyalarında gereksiz yorumları, boşlukları silerek, tek satırlık bir kod oluşturarak, daha küçük bir dosya boyutu oluşmasını sağlıyor. Bu işlemi Nuxt otomatik olarak yapıyor. Sayfalarda yazdığınız JavaScript ve CSS kodları da derlenerek küçültülüyor.

### Geliştirme aşamasında otomatik yenileme

Bu özellik aslında Vue'da da var, ancak Vue, webpack adlı sistemi kullandığı için aslında o işi yapan Vue değil, webpack'dir. Nuxt'da ise bu işi yapan yine webpack olsa bile Nuxt, bizim kolayca etkileşim kurabileceğimiz bir webpack aracısı oluyor. Biz sadece tek komut çalıştırıyoruz, herhangi bir dosyada herhangi bir değişiklik yaptığımızda ise Nuxt otomatik olarak işleve geçiyor ve o sayfayı, değiştirilen veri yenileme gerektirmiyorsa yenilemeden, gerektiriyorsa da yenileyerek düzenliyor. Bu da Nuxt'un ve Vue'nun en güzel yanlarından biri. Üstelik Nuxt'un çok güzel bir yükleniyor sayfası da var :^)

### TL; DR

Maalesef böyle bir konu da çok uzundu, okumadım yok. Burada belirttiklerim bu iki muazzam dilin sadece en öne çıkan özellikleri. Arkalarında gerçekleşen harika toplulukları, forumları ve dokümanları ile yardım bulmakta hiç zorlanmayacaksınız. Gönderiyi okumanız için bir neden görmüyorum, ancak ben yazmak için bir nedene sahibim, sitemi bu dil ile yazıyorum, ve kesinlikle memnunum. Siz de eğer ileride botunuz için bir kontrol paneli veya orta/büyük derecede bir web uygulaması yapmayı düşünürseniz kesinlikle Nuxt (veya Vue), veya bunları istemezseniz Facebook'un React'ını, Google'ın ise Angular'ını deneyebilirsiniz. Buradaki veriler kendi görüşümdür, veriler başka sitelerden alınıp, düzenlenmiş ve Türkçeye çevrilmiştir. Bir yorumu esirgemeyin, Twitter'da beni takip ederseniz de mutlu olurum.

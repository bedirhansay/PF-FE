import softwareBlogImage from "../../../public/blog/test.jpg";
import techBlogImage1 from "../../../public/blog/html.jpg";
import techBlogImage3 from "../../../public/blog/sm-1.jpg";
import codeSnippetImage from "../../../public/blog/Item1.jpg";

export const blog = [
  {
    id: 1,
    title: "Seo Metrikleri ve Performans Metrikleri Nelerdir?",
    slug: "seo-metricleri-nelerdir",
    description: `
    <ol>
      <li><strong>Largest Contentful Paint (LCP):</strong>
        <ul>
          <li>LCP, sayfanın yüklendikten sonraki en büyük içeriğin kullanılabilir hale gelmesi süresini ölçer. Bu genellikle ana içerik veya görsellerdir.</li>
          <li>LCP'nin iyi olması, kullanıcıların web sitenizin içeriğine daha hızlı erişebileceği anlamına gelir. Hızlı yükleme süreleri, SEO sıralamanızı artırabilir.</li>
        </ul>
      </li>
      <li><strong>First Contentful Paint (FCP):</strong>
        <ul>
          <li>FCP, sayfanın yüklendikten sonra ilk içerik parçasının görüntülenmeye başlama süresini ölçer.</li>
          <li>İlk içerik parçasının hızlı bir şekilde görünür hale gelmesi, kullanıcıların sayfanın yüklenme sürecini olumlu bir şekilde deneyimlemesine yardımcı olur.</li>
        </ul>
      </li>
      <li><strong>Cumulative Layout Shift (CLS):</strong>
        <ul>
          <li>CLS, sayfanın yüklendiği sırada sayfa öğelerinin yer değiştirme durumunu ölçer. Bu, sayfa yüklenirken aniden değişen düzenleri ifade eder.</li>
          <li>İyi bir CLS, kullanıcıların sayfa içinde dolaşırken ani ve rahatsız edici kaydırmaları önler. Bu da kullanıcı deneyimini olumlu etkiler.</li>
        </ul>
      </li>
      <li><strong>Mobile Friendly (Mobil Dostu):</strong>
        <ul>
          <li>Mobil cihazlara uygun bir tasarım ve kullanılabilirlik, SEO için önemlidir. Google'ın mobil cihazlara öncelik vermesi nedeniyle mobil uyumluluk büyük bir faktördür.</li>
        </ul>
      </li>
      <li><strong>Page Speed (Sayfa Hızı):</strong>
        <ul>
          <li>Sayfa hızı, web sitenizin yükleme hızını ölçer. Hızlı yükleme süreleri, kullanıcıların sitenizi daha iyi deneyimlemesine ve arama motorlarının sitenizi daha yüksek sıralarda listelemesine yardımcı olabilir.</li>
        </ul>
      </li>
      <li><strong>Sitemaps (Site Haritaları):</strong>
        <ul>
          <li>Site haritaları, arama motorlarına web sitenizin yapısını ve içeriğini bildirir. Doğru bir şekilde yapılandırılmış site haritaları, arama motorlarının sitenizi daha iyi indekslemesine yardımcı olabilir.</li>
        </ul>
      </li>
      <li><strong>Robots.txt ve Meta Robots:</strong>
        <ul>
          <li>Robots.txt ve meta robots etiketleri, arama motorlarına hangi sayfaların indekslenip indekslenmeyeceğini belirler. Bu, istenmeyen sayfaların indekslenmesini önler ve arama motorlarına hangi içeriğin önemli olduğunu gösterir.</li>
        </ul>
      </li>
      <li><strong>Backlink Kalitesi ve Sayısı:</strong>
        <ul>
          <li>Yüksek kaliteli ve sayıda geri bağlantı (backlink), web sitenizin otoritesini artırabilir. Ancak düşük kaliteli veya spam bağlantılar, SEO'ya zarar verebilir.</li>
        </ul>
      </li>
      <li><strong>Kaliteli İçerik:</strong>
        <ul>
          <li>Kaliteli, bilgilendirici ve ilgi çekici içerik, kullanıcıların sitenizi daha uzun süre ziyaret etmelerine ve tekrar ziyaret etmelerine neden olabilir. Bu da SEO'ya olumlu katkı sağlar.</li>
        </ul>
      </li>
    </ol>
  `,
    date: "11 Aug 2023",
    viewCount: 512,
    image: codeSnippetImage,
    category: "Seo",
    author: {
      name: "Elif Aydın",
      bio: "Elif Aydın, çevre konularına duyarlı bir yazılım geliştirici ve sürdürülebilir yazılım savunucusudur.",
    },
  },
  {
    id: 2,
    title: "Javascript'in genel kavramları nelerdir?",
    slug: "javascriptin-genel-kavramlari-nelerdir",
    description: `
  <div>
    <h2>Browser Nedir?</h2>
    <p> İnternet sayfalarına ulaşımı sağlayan yazılım ve programlar browser yani tarayıcı olarak adlandırılır. <strong>Browserlar</strong>, internet kullanıcılarının web sitelerinin depolandığı sunuculara bağlanmasını ve içeriklerin görüntülenmesini sağlayan yazılımlardır.</p>
     <h2>ECMA Nedir?</h2>
    <p> ECMAScript, European Computer Manufacturers Association (Avrupa Bilgisayar Üreticileri Birliği) tarafından kontrol edilen bir standartlaştırma kuruluşudur. ECMAScript (veya kısaca ES), JavaScript'in standartlaştırılmış bir versiyonudur. ECMAScript, JavaScript dilinin özelliklerini tanımlayan bir spesifikasyondur ve dilin nasıl çalışması gerektiğini belirleyen bir rehber niteliğindedir. ECMAScript'in ilk sürümü 1997 yılında yayınlanmıştır ve o zamandan beri düzenli olarak yeni sürümler çıkmaktadır. Her sürüm, dilin yeni özelliklerini ve geliştirmelerini tanımlar. Bu nedenle, ECMAScript ve JavaScript terimleri sıklıkla birbirinin yerine kullanılır. Örneğin, "ECMAScript 6" veya "ES6" denildiğinde, JavaScript dilinin 2015 yılında yayınlanan ECMAScript 2015 sürümünü ifade eder. Fakat tarayıcılar hala bu versiyona tam destek vermiyor. O yüzden kodlarımızı <strong>Ecmascript 5</strong> dönüştürmemiz gerekiyor. Bu dönüşüm işlemi için <strong>BabelJs</strong> kullanmamız gerekiyor.</p>
    <h2>CORS Nedir?</h2>

    <p>CORS (Cross-Origin Resource Sharing), farklı kökenlere sahip web sayfalarının kaynaklara (örneğin, API'lar) erişirken tarayıcılar tarafından uygulanan bir güvenlik mekanizmasıdır. Aynı kaynağa (origin) ait olmayan bir web sayfasının, başka bir kaynaktan (origin) veri veya kaynak talep etmesi CORS politikalarına tabidir. Web tarayıcıları, güvenlik nedenleriyle varsayılan olarak, bir web sayfasının sadece aynı kök (origin) adrese sahip kaynaklara (URL) erişmesine izin verir. Kök adresten farklı bir adrese yapılan HTTP istekleri, CORS politikaları tarafından engellenir. Bu kısıtlama, potansiyel olarak kötü niyetli saldırıları önlemek için uygulanır.</p>
  </div>
  <h2>Strict Mode</h2>
  <ul>
    <li>Standartlaştırılmış Javascript dilinin dışında yazılmaya çalışılan kod için hata göstererek kodun stabil kalmasını sağlayan yapıdır.</li>
    <li><strong>Sözdizimsel Katı Kurallar:</strong> Değişken tanımlamadan önce onu kullanmak, this değerini belirlemek için kullanılan with ifadesi veya eval fonksiyonunun güvenli olmayan kullanımları gibi durumlar hata oluşturur.</li>
    <li><strong>Anonymus Fonksiyonlar:</strong> Strict mode'da, bir isimsiz fonksiyon ifadesinin dışında, yani doğrudan bir ifade olarak kullanıldığında, fonksiyonun kendi kendini çağırması engellenir. Böylece, potansiyel hata kaynaklarının önüne geçilir.</li>
    <li><strong>Değişken Tanımlama Kısıtlamaları:</strong> Strict mode'da, değişkenlerin tanımlanmasında "var" anahtar kelimesi yerine "let" veya "const" anahtar kelimeleri tercih edilir. Ayrıca, aynı kapsamdaki aynı isimli değişkenlerin birden fazla kez tanımlanması hata olarak raporlanır.</li>
    <li><strong>this değeri:</strong> Strict mode'da, global bir fonksiyon içinde "this" değeri, "undefined" olarak ayarlanır. Bu, this değerini kontrolsüz bir şekilde kullanmaktan kaynaklanan hataları önler ve doğru this bağlamının sağlanması için dikkatli kullanımı teşvik eder.</li>
  </ul>
</div>
`,
    date: "12 Jun 2023",
    viewCount: 789,
    category: "Javascript",
    image: techBlogImage3,
    author: {
      name: "Murat Demir",
      bio: "Murat Demir, teknolojiye olan ilgisiyle bilinen bir yazılım mühendisidir.",
    },
  },
  {
    id: 3,
    title: "Javascript modül sistemleri ve kullanılan kütüphaneler nelerdir?",
    slug: "javascript-modul-sistemleri-ve-kullanilan-kutuphaneler-nelerdir",
    description: `
    <div>
      <h2>WebPack: En Yaygın Bundler Mekanizmalarından biridir</h2>
      <p>Vanilla JavaScript ile yazılan projelerde webpack konfigürasyonu çok fazla olabilir. CSS dosyaları, image dosyaları ve JavaScript dosyaları gibi dosyalar webpack tarafından işlenir.</p>
  
      <ul>
          <li><strong>Minification (Sıkıştırma):</strong> Gereksiz boşluklar, girintiler, yorumlar gereksiz karakterler kaldırılarak dosya boyutu küçültülerek, indirme süresi azaltılır.</li>
          <li><strong>Tree Shaking:</strong> Kullanılmayan kod parçalarını, değişkenleri kaldırarak sadece etkin kodları paketler.</li>
          <li><strong>Uglification:</strong> Semantik olmayan değişken ve fonksiyon isimlerini karışık karakterlerle değiştirir.</li>
          <li><strong>Modül Çözme ve Birleştirme:</strong> Farklı modüller arasındaki bağımlılıklar çözülür ve uygun birleştirme sağlanır. Common Js, ES6 ve AMD modüller ile farklı yapılandırılabilir.</li>
          <li><strong>Kaynak Haritaları (Source Maps):</strong> Bundling sonucunda oluşan dosyanın orijinal kaynak koduyla ilişkilendirilmesini sağlayan kaynak haritaları oluşturulabilir.</li>
          <li><strong>Hot Module Replacement (HMR):</strong> Geliştirme sırasında hızlı gerçek zamanlı güncellemeler sağlayan HMR özelliğini destekler.</li>
          <li><strong>Loader'lar:</strong> Dosyaların işlenmesi için loader'ları kullanır. Örneğin, CSS dosyaları için CSS loader veya resim dosyaları için file loader gibi loader'lar kullanılabilir.</li>
          <li><strong>Dinamik HTML Yapısı:</strong> Dinamik HTML yapısı da oluşturulabilir.</li>
      </ul>
   
      <h2>Gulp: JavaScript Projelerinde Kullanılan Bir Görev Yöneticisidir</h2>
      <p>Gulp, JavaScript projelerinde genel olarak build işlemlerini kolaylaştırmak ve otomasyon sağlamak için kullanılan bir görev yöneticisidir.</p>
      <ul>
          <li><strong>Projenin Derlenmesi ve Paketlenmesi:</strong> React projeleri için JavaScript dosyaları, stil dosyaları ve statik dosyalar bir araya getirilip paketlenir.</li>
          <li><strong>Resim ve Diğer Statik Dosyaların İşlenmesi:</strong> Resimler, font dosyaları ve diğer statik dosyalar Gulp ile işlenebilir.</li>
          <li><strong>Canlı Yeniden Yükleme (Live Reload):</strong> Gulp, projede yapılan değişiklikleri otomatik olarak tarayıcıda yeniden yükleyebilir.</li>
          <li><strong>Proje Süreçlerinin Otomatikleştirilmesi:</strong> Gulp, projede süreçleri otomatikleştirmek için kullanılır ve geliştirme sürecini hızlandırabilir.</li>
      </ul>
  
      <h2>Modül Sistemi: ES6, AMD ve CommonJS</h2>
      <p>ES6, AMD ve CommonJS, JavaScript projelerinde kullanılan üç farklı modül sistemi standardını temsil eder. Bu modül sistemleri, JavaScript kodunun modüler bir şekilde organize edilmesini ve farklı dosyalarda tanımlanan modüllerin birbirleriyle etkileşimini yönetmeyi sağlar.</p>
      <p>İşlevleri, değişkenleri ve diğer kod parçalarını paketlemek, yeniden kullanmak ve projeler arasında paylaşmak için kullanılırlar.</p>

      <h2>AMD (Asynchronous Module Definition)</h2>
      <p>AMD, asenkron yüklemeleri destekleyen bir modül sistemi standardıdır. AMD, RequireJS kütüphanesi tarafından popüler hale getirilmiştir. AMD modüllerinin temel özelliği, modüllerin isteğe bağlı olarak yüklenmesine ve modül yüklemelerinin paralel olarak gerçekleştirilmesine olanak sağlamasıdır. Bu, büyük projelerde performansı artırabilir. AMD modülleri, define ve require fonksiyonlarını kullanarak tanımlanır ve kullanılır.</p>

      <h2>Common JS</h2>
      <p>CommonJS, sunucu taraflı JavaScript uygulamalarında yaygın olarak kullanılan bir modül sistemi standardıdır. Node.js tarafından benimsenen CommonJS, tarayıcı ortamında doğrudan desteklenmez, ancak bazı derleyiciler ve araçlar tarafından kullanılabilir. CommonJS modülleri, require fonksiyonunu kullanarak diğer modülleri içeri aktarır ve module.exports veya exports nesnesini kullanarak modülün dışa aktarılacak bileşenlerini belirtir.</p>
      `,
    date: "13 Jun 2023",
    viewCount: 632,
    category: "React Js",
    image: softwareBlogImage,
    author: {
      name: "Ayşe Yılmaz",
      bio: "Ayşe Yılmaz, yazılım geliştirme ve kod yönetimi konularında uzmanlaşmış bir yazılım mühendisi ve yazardır.",
    },
  },
  {
    id: 4,
    category: "TypeScript",
    title: "Browser storage kavramları nelerdir?",
    slug: "browser-storage-kavramlari-nelerdir",
    description: `
    <div>
      <h2>Cookies</h2>
      <p>Cookies, web sunucusu ve tarayıcı arasında veri alışverişi yapmak için kullanılan küçük metin dosyalarıdır. Tarayıcı tarafından otomatik olarak her HTTP isteğiyle sunucuya gönderilir. Cookies, belirli bir süre boyunca veya belirli bir tarihte geçerlilik süresi olan verileri depolayabilir. Cookies, kullanıcı tarafından silinmediği sürece kalıcıdır ve tarayıcıyı kapattığınızda bile saklanır. Cookies, sınırlı boyutlara (genellikle 4KB) sahiptir ve her HTTP isteğiyle sunucuya gönderildiği için ağ trafiğini artırabilir. Cookies, sunucu tarafında oluşturulurlar ve HTTP yanıt başlıklarında gönderilirler. Cookies, tarayıcı ayarları veya JavaScript kullanılarak okunabilir ve yazılabilir.</p>

      <h2>Local Storage</h2>
      <p>Local Storage, tarayıcıda kalıcı olarak veri depolamak için kullanılan bir web depolama mekanizmasıdır. Local Storage, daha büyük boyutlarda veri depolama imkanı sağlar (genellikle 5MB veya daha fazla). Veriler, tarayıcı kapatılsa bile kalıcı olarak saklanır ve daha sonraki ziyaretlerde kullanılabilir. Local Storage, JavaScript aracılığıyla tarayıcı tarafından okunabilir ve yazılabilir. Local Storage, sunucu ile otomatik olarak etkileşimde bulunmaz, sadece tarayıcıda depolanır. Local Storage, tarayıcı sekmeleri veya farklı pencereler arasında paylaşılır.</p>

      <h2>Session Storage</h2>
      <p>Session Storage, tarayıcıda geçici olarak veri depolamak için kullanılan bir web depolama mekanizmasıdır. Session Storage, daha küçük boyutlarda veri depolama imkanı sağlar (genellikle 5MB veya daha fazla). Veriler, tarayıcı oturumu devam ettiği sürece saklanır. Tarayıcı kapatıldığında veya sekme kapatıldığında veriler silinir. Session Storage, JavaScript aracılığıyla tarayıcı tarafından okunabilir ve yazılabilir. Session Storage, tarayıcı sekmeleri veya farklı pencereler arasında paylaşılmaz.</p>
    </div>
    `,
    date: "17 Jun 2023",
    viewCount: 512,
    image: techBlogImage1,
    author: {
      name: "Elif Aydın",
      bio: "Elif Aydın, güvenlik konularına duyarlı bir yazılım güvenlik uzmanı ve sürdürülebilir yazılım savunucusudur.",
    },
  },
  {
    id: 4,
    category: "TypeScript",
    title: "Browser storage kavramları nelerdir?",
    slug: "browser-storage-kavramlari-nelerdir",
    description: `
    <div>
      <h2>Cookies</h2>
      <p>Cookies, web sunucusu ve tarayıcı arasında veri alışverişi yapmak için kullanılan küçük metin dosyalarıdır. Tarayıcı tarafından otomatik olarak her HTTP isteğiyle sunucuya gönderilir. Cookies, belirli bir süre boyunca veya belirli bir tarihte geçerlilik süresi olan verileri depolayabilir. Cookies, kullanıcı tarafından silinmediği sürece kalıcıdır ve tarayıcıyı kapattığınızda bile saklanır. Cookies, sınırlı boyutlara (genellikle 4KB) sahiptir ve her HTTP isteğiyle sunucuya gönderildiği için ağ trafiğini artırabilir. Cookies, sunucu tarafında oluşturulurlar ve HTTP yanıt başlıklarında gönderilirler. Cookies, tarayıcı ayarları veya JavaScript kullanılarak okunabilir ve yazılabilir.</p>

      <h2>Local Storage</h2>
      <p>Local Storage, tarayıcıda kalıcı olarak veri depolamak için kullanılan bir web depolama mekanizmasıdır. Local Storage, daha büyük boyutlarda veri depolama imkanı sağlar (genellikle 5MB veya daha fazla). Veriler, tarayıcı kapatılsa bile kalıcı olarak saklanır ve daha sonraki ziyaretlerde kullanılabilir. Local Storage, JavaScript aracılığıyla tarayıcı tarafından okunabilir ve yazılabilir. Local Storage, sunucu ile otomatik olarak etkileşimde bulunmaz, sadece tarayıcıda depolanır. Local Storage, tarayıcı sekmeleri veya farklı pencereler arasında paylaşılır.</p>

      <h2>Session Storage</h2>
      <p>Session Storage, tarayıcıda geçici olarak veri depolamak için kullanılan bir web depolama mekanizmasıdır. Session Storage, daha küçük boyutlarda veri depolama imkanı sağlar (genellikle 5MB veya daha fazla). Veriler, tarayıcı oturumu devam ettiği sürece saklanır. Tarayıcı kapatıldığında veya sekme kapatıldığında veriler silinir. Session Storage, JavaScript aracılığıyla tarayıcı tarafından okunabilir ve yazılabilir. Session Storage, tarayıcı sekmeleri veya farklı pencereler arasında paylaşılmaz.</p>
    </div>
    `,
    date: "17 Jun 2023",
    viewCount: 512,
    image: techBlogImage1,
    author: {
      name: "Elif Aydın",
      bio: "Elif Aydın, güvenlik konularına duyarlı bir yazılım güvenlik uzmanı ve sürdürülebilir yazılım savunucusudur.",
    },
  },
  {
    id: 4,
    category: "TypeScript",
    title: "Browser storage kavramları nelerdir?",
    slug: "browser-storage-kavramlari-nelerdir",
    description: `
    <div>
      <h2>Cookies</h2>
      <p>Cookies, web sunucusu ve tarayıcı arasında veri alışverişi yapmak için kullanılan küçük metin dosyalarıdır. Tarayıcı tarafından otomatik olarak her HTTP isteğiyle sunucuya gönderilir. Cookies, belirli bir süre boyunca veya belirli bir tarihte geçerlilik süresi olan verileri depolayabilir. Cookies, kullanıcı tarafından silinmediği sürece kalıcıdır ve tarayıcıyı kapattığınızda bile saklanır. Cookies, sınırlı boyutlara (genellikle 4KB) sahiptir ve her HTTP isteğiyle sunucuya gönderildiği için ağ trafiğini artırabilir. Cookies, sunucu tarafında oluşturulurlar ve HTTP yanıt başlıklarında gönderilirler. Cookies, tarayıcı ayarları veya JavaScript kullanılarak okunabilir ve yazılabilir.</p>

      <h2>Local Storage</h2>
      <p>Local Storage, tarayıcıda kalıcı olarak veri depolamak için kullanılan bir web depolama mekanizmasıdır. Local Storage, daha büyük boyutlarda veri depolama imkanı sağlar (genellikle 5MB veya daha fazla). Veriler, tarayıcı kapatılsa bile kalıcı olarak saklanır ve daha sonraki ziyaretlerde kullanılabilir. Local Storage, JavaScript aracılığıyla tarayıcı tarafından okunabilir ve yazılabilir. Local Storage, sunucu ile otomatik olarak etkileşimde bulunmaz, sadece tarayıcıda depolanır. Local Storage, tarayıcı sekmeleri veya farklı pencereler arasında paylaşılır.</p>

      <h2>Session Storage</h2>
      <p>Session Storage, tarayıcıda geçici olarak veri depolamak için kullanılan bir web depolama mekanizmasıdır. Session Storage, daha küçük boyutlarda veri depolama imkanı sağlar (genellikle 5MB veya daha fazla). Veriler, tarayıcı oturumu devam ettiği sürece saklanır. Tarayıcı kapatıldığında veya sekme kapatıldığında veriler silinir. Session Storage, JavaScript aracılığıyla tarayıcı tarafından okunabilir ve yazılabilir. Session Storage, tarayıcı sekmeleri veya farklı pencereler arasında paylaşılmaz.</p>
    </div>
    `,
    date: "17 Jun 2023",
    viewCount: 512,
    image: techBlogImage1,
    author: {
      name: "Elif Aydın",
      bio: "Elif Aydın, güvenlik konularına duyarlı bir yazılım güvenlik uzmanı ve sürdürülebilir yazılım savunucusudur.",
    },
  },
  {
    id: 4,
    category: "TypeScript",
    title: "Browser storage kavramları nelerdir?",
    slug: "browser-storage-kavramlari-nelerdir",
    description: `
    <div>
      <h2>Cookies</h2>
      <p>Cookies, web sunucusu ve tarayıcı arasında veri alışverişi yapmak için kullanılan küçük metin dosyalarıdır. Tarayıcı tarafından otomatik olarak her HTTP isteğiyle sunucuya gönderilir. Cookies, belirli bir süre boyunca veya belirli bir tarihte geçerlilik süresi olan verileri depolayabilir. Cookies, kullanıcı tarafından silinmediği sürece kalıcıdır ve tarayıcıyı kapattığınızda bile saklanır. Cookies, sınırlı boyutlara (genellikle 4KB) sahiptir ve her HTTP isteğiyle sunucuya gönderildiği için ağ trafiğini artırabilir. Cookies, sunucu tarafında oluşturulurlar ve HTTP yanıt başlıklarında gönderilirler. Cookies, tarayıcı ayarları veya JavaScript kullanılarak okunabilir ve yazılabilir.</p>

      <h2>Local Storage</h2>
      <p>Local Storage, tarayıcıda kalıcı olarak veri depolamak için kullanılan bir web depolama mekanizmasıdır. Local Storage, daha büyük boyutlarda veri depolama imkanı sağlar (genellikle 5MB veya daha fazla). Veriler, tarayıcı kapatılsa bile kalıcı olarak saklanır ve daha sonraki ziyaretlerde kullanılabilir. Local Storage, JavaScript aracılığıyla tarayıcı tarafından okunabilir ve yazılabilir. Local Storage, sunucu ile otomatik olarak etkileşimde bulunmaz, sadece tarayıcıda depolanır. Local Storage, tarayıcı sekmeleri veya farklı pencereler arasında paylaşılır.</p>

      <h2>Session Storage</h2>
      <p>Session Storage, tarayıcıda geçici olarak veri depolamak için kullanılan bir web depolama mekanizmasıdır. Session Storage, daha küçük boyutlarda veri depolama imkanı sağlar (genellikle 5MB veya daha fazla). Veriler, tarayıcı oturumu devam ettiği sürece saklanır. Tarayıcı kapatıldığında veya sekme kapatıldığında veriler silinir. Session Storage, JavaScript aracılığıyla tarayıcı tarafından okunabilir ve yazılabilir. Session Storage, tarayıcı sekmeleri veya farklı pencereler arasında paylaşılmaz.</p>
    </div>
    `,
    date: "17 Jun 2023",
    viewCount: 512,
    image: techBlogImage1,
    author: {
      name: "Elif Aydın",
      bio: "Elif Aydın, güvenlik konularına duyarlı bir yazılım güvenlik uzmanı ve sürdürülebilir yazılım savunucusudur.",
    },
  },
  {
    id: 4,
    category: "TypeScript",
    title: "Browser storage kavramları nelerdir?",
    slug: "browser-storage-kavramlari-nelerdir",
    description: `
    <div>
      <h2>Cookies</h2>
      <p>Cookies, web sunucusu ve tarayıcı arasında veri alışverişi yapmak için kullanılan küçük metin dosyalarıdır. Tarayıcı tarafından otomatik olarak her HTTP isteğiyle sunucuya gönderilir. Cookies, belirli bir süre boyunca veya belirli bir tarihte geçerlilik süresi olan verileri depolayabilir. Cookies, kullanıcı tarafından silinmediği sürece kalıcıdır ve tarayıcıyı kapattığınızda bile saklanır. Cookies, sınırlı boyutlara (genellikle 4KB) sahiptir ve her HTTP isteğiyle sunucuya gönderildiği için ağ trafiğini artırabilir. Cookies, sunucu tarafında oluşturulurlar ve HTTP yanıt başlıklarında gönderilirler. Cookies, tarayıcı ayarları veya JavaScript kullanılarak okunabilir ve yazılabilir.</p>

      <h2>Local Storage</h2>
      <p>Local Storage, tarayıcıda kalıcı olarak veri depolamak için kullanılan bir web depolama mekanizmasıdır. Local Storage, daha büyük boyutlarda veri depolama imkanı sağlar (genellikle 5MB veya daha fazla). Veriler, tarayıcı kapatılsa bile kalıcı olarak saklanır ve daha sonraki ziyaretlerde kullanılabilir. Local Storage, JavaScript aracılığıyla tarayıcı tarafından okunabilir ve yazılabilir. Local Storage, sunucu ile otomatik olarak etkileşimde bulunmaz, sadece tarayıcıda depolanır. Local Storage, tarayıcı sekmeleri veya farklı pencereler arasında paylaşılır.</p>

      <h2>Session Storage</h2>
      <p>Session Storage, tarayıcıda geçici olarak veri depolamak için kullanılan bir web depolama mekanizmasıdır. Session Storage, daha küçük boyutlarda veri depolama imkanı sağlar (genellikle 5MB veya daha fazla). Veriler, tarayıcı oturumu devam ettiği sürece saklanır. Tarayıcı kapatıldığında veya sekme kapatıldığında veriler silinir. Session Storage, JavaScript aracılığıyla tarayıcı tarafından okunabilir ve yazılabilir. Session Storage, tarayıcı sekmeleri veya farklı pencereler arasında paylaşılmaz.</p>
    </div>
    `,
    date: "17 Jun 2023",
    viewCount: 512,
    image: techBlogImage1,
    author: {
      name: "Elif Aydın",
      bio: "Elif Aydın, güvenlik konularına duyarlı bir yazılım güvenlik uzmanı ve sürdürülebilir yazılım savunucusudur.",
    },
  },
  {
    id: 4,
    category: "TypeScript",
    title: "Browser storage kavramları nelerdir?",
    slug: "browser-storage-kavramlari-nelerdir",
    description: `
    <div>
      <h2>Cookies</h2>
      <p>Cookies, web sunucusu ve tarayıcı arasında veri alışverişi yapmak için kullanılan küçük metin dosyalarıdır. Tarayıcı tarafından otomatik olarak her HTTP isteğiyle sunucuya gönderilir. Cookies, belirli bir süre boyunca veya belirli bir tarihte geçerlilik süresi olan verileri depolayabilir. Cookies, kullanıcı tarafından silinmediği sürece kalıcıdır ve tarayıcıyı kapattığınızda bile saklanır. Cookies, sınırlı boyutlara (genellikle 4KB) sahiptir ve her HTTP isteğiyle sunucuya gönderildiği için ağ trafiğini artırabilir. Cookies, sunucu tarafında oluşturulurlar ve HTTP yanıt başlıklarında gönderilirler. Cookies, tarayıcı ayarları veya JavaScript kullanılarak okunabilir ve yazılabilir.</p>

      <h2>Local Storage</h2>
      <p>Local Storage, tarayıcıda kalıcı olarak veri depolamak için kullanılan bir web depolama mekanizmasıdır. Local Storage, daha büyük boyutlarda veri depolama imkanı sağlar (genellikle 5MB veya daha fazla). Veriler, tarayıcı kapatılsa bile kalıcı olarak saklanır ve daha sonraki ziyaretlerde kullanılabilir. Local Storage, JavaScript aracılığıyla tarayıcı tarafından okunabilir ve yazılabilir. Local Storage, sunucu ile otomatik olarak etkileşimde bulunmaz, sadece tarayıcıda depolanır. Local Storage, tarayıcı sekmeleri veya farklı pencereler arasında paylaşılır.</p>

      <h2>Session Storage</h2>
      <p>Session Storage, tarayıcıda geçici olarak veri depolamak için kullanılan bir web depolama mekanizmasıdır. Session Storage, daha küçük boyutlarda veri depolama imkanı sağlar (genellikle 5MB veya daha fazla). Veriler, tarayıcı oturumu devam ettiği sürece saklanır. Tarayıcı kapatıldığında veya sekme kapatıldığında veriler silinir. Session Storage, JavaScript aracılığıyla tarayıcı tarafından okunabilir ve yazılabilir. Session Storage, tarayıcı sekmeleri veya farklı pencereler arasında paylaşılmaz.</p>
    </div>
    `,
    date: "17 Jun 2023",
    viewCount: 512,
    image: techBlogImage1,
    author: {
      name: "Elif Aydın",
      bio: "Elif Aydın, güvenlik konularına duyarlı bir yazılım güvenlik uzmanı ve sürdürülebilir yazılım savunucusudur.",
    },
  },
];

import softwareBlogImage from "../../../public/blog/blog-3.jpg";
import techBlogImage1 from "../../../public/blog/blog-1.jpg";
import techBlogImage2 from "../../../public/blog/blog-2.jpg";
import techBlogImage3 from "../../../public/blog/codeSnipset.jpg";
import codeSnippetImage from "../../../public/blog/coding.jpg";
import css from "../../../public/skills/css.png";

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
    date: "11-12-2023",
    viewCount: 512,
    image: codeSnippetImage,
    author: {
      name: "Elif Aydın",
      bio: "Elif Aydın, çevre konularına duyarlı bir yazılım geliştirici ve sürdürülebilir yazılım savunucusudur.",
    },
  },
  {
    id: 2,
    title: "Geleceğin Teknolojileri: Yazılım Dünyasında Yeni Trendler",
    slug: "gelecegin-teknolojileri-yazilim-dunyasinda-yeni-trendler",
    description:
      "Yazılım dünyasındaki gelecek teknolojileri! Bu yazıda, hayatımızı kökten değiştirecek olan yazılım trendlerine dair ilginç bilgiler bulacaksınız.",
    date: "2023-12-12",
    viewCount: 789,
    image: techBlogImage3,
    author: {
      name: "Murat Demir",
      bio: "Murat Demir, teknolojiye olan ilgisiyle bilinen bir yazılım mühendisidir.",
    },
  },
  {
    id: 3,
    title: "Etkili Kod Yönetimi: Pratik Taktikler ve İpuçları",
    slug: "etkili-kod-yonetimi-pratik-taktikler-ve-ipuclari",
    description:
      "Yazılım projelerinizde kodu daha etkili bir şekilde yönetmek için kullanabileceğiniz pratik kod yönetimi stratejilerini öğrenin.",
    date: "2023-12-13",
    viewCount: 632,
    image: codeSnippetImage,
    author: {
      name: "Ayşe Yılmaz",
      bio: "Ayşe Yılmaz, yazılım geliştirme ve kod yönetimi konularında uzmanlaşmış bir yazılım mühendisi ve yazardır.",
    },
  },
  {
    id: 4,
    title: "Yazılım Güvenliği: Tehditlere Karşı Savunma Stratejileri",
    slug: "yazilim-testi-guclu-bir-yazilim-gelistirme-sureci-icin-ipuclari",
    description:
      "Yazılım güvenliğini artırmanın yolları! Bu yazıda, güvenli yazılım geliştirme pratiği ve tehditlere karşı savunma stratejilerini keşfedin.",
    date: "2023-12-11",
    viewCount: 512,
    image: techBlogImage1,
    author: {
      name: "Elif Aydın",
      bio: "Elif Aydın, güvenlik konularına duyarlı bir yazılım güvenlik uzmanı ve sürdürülebilir yazılım savunucusudur.",
    },
  },
  {
    id: 5,
    title: "Yazılım Mimarisi: Modüler Yaklaşımlar ve Best Practices",
    slug: "yazilim-mimarisi-moduler-yaklasimlar-ve-best-practices",
    description:
      "Etkili yazılım mimarisi oluşturmanın yolları! Bu yazıda, modüler yaklaşımlar ve en iyi uygulamalar hakkında bilgiler bulacaksınız.",
    date: "2023-12-12",
    viewCount: 789,
    image: techBlogImage2,
    author: {
      name: "Murat Demir",
      bio: "Murat Demir, yazılım mimarisi konusunda uzmanlaşmış bir yazılım mühendisidir.",
    },
  },
  {
    id: 6,
    title: "Yazılım Testi: Güçlü Bir Yazılım Geliştirme Süreci İçin İpuçları",
    slug: "yazilim-testi-guclu-bir-yazilim-gelistirme-sureci-icin-ipuclari",
    description:
      "Yazılım testi stratejileri ve en iyi uygulamalar! Güçlü bir yazılım geliştirme süreci için test etme yöntemlerini öğrenin.",
    date: "2023-12-13",
    viewCount: 632,
    image: css,
    author: {
      name: "Ayşe Yılmaz",
      bio: "Ayşe Yılmaz, yazılım testi konularında uzmanlaşmış bir yazılım mühendisi ve yazardır.",
    },
  },
];

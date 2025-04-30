import { Folder, Paintbrush, Play, Sparkles } from "lucide-react";
import Marquee from "react-fast-marquee";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { MarqueImg } from "@/components/marquee-img";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const HomePage = () => {
  const steps = [
    {
      title: "Temukan Pekerjaan",
      description:
        "Cari pekerjaan yang sesuai dengan minat dan keahlian Anda di platform terpercaya.",
      icon: <Sparkles className="text-[#213448]" />,
    },
    {
      title: "Salin Deskripsi Pekerjaan",
      description:
        "Salin deskripsi pekerjaan yang relevan untuk digunakan dalam simulasi wawancara.",
      icon: <Paintbrush className="text-[#213448]" />,
    },
    {
      title: "Mulai Tes",
      description:
        "Masukkan deskripsi pekerjaan ke dalam aplikasi SIAPINTER dan mulai simulasi wawancara.",
      icon: <Play className="text-[#213448]" />,
    },
    {
      title: "Lihat Skor dan Evaluasi",
      description:
        "Setelah tes selesai, lihat skor Anda dan evaluasi jawaban Anda dengan saran perbaikan dari AI.",
      icon: <Folder className="text-[#213448]" />,
    },
  ];

  return (
    <div className="flex flex-col w-full pb-24">
      <Container>
        <div className="my-8 px-4">
          <h2 className="text-3xl text-center leading-tight">
            <span className="text-outline font-extrabold text-5xl md:text-8xl block">
              SIAPINTER
            </span>
            <span
              className="font-extrabold text-2xl md:text-6xl"
              style={{ color: "#213448" }}
            >
              siap hadapi interview
            </span>
          </h2>

          <p className="mt-4 text-muted-foreground text-center text-sm md:text-base">
            Tingkatkan keterampilan wawancara Anda dan temukan peluang
            keberhasilan dengan wawasan berbasis AI. SIAPINTER, cara cerdas untuk
            mempersiapkan diri, berlatih, dan tampil memukau.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8 px-4">
          <Link to={"/generate"} className="w-full md:w-auto">
            <Button size="lg" className="w-full">
              Get Started <Sparkles />
            </Button>
          </Link>

          <Button variant="outline" size="lg" className="w-full md:w-auto">
            Watch Demo <Play />
          </Button>
        </div>

        {/* Tutorial pengguna */}
        <div id="services" className="grid grid-cols-1 md:grid-cols-4 gap-4 py-8 px-4">
          {steps.map((step, index) => (
            <Card key={index} className="h-full">
              <CardHeader className="flex flex-col items-center text-center space-y-2">
                {step.icon}
                <CardTitle>{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Image Section */}
        <div className="w-full mt-8 rounded-xl bg-gray-100 h-[300px] md:h-[420px] drop-shadow-md overflow-hidden relative px-4">
          <img
            src="/assets/img/hero.jpg"
            alt=""
            className="w-full h-full object-cover rounded-xl"
          />

          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-md bg-white/40 backdrop-blur-md text-xs md:text-sm">
            SIAPINTER Copilot&copy;
          </div>

          <div className="hidden md:block absolute w-72 bottom-4 right-4 px-4 py-2 rounded-md bg-white/60 backdrop-blur-md">
            <h2 className="text-neutral-800 font-semibold">Developer</h2>
            <p className="text-sm text-neutral-500">
              Persiapan adalah kunci sukses. Dengan SIAPINTER, latih kemampuan
              wawancara Anda dan raih peluang karir impian Anda.
            </p>

            <Button className="mt-3 w-full">
              Generate <Sparkles />
            </Button>
          </div>
        </div>
      </Container>

      {/* Marquee Section */}
      <div className="w-full my-8 px-2">
        <Marquee pauseOnHover>
          <MarqueImg img="/assets/img/logo/jobstreet.png" />
          <MarqueImg img="/assets/img/logo/linkedin.png" />
          <MarqueImg img="/assets/img/logo/skillacademy.png" />
          <MarqueImg img="/assets/img/logo/glints.png" />
        </Marquee>
      </div>

      <Container className="py-8 space-y-8 px-4">
        <h2 className="tracking-wide text-lg md:text-xl text-gray-800 font-semibold text-center md:text-left">
          Tingkatkan kepercayaan diri Anda dengan latihan wawancara kerja yang
          terarah dan dukungan AI yang cerdas.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="col-span-1 md:col-span-3">
            <img
              src="/assets/img/office.jpg"
              alt=""
              className="w-full max-h-96 rounded-md object-cover"
            />
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center text-center gap-6">
            <p className="text-muted-foreground text-sm md:text-base">
              Ubah cara Anda mempersiapkan diri, tingkatkan kepercayaan diri,
              dan tingkatkan peluang Anda untuk mendapatkan pekerjaan impian.
              Biarkan AI menjadi keunggulan Anda di pasar kerja yang kompetitif
              saat ini.
            </p>

            <Link to={"/generate"} className="w-full md:w-3/4">
              <Button className="w-full">
                Generate <Sparkles className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="px-2">
          <h2 className="py-4 tracking-wide text-lg md:text-xl text-gray-800 font-semibold">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Apa itu SIAPINTER?</AccordionTrigger>
              <AccordionContent>
                SIAPINTER adalah platform berbasis AI yang dirancang untuk
                membantu Anda mempersiapkan wawancara kerja dengan lebih baik
                melalui latihan terarah dan wawasan cerdas.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Bagaimana cara kerja SIAPINTER?</AccordionTrigger>
              <AccordionContent>
                SIAPINTER menggunakan teknologi AI untuk menganalisis deskripsi
                pekerjaan yang Anda masukkan, lalu menghasilkan simulasi
                wawancara dan memberikan saran perbaikan.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Apakah SIAPINTER gratis?</AccordionTrigger>
              <AccordionContent>
                Ada paket gratis dengan fitur dasar dan paket premium untuk fitur
                tambahan.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Apakah data saya aman di SIAPINTER?</AccordionTrigger>
              <AccordionContent>
                Keamanan data Anda adalah prioritas. SIAPINTER menggunakan
                enkripsi dan best practices untuk menjaga privasi Anda.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;

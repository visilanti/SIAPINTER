import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CustomBreadCrumb } from "../custom-bread-crumb";

export default function StarMethodBlog() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
    <div className="mb-4">
      <CustomBreadCrumb
        breadCrumbPage={"Feedback"}
      />
    </div>

      <h1 className="text-3xl font-bold mb-4">Apa Itu Metode STAR dalam Wawancara?</h1>
      <p className="text-muted-foreground mb-6">
        Lagi siapin diri buat wawancara kerja? Udah belajar tentang company-nya, udah latihan perkenalan diri… tapi pas ditanya:
        "Ceritakan pengalaman Anda dalam menyelesaikan masalah di tempat kerja."
        Langsung nge-blank? 😵

        Tenang, kamu nggak sendiri. Pertanyaan kayak gini memang butuh struktur biar jawabannya jelas, fokus, dan impactful. Nah, di sinilah metode STAR jadi penyelamat.
        Metode STAR (Situation, Task, Action, Result) adalah kerangka jawaban yang membantu kamu menjawab pertanyaan wawancara berbasis pengalaman secara terstruktur dan meyakinkan.
      </p>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold">🔍 Situation</h2>
          <p className="text-muted-foreground">
            Jelaskan konteks atau latar belakang kejadian. Contohnya: “Saat saya magang di perusahaan X, tim saya menghadapi masalah dalam manajemen proyek...”
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">🎯 Task</h2>
          <p className="text-muted-foreground">
            Uraikan tanggung jawab atau tantangan spesifik yang kamu hadapi. Misalnya: “Saya ditugaskan untuk merancang ulang sistem pelacakan tugas...”
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">⚙️ Action</h2>
          <p className="text-muted-foreground">
            Ceritakan apa yang kamu lakukan. Fokus pada tindakan spesifik yang kamu ambil dan alasanmu. Contoh: “Saya menginisiasi penggunaan Trello dan mengadakan pelatihan...”
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">🏁 Result</h2>
          <p className="text-muted-foreground">
            Tampilkan hasil nyata dari tindakanmu. Contoh: “Produktivitas tim meningkat 30% dan proyek selesai 2 minggu lebih cepat.”
          </p>
        </section>
      </div>

       <section>
            <p className="text-muted-foreground">
                <br />
                Kalau kamu mau latihan wawancara pakai metode STAR langsung dari deskripsi kerja impianmu, cobain fitur Wawancara Pintar dari Siapinter.
                Cukup tempel deskripsi pekerjaan → jawab pertanyaan simulasi → dapet feedback otomatis.
                Bikin kamu siap wawancara kayak pro, tanpa deg-degan.
            </p>
        </section>

      <div className="mt-10">
        <Button onClick={() => navigate("/generate")}>
          Coba Latihan Dengan STAR <Sparkles className="ml-2" />
        </Button>
      </div>
    </div>
  );
}

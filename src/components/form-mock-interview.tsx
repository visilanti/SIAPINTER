import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { Interview } from "@/types";

import { CustomBreadCrumb } from "./custom-bread-crumb";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";
import { Headings } from "./headings";
import { Button } from "./ui/button";
import { Loader, Trash2 } from "lucide-react";
import { Separator } from "./ui/separator";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { chatSession } from "@/scripts";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { db } from "@/config/firebase.config";

interface FormMockInterviewProps {
  initialData: Interview | null;
}

const formSchema = z.object({
  position: z
    .string()
    .min(1, "Position is required")
    .max(100, "Position must be 100 characters or less"),
  description: z.string().min(10, "Description is required"),
  experience: z.coerce
    .number()
    .min(0, "Experience cannot be empty or negative"),
  techStack: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export const FormMockInterview = ({ initialData }: FormMockInterviewProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {},
  });

  const { isValid, isSubmitting } = form.formState;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userId } = useAuth();

  const title = initialData
    ? initialData.position
    : "Create a new mock interview";

  const breadCrumpPage = initialData ? initialData?.position : "Create";
  const actions = initialData ? "Save Changes" : "Create";
  const toastMessage = initialData
    ? { title: "Updated..!", description: "Changes saved successfully..." }
    : { title: "Created..!", description: "New Mock Interview created..." };

  function cleanAiResponse(raw: string): { question: string }[] {
    const lines = raw
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && /^[0-9]+[\.\)]/.test(line)); // Filter hanya baris bernomor
    
    const questions = lines.map(line => {
      // Hilangkan nomor di depan (misal: "1. " atau "1)" jadi "")
      const questionText = line.replace(/^[0-9]+[\.\)]\s*/, '').trim();
      return { question: questionText };
    });
    
    if (questions.length === 0) {
      throw new Error('No valid question array found in response');
    }
    
    return questions;
  }
  
  const fetchQuestionsFromApi = async (data: { position: string; description: string }) => {
    const payload = {
      job_title: data.position,
      job_description: data.description,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch questions from API: ${response.statusText}`);
      }

      const result = await response.json();

      // Normalisasi `generated_output` menjadi string jika berupa array
      const generatedOutput = Array.isArray(result.generated_output)
        ? result.generated_output.join('\n')
        : result.generated_output;

      if (!generatedOutput || typeof generatedOutput !== "string") {
        throw new Error("API response does not contain a valid 'generated_output'");
      }

      return cleanAiResponse(generatedOutput);
    } catch (error) {
      console.error("Error fetching questions:", error);
      throw error;
    }
  };

  const generateAnswersForQuestions = async (questions: { question: string }[], data: FormData) => {
    const answers = [];
  
    for (const item of questions) {
      const prompt = `
      Buatlah jawaban wawancara menggunakan metode STAR (Situation, Task, Action, Result), langsung pada inti jawaban tanpa kalimat pembuka atau penutup, dan tanpa format penekanan teks seperti bold atau italic:

      - Posisi Pekerjaan: ${data.position}
      - Deskripsi Pekerjaan: ${data.description}
      - Pengalaman yang Dibutuhkan: ${data.experience} tahun
      - Teknologi yang Digunakan jika ada: ${data.techStack}

      Pertanyaan: ${item.question}
      Jawaban (gunakan metode STAR):
      `;
      const aiResult = await chatSession.sendMessage(prompt);
      const cleanedAnswer = aiResult.response.text().trim();
      answers.push({ question: item.question, answer: cleanedAnswer });
    }
  
    return answers;
  };

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      // Step 1: Generate questions using the external API
      const questions = await fetchQuestionsFromApi({
        position: data.position,
        description: data.description,
      });

      // Step 2: Generate answers for the questions using the local model
      const questionsWithAnswers = await generateAnswersForQuestions(questions, data);

      if (initialData) {
        // Update existing interview
        await updateDoc(doc(db, "interviews", initialData.id), {
          questions: questionsWithAnswers,
          ...data,
          updatedAt: serverTimestamp(),
        });
        toast(toastMessage.title, { description: toastMessage.description });
      } else {
        // Create a new interview
        await addDoc(collection(db, "interviews"), {
          ...data,
          userId,
          questions: questionsWithAnswers,
          createdAt: serverTimestamp(),
        });
        toast(toastMessage.title, { description: toastMessage.description });
      }

      navigate("/generate", { replace: true });
    } catch (error) {
      console.error(error);
      toast.error("Error..", {
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteInterview = async (id: string) => {
  try {
    await deleteDoc(doc(db, "interviews", id));
    toast.success("Interview deleted successfully!");
    navigate("/generate", { replace: true });
  } catch (error) {
    console.error("Error deleting interview:", error);
    toast.error("Failed to delete interview. Please try again.");
  }
};

  useEffect(() => {
    if (initialData) {
      form.reset({
        position: initialData.position,
        description: initialData.description,
        experience: initialData.experience,
        techStack: initialData.techStack,
      });
    }
  }, [initialData, form]);

  return (
    <div className="w-full flex-col space-y-4">
      <CustomBreadCrumb
        breadCrumbPage={breadCrumpPage}
        breadCrumpItems={[{ label: "Mock Interviews", link: "/generate" }]}
      />

      <div className="mt-4 flex items-center justify-between w-full">
        <Headings title={title} isSubHeading />

        {initialData && (
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => deleteInterview(initialData.id)} // Tambahkan logika penghapusan
        >
          <Trash2 className="min-w-4 min-h-4 text-red-500" />
        </Button>
      )}
      </div>

      <Separator className="my-4" />

      <div className="my-6"></div>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full p-8 rounded-lg flex-col flex items-start justify-start gap-6 shadow-md "
        >
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Job Role / Job Position</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Input
                    className="h-12"
                    disabled={loading}
                    placeholder="eg:- Full Stack Developer"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Job Description</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Textarea
                    className="h-12"
                    disabled={loading}
                    placeholder="eg:- describle your job role"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Years of Experience</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Input
                    type="number"
                    className="h-12"
                    disabled={loading}
                    placeholder="eg:- 5 Years"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="techStack"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Tech Stacks (Optional)</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Textarea
                    className="h-12"
                    disabled={loading}
                    placeholder="eg:- React, Typescript..."
                    {...field}
                    value={field.value || " "} 
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="w-full flex items-center justify-end gap-6">
            <Button
              type="reset"
              size={"sm"}
              variant={"outline"}
              disabled={isSubmitting || loading}
            >
              Reset
            </Button>
            <Button
              type="submit"
              size={"sm"}
              disabled={isSubmitting || !isValid || loading}
            >
              {loading ? (
                <Loader className="text-gray-50 animate-spin" />
              ) : (
                actions
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

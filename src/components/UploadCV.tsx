import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function UploadCV() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedin: "",
    about: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    setProgress(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage("Vänligen välj en fil innan du laddar upp.");
      return;
    }

    try {
      // 1️⃣ Upload file to Supabase storage
      const filePath = `cvs/${Date.now()}_${file.name}`;
      const { data, error: uploadError } = await supabase.storage
        .from("cvs")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2️⃣ Get public file URL
      const { data: publicUrlData } = supabase.storage.from("cvs").getPublicUrl(filePath);
      const fileUrl = publicUrlData?.publicUrl;

      // 3️⃣ Save candidate data in database
      const { error: insertError } = await supabase.from("applications").insert([
        {
          name: formData.name,
          email: formData.email,
          linkedin: formData.linkedin,
          about: formData.about,
          file_url: fileUrl,
        },
      ]);

      if (insertError) throw insertError;

      setMessage("CV och information har laddats upp!");
      setFile(null);
      setFormData({ name: "", email: "", linkedin: "", about: "" });
    } catch (error: any) {
      console.error(error);
      setMessage("Ett fel uppstod vid uppladdning. Försök igen.");
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-lg mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Skicka in din ansökan</h2>
        <p className="text-gray-600 mb-6">
          Ladda upp ditt CV (PDF/DOCX) och fyll i dina uppgifter nedan.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200 text-left"
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">Namn</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">E-post</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn (valfritt)
          </label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Berätta kort om dig själv
          </label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 h-24"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">CV-fil</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            required
            className="block w-full text-sm text-gray-700 mb-4 border border-gray-300 rounded-md cursor-pointer focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Ladda upp CV
          </button>
        </form>

        {progress > 0 && <p className="mt-3 text-gray-600">Uppladdning: {progress}%</p>}
        {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
      </div>
    </section>
  );
}

import { useState } from "react";
import toast from "react-hot-toast";

interface ImageUploadProps {
  images: string[];
  setImages: (images: string[]) => void;
}

const ImageUpload = ({ images, setImages }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ⚠️ REPLACE THESE WITH YOUR CLOUDINARY DETAILS
    const CLOUD_NAME = "YOUR_CLOUD_NAME";
    const UPLOAD_PRESET = "YOUR_UPLOAD_PRESET";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    setUploading(true);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await res.json();

      if (data.secure_url) {
        setImages([...images, data.secure_url]);
        toast.success("Image uploaded!");
      } else {
        toast.error("Failed to upload image");
      }
    } catch (error) {
      toast.error("Upload failed");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Product Images
      </label>
      <div className="flex flex-wrap gap-4">
        {images.map((img, idx) => (
          <div key={idx} className="relative w-24 h-24">
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover rounded-lg border"
            />
            <button
              type="button"
              onClick={() => removeImage(idx)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
            >
              ×
            </button>
          </div>
        ))}
        <label
          className={`w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 ${uploading ? "opacity-50" : ""}`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={uploading}
          />
          {uploading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-rose-600"></div>
          ) : (
            <>
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="text-xs text-gray-500 mt-1">Add</span>
            </>
          )}
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;

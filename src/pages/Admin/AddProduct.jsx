// src/pages/Admin/AddProduct.jsx
import { useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { Upload, X, Save, Image as ImageIcon } from "lucide-react";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    amazonLink: "", // Added amazonLink
  });

  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const [previews, setPreviews] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setImages({ ...images, [key]: file });
      setPreviews({ ...previews, [key]: URL.createObjectURL(file) });
    }
  };

  const removeImage = (key) => {
    setImages({ ...images, [key]: null });
    setPreviews({ ...previews, [key]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    Object.entries(images).forEach(([key, file]) => {
      if (file) data.append(key, file);
    });

    try {
      const res = await api.post("/api/product/add", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        alert("Product added successfully!");
        navigate("/admin/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-800">Add New Product</h1>
          <p className="text-slate-600 mt-2">
            Fill in the product details to add it to your store
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: Text fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Non-Woven Kitchen Towels"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe the product features, material, usage, etc..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                  <input
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="299"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
                    required
                    min="1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Amazon Link (optional)
                </label>
                <input
                  name="amazonLink"
                  value={formData.amazonLink}
                  onChange={handleChange}
                  placeholder="https://www.amazon.in/product-link"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
                />
              </div>
            </div>

            {/* Right: Images */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Product Images (up to 4) <span className="text-red-500">*</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {["image1", "image2", "image3", "image4"].map((key, index) => (
                  <div key={key} className="relative group">
                    {previews[key] ? (
                      <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                        <img src={previews[key]} alt={`preview ${index + 1}`} className="w-full h-32 object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(key)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-teal-400 hover:bg-teal-50/30 transition">
                        <ImageIcon size={24} className="text-slate-400 mb-2" />
                        <span className="text-xs text-slate-500 text-center">
                          Image {index + 1}
                          <br />
                          (optional after first)
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageChange(e, key)}
                        />
                      </label>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-sm text-slate-500">
                First image is required and used as main thumbnail
              </p>
            </div>
          </div>

          {/* Submit */}
          <div className="mt-10 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white transition-all shadow-md
                ${loading 
                  ? "bg-teal-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 active:scale-[0.98]"}`}
            >
              <Save size={18} />
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
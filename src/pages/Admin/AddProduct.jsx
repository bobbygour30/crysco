import { useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { Upload, X, Save, Image as ImageIcon } from "lucide-react";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
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
      } else {
        alert(res.data.message || "Failed to add product");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-800">Add New Product</h1>
          <p className="text-slate-600 mt-2">Fill in the product details</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow border border-slate-200 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
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
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                  required
                  min="1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Product Images (up to 4)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {["image1", "image2", "image3", "image4"].map((key, i) => (
                  <div key={key} className="relative group">
                    {previews[key] ? (
                      <div className="rounded-xl overflow-hidden border border-slate-200">
                        <img src={previews[key]} alt="preview" className="w-full h-32 object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(key)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-teal-400">
                        <Upload size={24} className="text-slate-400 mb-2" />
                        <span className="text-xs text-slate-500">Image {i+1}</span>
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
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-xl font-semibold text-white shadow-md
                ${loading ? "bg-teal-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"}`}
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
import React, { useState } from "react";

const Contact = () => {
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false); // hide old success message

    const form = e.target;
    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      message: form.message.value.trim(),
    };

    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.message) newErrors.message = "Message is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Simulate sending data to a server
      console.log("Form submitted:", formData);

      // Reset form fields
      form.reset();

      // Show success message
      setSuccess(true);
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-6">
        {/* Heading */}
        <div className="text-left mb-10">
          <h3 className="text-4xl font-bold uppercase text-primary tracking-wider">
            Contact
          </h3>
          <p className="text-gray-600 mt-2 max-w-sm" >
            Have questions or feedback? Fill out the form below and we’ll get
            back to you soon.
          </p>
        </div>

        {success && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
            ✅ Your message has been sent successfully!
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name & Email */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className={`w-full py-3 px-5 border rounded-lg outline-none transition ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-primary"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div className="flex-1">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`w-full py-3 px-5 border rounded-lg outline-none transition ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-primary"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className={`w-full py-3 px-5 border rounded-lg outline-none transition ${
                errors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-primary"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <textarea
              name="message"
              placeholder="Your message..."
              rows={6}
              className={`w-full py-3 px-5 border rounded-lg outline-none transition resize-none ${
                errors.message
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-primary"
              }`}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-dark transition duration-300 shadow-sm hover:shadow-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

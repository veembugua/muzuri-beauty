import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="min-h-screen bg-cream-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Visit Our Boutique
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Come experience our curated collection of unique dresses, elegant
            bags, and stunning accessories in person.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information Card */}
          <div className="bg-white rounded-xl shadow-md p-8 lg:p-10">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">
              Contact Information
            </h2>

            <div className="space-y-8">
              {/* Address */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-2xl">
                  📍
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    Our Location
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    [Your Street Name & Building]
                    <br />
                    Mombasa, Kenya
                    <br />
                    [Postal Code]
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-2xl">
                  📞
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    Phone
                  </h3>
                  <a
                    href="tel:+254700000000"
                    className="text-rose-600 hover:text-rose-700 font-medium transition"
                  >
                    +254 700 000 000
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-2xl">
                  ✉️
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    Email
                  </h3>
                  <a
                    href="mailto:hello@muzuribeauty.com"
                    className="text-rose-600 hover:text-rose-700 font-medium transition"
                  >
                    hello@muzuribeauty.com
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-2xl">
                  🕐
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    Business Hours
                  </h3>
                  <div className="text-gray-600 space-y-1">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 5:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden h-[400px] lg:h-auto min-h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3981.8540130979286!2d39.852706874973485!3d-3.6208233963533005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zM8KwMzcnMTUuMCJTIDM5wrA1MScxOS4wIkU!5e0!3m2!1sen!2ske!4v1794305704348!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Muzuri Beauty Shop Location"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center text-rose-600 hover:text-rose-700 font-medium transition"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;

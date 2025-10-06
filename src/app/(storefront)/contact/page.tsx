'use client';
import { Badge } from '@/modules/core/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/modules/core/components/ui/breadcrumb';
import { Button } from '@/modules/core/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/modules/core/components/ui/card';
import {
  CheckCircle,
  ChevronRight,
  Clock,
  Home,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
interface ContactPageProps {
  onBack: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  inquiryType: string;
}

export default function ContactPage({ onBack }: ContactPageProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+1 (555) 123-4567', 'Mon-Fri 8AM-6PM PST'],
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['hello@terramartz.com', 'We respond within 24 hours'],
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Farm Fresh Avenue', 'San Francisco, CA 94105'],
      color: 'bg-amber-100 text-amber-600',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon-Fri: 8AM-6PM PST', 'Sat-Sun: 9AM-5PM PST'],
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'order', label: 'Order Support' },
    { value: 'partnership', label: 'Farmer Partnership' },
    { value: 'wholesale', label: 'Wholesale Inquiries' },
    { value: 'feedback', label: 'Feedback & Suggestions' },
    { value: 'technical', label: 'Technical Support' },
  ];

  const faqs = [
    {
      question: 'How fresh are your products?',
      answer:
        'All our produce is harvested within 24-48 hours of delivery and transported using cold-chain logistics to maintain peak freshness.',
    },
    {
      question: 'Do you offer same-day delivery?',
      answer:
        'Yes! We offer same-day delivery for orders placed before 12 PM in select metropolitan areas.',
    },
    {
      question: 'Can I become a partner farmer?',
      answer:
        "Absolutely! We're always looking for local farmers who share our commitment to quality and sustainability. Contact us to learn about our partnership program.",
    },
    {
      question: "What's your return policy?",
      answer:
        "We offer a 100% satisfaction guarantee. If you're not completely happy with your order, contact us within 24 hours for a full refund or replacement.",
    },
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general',
      });
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    onClick={onBack}
                    className="cursor-pointer hover:text-amber-600 transition-colors flex items-center"
                  >
                    <Home className="w-4 h-4 mr-1" />
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-amber-600 font-medium">
                    Contact
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center py-16"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Message Sent Successfully!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for reaching out to TerraMartz. We&#39;ve received your
              message and will get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={onBack}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 rounded-full"
              >
                Back to Home
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsSubmitted(false)}
                className="border-amber-300 text-amber-700 hover:bg-amber-50 px-8 py-3 rounded-full"
              >
                Send Another Message
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={onBack}
                  className="cursor-pointer hover:text-amber-600 transition-colors flex items-center"
                >
                  <Home className="w-4 h-4 mr-1" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="w-4 h-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-amber-600 font-medium">
                  Contact
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </motion.div>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="bg-green-100 text-green-700 border-green-200 mb-6">
            🌱 We re Here to Help
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Get in{' '}
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have a question about our fresh produce, need help with an order, or
            interested in becoming a partner farmer? We&#39;d love to hear from
            you!
          </p>
        </motion.section>

        {/* Contact Info Cards */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-12 h-12 rounded-xl ${info.color} flex items-center justify-center mx-auto mb-4`}
                  >
                    <info.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-3">
                    {info.title}
                  </h3>
                  {info.details.map((detail, idx) => (
                    <p
                      key={idx}
                      className={`${
                        idx === 0
                          ? 'font-medium text-gray-800'
                          : 'text-sm text-gray-600'
                      } ${idx > 0 ? 'mt-1' : ''}`}
                    >
                      {detail}
                    </p>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.section>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800 flex items-center">
                  <MessageCircle className="w-6 h-6 mr-2 text-amber-600" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange('name', e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition-all duration-200"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange('email', e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition-all duration-200"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange('phone', e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition-all duration-200"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Inquiry Type *
                      </label>
                      <select
                        required
                        value={formData.inquiryType}
                        onChange={(e) =>
                          handleInputChange('inquiryType', e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition-all duration-200"
                      >
                        {inquiryTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        handleInputChange('subject', e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition-all duration-200"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange('message', e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 mb-8">
                Quick answers to common questions. Dont see what youre looking
                for? Feel free to reach out!
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="font-semibold text-gray-800 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
            </div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl p-8 text-center"
            >
              <MapPin className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Visit Our Location
              </h3>
              <p className="text-gray-600 mb-4">
                123 Farm Fresh Avenue
                <br />
                San Francisco, CA 94105
              </p>
              <Badge className="bg-amber-200 text-amber-800 border-amber-300">
                Interactive Map Coming Soon
              </Badge>
            </motion.div>
          </motion.div>
        </div>

        {/* Quick Contact CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Need Immediate Assistance?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our customer support team is available to help you right away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-full">
              <Phone className="w-5 h-5 mr-2" />
              Call Now: (555) 123-4567
            </Button>
            <Button
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-50 px-8 py-3 rounded-full"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Support
            </Button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

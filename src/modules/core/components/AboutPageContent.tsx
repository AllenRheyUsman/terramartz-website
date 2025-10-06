import CallToActionSection from '@/modules/core/components/common/CallToActionSection';
import { ImageWithFallback } from '@/modules/core/components/common/ImageWithFallback';
import { Award, Heart, Leaf, Shield, Truck, Users } from 'lucide-react';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
export default function AboutPageContent() {
  const values = [
    {
      icon: Leaf,
      title: 'Farm Fresh Quality',
      description:
        'We partner directly with local farms to bring you the freshest, highest-quality produce available.',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Users,
      title: 'Community First',
      description:
        'Supporting local farmers and communities is at the heart of everything we do.',
      color: 'bg-amber-100 text-amber-600',
    },
    {
      icon: Shield,
      title: 'Food Safety',
      description:
        'Rigorous quality checks and safety standards ensure every product meets our high expectations.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Heart,
      title: 'Sustainable Practices',
      description:
        "We're committed to environmentally responsible farming and packaging practices.",
      color: 'bg-emerald-100 text-emerald-600',
    },
    {
      icon: Truck,
      title: 'Fresh Delivery',
      description:
        'Our cold-chain delivery system ensures your produce arrives as fresh as when it was harvested.',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: Award,
      title: 'Quality Guarantee',
      description:
        "100% satisfaction guaranteed or your money back. That's our promise to you.",
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image:
        'https://images.unsplash.com/photo-1494790108755-2616b612b1a5?w=400&h=400&fit=crop&crop=face',
      description:
        'Former sustainable agriculture researcher with 15 years of experience.',
    },
    {
      name: 'Marcus Chen',
      role: 'Head of Operations',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      description:
        'Supply chain expert ensuring seamless farm-to-table delivery.',
    },
    {
      name: 'Elena Rodriguez',
      role: 'Quality Director',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      description:
        'Food safety specialist maintaining our high-quality standards.',
    },
  ];

  const stats = [
    { number: '500+', label: 'Local Farmers', color: 'text-green-600' },
    { number: '10K+', label: 'Happy Customers', color: 'text-amber-600' },
    { number: '50+', label: 'Fresh Products', color: 'text-orange-600' },
    { number: '24/7', label: 'Fresh Guarantee', color: 'text-emerald-600' },
  ];
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 md:p-16 overflow-hidden">
        <div className="relative z-10 max-w-4xl">
          <Badge className="bg-green-100 text-green-700 border-green-200 mb-6">
            🌱 Farm to Table Since 2020
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Fresh. Local.{' '}
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Sustainable.
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl">
            Terramartz connects you directly with local farmers, bringing the
            freshest, highest-quality produce straight from the farm to your
            table.
          </p>
          <Link href="/products">
            <Button
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              Shop Fresh Produce
            </Button>
          </Link>
        </div>

        <div className="absolute -right-20 -top-20 w-80 h-80 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full opacity-20"></div>
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full opacity-20"></div>
      </section>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div
              className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}
            >
              {stat.number}
            </div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Our Story
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Founded in 2020 by a group of sustainable agriculture enthusiasts,
              Terramartz was born from a simple belief: everyone deserves access
              to fresh, locally-grown produce that supports both their health
              and their community.
            </p>
            <p>
              What started as a weekend farmers market stand has grown into a
              thriving marketplace connecting over 500 local farmers with
              thousands of families who value quality, sustainability, and the
              incredible taste of farm-fresh food.
            </p>
            <p>
              Today, we&apos;re proud to be the bridge between hardworking
              farmers and conscious consumers, ensuring that every purchase
              supports sustainable agriculture and strengthens our local food
              system.
            </p>
          </div>
        </div>
        <div className="relative">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&h=400&fit=crop"
            alt="Fresh vegetables from local farm"
            className="w-full h-80 object-cover rounded-2xl shadow-lg"
          />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Leaf className="w-16 h-16 text-white" />
          </div>
        </div>
      </div>
      {/* Values */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Values
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These core principles guide everything we do, from farmer
            partnerships to customer service.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value) => (
            <Card
              key={value.title}
              className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md"
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-12 h-12 mx-auto rounded-xl ${value.color} flex items-center justify-center mb-4 text-2xl`}
                >
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The passionate people behind Terramartz who make fresh, sustainable
            food accessible to everyone.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="relative mb-6">
                <ImageWithFallback
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 object-cover rounded-2xl mx-auto shadow-lg"
                />
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-white text-gray-800 border border-gray-200 shadow-md">
                    {member.role}
                  </Badge>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {member.name}
              </h3>
              <p className="text-gray-600">{member.description}</p>
            </div>
          ))}
        </div>
      </section>
      {/* CTA */}
      <CallToActionSection
        title="Ready to Experience Farm-Fresh?"
        description="Join thousands of families who trust Terramartz for the freshest produce delivered straight from local farms."
        primaryButton={{
          label: 'Start Shopping',
          href: '/products',
        }}
        secondaryButton={{
          label: 'Learn More',
        }}
      />
    </div>
  );
}

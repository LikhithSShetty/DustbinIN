import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Users, Shield, Star, Trash2, Navigation, QrCode, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Landing = () => {
  const features = [
    {
      icon: Trash2,
      title: 'Public Bins & Toilets',
      description: 'Find and review public amenities to keep our cities clean',
      color: 'text-green-600',
    },
    {
      icon: Shield,
      title: 'Public Property Reports',
      description: 'Report issues with streetlights, roads, and infrastructure',
      color: 'text-blue-600',
    },
    {
      icon: MapPin,
      title: 'Community Spots',
      description: 'Discover feeding spots, resting areas, and local food stalls',
      color: 'text-purple-600',
    },
    {
      icon: Users,
      title: 'Civic Engagement',
      description: 'Join a community working to improve urban living',
      color: 'text-orange-600',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '500+', label: 'Cities Covered' },
    { number: '25K+', label: 'Issues Reported' },
    { number: '95%', label: 'Resolution Rate' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-6xl mx-auto"
          >
            <h1 className="hero-title">
              The Future of
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="block"
              >
                Smart Cities
              </motion.span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="hero-subtitle"
            >
              Experience urban navigation like never before. Find amenities, report issues, 
              and connect with your community through our revolutionary platform.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Button asChild className="btn-primary text-xl px-10 py-5">
                <Link to="/map" className="flex items-center space-x-3">
                  <Navigation className="w-6 h-6" />
                  <span>Explore Maps</span>
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="btn-ghost text-xl px-10 py-5 text-white border-white/30 hover:bg-white/20">
                <Link to="/about" className="flex items-center space-x-3">
                  <QrCode className="w-6 h-6" />
                  <span>Scan QR Code</span>
                </Link>
              </Button>
            </motion.div>

            {/* Feature Preview */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-16 flex justify-center"
            >
              <div className="glass-intense rounded-3xl p-8 max-w-4xl w-full">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Search className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Smart Search</h3>
                    <p className="text-white/80">Find any location instantly</p>
                  </div>
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Live Updates</h3>
                    <p className="text-white/80">Real-time facility status</p>
                  </div>
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Community</h3>
                    <p className="text-white/80">Citizen-powered reviews</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="display-large mb-6">
              Everything You Need for Urban Living
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive platform brings together all the tools citizens need 
              to navigate and improve their urban environment with unprecedented ease.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="location-card group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  
                  <h3 className="headline-medium mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Making Real Impact
            </h2>
            <p className="text-xl text-muted-foreground">
              Join a growing community of urban champions creating positive change
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-bold text-foreground mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-white/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="display-large text-white mb-8">
              Ready to Transform Your City?
            </h2>
            <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
              Join thousands of citizens making real impact. Start exploring, 
              reporting, and connecting with your community today.
            </p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Button asChild className="btn-primary bg-white text-primary hover:bg-white/90 text-xl px-10 py-5">
                <Link to="/map" className="flex items-center space-x-3">
                  <Navigation className="w-6 h-6" />
                  <span>Start Exploring</span>
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="btn-ghost text-xl px-10 py-5 text-white border-white/30 hover:bg-white/20">
                <Link to="/community" className="flex items-center space-x-3">
                  <Users className="w-6 h-6" />
                  <span>Join Community</span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
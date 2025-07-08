import React from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, Star, MapPin, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Community = () => {
  const leaderboard = [
    { name: 'Priya Sharma', contributions: 156, city: 'Mumbai', badge: 'Gold' },
    { name: 'Raj Patel', contributions: 142, city: 'Delhi', badge: 'Gold' },
    { name: 'Anita Singh', contributions: 128, city: 'Bangalore', badge: 'Silver' },
    { name: 'Vikram Kumar', contributions: 115, city: 'Chennai', badge: 'Silver' },
    { name: 'Meera Reddy', contributions: 98, city: 'Hyderabad', badge: 'Bronze' },
  ];

  const recentActivity = [
    { user: 'Rohit M.', action: 'Reported broken streetlight', location: 'Koramangala, Bangalore', time: '2 hours ago' },
    { user: 'Sneha K.', action: 'Added new public toilet', location: 'Andheri, Mumbai', time: '4 hours ago' },
    { user: 'Amit S.', action: 'Updated feeding spot info', location: 'CP, Delhi', time: '6 hours ago' },
    { user: 'Kavya R.', action: 'Reviewed food stall', location: 'T.Nagar, Chennai', time: '8 hours ago' },
  ];

  const achievements = [
    { title: 'First Report', description: 'Submit your first civic issue report', icon: '🎯', progress: 100 },
    { title: 'Community Helper', description: 'Help 10 fellow citizens', icon: '🤝', progress: 60 },
    { title: 'Local Expert', description: 'Add 25 new locations', icon: '📍', progress: 80 },
    { title: 'City Champion', description: 'Get 100 helpful reviews', icon: '🏆', progress: 45 },
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Join Our Community
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with thousands of citizens working together to make our cities better. 
              Track your impact, earn recognition, and be part of the change.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Community Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  Community Impact
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Members</span>
                    <span className="font-semibold text-foreground">12,456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Issues Resolved</span>
                    <span className="font-semibold text-foreground">8,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cities Covered</span>
                    <span className="font-semibold text-foreground">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">This Month</span>
                    <span className="font-semibold text-primary">+2,341</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-primary" />
                  Top Contributors This Month
                </h3>
                <div className="space-y-4">
                  {leaderboard.map((user, index) => (
                    <motion.div
                      key={user.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 animate-smooth"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0 ? 'bg-yellow-100 text-yellow-800' :
                          index === 1 ? 'bg-gray-100 text-gray-800' :
                          index === 2 ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.city}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-foreground">{user.contributions}</div>
                        <div className="text-xs text-muted-foreground">contributions</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-foreground mb-8 flex items-center"
          >
            <TrendingUp className="w-8 h-8 mr-3 text-primary" />
            Recent Community Activity
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-4 rounded-xl"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{activity.user}</div>
                    <div className="text-sm text-muted-foreground mb-1">{activity.action}</div>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {activity.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {activity.time}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Unlock Achievements
            </h2>
            <p className="text-xl text-muted-foreground">
              Track your progress and earn recognition for your contributions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="glass-card p-6 rounded-2xl text-center animate-smooth"
              >
                <div className="text-4xl mb-4">{achievement.icon}</div>
                <h3 className="font-semibold text-foreground mb-2">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                
                {/* Progress Bar */}
                <div className="w-full bg-muted rounded-full h-2 mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${achievement.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-primary h-2 rounded-full"
                  />
                </div>
                <div className="text-xs text-muted-foreground">{achievement.progress}% Complete</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join our community of changemakers and start contributing to better cities today.
            </p>
            
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Get Started
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Community;
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../utils/supabaseClient';
import { Link } from 'react-router-dom';
import { 
  RiDashboardLine, 
  RiCalendarLine, 
  RiFireLine,
  RiHeartPulseLine,
  RiTrophyLine,
  RiArrowRightLine,
  RiChatAiLine,
  RiRunLine,
  RiRestaurantLine,
  RiUserHeartLine
} from '@remixicon/react';

const Dashboard = () => {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState({
    todayCalories: 0,
    caloriesGoal: 2000,
    workoutComplete: false,
    waterIntake: 0,
    waterGoal: 2000,
    streakDays: 0,
    fitnessScore: 0,
    weight: 0,
    weightGoal: 0
  });
  const [recentProgress, setRecentProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Get today's habits
      const today = new Date().toISOString().split('T')[0];
      const { data: habits } = await supabase
        .from('daily_habits')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .single();

      // Get progress tracking
      const { data: progress } = await supabase
        .from('progress_tracking')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(5);

      // Calculate stats
      if (habits) {
        setStats(prev => ({
          ...prev,
          todayCalories: habits.calories_consumed || 0,
          workoutComplete: habits.workout_completed || false,
          waterIntake: habits.water_intake_ml || 0,
          streakDays: habits.streak_days || 0
        }));
      }

      // Set progress data
      setRecentProgress(progress || []);

      // Get latest weight
      if (progress && progress.length > 0) {
        setStats(prev => ({
          ...prev,
          weight: progress[0].weight || 0,
          fitnessScore: calculateFitnessScore(progress[0])
        }));
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateFitnessScore = (data) => {
    // Mock fitness score calculation
    let score = 0;
    if (data.weight) score += 20;
    if (data.bmi) score += 20;
    if (data.body_fat_percentage) score += 30;
    score += Math.random() * 30;
    return Math.min(Math.round(score), 100);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#FFD700' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0' }}>
      {/* Welcome Section */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(26,26,46,0.9))',
        padding: '2rem',
        borderRadius: '15px',
        border: '1px solid rgba(255,215,0,0.2)',
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h2 style={{ color: '#FFD700', marginBottom: '0.3rem' }}>
            Welcome back, {profile?.full_name || 'User'}! 👋
          </h2>
          <p style={{ color: '#888' }}>
            {profile?.goal ? `Goal: ${profile.goal.replace('_', ' ').toUpperCase()}` : 'Set your fitness goal'}
          </p>
        </div>
        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
          <div style={{
            background: 'rgba(46, 204, 113, 0.1)',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            border: '1px solid #2ecc71'
          }}>
            <span style={{ color: '#2ecc71' }}>
              🔥 {stats.streakDays} Day Streak
            </span>
          </div>
          <div style={{
            background: 'rgba(255,215,0,0.1)',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            border: '1px solid #FFD700'
          }}>
            <span style={{ color: '#FFD700' }}>
              ⭐ Fitness Score: {stats.fitnessScore}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div className="stat-card" style={{
          background: 'rgba(26,26,46,0.9)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(255,215,0,0.1)',
          textAlign: 'center',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ fontSize: '2rem', color: '#FFD700' }}>
            <RiFireLine size={32} />
          </div>
          <div style={{ color: '#888', fontSize: '0.9rem' }}>Calories Today</div>
          <div style={{ color: '#FFD700', fontSize: '1.8rem', fontWeight: 'bold' }}>
            {stats.todayCalories}
          </div>
          <div style={{ color: '#555', fontSize: '0.8rem' }}>Goal: {stats.caloriesGoal}</div>
        </div>

        <div className="stat-card" style={{
          background: 'rgba(26,26,46,0.9)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(52, 152, 219, 0.2)',
          textAlign: 'center',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ fontSize: '2rem', color: '#3498db' }}>
            <RiRunLine size={32} />
          </div>
          <div style={{ color: '#888', fontSize: '0.9rem' }}>Workout</div>
          <div style={{ color: stats.workoutComplete ? '#2ecc71' : '#e74c3c', fontSize: '1.5rem', fontWeight: 'bold' }}>
            {stats.workoutComplete ? '✅ Complete' : '⏳ Pending'}
          </div>
        </div>

        <div className="stat-card" style={{
          background: 'rgba(26,26,46,0.9)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(46, 204, 113, 0.2)',
          textAlign: 'center',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ fontSize: '2rem', color: '#2ecc71' }}>
            💧
          </div>
          <div style={{ color: '#888', fontSize: '0.9rem' }}>Water Intake</div>
          <div style={{ color: '#2ecc71', fontSize: '1.5rem', fontWeight: 'bold' }}>
            {stats.waterIntake}ml
          </div>
          <div style={{ color: '#555', fontSize: '0.8rem' }}>Goal: {stats.waterGoal}ml</div>
        </div>

        <div className="stat-card" style={{
          background: 'rgba(26,26,46,0.9)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(255,215,0,0.1)',
          textAlign: 'center',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ fontSize: '2rem', color: '#f39c12' }}>
            ⚖️
          </div>
          <div style={{ color: '#888', fontSize: '0.9rem' }}>Current Weight</div>
          <div style={{ color: '#f39c12', fontSize: '1.5rem', fontWeight: 'bold' }}>
            {stats.weight || '--'} kg
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <Link to="/diet-plan" style={{
          textDecoration: 'none',
          background: 'rgba(255,215,0,0.05)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(255,215,0,0.1)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.borderColor = '#FFD700';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.borderColor = 'rgba(255,215,0,0.1)';
        }}>
          <RiRestaurantLine size={32} color="#FFD700" />
          <div>
            <div style={{ color: '#FFD700', fontWeight: 'bold' }}>Diet Plan</div>
            <div style={{ color: '#888', fontSize: '0.9rem' }}>View your meal plan</div>
          </div>
          <RiArrowRightLine size={20} color="#555" style={{ marginLeft: 'auto' }} />
        </Link>

        <Link to="/workout-plan" style={{
          textDecoration: 'none',
          background: 'rgba(52, 152, 219, 0.05)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(52, 152, 219, 0.1)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.borderColor = '#3498db';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.borderColor = 'rgba(52, 152, 219, 0.1)';
        }}>
          <RiRunLine size={32} color="#3498db" />
          <div>
            <div style={{ color: '#3498db', fontWeight: 'bold' }}>Workout Plan</div>
            <div style={{ color: '#888', fontSize: '0.9rem' }}>View your exercise plan</div>
          </div>
          <RiArrowRightLine size={20} color="#555" style={{ marginLeft: 'auto' }} />
        </Link>

        <Link to="/habits" style={{
          textDecoration: 'none',
          background: 'rgba(46, 204, 113, 0.05)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(46, 204, 113, 0.1)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.borderColor = '#2ecc71';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.borderColor = 'rgba(46, 204, 113, 0.1)';
        }}>
          <RiCalendarLine size={32} color="#2ecc71" />
          <div>
            <div style={{ color: '#2ecc71', fontWeight: 'bold' }}>Daily Habits</div>
            <div style={{ color: '#888', fontSize: '0.9rem' }}>Track your daily progress</div>
          </div>
          <RiArrowRightLine size={20} color="#555" style={{ marginLeft: 'auto' }} />
        </Link>

        <Link to="/chat" style={{
          textDecoration: 'none',
          background: 'rgba(155, 89, 182, 0.05)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(155, 89, 182, 0.1)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.borderColor = '#9b59b6';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.borderColor = 'rgba(155, 89, 182, 0.1)';
        }}>
          <RiChatAiLine size={32} color="#9b59b6" />
          <div>
            <div style={{ color: '#9b59b6', fontWeight: 'bold' }}>AI Chatbot</div>
            <div style={{ color: '#888', fontSize: '0.9rem' }}>Chat with your AI coach</div>
          </div>
          <RiArrowRightLine size={20} color="#555" style={{ marginLeft: 'auto' }} />
        </Link>
      </div>

      {/* Recent Progress */}
      {recentProgress.length > 0 && (
        <div style={{
          background: 'rgba(26,26,46,0.8)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(255,215,0,0.1)'
        }}>
          <h3 style={{ color: '#FFD700', marginBottom: '1rem' }}>
            📊 Recent Progress
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {recentProgress.slice(0, 4).map((entry, index) => (
              <div key={index} style={{
                background: 'rgba(0,0,0,0.3)',
                padding: '1rem',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ color: '#888', fontSize: '0.8rem' }}>
                  {new Date(entry.date).toLocaleDateString()}
                </div>
                <div style={{ color: '#FFD700', fontSize: '1.2rem', fontWeight: 'bold' }}>
                  {entry.weight} kg
                </div>
                {entry.bmi && (
                  <div style={{ color: '#888', fontSize: '0.8rem' }}>
                    BMI: {entry.bmi}
                  </div>
                )}
                {entry.body_fat_percentage && (
                  <div style={{ color: '#888', fontSize: '0.8rem' }}>
                    Body Fat: {entry.body_fat_percentage}%
                  </div>
                )}
              </div>
            ))}
          </div>
          <Link to="/progress" style={{
            display: 'inline-block',
            marginTop: '1rem',
            color: '#FFD700',
            textDecoration: 'none'
          }}>
            View all progress →
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
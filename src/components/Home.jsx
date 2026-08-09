import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  RiArrowRightLine,
  RiRocketLine,
  RiCpuLine,
  RiPulseLine,
  RiAppleLine,
  RiRobotLine,
  RiBarChartBoxLine,
  RiLineChartLine,
  RiShieldUserLine
} from '@remixicon/react';

const Home = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: '0' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '580px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '4rem 3rem',
        borderRadius: '28px',
        marginBottom: '3rem',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 20% 30%, rgba(245,166,35,0.12), transparent 50%), radial-gradient(circle at 80% 70%, rgba(74,158,255,0.06), transparent 50%), #0A0A0F',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 25px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)'
      }}>
        {/* Floating Glow Orbs */}
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%', width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(245,166,35,0.15), transparent 70%)',
          animation: 'float 8s ease-in-out infinite', pointerEvents: 'none', filter: 'blur(40px)'
        }}></div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 1.2rem',
            background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.25)',
            borderRadius: '50px', color: '#F5A623', fontSize: '0.8rem', fontWeight: 600,
            marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(245,166,35,0.15)'
          }}>
            <RiCpuLine size={16} /> AI-Powered Fitness Engine
          </div>
          
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1rem',
            color: '#FFFFFF', lineHeight: 1.1, letterSpacing: '-1.5px'
          }}>
            Transform Your{' '}
            <span style={{ 
              background: 'linear-gradient(135deg, #F5A623, #FFD700)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 15px rgba(245,166,35,0.4))'
            }}>
              Fitness
            </span>{' '}
            Journey
          </h1>
          
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontWeight: 300 }}>
            with Personalized AI Diet & Workout Plans
          </p>
          
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.7 }}>
            Get customized meal plans, workout routines, and real-time AI coaching tailored to your goals and body type. Powered by advanced neural networks.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {user ? (
              <Link to="/dashboard" className="btn btn-primary btn-lg">
                Go to Dashboard <RiArrowRightLine size={20} />
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-lg animate-glow">
                  Get Started Free <RiRocketLine size={20} />
                </Link>
                <Link to="/login" className="btn btn-secondary btn-lg">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Canvas-Style Image Frame Container */}
        <div style={{
          position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center',
          width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(245,166,35,0.1) 0%, transparent 70%)',
          borderRadius: '28px', border: '1px solid rgba(245,166,35,0.3)', boxShadow: 'inset 0 0 40px rgba(245,166,35,0.1), 0 20px 40px rgba(0,0,0,0.6)',
          overflow: 'hidden'
        }}>
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR_XSRVD_LmBUjY9geTUV8zBGYjOI4RUhScxuqkP9kSA&s=10" 
            alt="Fitness Boy" 
            style={{
              width: '90%',
              height: '90%',
              objectFit: 'cover',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}
          />
          <div style={{
            position: 'absolute', bottom: '1.2rem', background: 'rgba(10,10,15,0.9)',
            border: '1px solid rgba(245,166,35,0.4)', padding: '0.4rem 1.2rem', borderRadius: '20px',
            color: '#F5A623', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
          }}>
            ELITE FITNESS ATHLETE
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
            Everything You <span style={{ color: '#F5A623' }}>Need</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '0.4rem' }}>
            Next-gen immersive tools to achieve your fitness milestones
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {[
            { title: 'Workout Plans', desc: 'Personalized home/gym routines with dynamic sets & splits.', icon: <RiPulseLine size={28} />, color: '#4A9EFF' },
            { title: 'Diet Plans', desc: 'Custom macros, smart calories & luxury nutrition tracking.', icon: <RiAppleLine size={28} />, color: '#34D399' },
            { title: 'AI Chatbot', desc: 'Real-time interactive fitness advice powered by core AI.', icon: <RiRobotLine size={28} />, color: '#A78BFA' },
            { title: 'Habit Tracker', desc: 'Track hydration, sleep, workouts & maintain elite streaks.', icon: <RiBarChartBoxLine size={28} />, color: '#F5A623' },
            { title: 'Progress Tracking', desc: 'Monitor muscle growth and weight transformation easily.', icon: <RiLineChartLine size={28} />, color: '#FF6B6B' },
            { title: 'Body Analysis', desc: 'Advanced posture detection & precise structural estimation.', icon: <RiShieldUserLine size={28} />, color: '#FF6B6B' }
          ].map((feature, index) => (
            <div key={index} style={{
              background: 'linear-gradient(145deg, rgba(20,20,35,0.95), rgba(10,10,15,0.98))',
              padding: '2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 15px 35px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
              textAlign: 'left', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', position: 'relative', overflow: 'hidden'
            }}>
              <div style={{
                width: '60px', height: '60px', borderRadius: '14px',
                background: `linear-gradient(135deg, ${feature.color}25, ${feature.color}05)`,
                border: `1px solid ${feature.color}40`, display: 'flex', alignItems: 'center',
                justifyContent: 'center', marginBottom: '1.2rem', color: feature.color,
                boxShadow: `0 8px 20px ${feature.color}20`
              }}>
                {feature.icon}
              </div>
              <h3 style={{ color: '#FFFFFF', fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                {feature.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{
        background: 'linear-gradient(180deg, rgba(20,20,35,0.9), rgba(12,12,18,0.95))',
        padding: '3rem 2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.06)',
        marginBottom: '3rem', boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
            How It <span style={{ color: '#F5A623' }}>Works</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '0.4rem' }}>
            Your interactive path to total fitness transformation
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
          {[
            { step: '01', title: 'Sign Up', desc: 'Create your secure account instantly.', icon: <RiShieldUserLine size={26} color="#F5A623" /> },
            { step: '02', title: 'Body Analysis', desc: 'Upload parameters for deep AI scans.', icon: <RiCpuLine size={26} color="#4A9EFF" /> },
            { step: '03', title: 'Get Plans', desc: 'Receive precision customized diet routines.', icon: <RiRobotLine size={26} color="#A78BFA" /> },
            { step: '04', title: 'Track & Improve', desc: 'Monitor streaks and scale daily output.', icon: <RiLineChartLine size={26} color="#34D399" /> }
          ].map((item, index) => (
            <div key={index} style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
              padding: '2rem 1.5rem', borderRadius: '18px', textAlign: 'center', position: 'relative',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}>
              <div style={{
                width: '50px', height: '50px', margin: '0 auto 1rem', borderRadius: '12px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.4)'
              }}>
                {item.icon}
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#F5A623', letterSpacing: '2px', marginBottom: '0.4rem' }}>
                STEP {item.step}
              </div>
              <h3 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                {item.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(245,166,35,0.12), rgba(15,15,22,0.95))',
        padding: '3.5rem 2rem', borderRadius: '24px', border: '1px solid rgba(245,166,35,0.25)',
        textAlign: 'center', boxShadow: '0 20px 60px rgba(245,166,35,0.15)', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          width: '64px', height: '64px', margin: '0 auto 1rem', borderRadius: '16px',
          background: 'rgba(245,166,35,0.15)', border: '1px solid rgba(245,166,35,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 25px rgba(245,166,35,0.3)'
        }}>
          <RiRocketLine size={32} color="#F5A623" />
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.8rem', letterSpacing: '-0.5px' }}>
          Ready to Transform Your Fitness?
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Join elite users achieving their ultimate physical goals with AI coaching frameworks.
        </p>
        {user ? (
          <Link to="/dashboard" className="btn btn-primary btn-lg">
            Go to Dashboard <RiArrowRightLine size={20} />
          </Link>
        ) : (
          <Link to="/register" className="btn btn-primary btn-lg animate-glow">
            Start Your Journey <RiRocketLine size={20} />
          </Link>
        )}
      </section>
    </div>
  );
};

export default Home;
import { useState, useEffect } from 'react';

export const useDashboardData = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    isPremium: false
  });

  const [botStatus, setBotStatus] = useState({
    isLinked: false,
    status: 'inactive',
    lastConnected: null,
    botName: ''
  });

  const [premiumBotStatus, setPremiumBotStatus] = useState({
    isLinked: false,
    status: 'inactive',
    lastConnected: null,
    botName: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch main dashboard data
        const mainResponse = await fetch(`${API_URL}/user/dashboard`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: "include"
        });

        if (mainResponse.ok) {
          const mainData = await mainResponse.json();
          setBotStatus(mainData.botStatus || botStatus);
          setUserInfo(mainData.userInfo || userInfo);

          // If user is premium, fetch premium bot data
          if (mainData.userInfo?.isPremium) {
            const premiumResponse = await fetch(`${API_URL}/user/premium-dashboard`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: "include"
            });

            if (premiumResponse.ok) {
              const premiumData = await premiumResponse.json();
              setPremiumBotStatus(premiumData.botStatus || premiumBotStatus);
            } else {
              setError('Failed to fetch premium bot data');
            }
          }
        } else {
          setError('Failed to fetch dashboard data');
        }
      } catch (err) {
        setError('Network error occurred');
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [API_URL]);

  return {
    userInfo,
    botStatus,
    premiumBotStatus,
    loading,
    error,
    setError
  };
};
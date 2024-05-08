import React, { useEffect, useState } from 'react';
import '../App.css'; // Убедитесь, что CSS импортирован

const FadeInComponent = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100); // Небольшая задержка перед началом анимации
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    </>
  );
};

export default FadeInComponent;

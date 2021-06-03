export const appendScript = (url, callback) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = false;
    document.head.appendChild(script);
  
    script.onload = () => { 
      if (callback) callback();
    };
  };
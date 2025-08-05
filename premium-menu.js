function createAnimatedMenu() {
  // Remove existing menu if present
  const existingMenu = document.getElementById('animated-menu');
  if (existingMenu) {
    existingMenu.style.opacity = '0';
    existingMenu.style.transform = 'scale(0.9) rotateY(15deg)';
    setTimeout(() => existingMenu.remove(), 500);
    return;
  }

  const menu = document.createElement('div');
  menu.id = 'animated-menu';
  menu.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #ff4e7e 0%, #f45b7a 25%, #e85d8e 50%, #d53e9f 75%, #c23a8b 100%);
    z-index: 99999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: 'Poppins', Arial, sans-serif;
    opacity: 0;
    transform: scale(0.8) rotateY(-15deg);
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    overflow: hidden;
    backdrop-filter: blur(20px);
  `;
  
  menu.innerHTML = `
    <!-- Sophisticated Background Effects -->
    <div style="position: absolute; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
      <!-- Animated Gradient Orbs -->
      <div style="position: absolute; width: 300px; height: 300px; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); border-radius: 50%; top: 10%; left: -10%; animation: floatOrb 20s ease-in-out infinite;"></div>
      <div style="position: absolute; width: 200px; height: 200px; background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%); border-radius: 50%; bottom: 20%; right: -5%; animation: floatOrb 25s ease-in-out infinite reverse;"></div>
      <div style="position: absolute; width: 150px; height: 150px; background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%); border-radius: 50%; top: 60%; left: 80%; animation: floatOrb 18s ease-in-out infinite;"></div>
      
      <!-- Floating Particles -->
      <div style="position: absolute; width: 4px; height: 4px; background: rgba(255,255,255,0.4); border-radius: 50%; top: 25%; left: 15%; animation: sparkle 3s ease-in-out infinite;"></div>
      <div style="position: absolute; width: 3px; height: 3px; background: rgba(255,255,255,0.3); border-radius: 50%; top: 70%; left: 25%; animation: sparkle 4s ease-in-out infinite; animation-delay: 1s;"></div>
      <div style="position: absolute; width: 5px; height: 5px; background: rgba(255,255,255,0.5); border-radius: 50%; top: 40%; right: 20%; animation: sparkle 3.5s ease-in-out infinite; animation-delay: 2s;"></div>
      <div style="position: absolute; width: 2px; height: 2px; background: rgba(255,255,255,0.6); border-radius: 50%; bottom: 30%; right: 30%; animation: sparkle 2.8s ease-in-out infinite; animation-delay: 0.5s;"></div>
      
      <!-- Geometric Shapes -->
      <div style="position: absolute; width: 60px; height: 60px; border: 2px solid rgba(255,255,255,0.1); transform: rotate(45deg); top: 15%; right: 15%; animation: rotateShape 15s linear infinite;"></div>
      <div style="position: absolute; width: 40px; height: 40px; border: 2px solid rgba(255,255,255,0.08); border-radius: 50%; bottom: 25%; left: 20%; animation: pulse 4s ease-in-out infinite;"></div>
    </div>
    
    <!-- Logo Section -->
    <div style="position: relative; z-index: 3; text-align: center; width: 100%; max-width: 450px; margin-bottom: 2rem;">
      <!-- Logo Container with Sophisticated Animation -->
      <div style="
        width: 120px; 
        height: 120px; 
        margin: 0 auto 2rem; 
        background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(20px);
        border: 2px solid rgba(255,255,255,0.3);
        box-shadow: 0 20px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3);
        transform: scale(0) rotate(-180deg);
        animation: logoEntrance 1.2s cubic-bezier(0.68, -0.6, 0.32, 1.6) forwards;
        animation-delay: 0.3s;
        position: relative;
        overflow: hidden;
      ">
        <!-- Logo Shine Effect -->
        <div style="
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%);
          transform: rotate(45deg);
          animation: logoShine 3s ease-in-out infinite;
          animation-delay: 1.5s;
        "></div>
        
        <!-- Heart Logo -->
        <div style="
          font-size: 3.5rem;
          color: white;
          text-shadow: 0 4px 20px rgba(0,0,0,0.3);
          animation: heartBeat 2s ease-in-out infinite;
          animation-delay: 1.8s;
          z-index: 1;
        ">💖</div>
      </div>
    </div>
    
    <!-- Navigation Menu -->
    <div style="position: relative; z-index: 3; text-align: center; width: 100%; max-width: 400px;">
      <div style="display: flex; flex-direction: column; gap: 1.2rem;">
        <a href="index.html" class="premium-menu-link" style="
          color: white; 
          font-size: 1.4rem; 
          font-weight: 600;
          padding: 1.5rem 2.5rem; 
          text-decoration: none; 
          display: flex;
          align-items: center;
          justify-content: flex-start;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.2);
          box-shadow: 0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform: translateX(-100px) rotateY(-30deg);
          opacity: 0;
          animation: slideInRotate 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          animation-delay: 0.5s;
          position: relative;
          overflow: hidden;
        ">
          <div style="
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%);
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 1rem;
            font-size: 1.5rem;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
          ">🏠</div>
          <span style="flex: 1; text-align: left;">Home</span>
          <div style="
            width: 8px;
            height: 8px;
            background: rgba(255,255,255,0.4);
            border-radius: 50%;
            transition: all 0.3s ease;
          "></div>
        </a>
        
        <a href="about.html" class="premium-menu-link" style="
          color: white; 
          font-size: 1.4rem; 
          font-weight: 600;
          padding: 1.5rem 2.5rem; 
          text-decoration: none; 
          display: flex;
          align-items: center;
          justify-content: flex-start;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.2);
          box-shadow: 0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform: translateX(-100px) rotateY(-30deg);
          opacity: 0;
          animation: slideInRotate 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          animation-delay: 0.6s;
          position: relative;
          overflow: hidden;
        ">
          <div style="
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%);
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 1rem;
            font-size: 1.5rem;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
          ">ℹ️</div>
          <span style="flex: 1; text-align: left;">About</span>
          <div style="
            width: 8px;
            height: 8px;
            background: rgba(255,255,255,0.4);
            border-radius: 50%;
            transition: all 0.3s ease;
          "></div>
        </a>
        
        <a href="get-involved.html" class="premium-menu-link" style="
          color: white; 
          font-size: 1.4rem; 
          font-weight: 600;
          padding: 1.5rem 2.5rem; 
          text-decoration: none; 
          display: flex;
          align-items: center;
          justify-content: flex-start;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.2);
          box-shadow: 0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform: translateX(-100px) rotateY(-30deg);
          opacity: 0;
          animation: slideInRotate 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          animation-delay: 0.7s;
          position: relative;
          overflow: hidden;
        ">
          <div style="
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%);
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 1rem;
            font-size: 1.5rem;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
          ">🤝</div>
          <span style="flex: 1; text-align: left;">Get Involved</span>
          <div style="
            width: 8px;
            height: 8px;
            background: rgba(255,255,255,0.4);
            border-radius: 50%;
            transition: all 0.3s ease;
          "></div>
        </a>
        
        <a href="contact.html" class="premium-menu-link" style="
          color: white; 
          font-size: 1.4rem; 
          font-weight: 600;
          padding: 1.5rem 2.5rem; 
          text-decoration: none; 
          display: flex;
          align-items: center;
          justify-content: flex-start;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.2);
          box-shadow: 0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform: translateX(-100px) rotateY(-30deg);
          opacity: 0;
          animation: slideInRotate 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          animation-delay: 0.8s;
          position: relative;
          overflow: hidden;
        ">
          <div style="
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%);
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 1rem;
            font-size: 1.5rem;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
          ">📞</div>
          <span style="flex: 1; text-align: left;">Contact</span>
          <div style="
            width: 8px;
            height: 8px;
            background: rgba(255,255,255,0.4);
            border-radius: 50%;
            transition: all 0.3s ease;
          "></div>
        </a>
        
        <a href="faq.html" class="premium-menu-link" style="
          color: white; 
          font-size: 1.4rem; 
          font-weight: 600;
          padding: 1.5rem 2.5rem; 
          text-decoration: none; 
          display: flex;
          align-items: center;
          justify-content: flex-start;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.2);
          box-shadow: 0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform: translateX(-100px) rotateY(-30deg);
          opacity: 0;
          animation: slideInRotate 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          animation-delay: 0.9s;
          position: relative;
          overflow: hidden;
        ">
          <div style="
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%);
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 1rem;
            font-size: 1.5rem;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
          ">❓</div>
          <span style="flex: 1; text-align: left;">FAQ</span>
          <div style="
            width: 8px;
            height: 8px;
            background: rgba(255,255,255,0.4);
            border-radius: 50%;
            transition: all 0.3s ease;
          "></div>
        </a>
      </div>
      
      <p style="
        margin-top: 2.5rem; 
        opacity: 0; 
        color: rgba(255,255,255,0.6); 
        font-size: 0.9rem;
        font-weight: 300;
        animation: fadeInUp 0.6s ease forwards; 
        animation-delay: 1.2s;
      ">Tap anywhere to close</p>
    </div>
  `;
  
  // Add sophisticated CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatOrb {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(30px, -20px) scale(1.1); }
      50% { transform: translate(-20px, -40px) scale(0.9); }
      75% { transform: translate(-30px, 20px) scale(1.05); }
    }
    
    @keyframes sparkle {
      0%, 100% { opacity: 0.2; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.5); }
    }
    
    @keyframes rotateShape {
      0% { transform: rotate(45deg); }
      100% { transform: rotate(405deg); }
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 0.3; }
      50% { transform: scale(1.2); opacity: 0.1; }
    }
    
    @keyframes logoEntrance {
      0% { transform: scale(0) rotate(-180deg); opacity: 0; }
      60% { transform: scale(1.1) rotate(10deg); opacity: 0.8; }
      100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    
    @keyframes logoShine {
      0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
      50% { transform: translateX(0%) translateY(0%) rotate(45deg); }
      100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
    }
    
    @keyframes heartBeat {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    
    @keyframes slideInRotate {
      0% { 
        transform: translateX(-100px) rotateY(-30deg); 
        opacity: 0; 
      }
      60% { 
        transform: translateX(10px) rotateY(5deg); 
        opacity: 0.8; 
      }
      100% { 
        transform: translateX(0) rotateY(0deg); 
        opacity: 1; 
      }
    }
    
    @keyframes fadeInUp {
      0% { transform: translateY(20px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    
    .premium-menu-link:hover {
      background: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%) !important;
      transform: translateY(-8px) scale(1.02) !important;
      box-shadow: 0 20px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3) !important;
    }
    
    .premium-menu-link:hover > div:first-child {
      transform: scale(1.1) rotate(5deg) !important;
      background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.2) 100%) !important;
    }
    
    .premium-menu-link:hover > div:last-child {
      background: rgba(255,255,255,0.8) !important;
      transform: scale(1.5) !important;
    }
    
    .premium-menu-link:active {
      transform: translateY(-4px) scale(0.98) !important;
    }
    
    .premium-menu-link::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s ease;
    }
    
    .premium-menu-link:hover::before {
      left: 100%;
    }
  `;
  document.head.appendChild(style);
  
  // Enhanced close animation
  menu.addEventListener('click', function(e) {
    if (e.target === menu || (!e.target.closest('.premium-menu-link') && !e.target.closest('[style*="logo"]'))) {
      menu.style.opacity = '0';
      menu.style.transform = 'scale(0.8) rotateY(15deg)';
      setTimeout(() => menu.remove(), 500);
    }
  });
  
  // Enhanced click handlers with sophisticated transitions
  const menuLinks = menu.querySelectorAll('.premium-menu-link');
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.stopPropagation();
      
      // Add ripple effect
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;
      
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      
      this.appendChild(ripple);
      
      // Add ripple animation
      const rippleStyle = document.createElement('style');
      rippleStyle.textContent = `
        @keyframes ripple {
          to { transform: scale(2); opacity: 0; }
        }
      `;
      document.head.appendChild(rippleStyle);
      
      // Enhanced exit animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        menu.style.opacity = '0';
        menu.style.transform = 'scale(0.8) rotateY(15deg)';
        setTimeout(() => {
          window.location.href = this.href;
        }, 300);
      }, 150);
    });
  });
  
  document.body.appendChild(menu);
  
  // Sophisticated entrance animation
  setTimeout(() => {
    menu.style.opacity = '1';
    menu.style.transform = 'scale(1) rotateY(0deg)';
  }, 50);
}
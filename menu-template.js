// Complete menu function template
const menuScript = `
    function createAnimatedMenu() {
      // Remove existing menu if present
      const existingMenu = document.getElementById('premium-menu');
      if (existingMenu) {
        existingMenu.style.opacity = '0';
        existingMenu.style.transform = 'scale(0.9)';
        setTimeout(() => existingMenu.remove(), 400);
        return;
      }

      const menu = document.createElement('div');
      menu.id = 'premium-menu';
      menu.style.cssText = \`
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
        transform: scale(0.9);
        transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        overflow: hidden;
      \`;

      menu.innerHTML = \`
        <!-- Animated Background -->
        <div style="position: absolute; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
          <div style="position: absolute; width: 200px; height: 200px; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); border-radius: 50%; top: 15%; left: 10%; animation: floatSlow 15s ease-in-out infinite;"></div>
          <div style="position: absolute; width: 150px; height: 150px; background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%); border-radius: 50%; bottom: 20%; right: 15%; animation: floatSlow 20s ease-in-out infinite reverse;"></div>
          <div style="position: absolute; width: 3px; height: 3px; background: rgba(255,255,255,0.4); border-radius: 50%; top: 30%; left: 20%; animation: twinkle 2s ease-in-out infinite;"></div>
          <div style="position: absolute; width: 4px; height: 4px; background: rgba(255,255,255,0.3); border-radius: 50%; top: 70%; right: 25%; animation: twinkle 3s ease-in-out infinite; animation-delay: 1s;"></div>
        </div>
        
        <!-- Logo Section -->
        <div style="position: relative; z-index: 3; text-align: center; margin-bottom: 3rem;">
          <div style="
            width: 100px; 
            height: 100px; 
            margin: 0 auto 1.5rem; 
            background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(15px);
            border: 2px solid rgba(255,255,255,0.3);
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
            transform: scale(0);
            animation: logoAppear 0.8s cubic-bezier(0.68, -0.6, 0.32, 1.6) forwards;
            animation-delay: 0.2s;
          ">
            <img src="generated-icon.png" alt="Hearts for Healing Logo" style="width: 80px; height: 80px; object-fit: cover; border-radius: 50%; animation: heartPulse 2s ease-in-out infinite; animation-delay: 1s;" />
          </div>
        </div>
        
        <!-- Menu Items -->
        <div style="position: relative; z-index: 3; width: 100%; max-width: 350px;">
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <a href="index.html" class="menu-item" style="
              color: white; 
              font-size: 1.3rem; 
              font-weight: 600;
              padding: 1.2rem 2rem; 
              text-decoration: none; 
              display: flex;
              align-items: center;
              background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%);
              border-radius: 15px;
              backdrop-filter: blur(15px);
              border: 1px solid rgba(255,255,255,0.2);
              box-shadow: 0 8px 25px rgba(0,0,0,0.1);
              transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
              transform: translateX(-50px);
              opacity: 0;
              animation: slideIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
              animation-delay: 0.4s;
            ">
              <div style="
                width: 45px;
                height: 45px;
                background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 1rem;
                font-size: 1.3rem;
                transition: all 0.3s ease;
              "><i class="fas fa-home"></i></div>
              <span style="flex: 1;">Home</span>
              <div style="width: 6px; height: 6px; background: rgba(255,255,255,0.4); border-radius: 50%; transition: all 0.3s ease;"></div>
            </a>
            
            <a href="about.html" class="menu-item" style="
              color: white; 
              font-size: 1.3rem; 
              font-weight: 600;
              padding: 1.2rem 2rem; 
              text-decoration: none; 
              display: flex;
              align-items: center;
              background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%);
              border-radius: 15px;
              backdrop-filter: blur(15px);
              border: 1px solid rgba(255,255,255,0.2);
              box-shadow: 0 8px 25px rgba(0,0,0,0.1);
              transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
              transform: translateX(-50px);
              opacity: 0;
              animation: slideIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
              animation-delay: 0.5s;
            ">
              <div style="
                width: 45px;
                height: 45px;
                background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 1rem;
                font-size: 1.3rem;
                transition: all 0.3s ease;
              "><i class="fas fa-info-circle"></i></div>
              <span style="flex: 1;">About</span>
              <div style="width: 6px; height: 6px; background: rgba(255,255,255,0.4); border-radius: 50%; transition: all 0.3s ease;"></div>
            </a>
            
            <a href="get-involved.html" class="menu-item" style="
              color: white; 
              font-size: 1.3rem; 
              font-weight: 600;
              padding: 1.2rem 2rem; 
              text-decoration: none; 
              display: flex;
              align-items: center;
              background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%);
              border-radius: 15px;
              backdrop-filter: blur(15px);
              border: 1px solid rgba(255,255,255,0.2);
              box-shadow: 0 8px 25px rgba(0,0,0,0.1);
              transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
              transform: translateX(-50px);
              opacity: 0;
              animation: slideIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
              animation-delay: 0.6s;
            ">
              <div style="
                width: 45px;
                height: 45px;
                background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 1rem;
                font-size: 1.3rem;
                transition: all 0.3s ease;
              "><i class="fas fa-hands-helping"></i></div>
              <span style="flex: 1;">Get Involved</span>
              <div style="width: 6px; height: 6px; background: rgba(255,255,255,0.4); border-radius: 50%; transition: all 0.3s ease;"></div>
            </a>
            
            <a href="contact.html" class="menu-item" style="
              color: white; 
              font-size: 1.3rem; 
              font-weight: 600;
              padding: 1.2rem 2rem; 
              text-decoration: none; 
              display: flex;
              align-items: center;
              background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%);
              border-radius: 15px;
              backdrop-filter: blur(15px);
              border: 1px solid rgba(255,255,255,0.2);
              box-shadow: 0 8px 25px rgba(0,0,0,0.1);
              transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
              transform: translateX(-50px);
              opacity: 0;
              animation: slideIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
              animation-delay: 0.7s;
            ">
              <div style="
                width: 45px;
                height: 45px;
                background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 1rem;
                font-size: 1.3rem;
                transition: all 0.3s ease;
              "><i class="fas fa-phone"></i></div>
              <span style="flex: 1;">Contact</span>
              <div style="width: 6px; height: 6px; background: rgba(255,255,255,0.4); border-radius: 50%; transition: all 0.3s ease;"></div>
            </a>
            
            <a href="faq.html" class="menu-item" style="
              color: white; 
              font-size: 1.3rem; 
              font-weight: 600;
              padding: 1.2rem 2rem; 
              text-decoration: none; 
              display: flex;
              align-items: center;
              background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%);
              border-radius: 15px;
              backdrop-filter: blur(15px);
              border: 1px solid rgba(255,255,255,0.2);
              box-shadow: 0 8px 25px rgba(0,0,0,0.1);
              transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
              transform: translateX(-50px);
              opacity: 0;
              animation: slideIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
              animation-delay: 0.8s;
            ">
              <div style="
                width: 45px;
                height: 45px;
                background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 1rem;
                font-size: 1.3rem;
                transition: all 0.3s ease;
              "><i class="fas fa-question-circle"></i></div>
              <span style="flex: 1;">FAQ</span>
              <div style="width: 6px; height: 6px; background: rgba(255,255,255,0.4); border-radius: 50%; transition: all 0.3s ease;"></div>
            </a>
          </div>
          
          <p style="
            text-align: center;
            margin-top: 2rem; 
            opacity: 0; 
            color: rgba(255,255,255,0.6); 
            font-size: 0.9rem;
            animation: fadeIn 0.5s ease forwards; 
            animation-delay: 1s;
          ">Tap anywhere to close</p>
        </div>
      \`;

      // Add CSS animations
      const style = document.createElement('style');
      style.textContent = \`
        @keyframes floatSlow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -15px) scale(1.1); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes logoAppear {
          0% { transform: scale(0) rotate(-90deg); opacity: 0; }
          70% { transform: scale(1.1) rotate(5deg); opacity: 0.9; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        @keyframes heartPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes slideIn {
          0% { transform: translateX(-50px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .menu-item:hover {
          background: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%) !important;
          transform: translateY(-5px) scale(1.02) !important;
          box-shadow: 0 15px 35px rgba(0,0,0,0.2) !important;
        }
        
        .menu-item:hover > div:first-child {
          transform: scale(1.1) !important;
          background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.2) 100%) !important;
        }
        
        .menu-item:hover > div:last-child {
          background: rgba(255,255,255,0.8) !important;
          transform: scale(1.3) !important;
        }
        
        .menu-item:active {
          transform: translateY(-2px) scale(0.98) !important;
        }
      \`;
      document.head.appendChild(style);

      // Close menu functionality
      menu.addEventListener('click', function (e) {
        if (e.target === menu || e.target.tagName === 'P') {
          menu.style.opacity = '0';
          menu.style.transform = 'scale(0.9)';
          setTimeout(() => menu.remove(), 400);
        }
      });

      // Menu item click handlers
      const menuItems = menu.querySelectorAll('.menu-item');
      menuItems.forEach(item => {
        item.addEventListener('click', function (e) {
          e.stopPropagation();
          this.style.transform = 'scale(0.95)';
          setTimeout(() => {
            menu.style.opacity = '0';
            menu.style.transform = 'scale(0.9)';
            setTimeout(() => {
              window.location.href = this.href;
            }, 200);
          }, 100);
        });
      });

      document.body.appendChild(menu);

      // Show menu
      setTimeout(() => {
        menu.style.opacity = '1';
        menu.style.transform = 'scale(1)';
      }, 50);
    }
`;

console.log(menuScript);
// Script to apply the sophisticated menu to all pages
const pages = ['contact.html', 'about.html', 'get-involved.html', 'faq.html', 'index.html'];

// Read the premium menu function
const fs = require('fs');
const premiumMenuCode = fs.readFileSync('premium-menu.js', 'utf8');

pages.forEach(page => {
  try {
    let content = fs.readFileSync(page, 'utf8');
    
    // Find and replace the createAnimatedMenu function
    const functionStart = content.indexOf('function createAnimatedMenu()');
    if (functionStart !== -1) {
      // Find the end of the function by counting braces
      let braceCount = 0;
      let i = functionStart;
      let inFunction = false;
      
      while (i < content.length) {
        if (content[i] === '{') {
          braceCount++;
          inFunction = true;
        } else if (content[i] === '}') {
          braceCount--;
          if (inFunction && braceCount === 0) {
            // Found the end of the function
            const functionEnd = i + 1;
            const oldFunction = content.substring(functionStart, functionEnd);
            
            // Replace with premium menu
            content = content.replace(oldFunction, premiumMenuCode);
            
            // Write back to file
            fs.writeFileSync(page, content);
            console.log(`✅ Updated ${page}`);
            break;
          }
        }
        i++;
      }
    } else {
      console.log(`⚠️  No createAnimatedMenu function found in ${page}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${page}:`, error.message);
  }
});

console.log('🎉 Premium menu applied to all pages!');
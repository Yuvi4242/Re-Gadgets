const fs = require('fs');

try {
  fs.renameSync(
    'C:/Users/yuvra/OneDrive/Desktop/Re-Gadgets/client/src/pages/dashboards/TechnicianDashboard.jsx',
    'C:/Users/yuvra/OneDrive/Desktop/Re-Gadgets/client/src/pages/dashboards/TechnicianDashboard.old.jsx'
  );
  console.log("TechnicianDashboard successfully renamed.");
} catch (e) {
  console.error("Error renaming TechnicianDashboard:", e.message);
}

try {
  if (fs.existsSync('C:/Users/yuvra/OneDrive/Desktop/Re-Gadgets/client/src/pages/dashboards/CustomerDashboard.jsx')) {
     fs.renameSync(
       'C:/Users/yuvra/OneDrive/Desktop/Re-Gadgets/client/src/pages/dashboards/CustomerDashboard.jsx',
       'C:/Users/yuvra/OneDrive/Desktop/Re-Gadgets/client/src/pages/dashboards/CustomerDashboard.old.jsx'
     );
     console.log("CustomerDashboard successfully renamed.");
  }
} catch (e) {
  console.error("Error renaming CustomerDashboard:", e.message);
}

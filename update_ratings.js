const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/lib/data/initial_cafes.json');

try {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  let data = JSON.parse(fileContent);
  
  data = data.map(cafe => ({
    ...cafe,
    rating: Math.round((Math.random() * (5.0 - 3.8) + 3.8) * 10) / 10
  }));
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log('Successfully updated ratings in initial_cafes.json');
} catch (error) {
  console.error('Error updating ratings:', error);
  process.exit(1);
}

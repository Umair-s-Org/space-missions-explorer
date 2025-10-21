# 🚀 Quick Start Guide - Space Missions Explorer

## 1️⃣ First Time Setup (5 minutes)

### Update Your Information

**File: `package.json`**
```json
"author": "Umair Zafar <umair2406@gmail.com>",
"homepage": "https://github.com/umair112",
```

**File: `README.md`** (bottom section)
```markdown
## 👤 Author

**Your Name**
- GitHub: [@Umair112](https://github.com/umair112)
- Email: your.email@example.com
```

**File: `Jenkinsfile`**
- Replace `umair112/solar-system` with `yourusername/space-missions-explorer` (4 occurrences)

## 2️⃣ Local Development

### Prerequisites
- Node.js v14+
- MongoDB running on localhost:27017
- Git

### Setup Commands
```bash
# Install dependencies
npm install

# Create .env file
cat > .env << EOF
MONGO_URI=mongodb://localhost:27017/missions
NODE_ENV=development
EOF

# Seed the database with space missions
node seed.js

# Run tests
npm test

# Start application
npm start
```

### Access the App
Open browser: http://localhost:3000

### Try It Out
- Enter numbers 1-8 to explore different space missions
- See Apollo 11, Voyager, Hubble, ISS, and more!

## 3️⃣ What Each Mission ID Shows

| ID | Mission | Highlights |
|----|---------|-----------|
| 1 | Apollo 11 | First humans on the Moon 🌙 |
| 2 | Voyager 1 | Farthest human-made object 🛸 |
| 3 | Mars Curiosity | Exploring Mars right now 🔴 |
| 4 | Hubble Telescope | Stunning deep space images 🔭 |
| 5 | Cassini-Huygens | Saturn's rings and moons 🪐 |
| 6 | New Horizons | First Pluto flyby ❄️ |
| 7 | James Webb | Newest space telescope 🌌 |
| 8 | ISS | Home in space for 24 years 🛰️ |

## 4️⃣ Docker Deployment

```bash
# Build image
docker build -t space-missions-explorer .

# Run with MongoDB
docker run -d --name mongo \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=secret \
  mongo:6

# Run application
docker run -d --name space-missions \
  --link mongo:mongo \
  -p 3000:3000 \
  -e MONGO_URI="mongodb://admin:secret@mongo:27017/missions?authSource=admin" \
  space-missions-explorer

# Seed the database
docker exec space-missions node seed.js

# Check logs
docker logs space-missions
```

Access: http://localhost:3000

## 5️⃣ Jenkins CI/CD

### Before First Build

1. **Update Jenkinsfile** (see JENKINSFILE_UPDATES.md)
2. **Configure Jenkins Credentials:**
   - `Mongo-DB-Credentials` (username/password)
   - `docker-hub-credentials` (username/password)
   - `github-api-token` (secret text)
   - `aws-s3-ec2-lambda-creds` (AWS credentials)

3. **Install Jenkins Plugins:**
   - NodeJS Plugin
   - Docker Pipeline
   - OWASP Dependency-Check
   - SonarQube Scanner

### Run Pipeline

```bash
# Commit your changes
git add .
git commit -m "Transform to Space Missions Explorer"
git push origin main

# Jenkins will automatically trigger on push
# Or manually trigger from Jenkins UI
```

## 6️⃣ Troubleshooting

### MongoDB Connection Issues
```bash
# Check MongoDB is running
docker ps | grep mongo
# OR
ps aux | grep mongod

# Test connection
mongosh mongodb://localhost:27017
```

### Seed Script Fails
```bash
# Check environment variables
echo $MONGO_URI

# Run with explicit connection
MONGO_URI="mongodb://localhost:27017/missions" node seed.js
```

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000
# OR
netstat -tulpn | grep 3000

# Kill process
kill -9 <PID>
```

### Tests Failing
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Run tests with verbose output
npm test -- --reporter spec
```

## 7️⃣ Development Tips

### Adding More Missions
Edit `seed.js` and add new entries:
```javascript
{
    id: 9,
    name: "Artemis",
    description: "NASA's return to the Moon program...",
    image: "https://...",
    velocity: "...",
    distance: "..."
}
```

### Changing Styling
Edit `index.html` - all styles are inline in the `<style>` tag

### Adding API Endpoints
Edit `app.js`:
```javascript
app.get('/new-endpoint', function(req, res) {
    res.json({ message: "Hello!" });
});
```

## 8️⃣ Project Structure

```
solar-system/
├── app.js                    # Main Express server
├── app-controller.js         # Frontend JavaScript
├── app-test.js              # Unit tests
├── seed.js                  # Database seeder
├── index.html               # UI
├── package.json             # Dependencies
├── Dockerfile               # Container image
├── Jenkinsfile              # CI/CD pipeline
├── README.md                # Documentation
├── TRANSFORMATION_SUMMARY.md # What changed
├── JENKINSFILE_UPDATES.md   # Jenkinsfile guide
└── QUICK_START.md           # This file!
```

## 9️⃣ Next Steps

- [ ] Personalize author information
- [ ] Update Jenkinsfile with your Docker Hub username
- [ ] Run locally and test
- [ ] Commit to your GitHub repository
- [ ] Set up Jenkins pipeline
- [ ] Deploy to production
- [ ] Share with friends! 🎉

## 🆘 Need Help?

Check these files:
- `README.md` - Full documentation
- `TRANSFORMATION_SUMMARY.md` - All changes made
- `JENKINSFILE_UPDATES.md` - CI/CD setup

---

**You're all set!** 🎊 Your project is now unique and ready to showcase!

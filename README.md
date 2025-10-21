# 🚀 Space Missions Explorer

<div align="center">

![Space Missions](https://img.shields.io/badge/Space-Missions-blue?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)

**An interactive web application showcasing humanity's greatest achievements in space exploration**

[Features](#-features) • [Quick Start](#-quick-start) • [User Interface](#-user-interface) • [Documentation](#-documentation) • [Deployment](#-deployment) • [CI/CD](#-cicd-pipeline)

</div>

---

## 📖 About

**Space Missions Explorer** is a full-stack web application built with Node.js, Express, and MongoDB that presents detailed information about 8 historic and modern space missions. Users can explore each mission interactively through a modern glassmorphism interface, learning about humanity's quest to understand the cosmos.

**Latest Update (v1.3.2)**: Enhanced UI/UX with sticky controls, mission gallery, and responsive design improvements!

This project demonstrates modern DevOps practices including:
- ✅ Containerization with Docker
- ✅ Orchestration with Kubernetes
- ✅ Comprehensive CI/CD pipeline with Jenkins
- ✅ Security scanning (OWASP, Trivy, SonarQube)
- ✅ Multiple deployment targets (EC2, Kubernetes, AWS Lambda)
- ✅ Automated testing and code coverage
- ✅ Infrastructure as Code

### 🛰️ Featured Space Missions

| Mission | Year | Achievement | Status |
|---------|------|-------------|--------|
| 🌙 **Apollo 11** | 1969 | First humans on the Moon | Historic |
| 🛸 **Voyager 1** | 1977 | Farthest human-made object | Active |
| 🔴 **Mars Curiosity** | 2012 | Exploring Mars geology | Active |
| 🔭 **Hubble Telescope** | 1990 | Revolutionary deep space imagery | Active |
| 🪐 **Cassini-Huygens** | 1997-2017 | Saturn system exploration | Completed |
| ❄️ **New Horizons** | 2006 | First Pluto flyby | Active |
| 🌌 **James Webb Telescope** | 2021 | Next-generation infrared observatory | Active |
| 🛰️ **International Space Station** | 1998 | Continuous human presence in orbit | Active |

---

## ✨ Features

### Application Features
- 🎯 **Interactive UI** - Browse 8 historic space missions with intuitive navigation
- �️ **Mission Gallery** - Quick thumbnail gallery for instant mission access
- �📊 **Detailed Information** - Learn about velocity, distance, and achievements
- 🌟 **Rich Media** - High-quality mission images with fallback systems
- 📱 **Responsive Design** - Optimized layout for desktop and mobile devices
- 🔄 **Real-time Data** - Fetched from MongoDB database
- ✨ **Modern UI/UX** - Glassmorphism design with smooth animations

### UI/UX Enhancements
- 🎨 **Glassmorphism Design** - Modern frosted glass effect with backdrop blur
- 📌 **Sticky Input Controls** - Search interface stays accessible while browsing
- 🔄 **Smooth Transitions** - Animated hover effects and seamless interactions
- 🖱️ **Intuitive Navigation** - Click gallery thumbnails or enter mission numbers (1-8)
- 🎯 **Fixed Layout** - Stable button positioning prevents UI jumps during content changes
- 📐 **Flexbox Layout** - Responsive design with proper spacing and alignment
- 🌌 **Space Theme** - Cosmic gradient backgrounds and NASA-inspired styling

### Technical Features
- 🏗️ **RESTful API** - Clean Express.js backend
- 💾 **MongoDB Integration** - Mongoose ODM for data management
- 🐳 **Docker Ready** - Fully containerized application
- ☸️ **Kubernetes Ready** - Deployment manifests included
- ⚡ **Serverless Compatible** - AWS Lambda deployment support
- 🧪 **Comprehensive Testing** - Unit tests with Mocha/Chai
- 📈 **Code Coverage** - NYC coverage reporting
- 🔒 **Security Scanning** - Multiple security tools integrated

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (v4.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)

Optional for containerized deployment:
- **Docker** - [Download](https://www.docker.com/get-started)
- **Kubernetes** (minikube, kind, or cloud provider)

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/space-missions-explorer.git
   cd space-missions-explorer
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in the project root:
   ```env
   # MongoDB Configuration
   MONGO_URI=mongodb://localhost:27017/missions
   MONGO_USERNAME=your_username
   MONGO_PASSWORD=your_password
   
   # Application Configuration
   NODE_ENV=development
   PORT=3000
   ```

4. **Seed the Database**
   
   Populate MongoDB with space mission data:
   ```bash
   node seed.js
   ```
   
   Expected output:
   ```
   MongoDB Connected - Seeding Data...
   Seeding Complete 🚀✅
   ```

5. **Run the Application**
   ```bash
   npm start
   ```
   
   The application will be available at: **http://localhost:3000**

6. **Verify Installation**
   
   Open your browser and navigate to `http://localhost:3000`
   - Enter a number from 1-8
   - Click "Explore Mission"
   - View detailed mission information

---

## 🎨 User Interface

### Main Features

**Space Missions Explorer** features a modern, responsive interface designed for an optimal user experience:

#### 🚀 **Header Section**
- **Space Missions Explorer** title with rocket icon
- Glassmorphism design with gradient backgrounds
- Responsive typography using Google Fonts (Orbitron, Ubuntu, BioRhyme)

#### 🎯 **Interactive Controls**
- **Sticky Input Section**: Always accessible search interface
- **Explore Mission Button**: Primary action with hover effects
- **Number Input Field**: Enter mission IDs (1-8) with validation
- **Responsive Layout**: Flexbox design adapts to all screen sizes

#### 🖼️ **Mission Gallery**
- **Quick Preview Thumbnails**: 8 clickable mission images
- **Hover Effects**: Smooth scaling and background transitions
- **Visual Feedback**: Selected missions highlighted with orange border
- **Instant Access**: Click any thumbnail to view mission details

#### 📱 **Responsive Design**
- **Desktop**: Full-width layout with large images and detailed information
- **Mobile**: Optimized button sizes and touch-friendly interface
- **Tablet**: Adaptive grid layout for gallery thumbnails

#### ✨ **Visual Effects**
- **Glassmorphism**: Frosted glass cards with backdrop blur
- **Smooth Animations**: CSS transitions for all interactive elements
- **Space Theme**: Cosmic gradients and NASA-inspired color scheme
- **Loading States**: Visual feedback during image loading

### Usage Instructions

1. **Browse Missions**: Click any thumbnail in the gallery for instant access
2. **Search by Number**: Enter 1-8 in the input field and click "Explore Mission"
3. **View Details**: Mission information displays with image, description, and specifications
4. **Navigate**: Use the sticky controls to explore different missions seamlessly

---

## 🧪 Testing

### Run Unit Tests
```bash
npm test
```

### Run with Code Coverage
```bash
npm run coverage
```

The coverage report will be generated in the `coverage/` directory.

### View Coverage Report
```bash
# Open HTML report
open coverage/lcov-report/index.html

# Or on Linux
xdg-open coverage/lcov-report/index.html
```

### Test Configuration
- **Test Framework**: Mocha
- **Assertion Library**: Chai
- **HTTP Testing**: Chai-HTTP
- **Coverage Tool**: NYC (Istanbul)
- **Coverage Threshold**: 90% (configurable in package.json)

---

## 🐳 Docker Deployment

### Build Docker Image
```bash
docker build -t space-missions-explorer:latest .
```

### Run with Docker Compose (Recommended)

Create a `docker-compose.yml`:
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:6
    container_name: missions-mongodb
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: secret
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  app:
    build: .
    container_name: space-missions-app
    environment:
      MONGO_URI: mongodb://admin:secret@mongodb:27017/missions?authSource=admin
      MONGO_USERNAME: admin
      MONGO_PASSWORD: secret
      NODE_ENV: production
    ports:
      - "3000:3000"
    depends_on:
      - mongodb

volumes:
  mongo-data:
```

Run the stack:
```bash
docker-compose up -d
docker exec space-missions-app node seed.js
```

### Run Standalone Container
```bash
# Start MongoDB
docker run -d --name missions-mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=secret \
  -p 27017:27017 \
  mongo:6

# Run Application
docker run -d --name space-missions-app \
  --link missions-mongodb:mongodb \
  -e MONGO_URI="mongodb://admin:secret@missions-mongodb:27017/missions?authSource=admin" \
  -e MONGO_USERNAME=admin \
  -e MONGO_PASSWORD=secret \
  -p 3000:3000 \
  space-missions-explorer:latest

# Seed Database
docker exec space-missions-app node seed.js
```

Access application at: **http://localhost:3000**

---

## ☸️ Kubernetes Deployment

### Deploy to Kubernetes

1. **Create Namespace**
   ```bash
   kubectl create namespace space-missions
   ```

2. **Apply Kubernetes Manifests**
   ```bash
   # Development Environment
   kubectl apply -f kubernetes/development/

   # Production Environment
   kubectl apply -f kubernetes/production/
   ```

3. **Verify Deployment**
   ```bash
   kubectl get pods -n space-missions
   kubectl get services -n space-missions
   ```

4. **Access the Application**
   ```bash
   # Port Forward
   kubectl port-forward service/space-missions-service 3000:3000 -n space-missions
   
   # Or get the LoadBalancer IP
   kubectl get service space-missions-service -n space-missions
   ```

### Kubernetes Resources Included
- **Deployment**: Application pods with health checks
- **Service**: ClusterIP/LoadBalancer service
- **Ingress**: External access configuration
- **ConfigMap**: Environment configuration
- **Secrets**: Sensitive data management

---

## 📊 CI/CD Pipeline

This project includes a comprehensive **Jenkins CI/CD pipeline** with the following stages:

### Pipeline Stages

1. **📦 Install Dependencies**
   - Install npm packages
   - Seed MongoDB database

2. **🔍 Dependency Scanning**
   - NPM Audit (Critical vulnerabilities)
   - OWASP Dependency Check
   - Generate security reports

3. **🧪 Unit Testing**
   - Run Mocha test suite
   - Generate JUnit XML reports

4. **📈 Code Coverage**
   - NYC coverage analysis
   - Cobertura and LCOV reports
   - HTML report generation

5. **🔒 SAST - SonarQube**
   - Static code analysis
   - Quality gate enforcement
   - Technical debt tracking

6. **🐳 Build Docker Image**
   - Multi-stage Docker build
   - Tag with Git commit SHA
   - Optimize for production

7. **🛡️ Trivy Vulnerability Scanning**
   - Scan Docker images
   - CRITICAL and HIGH severity checks
   - Generate HTML/XML reports

8. **📤 Push Docker Image**
   - Push to Docker Hub registry
   - Tagged with commit SHA

9. **☸️ Kubernetes Deployment** (PR branches)
   - Update image tags in manifests
   - Create feature branch
   - Submit pull request to GitOps repo

10. **☁️ AWS Lambda Deployment** (main branch)
    - Package application
    - Upload to S3
    - Update Lambda function
    - Invoke and verify

### Jenkins Configuration

Required Jenkins plugins:
- NodeJS Plugin
- Docker Pipeline
- OWASP Dependency-Check Plugin
- SonarQube Scanner
- Kubernetes Plugin
- AWS Steps Plugin

Required credentials in Jenkins:
- `Mongo-DB-Credentials` (Username with password)
- `docker-hub-credentials` (Username with password)
- `github-api-token` (Secret text)
- `aws-s3-ec2-lambda-creds` (AWS credentials)

### Pipeline Artifacts

The pipeline generates:
- JUnit test reports
- HTML coverage reports
- OWASP dependency reports
- Trivy vulnerability reports
- Docker images tagged with commit SHA

---

## 📝 API Documentation

### Endpoints

#### **GET /** 
Main application UI

**Response**: HTML page

---

#### **POST /mission**
Get mission details by ID

**Request Body**:
```json
{
  "id": 1
}
```

**Response**:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "id": 1,
  "name": "Apollo 11",
  "description": "First crewed mission to land on the Moon...",
  "image": "https://...",
  "velocity": "11.08 km/s",
  "distance": "384,400 km"
}
```

---

#### **GET /os**
Get system information

**Response**:
```json
{
  "os": "hostname-123",
  "env": "production"
}
```

---

#### **GET /live**
Liveness probe for Kubernetes

**Response**:
```json
{
  "status": "live"
}
```

---

#### **GET /ready**
Readiness probe for Kubernetes

**Response**:
```json
{
  "status": "ready"
}
```

---

## 🏗️ Project Structure

```
space-missions-explorer/
├── app.js                          # Main Express application
├── app-controller.js               # Frontend JavaScript logic
├── app-test.js                     # Mocha/Chai test suite
├── seed.js                         # Database seeding script
├── index.html                      # Frontend UI
├── package.json                    # Node.js dependencies
├── Dockerfile                      # Docker image definition
├── Jenkinsfile                     # CI/CD pipeline definition
├── .env                            # Environment variables (not in repo)
├── README.md                       # This file
│
├── coverage/                       # Test coverage reports
│   ├── lcov-report/               # HTML coverage report
│   ├── cobertura-coverage.xml     # Cobertura format
│   └── lcov.info                  # LCOV format
│
├── kubernetes/                     # Kubernetes manifests
│   ├── development/               # Dev environment configs
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── ingress.yaml
│   └── production/                # Prod environment configs
│       ├── deployment.yaml
│       ├── service.yaml
│       └── ingress.yaml
│
└── images/                        # Static assets
    └── background.gif             # UI background
```

---

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js v14+
- **Framework**: Express.js 4.x
- **Database**: MongoDB 4.x / 6.x
- **ODM**: Mongoose 6.x
- **Environment**: dotenv

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with gradients
- **JavaScript**: Vanilla ES6+
- **Fonts**: Google Fonts (Orbitron, Ubuntu, Encode Sans)
- **Icons**: Font Awesome

### DevOps & Infrastructure
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **CI/CD**: Jenkins
- **Cloud**: AWS (Lambda, S3, EC2)
- **Security**: Trivy, OWASP Dependency Check, SonarQube
- **Testing**: Mocha, Chai, NYC
- **Version Control**: Git

---

## 🔒 Security

### Security Measures Implemented

1. **Dependency Scanning**
   - NPM Audit for known vulnerabilities
   - OWASP Dependency Check

2. **Static Code Analysis**
   - SonarQube SAST scanning
   - Code quality metrics

3. **Container Security**
   - Trivy image scanning
   - Multi-stage Docker builds
   - Minimal base images

4. **Environment Security**
   - Environment variables for secrets
   - No hardcoded credentials
   - .env files excluded from git

5. **API Security**
   - CORS enabled
   - Input validation
   - Error handling

### Security Best Practices

- Always use environment variables for sensitive data
- Keep dependencies up to date
- Review security scan reports
- Follow principle of least privilege
- Use secrets management (Kubernetes Secrets, AWS Secrets Manager)

---

## 🌍 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGO_URI` | MongoDB connection string | Yes | - |
| `MONGO_USERNAME` | MongoDB username | Yes | - |
| `MONGO_PASSWORD` | MongoDB password | Yes | - |
| `NODE_ENV` | Environment (development/production) | No | `development` |
| `PORT` | Application port | No | `3000` |

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Problem**: `MongooseServerSelectionError`

**Solution**:
```bash
# Check MongoDB is running
sudo systemctl status mongod

# Or with Docker
docker ps | grep mongo

# Test connection
mongosh mongodb://localhost:27017
```

---

### Port Already in Use

**Problem**: `EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=3001 npm start
```

---

### Tests Failing

**Problem**: Test suite failures

**Solution**:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Ensure MongoDB is running
# Ensure seed.js has been run
node seed.js

# Run tests with verbose output
npm test -- --reporter spec
```

---

### Docker Build Issues

**Problem**: Docker build fails

**Solution**:
```bash
# Clear Docker cache
docker builder prune -a

# Build without cache
docker build --no-cache -t space-missions-explorer .

# Check Dockerfile syntax
docker build --check .
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests**
   ```bash
   npm test
   npm run coverage
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Coding Standards
- Follow existing code style
- Add tests for new features
- Update documentation
- Ensure all tests pass
- Maintain test coverage above 90%

---

## 📄 License

This project is licensed under the **MIT License** - see below for details:

```
MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👤 Author

**[Umair Zafar]**

- 💼 LinkedIn: [linkedin.com/in/yourprofile](https://www.linkedin.com/in/umairzafar/)
- 🐙 GitHub: [@yourusername](https://github.com/umair213)
- 📧 Email: umair2406@gmail.com

---

## 🙏 Acknowledgments

- **NASA** for inspiring imagery and mission data
- **Wikimedia Commons** for mission photographs
- **Space Agencies** (NASA, ESA, JAXA) for their incredible work
- **Open Source Community** for amazing tools and libraries
- **Node.js & MongoDB Communities** for excellent documentation

---

## 📚 Additional Resources

### Learn More About the Missions
- [NASA Apollo 11](https://www.nasa.gov/mission_pages/apollo/apollo-11.html)
- [Voyager Mission](https://voyager.jpl.nasa.gov/)
- [Mars Curiosity Rover](https://mars.nasa.gov/msl/)
- [Hubble Space Telescope](https://hubblesite.org/)
- [James Webb Space Telescope](https://webb.nasa.gov/)
- [International Space Station](https://www.nasa.gov/mission_pages/station/)

### Development Resources
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/guide/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)

---

## � Changelog

### Version 1.3.2 - October 21, 2025 ✨
#### UI/UX Major Improvements
- **🎯 Fixed Button Visibility Issue**: Resolved layout jumping when selecting missions
- **📌 Sticky Input Controls**: Search interface now stays accessible at all times
- **🎨 Enhanced Layout Structure**: Improved container architecture with proper z-index layering
- **📱 Better Responsive Design**: Flexbox layout with flex-wrap for improved mobile experience
- **✨ Glassmorphism Design**: Added modern frosted glass effects throughout the interface
- **🖼️ Mission Gallery**: Interactive thumbnail gallery for quick mission access
- **🔄 Smooth Animations**: Enhanced hover effects and transitions
- **🛠️ Image Fallback System**: Reliable image loading with NASA Images API integration

#### Technical Improvements
- Restructured HTML container hierarchy for better layout stability
- Enhanced CSS with sticky positioning and proper layering
- Improved image positioning with relative positioning and centering
- Added comprehensive visual feedback and loading states
- Updated database seeding with reliable NASA Images API URLs

### Version 1.3.1 - October 2025
#### Content Transformation
- **🚀 Project Rebranding**: Transformed from "Solar System" to "Space Missions Explorer"
- **📝 Mission Data**: Replaced 8 planets with 8 historic space missions
- **📚 Comprehensive Documentation**: Complete README rewrite with 800+ lines
- **🔧 API Updates**: Changed endpoints from `/planet` to `/mission`

### Version 1.3.0 - October 2025
#### Infrastructure & DevOps
- **🐳 Docker Integration**: Multi-stage Dockerfile with optimization
- **☸️ Kubernetes Support**: Production-ready deployment manifests
- **🔄 Jenkins CI/CD**: 10-stage pipeline with security scanning
- **🧪 Testing Framework**: Mocha/Chai with NYC coverage reporting
- **🔒 Security Scanning**: OWASP, Trivy, and SonarQube integration

---

##  Project Stats

- **Lines of Code**: ~2,000+ (including enhanced UI)
- **Test Coverage**: 90%+
- **API Endpoints**: 5
- **Space Missions**: 8 (with high-quality images)
- **UI Components**: 15+ (gallery, cards, buttons, inputs)
- **CSS Features**: Glassmorphism, animations, responsive design
- **Deployment Targets**: 3 (Docker, K8s, Lambda)
- **Security Scans**: 3 (OWASP, Trivy, SonarQube)
- **Browser Support**: Modern browsers with CSS Grid/Flexbox
- **Mobile Responsive**: ✅ Optimized for all screen sizes

---

## 🗺️ Roadmap

Future enhancements planned:

- [ ] Add more space missions (10-15 total)
- [ ] Implement mission timeline visualization
- [ ] Add mission videos and multimedia
- [ ] Create admin panel for content management
- [ ] Implement user authentication
- [ ] Add mission bookmarking functionality
- [ ] Create mobile app version
- [ ] Add multi-language support
- [ ] Implement GraphQL API
- [ ] Add real-time mission tracking (for active missions)

---

<div align="center">

**⭐ If you find this project useful, please consider giving it a star! ⭐**

---

*Exploring humanity's journey through the cosmos, one mission at a time* 🌌

**Made with ❤️ and ☕ by space enthusiasts**

</div>

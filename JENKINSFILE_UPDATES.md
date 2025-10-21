# 📋 Jenkinsfile Updates Guide

## Required Changes in Jenkinsfile

To complete your project transformation, you need to update the Docker image names in your Jenkinsfile.

### Find and Replace

Search for: `umair112/solar-system`  
Replace with: `your-dockerhub-username/space-missions-explorer`

## Specific Lines to Update

### Stage: Build Docker Image (Line ~98)
```groovy
sh 'docker build -t your-dockerhub-username/space-missions-explorer:$GIT_COMMIT .'
```

### Stage: Trivy Vulnerability Scanner (Line ~103, 108)
```groovy
trivy image your-dockerhub-username/space-missions-explorer:$GIT_COMMIT \
```

### Stage: Push Docker Image (Line ~131)
```groovy
sh 'docker push your-dockerhub-username/space-missions-explorer:$GIT_COMMIT'
```

### Stage: K8s Update Image Tag (Line ~161)
```groovy
sed -i "s#umair112.*#your-dockerhub-username/space-missions-explorer:$GIT_COMMIT#g" deployment.yml
```

## Optional: Update Project Display Name

At the top of the Jenkinsfile, you could add:
```groovy
pipeline {
    agent any
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    
    // Add this for better UI display
    environment {
        PROJECT_NAME = 'Space Missions Explorer'
    }
```

## Quick Sed Commands

If you want to update everything via command line:

```bash
# Update Docker image references
sed -i 's/umair112\/solar-system/your-dockerhub-username\/space-missions-explorer/g' Jenkinsfile

# Verify changes
grep -n "space-missions-explorer" Jenkinsfile
```

## Important Notes

1. **Docker Hub Credentials**: Make sure your Jenkins credentials ID matches your Docker Hub account
2. **Git Repository**: If you fork/clone to a new repo, update the git repository URLs in the K8s deployment stage
3. **SonarQube Project Key**: Consider updating from `Solar-System-Project` to `Space-Missions-Explorer-Project`

## Testing the Changes

Before committing, verify:

```bash
# Check syntax
docker build -t test-build .

# Validate Jenkinsfile syntax (if you have jenkins-cli)
java -jar jenkins-cli.jar declarative-linter < Jenkinsfile
```

## After Update Checklist

- [ ] Update Docker Hub username (4 locations)
- [ ] Update GitHub repository URLs (if changed)
- [ ] Update SonarQube project key (optional)
- [ ] Commit changes to version control
- [ ] Run pipeline to verify
- [ ] Check Docker Hub for pushed images
- [ ] Verify Kubernetes deployment (if applicable)

---

*Remember: Test your pipeline in a dev environment first!* 🛡️

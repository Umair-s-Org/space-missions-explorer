console.log('We are inside client.js');

// Function to select mission from gallery
function selectMission(missionId) {
    document.getElementById("missionID").value = missionId;
    
    // Remove selected class from all gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => item.classList.remove('selected'));
    
    // Add selected class to clicked item
    const selectedItem = galleryItems[missionId - 1];
    if (selectedItem) {
        selectedItem.classList.add('selected');
    }
    
    // Automatically trigger the mission loading
    func();
}

/* on page load  */
window.onload = function() {
    const mission_id = document.getElementById("missionID").value
    console.log("onLoad - Request Mission ID - " + mission_id)

    fetch("/os", {
            method: "GET"
        })
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
            thrownewError('Request failed');
        }).catch(function(error) {
            console.log(error);
        })
        .then(function(data) {
            document.getElementById('hostname').innerHTML = `Pod - ${data.os} `
          //  document.getElementById('environment').innerHTML = ` Env - ${data.env}  `
        });
};



const btn = document.getElementById('submit');
if (btn) {
    btn.addEventListener('click', func);
}

function func() {
    const mission_id = document.getElementById("missionID").value
    console.log("onClick Submit - Request Mission ID - " + mission_id)

    // Show loading state
    const element = document.getElementById("missionImage");
    element.classList.add('image-loading');
    document.getElementById('missionName').innerHTML = ` Loading Mission... `
    document.getElementById('missionDescription').innerHTML = 'Fetching mission data...'

    fetch("/mission", {
            method: "POST",
            body: JSON.stringify({
                id: document.getElementById("missionID").value
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(function(res2) {
            if (res2.ok) {
                return res2.json();
            }
            throw new Error('Request failed.');
        }).catch(function(error) {
            alert("Ooops, We have 8 space missions.\nSelect a number from 1 - 8")
            console.log(error);
            // Reset to default state
            element.classList.remove('image-loading');
            element.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/500px-NASA_logo.svg.png')";
            document.getElementById('missionName').innerHTML = ` Space Missions `
            document.getElementById('missionDescription').innerHTML = 'Explore humanity\'s greatest achievements in space exploration...'
        })
        .then(function(data) {
            if (data) {
                // Update mission name
                document.getElementById('missionName').innerHTML = ` ${data.name} `

                // Create a new image to preload
                const img = new Image();
                img.onload = function() {
                    // Image loaded successfully, update background
                    element.classList.remove('image-loading');
                    element.style.backgroundImage = "url(" + data.image + ")";
                    element.style.backgroundSize = "cover";
                    element.style.backgroundPosition = "center";
                };
                img.onerror = function() {
                    // Image failed to load, try fallback URLs first
                    console.log('Failed to load image:', data.image);
                    
                    // Define fallback images for each mission
                    const fallbacks = {
                        1: "https://upload.wikimedia.org/wikipedia/commons/9/98/Aldrin_Apollo_11_original.jpg",
                        2: "https://upload.wikimedia.org/wikipedia/commons/3/33/Voyager_spacecraft.jpg", 
                        3: "https://upload.wikimedia.org/wikipedia/commons/0/04/Curiosity_Self-Portrait_at_%27Big_Sky%27_Drilling_Site.jpg",
                        4: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HST-SM4.jpeg",
                        5: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Cassini_Saturn_Orbit_Insertion.jpg",
                        6: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Nh-pluto-in-true-color_2x_JPEG-edit-frame.jpg",
                        7: "https://upload.wikimedia.org/wikipedia/commons/7/7c/JWST_spacecraft_model_3.png",
                        8: "https://upload.wikimedia.org/wikipedia/commons/0/04/International_Space_Station_after_undocking_of_STS-132.jpg"
                    };
                    
                    const missionId = parseInt(document.getElementById("missionID").value);
                    const fallbackUrl = fallbacks[missionId];
                    
                    if (fallbackUrl) {
                        // Try fallback image
                        const fallbackImg = new Image();
                        fallbackImg.onload = function() {
                            element.classList.remove('image-loading');
                            element.style.backgroundImage = "url(" + fallbackUrl + ")";
                            element.style.backgroundSize = "cover";
                            element.style.backgroundPosition = "center";
                        };
                        fallbackImg.onerror = function() {
                            // Even fallback failed, use placeholder
                            element.classList.remove('image-loading');
                            element.style.backgroundImage = "url('https://via.placeholder.com/500x500/1a1a2e/ffffff?text=" + encodeURIComponent(data.name) + "')";
                            element.style.backgroundSize = "contain";
                        };
                        fallbackImg.src = fallbackUrl;
                    } else {
                        // No fallback, use placeholder
                        element.classList.remove('image-loading');
                        element.style.backgroundImage = "url('https://via.placeholder.com/500x500/1a1a2e/ffffff?text=" + encodeURIComponent(data.name) + "')";
                        element.style.backgroundSize = "contain";
                    }
                };
                img.src = data.image;

                // Update description with better formatting
                const mission_description = ` ${data.description} `
                const formattedDescription = mission_description.replace(/(.{80})/g, "$1<br>");
                
                // Add velocity and distance info
                const additionalInfo = `<br><br><strong>🚀 Velocity:</strong> ${data.velocity}<br><strong>📏 Distance:</strong> ${data.distance}`;
                
                document.getElementById('missionDescription').innerHTML = formattedDescription + additionalInfo;
            }
        });

}
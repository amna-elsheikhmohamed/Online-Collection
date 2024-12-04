// Helper function to fetch data from the API
async function fetchData() {
    try {
        const response = await fetch("http://localhost:3000/api/metmuseum");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (err) {
        console.error("Fetch error:", err);
        return null;
    }
}

async function ArtObject() {
    try {
        const data = await fetchData();

        if (!data) {
            console.error('No data received');
            return;
        }

        // Populate the HTML elements with the API data
        // document.getElementById('artImage').src = data.primaryImage || 'https://via.placeholder.com/400';
         document.getElementById('artImage').src = data.primaryImageSmall || 'https://via.placeholder.com/400';

        document.getElementById('artImage').alt = data.title || 'Art Object';
        document.getElementById('artTitle').textContent = `Title: ${data.title || 'Unknown'}`;
        document.getElementById('artArtist').textContent = `Artist: ${data.artistDisplayName || 'Unknown'}`;
        document.getElementById('artDepartment').textContent = `Department: ${data.department || 'Unknown'}`;
        document.getElementById('artDate').textContent = `Date: ${data.objectDate || 'Unknown'}`;
    } catch (error) {
        console.error('Error fetching the art object:', error);
    }
}

ArtObject();
